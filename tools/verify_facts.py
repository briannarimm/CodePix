#!/usr/bin/env python3
"""Check every fact in sources/facts.json against the raw text of its source.

For each fact, the verifier loads the source named in sources/registry.json (web page or PDF),
reduces it to plain text, and requires every string in the fact's "check" list to appear in it
(case-insensitive, whitespace-collapsed). A fact whose strings are missing is reported as FAILED
and must be fixed or removed before the book may cite it.

It also reports each source's HTTP status, so it doubles as a dead-link check.

Usage:
    python3 tools/verify_facts.py                 verify everything (cached pages are reused for 24 hours)
    python3 tools/verify_facts.py --fresh         ignore the cache
    python3 tools/verify_facts.py --src py-docs-venv   only facts from one source
    python3 tools/verify_facts.py --list-sources  print each source id, status and URL

PDF sources use "url" with "pdf": true; plain-text sources use "text": true.

Mirrors: a source may name "mirror", the raw URL of the publisher's own source file for the same page
(for example the .rst file in python/cpython that docs.python.org is built from). The mirror is read only
when the page itself cannot be fetched (dead host, or a network policy that blocks it). Light markup
(reStructuredText roles, Markdown links, AsciiDoc links, notebook JSON) is stripped first. Results read
through a mirror are marked "mirror" in the status line, so a human can see which text was checked.
"prefer_mirror": true reads the mirror first (for pages that serve a bot challenge instead of text,
such as PyPI project pages, whose JSON API is the machine-readable form of the same page).

Pending facts: a fact with "pending": true, or any fact whose source status is not "verified", was read
only through a page summary or could not be fetched as raw text. It is listed as PENDING and skipped, and
tools/check_lessons.py refuses to let a lesson cite it. On a machine that can reach the source, run
`--pending` to check those facts too; if they pass and the --audit read-through agrees, mark the source
verified (or drop the pending flag) in sources/build_*.py.
Needs pypdf only when a PDF source is present (pip install pypdf).
"""
import argparse, hashlib, html, json, pathlib, re, subprocess, sys, tempfile, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
REGISTRY = ROOT / "sources" / "registry.json"
FACTS = ROOT / "sources" / "facts.json"
CACHE = pathlib.Path(tempfile.gettempdir()) / "codepix-verify"
UA = "CodePixFactCheck/1.0 (+https://codepix.briannaimm.com)"
MAX_AGE = 24 * 3600


LIGATURES = {"\ufb01": "fi", "\ufb02": "fl", "\ufb00": "ff", "\ufb03": "ffi", "\ufb04": "ffl"}
PUNCT = {"\u00a0": " ", "\u2019": "'", "\u2018": "'", "\u201c": '"', "\u201d": '"',
         "\u2212": "-", "\u2013": "-", "\u2014": "-"}


def norm(text: str) -> str:
    """Lowercase, unify punctuation and ligatures, and drop all whitespace.

    Whitespace is dropped on both sides of every comparison because PDF extraction often loses
    or invents spaces. The cost is that a check string can match across a word boundary, so
    keep check strings specific (numbers, identifiers, distinctive phrases).
    """
    text = html.unescape(text)
    for table in (LIGATURES, PUNCT):
        for k, v in table.items():
            text = text.replace(k, v)
    return re.sub(r"\s+", "", text).lower()


def strip_html(raw: str) -> str:
    raw = re.sub(r"(?is)<(script|style)\b.*?</\1>", " ", raw)
    raw = re.sub(r"(?s)<[^>]+>", " ", raw)
    return raw


def curl(url: str, dest: pathlib.Path) -> int:
    r = subprocess.run(
        ["curl", "-sL", "--compressed", "--max-time", "60", "-A", UA, "-o", str(dest), "-w", "%{http_code}", url],
        capture_output=True, text=True)
    try:
        return int(r.stdout.strip() or 0)
    except ValueError:
        return 0


def pdf_text(path: pathlib.Path) -> str:
    try:
        from pypdf import PdfReader
    except ImportError:
        sys.exit("pypdf is needed for PDF sources: pip install pypdf")
    import logging
    logging.getLogger("pypdf").setLevel(logging.ERROR)
    r = PdfReader(str(path))
    out = []
    for p in r.pages:
        try:
            out.append(p.extract_text() or "")
        except Exception:
            out.append("")
    return "\n".join(out)


