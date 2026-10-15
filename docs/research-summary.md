# Research summary (2026-10-14, updated 2026-10-15)

Phase: content and accuracy research for two modules. No app code written.

- Module A: Intro to CS and Python. Plan: [lessons/module-a-cs-python.md](lessons/module-a-cs-python.md)
- Module B: Intro to Machine Learning, unlocked by finishing Module A. Plan: [lessons/module-b-machine-learning.md](lessons/module-b-machine-learning.md)
- Every cited fact: [source-notes.md](source-notes.md). Every source with license: [source-candidates.md](source-candidates.md).

## How accuracy is enforced

A claim reaches a lesson only by passing four automatic checks. All four pass today.

| Check | What it proves | Command |
|---|---|---|
| Fact ledger | Each fact (`sources/facts.json`) names a source and a location, and every one of its check strings appears in the raw text of that source (web page, PDF, or saved text). | `python3 tools/verify_facts.py` |
| Audit mode | Prints each claim next to the source text around its strongest check string, so a human can read the two together. I read all of them this way and rewrote roughly 80 claims or check strings that said more than the source did or matched in the wrong place. | `python3 tools/verify_facts.py --audit` |
| Number check | Recomputes every number a lesson quotes with real Python (37 numbers). | `python3 tools/check_numbers.py` |
| Lesson check | Every `[py-nnn]` / `[ml-nnn]` tag exists, and the code terms and numbers in each tagged sentence are covered by the facts it cites. | `python3 tools/check_lessons.py` |

Added 2026-10-15:

| Check | What it proves | Command |
|---|---|---|
| Mirrors | When a page cannot be fetched, the checker reads the publisher's own source file for it (for example the `.rst` in `python/cpython` branch 3.15, the `.asc` in `progit/progit2`, PyPI's JSON for one release) and says so in its output. | `python3 tools/verify_facts.py` |
| Pending facts | Facts taken from pages that could only be read through the summarizing fetch tool are flagged pending. The verifier skips them and the lesson check refuses to let a lesson cite them. | `python3 tools/verify_facts.py --pending` (on a networked machine) |
| Link check | Every page URL and mirror answers. Exit 1 on a dead verified link. | `python3 tools/check_links.py --quiet` |

What the checks cannot prove: that a check string is on the page does not prove the whole claim is right. That is why the audit read-through was done by hand, and why claims are worded as narrowly as their evidence.

Rules for lessons: uncited text must be our own explanation or analogy (marked with a diamond), not a fact about the outside world. Numbers and outputs come from running real Python. Anything unsourced is marked GAP and must not be written up.

## Mistakes found and fixed during research

Recording these so the same traps are avoided later.

1. **Page summaries invented details.** The fetch tool's page summaries are written by a small model. Several "facts" in them were not on the page: a 70/15/15 data split from the Google crash course (the text has no percentages), `tel.get` wording, a `ms-python.python` extension ID, and "six iterations" attached to the wrong number. All were removed or reworded against the raw text.
2. **A check string can match the wrong place.** Several facts first matched only in a bibliography or in navigation menus. The audit mode exposed this; those facts now use phrases that occur only in the right passage.
3. **scikit-learn prints F1 as `0.66...`.** The true value is 2/3 (0.667). The page's doctest truncates. The claim says so.
5. **Automate the Boring Stuff does not explain how to read a traceback.** The Python tutorial explains the last line, so that is the source.
6. **My earlier memory of Python's origin was wrong.** The Python docs say it was created "in the early 1990s" at CWI, not the late 1980s.
7. **The default text encoding differs by version.** The 3.15 tutorial says UTF-8; the 3.9 docs say it was platform dependent. Every `open()` in the book will name its encoding.
8. **Homebrew's Python really is externally managed.** I first assumed it. It is now confirmed from Homebrew's own formula file (`python@3.14.rb` and `python@3.15.rb`), which writes the marker and an error message pointing to virtual environments.

9. **The fetch tool invented sign-up steps again.** For GitHub's "Creating an account" page it reported "Navigate to github.com" and "Click Sign up". The source file says "Navigate to https://github.com/signup". The ledger uses only the source text, and the book will link to GitHub's page for the steps.
10. **docs.python.org moved pages in 3.15.** Built-in functions, types and exceptions now live under `/3/builtins/`. The old `/3/library/...` URLs still serve the pages, but the registry entries for functions and stdtypes should move to the new paths when next edited.
11. **PyPI project pages send a JavaScript challenge to scripts.** The PyPI JSON API for the same release is used as the checkable text.
12. **This sandbox could not reach most source hosts.** The network policy refused curl tunnels to everything except GitHub and PyPI (`check_links.py` reports 0 dead links, 119 unreachable). Pages were opened with the fetch tool to confirm they load, and facts were checked against the publishers' source files.

