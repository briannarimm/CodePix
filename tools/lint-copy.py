#!/usr/bin/env python3
"""Copy lint for the app's text. Fails on banned punctuation and constructions.

Scans src/js/*.js (strings shown to the learner), exercises/*/*/exercise.json and content/programs comments.
Rules (from CLAUDE.md):
  * no em dashes at all (also no en dash used as a dash, " – ");
  * no "not X but Y" constructions ("not ... but", "isn't ... it's", "rather than ... but");
  * no stock phrases (list below);
  * dialogue lines: about 45 words or fewer (we fail above 55 to allow "about").
Exit status 1 on any problem. Usage: python3 tools/lint-copy.py [-q] [FILE ...]  (files limit the scan)
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
STOCK = [
    "dive into", "delve", "in today's", "let's dive", "game-changer", "game changer", "unlock the power",
    "it's important to note", "it is important to note", "needless to say", "at the end of the day",
    "in a nutshell", "embark on", "journey of", "seamless", "leverage", "cutting-edge", "robust solution",
    "whether you're", "look no further", "the world of", "a testament to", "navigate the",
]
NOT_BUT = [
    re.compile(r"\bnot (?:just |only |merely |simply )?(?:a |an |the )?\w+(?: \w+){0,3}, but\b", re.I),
    re.compile(r"\bisn't (?:just |only )?\w+(?: \w+){0,3}[,;] it's\b", re.I),
    re.compile(r"\bnot because\b[^.]{0,60}\bbut because\b", re.I),
]
DIALOGUE = re.compile(r"""\b(?:say|S)\(\s*['"](\w+)['"]\s*,\s*(['"`])((?:\\.|(?!\2).)*)\2""")


def check_text(name, text, problems):
    for i, line in enumerate(text.split("\n"), 1):
        if "—" in line:
            problems.append(f"{name}:{i}: em dash")
        if " – " in line:
            problems.append(f"{name}:{i}: en dash used as a dash")
        low = line.lower()
        for s in STOCK:
            if s in low:
                problems.append(f"{name}:{i}: stock phrase {s!r}")
        for rx in NOT_BUT:
            if rx.search(line):
                problems.append(f"{name}:{i}: 'not X but Y' construction: {rx.search(line).group(0)!r}")


def main():
    problems = []
    only = {pathlib.Path(x).resolve() for x in sys.argv[1:] if not x.startswith("-")}
    keep = lambda f: not only or f.resolve() in only
    for f in sorted(f for f in (ROOT / "src/js").glob("*.js") if keep(f)):
        text = f.read_text(encoding="utf-8")
        check_text(f.name, text, problems)
        for m in DIALOGUE.finditer(text):
            words = len(re.sub(r"<[^>]+>|\[\[|\]\]|\[(?:py|ml)-\d+\]", " ", m.group(3)).split())
            if words > 55:
                problems.append(f"{f.name}: dialogue line of {words} words: {m.group(3)[:60]!r}...")
    for f in sorted(f for f in (ROOT / "exercises").glob("*/*/exercise.json") if keep(f)):
        ex = json.loads(f.read_text(encoding="utf-8"))
        text = json.dumps({k: v for k, v in ex.items() if k != "expected_output"}, ensure_ascii=False)
        check_text(str(f.relative_to(ROOT)), text.replace("\\n", "\n"), problems)
    for f in sorted(f for f in (ROOT / "content/programs").glob("*.py") if keep(f)):
        comments = "\n".join(ln for ln in f.read_text(encoding="utf-8").split("\n") if ln.strip().startswith("#"))
        check_text(f.name, comments, problems)
    for p in problems:
        print(p)
    if "-q" not in sys.argv or problems:
        print(f"lint-copy: {len(problems)} problems")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