def collapse(text: str) -> str:
    text = html.unescape(text)
    for table in (LIGATURES, PUNCT):
        for k, v in table.items():
            text = text.replace(k, v)
    return re.sub(r"\s+", " ", text).strip()


def context(display: str, needle: str, width: int = 170) -> str:
    """Return the source text around the first match of needle (spacing-insensitive, case-insensitive)."""
    chars = [c for c in needle if not c.isspace()]
    if not chars:
        return ""
    m = re.search(r"\s*".join(re.escape(c) for c in chars), display, re.I)
    if not m:
        return "(no match)"
    return display[max(0, m.start() - width): m.end() + width]


def strip_markup(raw: str, url: str) -> str:
    """Reduce rst / Markdown / AsciiDoc / notebook / XML source to roughly the text a reader sees."""
    if url.endswith("/json"):
        return raw                                                              # PyPI JSON: match as is
    if url.endswith(".asc"):
        raw = re.sub(r"\(\(\([^()]*\)\)\)", "", raw)                          # AsciiDoc index terms
    if url.endswith(".md"):
        raw = re.sub(r"\{%-?[^%]*%\}", " ", raw)                              # Liquid tags
        raw = re.sub(r"(?m)^[ \t]*>[ \t]?", "", raw)                            # blockquote markers
    if url.endswith(".ipynb"):
        try:
            nb = json.loads(raw)
            raw = "\n".join("".join(c.get("source", [])) for c in nb.get("cells", []))
        except ValueError:
            pass
    raw = re.sub(r"(?s)<!--.*?-->", " ", raw)
    raw = re.sub(r":[\w.+-]+(?::[\w.+-]+)*:`([^`<]*?)(?:\s*<[^`>]*>)?`", r"`\1`", raw)  # :role:`x <t>` -> `x`
    raw = re.sub(r"`([^`<>]*?)\s*<[^`>]*>`_{1,2}", r"\1", raw)                   # `text <url>`_ -> text
    raw = re.sub(r"`[~!]", "`", raw)
    raw = re.sub(r"!?\[([^\]\n]*)\]\([^)\n]*\)", r"\1", raw)                    # [text](url) -> text
    raw = re.sub(r"(https?://[^\s\[\]\"'<>]+)\[\^?\]", r"\1", raw)              # url[^] -> url
    raw = re.sub(r"(?:link:|xref:|https?://)[^\s\[\]\"'<>]*\[([^\]\n]*)\]", r"\1", raw)  # link:url[text] -> text
    raw = re.sub(r"\*\*([A-Za-z][^*\n]*?[A-Za-z.])\*\*", r"\1", raw)   # **bold** (not the ** operator)
    raw = raw.replace("``", "").replace("`", "")
    raw = re.sub(r"\{(<[^{}<>\n]*>)\}", r"\1", raw) if url.endswith(".rst") else raw    # :samp:`{var}`
    raw = re.sub(r"(?<![\w*])\*(?=\S)([^*\n]+?)(?<=\S)\*(?![\w*])", r"\1", raw)   # *emphasis*
    if url.endswith((".asc", ".md")):
        raw = re.sub(r"(?<!\w)_(?=\S)([^_\n]+?)(?<=\S)_(?!\w)", r"\1", raw)      # _emphasis_
    if url.endswith((".html", ".htm", ".cnxml", ".xml")):
        raw = strip_html(raw)
    return raw


