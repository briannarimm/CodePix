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

PDF sources use "file" (a local path, for books supplied by Brianna) or "url" with "pdf": true.
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


def load_source(src: dict, fresh: bool):
    """Return (status_code, normalized_text). Also writes <key>.disp with readable text for --audit."""
    CACHE.mkdir(exist_ok=True)
    if src.get("file"):
        p = pathlib.Path(src["file"]).expanduser()
        if not p.exists() and src.get("textFallback"):
            fb = ROOT / src["textFallback"]
            if fb.exists():
                raw_text = fb.read_text(encoding="utf-8", errors="replace")
                key = CACHE / (hashlib.sha1(str(fb).encode()).hexdigest() + ".txt")
                key.with_suffix(".disp").write_text(collapse(raw_text))
                print(f"note      {src['id']}: PDF not found, using saved text {src['textFallback']}")
                return 200, norm(raw_text)
        if not p.exists():
            return -1, ""
        key = CACHE / (hashlib.sha1(str(p).encode()).hexdigest() + ".txt")
        if key.exists() and not fresh:
            return 200, key.read_text()
        raw_text = pdf_text(p)
        text = norm(raw_text)
        key.write_text(text)
        key.with_suffix(".disp").write_text(collapse(raw_text))
        return 200, text
    url = src["url"].split("#")[0]
    key = CACHE / hashlib.sha1(url.encode()).hexdigest()
    meta = key.with_suffix(".meta")
    txt = key.with_suffix(".txt")
    if txt.exists() and meta.exists() and not fresh and time.time() - txt.stat().st_mtime < MAX_AGE:
        return int(meta.read_text()), txt.read_text()
    raw = key.with_suffix(".raw")
    time.sleep(0.4)
    code = curl(url, raw)
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
    a = ap.parse_args()

    sources = {s["id"]: s for s in json.loads(REGISTRY.read_text())["sources"]}
    if a.list_sources:
        for s in sources.values():
            print(f'{s["id"]:34} {s["status"]:10} {s.get("file") or s["url"]}')
        return 0
    facts = json.loads(FACTS.read_text())["facts"]
    if a.src:
        facts = [f for f in facts if f["src"] == a.src]

    needed = sorted({f["src"] for f in facts})
    texts, bad_src, skipped = {}, [], set()
    for sid in needed:
        s = sources.get(sid)
        if not s:
            print(f"FAILED  {sid}: not in registry")
            bad_src.append(sid)
            continue
        code, text = load_source(s, a.fresh)
        texts[sid] = text
        if code == -1 and s.get("localOnly"):
            print(f"skip      {sid}: local file not on this machine; its facts are not checked here")
            skipped.add(sid)
            continue
        flag = "ok " if text else "BAD"
        print(f"{flag} {code:>3}  {sid}")
        if not text:
            bad_src.append(sid)

    if a.audit:
        for f in facts:
            sdef = sources.get(f["src"], {})
            if sdef.get("file"):
                fp = pathlib.Path(sdef["file"]).expanduser()
                if not fp.exists() and sdef.get("textFallback"):
                    fp = ROOT / sdef["textFallback"]
                key = (CACHE / hashlib.sha1(str(fp).encode()).hexdigest()).with_suffix(".disp")
            else:
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
            print(f'FAILED  {f["id"]}  ({f["src"]})  {why}')
    print(f"\n{len(facts) - failed - n_skipped} of {len(facts)} facts verified; {n_skipped} skipped (local-only source); {failed} failed; {len(bad_src)} unreadable sources")
    return 1 if failed or bad_src else 0


if __name__ == "__main__":
    sys.exit(main())
