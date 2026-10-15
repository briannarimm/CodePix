#!/usr/bin/env python3
"""Build the site into dist/ (or --out DIR).

Steps:
  1. Copy lint (tools/lint-copy.py).
  2. Record every program in content/programs with real Python (tools/gen_traces.py, cached in build/).
  3. Read exercises/*/*/exercise.json.
  4. Gather the facts the app cites ([py-001] style tags in src/js) and their sources. A tag that is
     unknown, or whose source is not "verified", fails the build.
  5. Concatenate src/css/*.css and src/js/*.js (name order) into src/template.html, with a DATA blob first.
  6. Syntax-check the JS with node (prints "JS syntax: OK").
  7. Copy static/ (fonts go to assets/fonts), traces to data/traces, and exercises to exercises/
     with a zip per level (starters, tests and data; solutions are separate files).
Usage: python3 tools/build.py [--out DIR] [--python PATH] [--skip-lint]
"""
import argparse, datetime, json, os, pathlib, re, shutil, subprocess, sys, tempfile, zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
TAG = re.compile(r"\[((?:py|ml)-\d{3})\]")
MONTHS = "January February March April May June July August September October November December".split()


def fail(msg):
    print("BUILD FAILED: " + msg)
    sys.exit(1)


def cite_author(a):
    if a.startswith("Python Software") or "," not in a:
        return a
    # "Surname, A. B., Surname, C., & Surname, D." : every part that is not initials is a surname
    parts = [p.strip().lstrip("&").strip() for p in a.split(",")]
    surnames = [p for p in parts if p and not re.fullmatch(r"(?:[A-Z]\.[\s-]*)+", p)]
    if len(surnames) == len(parts):
        return a  # a group author such as "Yale University, Office of the President"
    if len(surnames) >= 3:
        return surnames[0] + " et al."
    return " & ".join(surnames)


