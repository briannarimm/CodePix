#!/usr/bin/env python3
"""Check the lesson plans' citations.

1. Every [py-nnn] / [ml-nnn] tag must exist in sources/facts.json.
2. For each bullet or paragraph that carries tags, every `code term` and every number in the
   uncited-looking text must appear in the claims or check strings of the facts cited in that
   same bullet. Anything not covered is listed for a human to review. (It cannot prove a sentence
   is right; it catches the common mistake of citing the wrong ID.)
3. Banned punctuation (em dash) is reported.
Facts never cited are listed at the end.

Run: python3 tools/check_lessons.py
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
facts = {f["id"]: f for f in json.loads((ROOT / "sources/facts.json").read_text())["facts"]}
status = {s["id"]: s["status"] for s in json.loads((ROOT / "sources/registry.json").read_text())["sources"]}
# A pending fact (flagged, or resting on a source that is not verified) must never be cited.
pending = {i for i, f in facts.items() if f.get("pending") or status.get(f["src"]) != "verified"}
TAG = re.compile(r"\[((?:py|ml)-\d{3})\]")
squash = lambda s: re.sub(r"\s+", "", s).lower()
reviewed = set()
rv = ROOT / "docs/lessons/reviewed.txt"
if rv.exists():
    for ln in rv.read_text(encoding="utf-8").split("\n"):
        if "::" in ln and not ln.startswith("#"):
            a, b = ln.split("::", 1); reviewed.add((a.strip(), b.strip()))
problems, used = 0, set()

for path in sorted((ROOT / "docs/lessons").glob("*.md")):
    text = path.read_text(encoding="utf-8")
    if "—" in text:
        print(f"{path.name}: contains an em dash"); problems += 1
    # split into blocks: bullets and paragraphs
    blocks, cur = [], []
    for line in text.split("\n"):
        if line.startswith("- ") or not line.strip():
            if cur: blocks.append(" ".join(cur)); cur = []
            if line.startswith("- "): cur = [line]
        elif cur: cur.append(line.strip())
        else: blocks.append(line)
    if cur: blocks.append(" ".join(cur))
    for b in blocks:
        ids = TAG.findall(b)
        for i in ids:
            used.add(i)
            if i not in facts:
                print(f"{path.name}: unknown fact {i}"); problems += 1
            elif i in pending:
                print(f"{path.name}: cites pending fact {i} (source not verified as raw text)"); problems += 1
        if not ids or "GAP" in b and "[" not in b: continue
        known = [facts[i] for i in ids if i in facts]
        hay = squash(" ".join(f["claim"] + " " + " ".join(f["check"]) for f in known))
        body = re.sub(r"^\s*(?:- )?\d+\.\s+", "", TAG.sub("", b))
        body = re.sub(r"\(see [^)]*\)|\*\*Open issues\.\*\*.*", "", body)
        terms = re.findall(r"`([^`]+)`", body)
        nums = re.findall(r"(?<![\w.])-?\d[\d,]*\.?\d*%?", re.sub(r"`[^`]*`", " ", body))
        for t in terms + [n for n in nums if len(n.strip("-,.")) > 0]:
            if (path.name, t) in reviewed: continue
            if squash(t.rstrip(".,")) not in hay and squash(t) not in hay:
                print(f"{path.name}: {t!r} not covered by {ids}\n    in: {b[:150]}"); problems += 1

unused = [i for i in facts if i not in used and i not in pending]
print(f"\n{len(used)} facts cited, {len(unused)} not cited yet, {len(pending)} pending (not citable); {problems} items to review")
if "--unused" in sys.argv: print(", ".join(unused))
sys.exit(1 if problems else 0)
