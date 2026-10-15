# Pedagogy notes: Module B (machine learning)

Research leads from Brianna's CSV (2026-10-15), checked by the Module B research pass. Only open-access papers can be cited, and only after their full text has been read. Fact IDs refer to `sources/facts.json`.

## Practical machine learning: A beginner's guide with ethical insights (Nyamawe et al., 2025)

- Source: `nyamawe-2025-pml`, https://doi.org/10.1201/9781003486817 (Chapman and Hall/CRC, open access, CC BY-NC-ND 4.0).
- What we could read: the book description and the learning objectives of chapter 6, "Responsible AI and explainable AI", on taylorfrancis.com. The full text could not be read from the research sandbox (the OAPEN PDF is blocked for the fetch tool by robots.txt, and the Taylor & Francis PDF download returned an error). The source is marked unverified.
- What it says (description only): the book puts responsible and explainable AI into machine learning models as a priority from the start, instead of an afterthought [ml-188, pending].
- What Code Pix does because of it: nothing yet. The idea matches Module B's plan to discuss fairness inside the levels (B15) and not as a closing appendix. Before the book cites this text, someone with network access must read the full text and confirm ml-188, then add facts from chapter 6 (responsible AI, explainable AI, transparency, fairness, accountability).

## Teaching reform of machine learning courses based on a multi-stage cognitive advancement framework (Zhao et al., 2025)

- Source: `zhao-2025-procs`, https://doi.org/10.1016/j.procs.2025.04.080 (Procedia Computer Science, 259, 1249-1258; CC BY-NC-ND 4.0 per Crossref).
- What we could read: nothing beyond the Crossref record. ScienceDirect is blocked for the fetch tool, the Elsevier text API returned an error, and doi.org rate-limited the sandbox.
- What Code Pix does because of it: no claim is made. The "About: how Code Pix teaches" page gets no fact from this paper until its full text is read. Module B's order (theory, then practice, then projects) stays our own design choice and is described as such.

## Computer vision needs a core and foundations (2012)

- Source: `imavis-2012-cv-core`, https://doi.org/10.1016/j.imavis.2011.12.013 (Image and Vision Computing).
- What we could read: nothing. Its access status could not be confirmed, so it is not used.

## Sources Module B now leans on for teaching choices

These are the verified sources behind teaching decisions in the module, for the About page:

- Split sizes: Google gives an 80-20 split as an example and says there are no percentage requirements [ml-152, ml-153]; scikit-learn's train_test_split defaults to a test size of 0.25 [ml-156]. B7 can show these as examples and keep the three roles (training, validation, test) as the lesson.
- Fairness: Google's per-type bias definitions [ml-176 to ml-182] and two simple fairness metrics, demographic parity and equality of opportunity, each with its drawback [ml-183 to ml-187].
