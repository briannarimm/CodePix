#!/usr/bin/env python3
"""Run every authored program in content/programs/ with real Python and record what it does.

For each content/programs/<id>.py:
  1. Run it plainly (`python3 <id>.py` in a scratch folder holding content/programs/data/*).
     Its stdout (and, for programs that are meant to fail, its traceback) is the output the book shows.
  2. Unless it is marked output-only, run it again under tools/_tracer.py and keep the step-by-step
     trace. The traced stdout must equal the plain stdout, or the build fails.

Header comments at the top of a program (all optional):
  # codepix: output-only      do not record steps (use for library-heavy Module B programs)
  # codepix: expect-error     the program is meant to stop with an error; keep its traceback
  # codepix: stdin=TEXT       text fed to input(); use \\n for new lines
  # codepix: max-steps=N      cap on recorded steps (default 400)
  # codepix: needs=numpy,sklearn   modules that must import (Module B)
  # codepix: py=3.12          minimum Python (Module B); otherwise programs must run on 3.9

Writes build/programs.json (id -> src, out, err, python, steps count) and build/traces/<id>.json.
With --verify-with PY, also runs every program that does not set py= under PY (for example python3.9)
and fails if its output differs from the recorded output. Nothing is written in that mode.
Usage: python3 tools/gen_traces.py [--python PATH] [--only ID ...] [--quiet] [--verify-with PY]
"""
import argparse, hashlib, json, os, pathlib, re, shutil, subprocess, sys, tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
PROG = ROOT / "content/programs"
OUT = ROOT / "build"
TRACER = ROOT / "tools/_tracer.py"


def header(src):
    opts = {}
    for line in src.split("\n")[:12]:
        m = re.match(r"#\s*codepix:\s*([\w-]+)(?:=(.*))?\s*$", line)
        if m:
            opts[m.group(1)] = (m.group(2) or "true").strip()
    return opts


def shown_source(src):
    """The source the book shows: header comments removed, leading blank lines dropped."""
    lines = [ln for ln in src.split("\n") if not re.match(r"#\s*codepix:", ln)]
    while lines and not lines[0].strip():
        lines.pop(0)
    return "\n".join(lines).rstrip() + "\n"