def apa(s):
    d = s["date"]
    year = d[:4] if d[:4].isdigit() else "n.d."
    date_txt = d if d == "n.d." else (year if len(d) <= 4 else f"{year}, {MONTHS[int(d[5:7]) - 1]} {int(d[8:10])}" if re.fullmatch(r"\d{4}-\d\d-\d\d", d) else d)
    author = s["author"].rstrip(".")
    acc = datetime.date.fromisoformat(s["accessed"])
    retrieved = f"Retrieved {MONTHS[acc.month - 1]} {acc.day}, {acc.year}, from " if year == "n.d." else ""
    site = "" if s["site"] == s["author"] else f" {s['site']}."
    return {"apa": f"{author}. ({date_txt}). *{s['title']}*.{site} {retrieved}{s['url']}",
            "cite": f"{cite_author(s['author'])}, {year}"}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(ROOT / "dist"))
    ap.add_argument("--python", default=os.environ.get("CODEPIX_PYTHON", sys.executable))
    ap.add_argument("--skip-lint", action="store_true")
    a = ap.parse_args()
    out = pathlib.Path(a.out).resolve()

    if not a.skip_lint:
        r = subprocess.run([sys.executable, str(ROOT / "tools/lint-copy.py"), "-q"])
        if r.returncode:
            fail("copy lint (see above)")

    r = subprocess.run([sys.executable, str(ROOT / "tools/gen_traces.py"), "--python", a.python, "--quiet"])
    if r.returncode:
        fail("gen_traces (see above)")
    programs = json.loads((ROOT / "build/programs.json").read_text(encoding="utf-8"))
    progs = {k: {kk: v[kk] for kk in ("src", "out", "err", "steps", "truncated", "files", "python") if kk in v} for k, v in programs.items()}
    for k, v in programs.items():
        progs[k]["traced"] = "steps" in v

    exercises = {}
    for js in sorted((ROOT / "exercises").glob("*/*/exercise.json")):
        ex = json.loads(js.read_text(encoding="utf-8"))
        d = js.parent
        stem = ex["file"][:-3]
        files = [ex["file"]] + sorted(f.name for f in d.iterdir() if f.is_file() and f.name not in ("starter.py", "solution.py", "exercise.json"))
        ex["files"] = files
        ex["path"] = f"exercises/{d.parent.name}/{d.name}/"
        ex["solution"] = f"{stem}_solution.py"
        ex["starter_src"] = (d / "starter.py").read_text(encoding="utf-8")
        exercises[ex["id"]] = ex

    js_parts = []
    for f in sorted((ROOT / "src/js").glob("*.js")):
        js_parts.append(f"// ---- {f.name} ----\n" + f.read_text(encoding="utf-8"))
    js_src = "\n".join(js_parts)
    css = "\n".join(f"/* ---- {f.name} ---- */\n" + f.read_text(encoding="utf-8") for f in sorted((ROOT / "src/css").glob("*.css")))

    facts = {f["id"]: f for f in json.loads((ROOT / "sources/facts.json").read_text())["facts"]}
    sources = {s["id"]: s for s in json.loads((ROOT / "sources/registry.json").read_text())["sources"]}
    used = sorted(set(TAG.findall(js_src)) | {t for ex in exercises.values() for t in TAG.findall(json.dumps(ex))})
    data_facts, data_sources = {}, {}
    for fid in used:
        if fid not in facts:
            fail(f"unknown fact {fid} cited in src/js or exercises")
        f = facts[fid]
        s = sources.get(f["src"])
        if f.get("pending"):
            fail(f"fact {fid} is pending (not verified against raw text) and cannot be cited")
        if not s or s["status"] != "verified":
            fail(f"fact {fid} rests on source {f['src']} which is not verified")
        data_facts[fid] = {"c": f["claim"], "s": f["src"], "a": f["anchor"]}
        if s["id"] not in data_sources:
            data_sources[s["id"]] = dict({k: s[k] for k in ("url", "title", "author", "site", "date", "license", "licenseUrl", "accessed", "reuse")}, **apa(s))

    built = datetime.date.today().isoformat()
    data = {"facts": data_facts, "sources": data_sources, "programs": progs, "exercises": exercises,
            "built": built, "python": next(iter(programs.values()))["python"] if programs else ""}
    js_all = "const DATA = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n" + js_src

    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as t:
        t.write(js_all)
        tname = t.name
    r = subprocess.run(["node", "--check", tname], capture_output=True, text=True)
    os.unlink(tname)
    if r.returncode:
        fail("JS syntax error:\n" + r.stderr.replace(tname, "bundle.js")[-2000:])
    print("JS syntax: OK")

    html = (ROOT / "src/template.html").read_text(encoding="utf-8")
    html = html.replace("/*{{CSS}}*/", css).replace("/*{{JS}}*/", js_all.replace("</script", "<\\/script"))

    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    (out / "index.html").write_text(html, encoding="utf-8")
    for f in (ROOT / "static").rglob("*"):
        if f.is_file() and f.name != ".DS_Store":
            rel = f.relative_to(ROOT / "static")
            dest = out / ("assets" / rel if rel.parts[0] == "fonts" else rel)
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy(f, dest)
    (out / "data/traces").mkdir(parents=True)
    for t in (ROOT / "build/traces").glob("*.json"):
        shutil.copy(t, out / "data/traces" / t.name)

    levels = {}
    for ex in exercises.values():
        d = ROOT / ex["path"]
        dest = out / ex["path"]
        dest.mkdir(parents=True, exist_ok=True)
        shutil.copy(d / "starter.py", dest / ex["file"])
        shutil.copy(d / "solution.py", dest / ex["solution"])
        for name in ex["files"][1:]:
            shutil.copy(d / name, dest / name)
        levels.setdefault(ex["level"], []).append(ex)
    for lvl, exs in levels.items():
        with zipfile.ZipFile(out / "exercises" / f"{lvl}.zip", "w", zipfile.ZIP_DEFLATED) as z:
            for ex in exs:
                slug = pathlib.PurePosixPath(ex["path"]).name
                for name in ex["files"]:
                    z.write(out / ex["path"] / name, f"codepix-{lvl}/{slug}/{name}")
    size = len(html.encode()) // 1024
    print(f"built {out} : index.html {size} KB, {len(progs)} programs, {len(exercises)} exercises, {len(data_facts)} cited facts")


if __name__ == "__main__":
    main()
