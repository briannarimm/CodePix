#!/usr/bin/env python3
"""Smoke-test the built site in a real browser (Playwright, Chromium).

Builds into a scratch folder (unless --dist is given), then runs tools/check.mjs, which plays every level
at 1280 px and 400 px, opens every toy, book page, trace, exercise panel and tool window, and fails on
console errors, failed requests, content problems (CP.problems()) or sideways page scroll.
Also runs tools/exercises_check.py. Prints ALL GOOD when everything passes.
Usage: python3 tools/check.py [--dist DIR] [--shots DIR] [--only a03,a04] [--skip-exercises]
"""
import argparse, os, pathlib, shutil, subprocess, sys, tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dist")
    ap.add_argument("--shots", default="")
    ap.add_argument("--only", default="")
    ap.add_argument("--skip-exercises", action="store_true")
    a = ap.parse_args()
    dist = a.dist or os.path.join(os.environ.get("TMPDIR", tempfile.gettempdir()), "codepix-dist")
    if not a.dist:
        r = subprocess.run([sys.executable, str(ROOT / "tools/build.py"), "--out", dist])
        if r.returncode:
            sys.exit(r.returncode)
    if a.shots:
        pathlib.Path(a.shots).mkdir(parents=True, exist_ok=True)
    env = dict(os.environ)
    if not env.get("NODE_PATH"):
        npm_root = subprocess.run(["npm", "root", "-g"], capture_output=True, text=True).stdout.strip()
        env["NODE_PATH"] = npm_root
    # ESM ignores NODE_PATH, so link the global playwright next to the script when needed
    local = ROOT / "tools/node_modules/playwright"
    if not local.exists() and not (ROOT / "node_modules/playwright").exists():
        src = pathlib.Path(env["NODE_PATH"]) / "playwright"
        if src.exists():
            local.parent.mkdir(exist_ok=True)
            os.symlink(src, local)
    ok = True
    if not a.skip_exercises:
        ok = subprocess.run([sys.executable, str(ROOT / "tools/exercises_check.py")]).returncode == 0 and ok
    r = subprocess.run(["node", str(ROOT / "tools/check.mjs"), str(pathlib.Path(dist).resolve()), a.shots, a.only], env=env)
    ok = r.returncode == 0 and ok
    if not ok:
        print("check: FAILED")
        sys.exit(1)


if __name__ == "__main__":
    main()