def run(py, args, cwd, stdin, timeout=120):
    env = dict(os.environ, PYTHONIOENCODING="utf-8", PYTHONHASHSEED="0", MPLBACKEND="Agg", LC_ALL="C.UTF-8")
    env.pop("PYTHONPATH", None)
    return subprocess.run([py] + args, cwd=cwd, input=stdin, capture_output=True, text=True, timeout=timeout, env=env)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--python", default=os.environ.get("CODEPIX_PYTHON", sys.executable))
    ap.add_argument("--only", nargs="*")
    ap.add_argument("--quiet", action="store_true")
    ap.add_argument("--verify-with")
    a = ap.parse_args()
    if a.verify_with:
        return verify(a)
    (OUT / "traces").mkdir(parents=True, exist_ok=True)
    ver = run(a.python, ["-c", "import sys;print('%d.%d.%d' % sys.version_info[:3])"], ROOT, "").stdout.strip()
    data_dir = PROG / "data"
    manifest_path = OUT / "programs.json"
    manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
    files = sorted(PROG.glob("*.py"))
    ids = {p.stem for p in files}
    manifest = {k: v for k, v in manifest.items() if k in ids}
    errors = 0
    for p in files:
        pid = p.stem
        if a.only and pid not in a.only:
            continue
        raw = p.read_text(encoding="utf-8")
        opts = header(raw)
        shown = shown_source(raw)
        data_hash = "".join(sorted(hashlib.sha1(f.read_bytes()).hexdigest() for f in data_dir.glob("*") if f.is_file())) if data_dir.exists() else ""
        key = hashlib.sha1((raw + ver + data_hash + TRACER.read_text()).encode()).hexdigest()
        if manifest.get(pid, {}).get("key") == key and (OUT / "traces" / f"{pid}.json").exists() == ("output-only" not in opts):
            continue
        stdin = opts.get("stdin", "").replace("\\n", "\n")
        with tempfile.TemporaryDirectory() as tmp:
            if data_dir.exists():
                for f in data_dir.iterdir():
                    if f.is_file():
                        shutil.copy(f, tmp)
            fname = f"{pid}.py"
            pathlib.Path(tmp, fname).write_text(shown, encoding="utf-8")
            r = run(a.python, [fname], tmp, stdin)
            expect_err = "expect-error" in opts
            if (r.returncode != 0) != expect_err:
                print(f"FAIL {pid}: exit code {r.returncode} (expect-error={expect_err})\n{r.stderr[-800:]}")
                errors += 1
                continue
            entry = {"key": key, "src": shown, "out": r.stdout, "err": r.stderr.replace(tmp + os.sep, "") if expect_err else "",
                     "python": ver, "opts": opts}
            # files the program wrote (small text only), so the book can show them
            made = {}
            for f in pathlib.Path(tmp).iterdir():
                if f.is_file() and f.name != fname and not (data_dir / f.name).exists() and f.suffix in (".txt", ".csv", ".json", ".md") and f.stat().st_size < 4000:
                    made[f.name] = f.read_text(encoding="utf-8")
            if made:
                entry["files"] = made
            tpath = OUT / "traces" / f"{pid}.json"
            if "output-only" not in opts:
                for f in pathlib.Path(tmp).iterdir():  # fresh copy of the data for the second run
                    if f.name != fname:
                        f.unlink() if f.is_file() else shutil.rmtree(f)
                if data_dir.exists():
                    for f in data_dir.iterdir():
                        if f.is_file():
                            shutil.copy(f, tmp)
                tr = run(a.python, ["-I", str(TRACER), fname, "trace.json", opts.get("max-steps", "400")], tmp, stdin)
                if tr.returncode != 0:
                    print(f"FAIL {pid}: tracer crashed\n{tr.stderr[-800:]}")
                    errors += 1
                    continue
                t = json.loads(pathlib.Path(tmp, "trace.json").read_text(encoding="utf-8"))
                if t["out"] != r.stdout and not t["truncated"]:
                    print(f"FAIL {pid}: traced output differs from the plain run")
                    errors += 1
                    continue
                t.update(id=pid, python=ver, src=shown)
                tpath.write_text(json.dumps(t, separators=(",", ":")), encoding="utf-8")
                entry["steps"] = len(t["steps"])
                entry["truncated"] = t["truncated"]
            elif tpath.exists():
                tpath.unlink()
            manifest[pid] = entry
            if not a.quiet:
                print(f"ok   {pid} ({entry.get('steps', 'output only')} steps)")
    for t in (OUT / "traces").glob("*.json"):
        if t.stem not in manifest or "output-only" in manifest[t.stem]["opts"]:
            t.unlink()
    manifest_path.write_text(json.dumps(manifest, indent=0, sort_keys=True), encoding="utf-8")
    print(f"gen_traces: {len(manifest)} programs with Python {ver}; {errors} failures")
    sys.exit(1 if errors else 0)


def verify(a):
    manifest = json.loads((OUT / "programs.json").read_text())
    bad = 0
    for pid, e in sorted(manifest.items()):
        if "py" in e["opts"] or (a.only and pid not in a.only):
            continue
        with tempfile.TemporaryDirectory() as tmp:
            if (PROG / "data").exists():
                for f in (PROG / "data").iterdir():
                    if f.is_file():
                        shutil.copy(f, tmp)
            pathlib.Path(tmp, pid + ".py").write_text(e["src"], encoding="utf-8")
            r = run(a.verify_with, [pid + ".py"], tmp, e["opts"].get("stdin", "").replace("\\n", "\n"))
            if r.stdout != e["out"] or (r.returncode != 0) != ("expect-error" in e["opts"]):
                print(f"FAIL {pid}: output under {a.verify_with} differs\n{r.stdout[-400:]}{r.stderr[-400:]}")
                bad += 1
    print(f"gen_traces --verify-with {a.verify_with}: {bad} differences")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
