#!/usr/bin/env bash
# Publish site/ to the `pages` branch (which GitHub Pages serves).
#
# The `pages` branch contains ONLY what is in site/. Nothing else from the repository can reach it.
# Usage: tools/publish_pages.sh [--no-push]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

[ -f site/index.html ] || { echo "site/index.html is missing" >&2; exit 1; }
git diff --quiet -- site || echo "note: site/ has uncommitted changes; publishing the working copy"

git fetch --quiet origin pages
WT="$(mktemp -d)/pages"
trap 'git worktree remove --force "$WT" >/dev/null 2>&1 || true' EXIT
git worktree add --quiet -B pages "$WT" origin/pages

rsync -a --delete --exclude '.git' site/ "$WT"/
cd "$WT"
git add -A
if git diff --cached --quiet; then
  echo "pages branch already matches site/; nothing to publish"
  exit 0
fi
SRC="$(git -C "$ROOT" rev-parse --short HEAD)"
git commit --quiet -m "Publish site from main@$SRC

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
if [ "${1:-}" = "--no-push" ]; then echo "committed locally on pages; not pushed"; exit 0; fi
git push --quiet origin pages
echo "published pages branch at $(git rev-parse --short HEAD)"
