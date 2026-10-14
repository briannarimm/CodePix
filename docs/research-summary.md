# Research summary (2026-10-14)

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

What the checks cannot prove: that a check string is on the page does not prove the whole claim is right. That is why the audit read-through was done by hand, and why claims are worded as narrowly as their evidence.

Rules for lessons: uncited text must be our own explanation or analogy (marked with a diamond), not a fact about the outside world. Numbers and outputs come from running real Python. Anything unsourced is marked GAP and must not be written up.

## Mistakes found and fixed during research

Recording these so the same traps are avoided later.

1. **Page summaries invented details.** The fetch tool's page summaries are written by a small model. Several "facts" in them were not on the page: a 70/15/15 data split from the Google crash course (the text has no percentages), `tel.get` wording, a `ms-python.python` extension ID, and "six iterations" attached to the wrong number. All were removed or reworded against the raw text.
2. **A check string can match the wrong place.** Two J&M 2007 facts first matched only in the bibliography, and several matched only in navigation menus. The audit mode exposed this; those facts now use phrases that occur only in the right passage.
3. **scikit-learn prints F1 as `0.66...`.** The true value is 2/3 (0.667). The page's doctest truncates. The claim says so.
4. **J&M's multi-feature housing example is nonsense.** With the draft's weights it predicts a negative price (-24,500). We do not reuse it. The single-feature example (slope -4900, intercept 16550) is correct.
5. **Automate the Boring Stuff does not explain how to read a traceback.** The Python tutorial explains the last line, so that is the source.
6. **My earlier memory of Python's origin was wrong.** The Python docs say it was created "in the early 1990s" at CWI, not the late 1980s.
7. **The default text encoding differs by version.** The 3.15 tutorial says UTF-8; the 3.9 docs say it was platform dependent. Every `open()` in the book will name its encoding.
8. **Homebrew's Python really is externally managed.** I first assumed it. It is now confirmed from Homebrew's own formula file (`python@3.14.rb` and `python@3.15.rb`), which writes the marker and an error message pointing to virtual environments.

## Facts about Python versions that change plans

- python.org lists Python **3.15.0** as the latest release when read [py-009].
- Python **3.9** reached end-of-life on 2025-10-31 [py-010], and **3.10** on 2026-10-01 [py-011]. Your Mac's built-in 3.9.6 is therefore unsupported.
- scikit-learn 1.7 **requires Python 3.10 or newer** [ml-016].

## Decisions I need from you

1. **Python version floor for Module A.** Options: (a) examples run on 3.9 and the current release (what the handoff says; costs little and covers anyone with Apple's built-in Python); (b) floor at 3.11, the oldest still supported. I recommend (a) for A, because the examples are basic. Module B floor is 3.10 or newer regardless.
2. **How Module B unlocks.** My proposal: finishing the A17 capstone (certificate) unlocks B. Alternatives: unlock after A13 (once venv and pip are learned), or a soft lock (B visible, with a warning). Which?
3. **Module B scope.** I planned 17 levels (B0 to B16) plus a history level. Cut candidates if you want it shorter: B9 (kNN, trees, naive Bayes), B11 (text features), B14 (other kinds of learning). Keep or cut?
4. **Using the GeeksforGeeks page.** You said it is for private use, and I treated it that way: it appears in only five facts, each cross-checked against Google's course. If the site ever goes public, GfG's terms say "all rights reserved", so those five facts would need to be re-based on the other sources. Is that acceptable?
5. **Use of the 2007 J&M draft.** It is the oldest source and predates neural networks. I used it for classical ideas (regression, odds, n-grams, naive Bayes, evaluation, history) and used the 2026 third-edition draft for modern ideas. OK?
7. **Is the site still public?** You said the app is for private use only. The handoff planned a public GitHub Pages site at codepix.briannaimm.com. I have not changed the build plan, but the public repo, domain, CC BY license and the GfG question all depend on this. Public, or private (for example a private repo or a local build)?
6. **Story frame for Module B.** I proposed a "Learning Bench" and a "Quote Machine" in the shop, with the same cast. Want a new character for the learning machine, or keep the cast as is?

## Gaps (not sourced yet; nothing may be written about these)

Python module:
- A formal definition of "program" and "computer" (we use our own plain definitions, flagged as uncited).
- Windows terminal commands and a step-by-step Windows install; Linux install commands (`apt`, `dnf`).
- IndentationError and "permission denied" for the troubleshooting page.
- A sentence defining `int` and `float` (the tutorial shows them but the ledger has no fact yet).
- Installing git on macOS and creating a GitHub account.
- General computing history beyond Fortran and Python.
- Which small pure-Python package to use in A13.

Machine learning module:
- Backpropagation mechanics (J&M 3rd ed. section 6.6 not read).
- Google's embeddings, LLM, and hyperparameter (learning rate) pages, and the matplotlib `savefig` API.
- Random forests and support vector machines: sources only name them.
- Semi-supervised learning: one source only (GeeksforGeeks).
- Which Python the current scikit-learn (1.9.x) requires; the install page text we read stops at 1.7.
- Turing (1950) itself has no open full text we could find, so only J&M's description is cited. Runestone's algorithms book was blocked (HTTP 403) and Dive into Deep Learning was only skimmed, so neither is cited.

## Source health

- 82 sources are in the registry: 79 `verified`, 2 `unverified` (Turing 1950, Dive into Deep Learning) and 1 `rejected` (Runestone, HTTP 403). No fact rests on an unverified or rejected source. See [source-candidates.md](source-candidates.md).
- Licenses that restrict reuse: Missing Semester, CS50 notes, Think Python, Automate the Boring Stuff, Pro Git are **NonCommercial and ShareAlike**. We only cite and paraphrase them, never copy text or examples. Google's content is CC BY 4.0 (attribute Google). scikit-learn, NumPy, pandas are BSD.
- `tools/check_links.py` is still to be written (handoff section 9.4); `verify_facts.py` already reports each source's HTTP status.
- The 2007 J&M PDF was moved out of Downloads during the session. Its extracted text is kept in `sources/local/jm2-2007.txt`, which is git-ignored because the book is copyrighted. Do not commit it.

## Environment note

The project folders `opac`, `ai-pix-explorer` and `law-review-article` are no longer under the Google Drive path; `ai-pix-explorer` is now in `~/Documents/Programming/`. CLAUDE.md has been updated with that path.

## Next steps (after your decisions)

1. Close the highest-value gaps (Windows/Linux install, int/float sentence, git install, A13 package, embeddings page).
2. Write `tools/check_links.py` and a CI job that runs all four checks.
3. Resume the build plan at Phase 0 (repository, build script, Pages workflow) with the two-module structure.
