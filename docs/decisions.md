# Decisions

Answers Brianna gave to the open questions in `handoff.md` section 12, on 2026-10-14.

| Topic | Decision | Notes |
|---|---|---|
| Domain | `codepix.briannaimm.com` | Spelled without the "r". The GitHub account is `briannarimm`. |
| DNS | Cloudflare | The CNAME must be DNS only (grey cloud) so GitHub can issue the HTTPS certificate. |
| Repository | `briannarimm/codepix`, public | Free GitHub Pages needs a public repo. |
| Local folder | `~/Documents/Programming/codepix` | iCloud syncs Documents. Brianna accepted the risk. Previews build into a scratch folder. |
| Audience | As in the handoff | Adult beginner, visual learner, long-form reader, wants real vocabulary. |
| Operating systems | macOS primary; Windows and Linux in collapsible alternates | |
| macOS Python install | Homebrew | Needs Xcode Command Line Tools first. Teach `which python3`. Homebrew Python blocks global pip, so venv comes first in Level 13. |
| Editor | Visual Studio Code | |
| Exercise delivery | A zip per level, single-file links, and the repo | |
| Scope | All levels 0 to 17 plus the git bonus | Brianna reviews after Level 4. |
| Source approval | Use the source-scout's verified picks directly | Brianna may review the registry later. Unverified items are never cited. |
| Capstone templates | Shop inventory tracker, quiz game | Text adventure and turtle art dropped. |
| Legal-flavored examples | No | Everything is shop-themed. |
| Licenses | CC BY 4.0 for text, MIT for code | |
| Analytics | None | |
| Skin | Pegboard workshop, tangerine and teal, lime for "passed" | Checkerboard stays on the title screen. |
| Turtle | Optional lesson after Level 6 | Recorded replay; per-OS Tk notes from sources. |

## Added 2026-10-14: second module

| Topic | Decision | Notes |
|---|---|---|
| Structure | Two modules. Module A (Intro to CS and Python) unlocks Module B (Intro to Machine Learning). | Unlock rule still to be confirmed (see research-summary.md). |
| Research first | Content and accuracy work comes before the app build. | Lesson plans cite fact IDs from the verified ledger. |
| Sources for Module B | The GeeksforGeeks page Brianna supplied, plus Google's course, scikit-learn docs, J&M 3rd-edition draft and others found by research. | GeeksforGeeks is for private use only and is cross-checked. |
| Private use | The app is for private use only (Brianna, 2026-10-14). | Public-launch decisions in the handoff (license, sources) are on hold; revisit before any public release. |
| Sibling project path | `~/Documents/Programming/ai-pix-explorer/` | Moved out of Google Drive. |

## Changed 2026-10-14 (later): address

| Topic | Decision | Notes |
|---|---|---|
| Address | `https://www.briannaimm.com/CodePix/` | Replaces `codepix.briannaimm.com`. Needs the user-site repo named `briannarimm.github.io`; see docs/deploy.md. |
| Repository visibility | Public, private use only | Needed for free Pages. |
