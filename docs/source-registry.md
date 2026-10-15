# Source registry schema

`sources/registry.json` is a JSON object: `{"sources": [ ... ]}`. Each entry:

| Field | Type | Meaning |
|---|---|---|
| `id` | string | Short stable key used in citations, for example `pydocs-tutorial-intro` |
| `status` | `"verified"` \| `"unverified"` \| `"rejected"` | Only `verified` entries may be cited |
| `apa` | string | The full APA 7 reference, including the URL |
| `cite` | string | The parenthetical form, for example `Python Software Foundation, n.d.` |
| `url` | string | Deep link (with an anchor when one exists) |
| `title` | string | Page or work title |
| `author` | string | Author(s) or organization |
| `site` | string | Site name |
| `date` | string | Publication or revision date as shown, or `n.d.` |
| `license` | string | License name, or `unknown` |
| `licenseUrl` | string | URL of the license, or empty |
| `reuse` | string | Notes on reuse terms (ShareAlike, NonCommercial, "cite and paraphrase only") |
| `accessed` | string | ISO date the agent opened and read the page |
| `levels` | array of int | Levels that cite it (`-1` for site-wide pages) |
| `notes` | string | Why chosen or rejected |

Facts drawn from each source live in `docs/source-notes.md` (fact, source id, location, confidence).


## Current files (supersedes the field list above where they differ)

- `sources/build_registry.py` writes `sources/registry.json`. Extra fields: `pdf` / `text` (how to read the URL).
- `sources/build_facts.py` writes `sources/facts.json`. Each fact: `id` (py-001, ml-001, ...), `src`, `anchor`, `claim` (our paraphrase, the only thing a lesson may say), `check` (strings that must appear in the source), `mod`.
- `tools/verify_facts.py`, `tools/check_numbers.py`, `tools/check_lessons.py` check them. `docs/source-notes.md` and `docs/source-candidates.md` are generated and must not be edited by hand.

## Fields added 2026-10-15

- `mirror` (registry): raw URL of the publisher's own source file for the same page, for example the `.rst` file in `python/cpython` (branch `3.15`) that docs.python.org/3/ is built from, the `.asc` chapter in `progit/progit2`, or PyPI's JSON for one release. `tools/verify_facts.py` reads it only when the page itself cannot be fetched, strips light markup, and labels the result "read via mirror". The page `url` stays the citation link.
- `prefer_mirror` (registry): read the mirror first. Used for PyPI project pages, which send a bot challenge to scripts.
- `pending` (fact): the fact was taken from a page that could be opened only through a summarizing fetch tool, never as raw text. Facts on sources whose `status` is not `verified` are pending too. `tools/verify_facts.py` lists them as PENDING and skips them; `tools/check_lessons.py` fails if a lesson cites one. To promote: run `python3 tools/verify_facts.py --pending` on a machine that can reach the source, read `--audit`, then set the source to `verified` (or drop the flag).
- `tools/check_links.py` requests every page URL and mirror (HEAD, then GET), one request per host per second, with a `CodePixLinkCheck/1.0` User-Agent. It exits 1 on a dead link of a verified source, and 2 when verified URLs get no HTTP answer at all (pass `--allow-unreachable` in a sandbox). `--quiet` prints only problems.
