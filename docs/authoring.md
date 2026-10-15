# Authoring guide: levels, book pages, toys and exercises

Read `CLAUDE.md` first (the content, accuracy and Python rules apply to everything here). `src/js/70-a03-boxes.js` is the exemplar level: copy its shape.

## Files you own per level

| What | Where | Notes |
|---|---|---|
| Level, book pages, glossary, trace toys | `src/js/70-aNN-slug.js` (Module A), `src/js/80-bNN-slug.js` (Module B) | one file per level; `a06b`, `abonus`, `bbonus` for the extras |
| Hand-written JS toys | in the level file, or `src/js/56-toy-<name>.js` if large | toy ids are global: use the id you were assigned |
| Toy CSS | `src/css/5x-toy-<name>.css`, every rule prefixed with `.toy-<id>` | |
| Example programs | `content/programs/<level>_<slug>.py` (e.g. `a06_fizz.py`) | the only source for code the book shows |
| Data files for programs | `content/programs/data/` | fictional only; shared folder, so prefix names with the level (`a11_parts.csv`) |
| Exercises | `exercises/<level>/<slug>/` | see below |
| Time machine | `EVENTS([{year, when?, text, level}])` in the level file | cited facts only |

## Registration API (all global, from `src/js/00-core.js`)

```js
PAGES("a03", [ {h: "Page title", body: [blocks...]}, ... ]);   // the chapter
GLOSS({ term: "definition with [py-043] citation" }, "a03");   // glossary words used as [[term]]
TRACETOY("memshelf", {title, level, short, goal, programs: [["a03_boxes", "label"], ...], notes: {}});
TOY("bitboard", {title, level, short, goal, color, label: "A JavaScript demo of the idea, not Python code.",
  html: () => "<div>...</div>", init(root, ctx, opts) { ... ctx.goalDone(); }});
EVENTS([{ year: 1991, when: "1991", text: "... [py-0xx]", level: "a01" }]);
LEVEL({ id, title, job, color, scene, cast, toy, sticker: {title, glyph, color}, goals, beats: [...] });
```

Beats, blocks and rich-text markup are documented at the top of `src/js/30-engine.js`, `src/js/41-blocks.js` and `src/js/10-refs.js`. Dialogue helpers: `say("nib", "text", "think")`, `nar("text")`. Cast ids: `nib`, `byte`, `reader`, `gridlock`. Scenes: `shop`, `office` (the back-office computer), `bench` (Module B's Learning Bench), `showcase` (capstones).

A level is about 15 to 30 beats: a story setup, two or three explanations, a `predict` or two, at least one `trace` (Module A) or recorded output, two or three `ask` checks, a `book` beat, a `machine` beat with the level's exercises, the toy, and `{sticker: true}` at the end.

A chapter is 3 to 6 pages. Each page: short paragraphs, cited sentences, at least one recorded program or figure, an analogy box where the house analogy applies.

## Accuracy (non-negotiable)

- A sentence that states a fact about Python, a tool, a library or history carries a fact ID (`[py-043]`) and says **no more than that fact's `claim`** in `sources/facts.json`. Look the claim up before you cite it.
- Uncited sentences are our own explanation, story or analogy. They must not state outside facts. When unsure, cite or cut.
- Every program and every output comes from `content/programs/` and is recorded by real Python at build time. Never type an output by hand. `predict` choices are checked against the real output by `tools/check.py`.
- `{snippet}` is only for fragments that are not whole programs (a syntax shape, a line of a config). Prefer a real program.
- Install steps and version numbers only from facts. If a topic is a GAP in the lesson plan, leave it out or say plainly that it is not covered yet; add `// TODO(research): <what is missing>` in the level file.
- Every `open()` names `encoding="utf-8"`. Module A programs must run on Python 3.9 (no `match`, no `X | Y` types, no other post-3.9 syntax). Module B programs start with `# codepix: py=3.12` and usually `# codepix: output-only` and `# codepix: needs=numpy,sklearn`.

## Copy rules (enforced by `tools/lint-copy.py`)

No em dashes. No "not X but Y". Active voice, short sentences, no stock phrases. Dialogue lines about 45 words or fewer. Respectful and a little funny; the learner is an adult. Analogies stay consistent (CLAUDE.md lists them). Everything is shop-themed and fictional. They/them when a pronoun is unavoidable. Never draw a snake or the Python logo.

## Exercises

`exercises/<level>/<slug>/` holds `exercise.json`, `starter.py`, `solution.py`, `test_<slug>.py` and any data files. `exercise.json` fields: `id` (`a06-fizz`), `level`, `title`, `file` (the name the learner saves, e.g. `fizz.py`), `kind` (`test` | `predict` | `explore`), `prompt` (rich text, paragraphs split by a blank line), `run_command` (`python3 -m unittest test_fizz.py`; `pytest` only from a13), `expected_output` (or omit), `hints` (three steps, nudge to near-solution), `explain_after` (rich text, cited where it states facts), `concepts`, optional `py` ("3.12" for Module B).

Tests import or exec the learner's file by its `file` name. Starters must fail at least one test; solutions must pass. Keep early programs under about 15 lines.

## Checks to run before you hand back

```
CODEPIX_PYTHON=/home/claude/mlenv/bin/python python3 tools/build.py --out /tmp/cp-$LEVEL   # prints JS syntax: OK
python3 tools/lint-copy.py src/js/70-aNN-*.js                                                # your files
python3 tools/exercises_check.py --python python3 python3.9 --only <ids>                    # Module A: both
CODEPIX_PYTHON=/home/claude/mlenv/bin/python python3 tools/exercises_check.py --only <ids>  # Module B
python3 tools/gen_traces.py --verify-with python3.9                                          # Module A programs on 3.9
python3 tools/check.py --dist /tmp/cp-$LEVEL --only a06,a06b --shots /tmp/shots-$LEVEL      # ALL GOOD
```

Look at your screenshots (1280 px and 400 px) before calling a level done.