def load_source(src: dict, fresh: bool):
    """Return (status_code, normalized_text). Also writes <key>.disp with readable text for --audit.

    If the page cannot be fetched and the source names a mirror, the mirror is read instead and the
    returned status is negative (for example -200) so callers can say "mirror".
    """
    CACHE.mkdir(exist_ok=True)
    url = src["url"].split("#")[0]
    key = CACHE / hashlib.sha1(url.encode()).hexdigest()
    meta = key.with_suffix(".meta")
    txt = key.with_suffix(".txt")
    if txt.exists() and meta.exists() and not fresh and time.time() - txt.stat().st_mtime < MAX_AGE:
        return int(meta.read_text()), txt.read_text()
    raw = key.with_suffix(".raw")
    time.sleep(0.4)
    code = 0 if src.get("prefer_mirror") and src.get("mirror") else curl(url, raw)
    if (code >= 400 or code == 0 or not raw.exists()) and src.get("mirror"):
        mcode = curl(src["mirror"], raw)
        if 200 <= mcode < 400 and raw.exists():
            raw_text = strip_markup(raw.read_bytes().decode("utf-8", errors="replace"), src["mirror"])
            key.with_suffix(".disp").write_text(collapse(raw_text))
            meta.write_text(str(-mcode))
            txt.write_text(norm(raw_text))
            return -mcode, norm(raw_text)
    if code >= 400 or code == 0 or not raw.exists():
        meta.write_text(str(code))
        txt.write_text("")
        return code, ""
    if src.get("pdf"):
        raw_text = pdf_text(raw)
    elif src.get("text"):
        raw_text = raw.read_bytes().decode("utf-8", errors="replace")
    else:
        raw_text = strip_html(raw.read_bytes().decode("utf-8", errors="replace"))
    text = norm(raw_text)
    key.with_suffix(".disp").write_text(collapse(raw_text))
    meta.write_text(str(code))
    txt.write_text(text)
    return code, text


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--fresh", action="store_true")
    ap.add_argument("--src")
    ap.add_argument("--list-sources", action="store_true")
    ap.add_argument("--audit", action="store_true", help="print each claim with the source text around its longest check string")
    ap.add_argument("--pending", action="store_true", help="also check pending facts (needs network access to their sources)")
    a = ap.parse_args()

    sources = {s["id"]: s for s in json.loads(REGISTRY.read_text())["sources"]}
    if a.list_sources:
        for s in sources.values():
            print(f'{s["id"]:34} {s["status"]:10} {s.get("file") or s["url"]}')
        return 0
    facts = json.loads(FACTS.read_text())["facts"]
    if a.src:
        facts = [f for f in facts if f["src"] == a.src]
    pending = [f for f in facts if f.get("pending") or sources.get(f["src"], {}).get("status") != "verified"]
    if not a.pending:
        pend_ids = {f["id"] for f in pending}
        facts = [f for f in facts if f["id"] not in pend_ids]

    needed = sorted({f["src"] for f in facts})
    texts, bad_src, skipped, via_mirror = {}, [], set(), set()
    for sid in needed:
        s = sources.get(sid)
        if not s:
            print(f"FAILED  {sid}: not in registry")
            bad_src.append(sid)
            continue
        code, text = load_source(s, a.fresh)
        texts[sid] = text
        flag = "ok " if text else "BAD"
        via = "  (read via mirror: " + s["mirror"] + ")" if code < 0 else ""
        if code < 0:
            via_mirror.add(sid)
        print(f"{flag} {abs(code):>3}  {sid}{via}")
        if not text:
            bad_src.append(sid)

    if a.audit:
        for f in facts:
            sdef = sources.get(f["src"], {})
            key = (CACHE / hashlib.sha1(sdef["url"].split("#")[0].encode()).hexdigest()).with_suffix(".disp")
            disp = key.read_text() if key.exists() else ""
            best = max(f["check"], key=len)
            print(f'### {f["id"]} [{f["src"]}] {f["anchor"]}\nCLAIM: {f["claim"]}\nCHECK: {f["check"]}\nSOURCE: ...{context(disp, best)}...\n')
        return 0
    failed = 0
    n_skipped = 0
    for f in facts:
        if f["src"] in skipped:
            n_skipped += 1
            continue
        text = texts.get(f["src"], "")
        missing = [c for c in f["check"] if norm(c) not in text]
        if f["src"] in bad_src or missing:
            failed += 1
            why = "source unreadable" if f["src"] in bad_src else "missing: " + "; ".join(repr(m) for m in missing)
            if f["src"] in via_mirror and missing:
                why += "  [checked against the mirror only; the live page may render this text differently]"
            print(f'FAILED  {f["id"]}  ({f["src"]})  {why}')
    if not a.pending:
        for f in pending:
            why = "fact marked pending" if f.get("pending") else "source status is " + sources.get(f["src"], {}).get("status", "missing")
            print(f'PENDING {f["id"]}  ({f["src"]})  {why}; not citable until checked with --pending')
    print(f"\n{len(facts) - failed - n_skipped} of {len(facts)} facts verified; {n_skipped} skipped; {failed} failed; {len(bad_src)} unreadable sources; {0 if a.pending else len(pending)} pending (not checked, not citable)")
    return 1 if failed or bad_src else 0


if __name__ == "__main__":
    sys.exit(main())
