#!/usr/bin/env python3
"""Check every exercise with real Python, so no broken exercise ships.

Layout: exercises/<level>/<slug>/
  exercise.json   {"id", "level", "title", "file", "kind", "prompt", "run_command", "expected_output",
                   "hints": [three steps], "explain_after", "concepts", "py"}
  starter.py      shipped to the learner as <file> (for example swap.py)
  solution.py     the reference answer, shipped as <stem>_solution.py
  test_<slug>.py  tests the learner runs (unittest before level a13; pytest allowed from a13)
  anything else   data files shipped as-is (fictional data only)

For each exercise, in a scratch folder and with each Python given:
  * solution.py copied to <file> passes `run_command`;
  * starter.py copied to <file> fails `run_command` (kind "test" only; "predict"/"explore" skip this);
  * if expected_output is set, `python3 <file>` with the solution prints exactly that (trailing space ignored).
Usage: python3 tools/exercises_check.py [--python PATH ...] [--only ID ...]
"""
import argparse, json, os, pathlib, re, shlex, shutil, subprocess, sys, tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
EX = ROOT / "exercises"
REQUIRED = ["id", "level", "title", "file", "kind", "prompt", "run_command", "hints"]


def norm(s):
    return "\n".join(line.rstrip() for line in s.strip("\n").split("\n"))


def pyver(py):
    r = subprocess.run([py, "-c", "import sys;print('%d.%d' % sys.version_info[:2])"], capture_output=True, text=True)
    return tuple(int(x) for x in r.stdout.strip().split("."))


def run(py, cmd, cwd):
    argv = shlex.split(cmd)
    if argv[0] in ("python3", "python"):
        argv[0] = py
    env = dict(os.environ, PYTHONIOENCODING="utf-8", PYTHONHASHSEED="0", MPLBACKEND="Agg", LC_ALL="C.UTF-8")
    env.pop("PYTHONPATH", None)
    return subprocess.run(argv, cwd=cwd, capture_output=True, text=True, timeout=180, env=env)


def stage(d, ex, which, tmp):
    for f in d.iterdir():
        if f.is_file() and f.name not in ("starter.py", "solution.py", "exercise.json"):
            shutil.copy(f, tmp)
        elif f.is_dir() and f.name != "__pycache__":
            shutil.copytree(f, pathlib.Path(tmp, f.name))
    shutil.copy(d / which, pathlib.Path(tmp, ex["file"]))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--python", nargs="*", default=[os.environ.get("CODEPIX_PYTHON", sys.executable)])
    ap.add_argument("--only", nargs="*")
    a = ap.parse_args()
    bad, count = 0, 0
    seen = set()
    for js in sorted(EX.glob("*/*/exercise.json")):
        d = js.parent
        try:
            ex = json.loads(js.read_text(encoding="utf-8"))
        except ValueError as e:
            print(f"FAIL {d.relative_to(ROOT)}: bad JSON: {e}"); bad += 1; continue
        missing = [k for k in REQUIRED if k not in ex]
        if missing:
            print(f"FAIL {d.relative_to(ROOT)}: missing {missing}"); bad += 1; continue
        if a.only and ex["id"] not in a.only:
            continue
        if ex["id"] in seen:
            print(f"FAIL {ex['id']}: duplicate id"); bad += 1
        seen.add(ex["id"])
        if ex["level"] != d.parent.name:
            print(f"FAIL {ex['id']}: level {ex['level']} but folder {d.parent.name}"); bad += 1
        if len(ex["hints"]) < 1:
            print(f"FAIL {ex['id']}: needs hints"); bad += 1
        for need in ("starter.py", "solution.py"):
            if not (d / need).exists():
                print(f"FAIL {ex['id']}: no {need}"); bad += 1
        if "pytest" in ex["run_command"] and ex["level"] < "a13" and ex["level"].startswith("a"):
            print(f"FAIL {ex['id']}: pytest before a13"); bad += 1
        for src in d.glob("*.py"):
            text = src.read_text(encoding="utf-8")
            for m in re.finditer(r"open\(([^)]*)\)", text):
                if "encoding" not in m.group(1) and "'rb'" not in m.group(1) and '"rb"' not in m.group(1) and '"wb"' not in m.group(1):
                    print(f"FAIL {ex['id']}: {src.name} calls open() without an encoding: {m.group(0)}"); bad += 1
        count += 1
        minpy = tuple(int(x) for x in str(ex.get("py", "3.9")).split("."))
        for py in a.python:
            if pyver(py) < minpy:
                continue
            tag = f"{ex['id']} [{'.'.join(map(str, pyver(py)))}]"
            with tempfile.TemporaryDirectory() as tmp:
                stage(d, ex, "solution.py", tmp)
                r = run(py, ex["run_command"], tmp)
                if r.returncode != 0:
                    print(f"FAIL {tag}: solution does not pass\n{(r.stdout + r.stderr)[-1200:]}"); bad += 1
                if ex.get("expected_output") is not None:
                    o = run(py, f"python3 {ex['file']}", tmp)
                    if norm(o.stdout) != norm(ex["expected_output"]):
                        print(f"FAIL {tag}: expected_output differs from the real output:\n--- real ---\n{o.stdout}\n--- expected ---\n{ex['expected_output']}"); bad += 1
            if ex["kind"] == "test":
                with tempfile.TemporaryDirectory() as tmp:
                    stage(d, ex, "starter.py", tmp)
                    r = run(py, ex["run_command"], tmp)
                    if r.returncode == 0:
                        print(f"FAIL {tag}: starter already passes; it should fail at least one test"); bad += 1
    print(f"exercises_check: {count} exercises, {bad} problems")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
