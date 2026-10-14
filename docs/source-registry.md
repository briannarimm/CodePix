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
