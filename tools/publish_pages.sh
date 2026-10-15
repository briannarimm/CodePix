#!/usr/bin/env bash
# Manual fallback: build dist/ and publish it to the `pages` branch (which GitHub Pages serves).
# CI does this on every push to main (.github/workflows/site.yml); use this only if CI cannot.
# The `pages` branch contains ONLY the built site. Nothing else from the repository can reach it.
# Usage: tools/publish_pages.sh [--no-push]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

python3 tools/build.py --out dist
git fetch --quiet origin pages
WT="$(mktemp -d)/pages"
trap 'git worktree remove --force "$WT" >/dev/null 2>&1 || true' EXIT
git worktree add --quiet -B pages "$WT" origin/pages

rsync -a --delete --exclude '.git' dist/ "$WT"/
cd "$WT"
git add -A
if git diff --cached --quiet; then
  echo "pages branch already matches dist/; nothing to publish"
  exit 0
fi
SRC="$(git -C "$ROOT" rev-parse --short HEAD)"
git commit --quiet -m "Publish site from main@$SRC"
if [ "${1:-}" = "--no-push" ]; then echo "committed locally on pages; not pushed"; exit 0; fi
git push --quiet origin pages
echo "published pages branch at $(git rev-parse --short HEAD)"