## Facts about Python versions that change plans

- python.org lists Python **3.15.0** as the latest release when read [py-009].
- Python **3.9** reached end-of-life on 2025-10-31 [py-010], and **3.10** on 2026-10-01 [py-011]. Your Mac's built-in 3.9.6 is therefore unsupported.
- scikit-learn 1.7 **requires Python 3.10 or newer** [ml-016].
- New on 2026-10-15: PyPI lists **scikit-learn 1.9.1 as requiring Python 3.11 or newer** [ml-108], **NumPy 2.5.4 as requiring 3.12 or newer** [ml-109], and pandas 3.0.6 and Matplotlib 3.11.2 as requiring 3.11 or newer [ml-110] [ml-111]. All four publish CPython 3.15 wheels for Apple silicon Macs. CLAUDE.md still says Module B needs 3.10; that line needs updating (I did not edit CLAUDE.md).

## Decisions I need from you

0. **New: Module B's Python floor.** The current libraries need 3.11 (scikit-learn, pandas, Matplotlib) and 3.12 (NumPy). I recommend asking for the current release (3.15) and stating 3.12 as the floor.

1. **Python version floor for Module A.** Options: (a) examples run on 3.9 and the current release (what the handoff says; costs little and covers anyone with Apple's built-in Python); (b) floor at 3.11, the oldest still supported. I recommend (a) for A, because the examples are basic. Module B floor is 3.10 or newer regardless.
2. **How Module B unlocks.** My proposal: finishing the A17 capstone (certificate) unlocks B. Alternatives: unlock after A13 (once venv and pip are learned), or a soft lock (B visible, with a warning). Which?
3. **Module B scope.** I planned 17 levels (B0 to B16) plus a history level. Cut candidates if you want it shorter: B9 (kNN, trees, naive Bayes), B11 (text features), B14 (other kinds of learning). Keep or cut?
4. **Using the GeeksforGeeks page.** It appears in only five facts, each cross-checked against Google's course, and its terms say "all rights reserved", so we cite and paraphrase it only.
7. **Is the site still public?** You said the app is for private use only. The handoff planned a public GitHub Pages site at codepix.briannaimm.com. I have not changed the build plan, but the public repo, domain, CC BY license and the GfG question all depend on this. Public, or private (for example a private repo or a local build)?
6. **Story frame for Module B.** I proposed a "Learning Bench" and a "Quote Machine" in the shop, with the same cast. Want a new character for the learning machine, or keep the cast as is?

## Gaps closed on 2026-10-15

Python module (facts py-166 to py-228):
- Definitions of computer and program (OpenStax) [py-187], algorithm (Miller and Ranum, Runestone) [py-189], library and syntax [py-188], high-level language [py-190].
- Windows: PowerShell, its compatibility aliases and paths [py-166] to [py-171]; the Python install manager, commands, `python3` caveat and troubleshooting [py-172] to [py-179]; venv activation on Windows and the execution policy [py-178] [py-180] to [py-182]; VS Code on Windows [py-227] [py-228].
- Linux: `apt` and `dnf` commands from the Packaging User Guide (page last reviewed 2021-07-26) [py-183] to [py-185]; IDLE [py-186].
- `int` and `float` [py-192] [py-193].
- Reading errors and tracebacks (OpenStax) [py-194] [py-195]; IndentationError and TabError [py-196] [py-197]; PermissionError, FileNotFoundError, ModuleNotFoundError, IndexError, ValueError [py-198] to [py-201]; "permission denied" in the shell [py-202] to [py-204]. The Troubleshooting section of the Module A plan uses them.
- A13 package: **texttable 1.7.1** (MIT, about 11 KB, no required dependencies, plain-text output) [py-205] [py-206]; backup colorama 0.4.6 [py-207]. The scout ran a fictional parts table on Python 3.9.25 and 3.15.0b4 (uv had no 3.15.0 final yet) with identical output.
- Git: install on macOS, Linux and Windows, identity, `git init`, remotes and push [py-208] to [py-214]; GitHub account and first repository [py-215] [py-216].
- Time machine: Python's start in 1989 and USENET post in 1991 [py-217], the name [py-218], Version 0.9.0 [py-219], Grace Hopper [py-220], Git in 2005 [py-221].

Machine learning module (facts ml-108 to ml-136):
- Python needed by the current scikit-learn, NumPy, pandas, Matplotlib [ml-108] to [ml-111].
- `savefig` [ml-112]; classifier versus regressor [ml-113]; learning rate and hyperparameters [ml-114] to [ml-116]; majority-class baseline [ml-118].
- Random forests and ensembles [ml-119] to [ml-121]; support vector machines [ml-122] to [ml-124].
- Backpropagation [ml-125] to [ml-127]; word embeddings and cosine similarity [ml-128] [ml-129]; decoder-only transformers, next-token targets, in-context learning [ml-130] to [ml-132].
- A second, independent source for semi-supervised learning [ml-135] [ml-136].

## Gaps still open (nothing may be written about these)

- **Pending, researched but not citable** (pages opened with the fetch tool; raw text unreachable from the research sandbox): Ada Lovelace's 1843 Notes (Computer History Museum, MacTutor) [py-222] [py-223]; ENIAC 1946 (IEEE milestone) [py-224]; Grace Hopper's A-0 compiler and COBOL (Yale) [py-225]; CS50's definition of algorithm [py-226]; Google's hyperparameters, embeddings and LLM pages [ml-117] [ml-133] [ml-134]. To promote: `python3 tools/verify_facts.py --pending` on a networked machine, read `--audit`, then mark the source verified.
- A walk-through of a multi-frame traceback from top to bottom.
- One-sentence definitions of `bool` and `None`.
- Authentication for `git push` to GitHub (HTTPS token or SSH key); link to GitHub's docs instead.
- Exact Homebrew step for `turtle` on the Python version a learner installed (needs a clean Mac).
- Human-level ceilings for B8; attention mechanics for B13; a worked line fit with a published answer for B4.
- Turing (1950) open full text; Lovelace's Notes as a primary source (Project Gutenberg eBook 75107 found, not read to Note G).

## Source health

- 126 sources are in the registry: 115 `verified`, 10 `unverified` and 1 `rejected` (Runestone's Big-O page, HTTP 403; its "What is computer science?" page is now verified through the book's source). No citable fact rests on an unverified or rejected source; `check_lessons.py` enforces this. See [source-candidates.md](source-candidates.md), which now ends with a level-by-level table of primary and backup picks.
- 45 sources were added on 2026-10-15. 86 sources have a mirror.
- In the research sandbox, 253 of 334 non-pending facts verified. The other 81 are older facts. 72 rest on hosts the sandbox could not reach (Google, Jurafsky and Martin, CS50, GeeksforGeeks, Apple, IBM, Homebrew formula pages, python.org, the devguide, the two history PDFs), and 9 match the live page but not the mirror's markup (for example Sphinx section numbers). They passed on 2026-10-14 with network access. Run `python3 tools/verify_facts.py --fresh` on a networked machine to confirm.
- `tools/check_links.py` (new): 0 dead links. 93 URLs answered (all mirrors and PyPI); 119 got no answer because the proxy refused the tunnel.
- Licenses that restrict reuse: Missing Semester, CS50 notes, Think Python, Automate the Boring Stuff, Pro Git, **OpenStax Introduction to Python Programming** and **Runestone's pythonds** are NonCommercial and ShareAlike; **Dive into Deep Learning** is ShareAlike. We only cite and paraphrase them. Google, GitHub Docs and Microsoft's PowerShell docs are CC BY 4.0 (attribute them). scikit-learn, NumPy, pandas are BSD; texttable is MIT.

## Environment note

The project folders `opac`, `ai-pix-explorer` and `law-review-article` are no longer under the Google Drive path; `ai-pix-explorer` is now in `~/Documents/Programming/`. CLAUDE.md has been updated with that path.

## Next steps (after your decisions)

1. Run `verify_facts.py --fresh` and `--pending` on a networked machine; promote the pending history and Google facts that pass.
2. Add a CI job that runs the research checks and a monthly `check_links.py` (handoff 9.4).
3. Resume the build plan at Phase 0 (repository, build script, Pages workflow) with the two-module structure.
