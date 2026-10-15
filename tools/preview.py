#!/usr/bin/env python3
"""Build into a scratch folder and serve it locally. Usage: python3 tools/preview.py [--open] [--port 8765]"""
import argparse, functools, http.server, os, pathlib, subprocess, sys, tempfile, webbrowser

ROOT = pathlib.Path(__file__).resolve().parent.parent
ap = argparse.ArgumentParser()
ap.add_argument("--open", action="store_true")
ap.add_argument("--port", type=int, default=8765)
a = ap.parse_args()
out = os.path.join(os.environ.get("TMPDIR", tempfile.gettempdir()), "codepix-dist")
if subprocess.run([sys.executable, str(ROOT / "tools/build.py"), "--out", out]).returncode:
    sys.exit(1)
url = f"http://127.0.0.1:{a.port}/"
print("serving", out, "at", url)
if a.open:
    webbrowser.open(url)
http.server.ThreadingHTTPServer(("127.0.0.1", a.port), functools.partial(http.server.SimpleHTTPRequestHandler, directory=out)).serve_forever()
