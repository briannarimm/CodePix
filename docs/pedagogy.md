# How Code Pix teaches: the research behind it

Source notes for the "About: how Code Pix teaches" page. The leads came from Brianna's CSV of CS-education papers. Only papers with a free full text are used. Fact IDs point into `sources/facts.json`; the page may say no more than those facts say.

**Status 2026-10-15:** the networked source check could not read either paper (the IPB PDF came back truncated and Swarthmore Works answered 403), so both sources are `unverified` and py-269 to py-276 are pending and not citable. The About page makes no research claims until an open copy that CI can read is found.

## Gomes et al. (2026), introductory programming at top universities

Journal of Computer Languages, 86, 101384. https://doi.org/10.1016/j.cola.2025.101384. Open access, CC BY 4.0. Read from the open copy in the IPB repository (registry id `gomes-2026-intro-programming`).

What it found:
- Python is the most common CS1 language (32.5 percent) across 150 CS1 and CS2 courses at 83 universities [py-269].
- Almost all CS1 courses teach imperative programming first. Object-oriented programming usually arrives near the middle or end of CS1, and CS2 is mostly object-oriented [py-270].
- Exams carry the most weight, but projects and labs are widely used, and quizzes are emerging as formative tools [py-271].
- AI policies range from complete prohibition to active encouragement. The authors say teachers must give students clear guidelines on AI use [py-272].

What Code Pix does because of it (writers: confirm each line against the built levels before the About page says it):
- Teaches Python.
- Starts with variables, branches, loops and functions. Classes come late in Module A.
- Each level has a hands-on exercise with tests (a lab), checks along the way (quizzes) and a showcase project.
- States its AI policy plainly on the About page.

## Newhall, Webb, Chaganti and Danner (2025), CS 31 at Swarthmore

Journal of Parallel and Distributed Computing, 199, 105044. https://doi.org/10.1016/j.jpdc.2025.105044. Open access, CC BY-NC-ND 4.0 (cite and paraphrase only). Read from the open copy in Swarthmore Works (registry id `newhall-2025-cs31`).

What it found:
- The course serves students with only a CS1 background. It mixes lectures with small-group active learning and uses peer instruction [py-273].
- It holds daily graded reading quizzes, and students do every lab in pairs [py-274].
- Homework asks students to draw the stack during execution, and a visualizer steps through code one instruction at a time [py-275].
- After the course was added, the authors saw a substantial change in students' preparedness and comfort in later courses [py-276].

What Code Pix does because of it (writers: confirm each line against the built levels before the About page says it):
- Uses short checks between explanations.
- Draws memory and the call stack, and steps through recorded traces one line at a time.
- Asks the learner to predict and sketch before running code.

## Not used: the Nigerian unplugged study (2024)

Thinking Skills and Creativity, https://doi.org/10.1016/j.tsc.2023.101458 (registry id `tsc-2024-unplugged`, status unverified). The full text could not be read: ScienceDirect refuses the fetch tool, and no open repository copy turned up. Until someone reads it, the About page makes no research claim about unplugged activities. Code Pix still opens with unplugged scenes as its own design choice.
