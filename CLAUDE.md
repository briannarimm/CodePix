# Code Pix (a visual-novel textbook game that teaches Python on your own machine)

A public static website that teaches introductory computer science and Python. It fuses a point-and-click visual novel with an interactive, cited textbook, in a 90s edutainment look with a Kid Pix style toolbox. The learner installs Python on their own computer and does the exercises there. **No Python runs in the browser.** Everything the app shows as Python output was recorded from real `python3` at build time.

- Live site: https://codepix.briannaimm.com (domain spelled without the "r", unlike the GitHub account). Fallback: https://briannarimm.github.io/codepix/
- Repo: github.com/briannarimm/codepix (public). Pushes to `main` build and deploy through GitHub Actions.
- The full spec is `docs/handoff.md`. Decisions and their reasons are in `docs/decisions.md`. Brianna's deploy steps are in `docs/deploy.md`.
- Sibling project for patterns and copied infrastructure: `~/Library/CloudStorage/GoogleDrive-briannarimm@gmail.com/My Drive/Projects/Programming/ai-pix-explorer/` (read its CLAUDE.md).

## Layout

```
src/template.html        full HTML document (doctype, head, meta); build.py fills /*{{CSS}}*/ and /*{{JS}}*/
src/css/*.css            concatenated in name order
src/js/*.js              concatenated in name order (00-core, 10-refs, 20-24 art, 30-engine, 40-ui, 45-machine, 46-trace,
                         47-highlight, 55-toys-*, 60-glossary, 61..79 story files, 99-boot)
content/programs/*.py    authored example programs: the single source for book code and recorded traces
exercises/levelNN/<id>/  starter.py, test_<id>.py, solution.py, exercise.json
sources/registry.json    verified sources (schema in docs/source-registry.md)
static/                  copied as-is into dist/ (fonts, favicon, og image, CNAME, 404.html, robots.txt)
tools/                   build.py, check.py, preview.py, gen_traces.py, exercises_check.py, check_links.py, lint-copy.py
.claude/agents/source-scout.md   the research agent
dist/                    BUILT OUTPUT, git-ignored, deployed by Actions. Never edit by hand.
```

## Platform rules

- Static site on GitHub Pages. Single-page app; navigate with in-app state or the hash, never with paths.
- **Use relative URLs** (`assets/x.css`, not `/assets/x.css`) so the site works both at the domain root and under `/codepix/`. `404.html` is the exception: it inlines everything because it can be served at any depth.
- No tracking and no third-party scripts. Fonts are self-hosted from `static/fonts/`. External links use `target="_blank" rel="noopener noreferrer"`.
- Phone width (400 px) works with no horizontal page scroll; code blocks scroll inside their own panel.
- Honor `prefers-reduced-motion`. `localStorage` may throw: always use the `store` wrapper. The save key is `codepix-save`.
- Toggle visibility with the `hidden` attribute. No `alert`, `confirm`, `prompt` or `window.print`.
- Hand-written JS and SVG art; no libraries. Every interactive element has a `data-hint`.

## Python rules

- Never build an in-browser Python runner, editor or Pyodide integration.
- Every program, output and number shown is produced by running real Python (`gen_traces.py`, `exercises_check.py`).
- Examples must run on **Python 3.9** (the macOS Command Line Tools version, and Brianna's machine) and on the current stable release. No `match`, no `X | Y` type syntax, no other post-3.9 features.
- Never write version numbers or install steps from memory. They come only from `sources/registry.json`.
- macOS is primary and **installs Python with Homebrew** (after Xcode Command Line Tools). Teach `which python3`, because the tools' older `/usr/bin/python3` also exists. Homebrew's Python refuses global `pip install` (externally managed), so the `pip` level starts with `venv`. Windows (python.org installer) and Linux go in collapsible alternates.
- Editor: VS Code. Tests use `unittest` until the `pip`/venv level (13); `pytest` only from there on.

## Content rules

- Audience: an adult beginner who has never programmed, is a visual learner, reads long-form text happily, and wants the real mechanism and vocabulary. Respectful and a little funny. Not a kids' app.
- Copy style (enforced by `tools/lint-copy.py`): no em dashes at all, no "not X but Y" constructions, active voice, short sentences, no stock phrases. Dialogue lines are about 45 words or fewer.
- Analogies are everyday and consistent: computer = very literal helper; variable = labeled box; list = numbered shopping list; dict = filing cabinet; function = recipe card; call stack = tower of recipe cards in progress; loop = conveyor belt; recursion = nested dolls; bit = light switch; module = toolbox drawer; class = blueprint; Big-O = how effort grows as the pile grows.
- All examples are **shop-themed and fictional** (Gadget Gulch Repair & Tinker Shop). No legal-flavored examples.
- Cast: the player `{{you}}`, Dr. Nib (mentor, they/them), Byte (helper robot; never draw a snake or the Python logo), Reader (the interpreter as a tiny runner with a clipboard), Ms. Gridlock (shop owner). They/them when a pronoun is unavoidable.
- Honesty labels: traces are "recorded from real Python; the pictures are a simplified model of memory." JS demos are "a JavaScript demo of the idea, not Python code." Fictional data is marked fictional.
- Citations: APA 7, parenthetical, with a clickable URL. Every cited fact traces to a verified registry entry. Brianna approved using the source-scout's verified picks directly; never cite anything marked unverified. If no source exists, leave the claim out.
- Licenses: site text CC BY 4.0, code MIT.

## Workflow

1. Edit `src/`, `content/`, `exercises/`, `sources/`.
2. `python3 tools/build.py` (writes `dist/`; `--out DIR` builds elsewhere). Must print `JS syntax: OK`.
3. `python3 tools/check.py` must print `ALL GOOD` (Phase 1 onward).
4. `python3 tools/preview.py --open` serves a scratch build locally.

## Known gotchas

- This folder is in `~/Documents`, which iCloud syncs (with Optimize Storage on). GitHub is the source of truth. Local servers started from tools may not be able to read `~/Documents`, so preview and check build into `$TMPDIR/codepix-dist` and serve that.
- Cloudflare's DNS record for `codepix` must stay **DNS only (grey cloud)**, or GitHub cannot issue the HTTPS certificate.
- With an Actions deploy, GitHub ignores `dist/CNAME`. The custom domain set in Settings → Pages is the one that counts; the file stays for clarity.
- From the sibling: boot creates all toy DOM first and then runs every `init()`; toy ids are global. Do not `await UI.openToy()` (its promise resolves on close). Toolbox buttons live in an absolutely positioned `.tbin`. `.stagewrap` is `display:block`. Sprites use `pointer-events:none`, and the hotspot layer sits above the cast. `stopAll()` removes hotspot handlers. In Playwright, end `evaluate` expressions that call promise-returning functions with `0;`. Keep scene detail above y = 520 in the 960x720 art.
