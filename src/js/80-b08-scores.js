/* B8. Scorekeeping: accuracy, precision, recall, F1, the confusion matrix, rare classes. */
// TODO(research): no sourced statement about majority-class baselines or human ceilings; the baseline in the exercise is labeled as our own habit.

const B08_GRID = () => `<svg viewBox="0 0 340 220" role="img" aria-label="A two by two confusion matrix">
  <text x="200" y="18" text-anchor="middle" font-size="13" font-weight="700">the machine said</text>
  <text x="140" y="40" text-anchor="middle" font-size="13">yes</text><text x="260" y="40" text-anchor="middle" font-size="13">no</text>
  <text x="18" y="130" text-anchor="middle" font-size="13" font-weight="700" transform="rotate(-90 18 130)">really was</text>
  <text x="56" y="90" text-anchor="middle" font-size="13">yes</text><text x="56" y="170" text-anchor="middle" font-size="13">no</text>
  <rect x="80" y="50" width="120" height="76" fill="#9be34a" stroke="#141414" stroke-width="3"/><text x="140" y="85" text-anchor="middle" font-size="15" font-weight="700">TP</text><text x="140" y="105" text-anchor="middle" font-size="11">caught it</text>
  <rect x="200" y="50" width="120" height="76" fill="#ff6fae" stroke="#141414" stroke-width="3"/><text x="260" y="85" text-anchor="middle" font-size="15" font-weight="700">FN</text><text x="260" y="105" text-anchor="middle" font-size="11">missed it</text>
  <rect x="80" y="126" width="120" height="76" fill="#ffd2a8" stroke="#141414" stroke-width="3"/><text x="140" y="161" text-anchor="middle" font-size="15" font-weight="700">FP</text><text x="140" y="181" text-anchor="middle" font-size="11">false alarm</text>
  <rect x="200" y="126" width="120" height="76" fill="#bfeaea" stroke="#141414" stroke-width="3"/><text x="260" y="161" text-anchor="middle" font-size="15" font-weight="700">TN</text><text x="260" y="181" text-anchor="middle" font-size="11">rightly quiet</text>
</svg>`;

PAGES("b08", [
  {
    h: "Four boxes",
    body: [
      "The Quote Machine now flags urgent tickets. To score it fairly, sort every answer into one of four boxes. A *true positive* (TP) is an urgent ticket it flagged. A *false positive* (FP) is a calm ticket it flagged anyway. A *false negative* (FN) is an urgent ticket it missed. A *true negative* (TN) is a calm ticket it rightly left alone.",
      { fig: B08_GRID, cap: "The four boxes of a two-class [[confusion matrix]]. Our drawing puts *yes* first; scikit-learn's printout puts class 0 first." },
      "Counting the boxes takes one loop. Here the machine judged 12 fictional tickets:",
      { code: "b08_confusion", out: true },
      { trace: "b08_confusion", label: "🔍 Watch each ticket drop into its box" },
      "In scikit-learn's confusion matrix, entry (i, j) counts the examples that are really in group i but were predicted to be in group j. For two classes, `ravel()` unrolls it into tn, fp, fn, tp, in that order [ml-059]. The library agrees with our loop:",
      { out: "b08_sklearn" },
      { honest: "The first three lines of that output come from scikit-learn's own small example, rerun here. The matrix and the last line come from our 12 fictional tickets." },
    ],
  },
  {
    h: "Three scores from four boxes",
    body: [
      "Google defines [[accuracy]] as (TP+TN)/(TP+TN+FP+FN), [[recall]] as TP/(TP+FN), and [[precision]] as TP/(TP+FP) [ml-054]. Jurafsky and Martin give the same definitions of precision and recall in words [ml-057].",
      { table: { head: ["Score", "The question it answers"], rows: [
        ["Accuracy", "Of all the tickets, how many did it get right?"],
        ["Precision", "When it shouted *urgent*, how often was it right?"],
        ["Recall", "Of the truly urgent tickets, how many did it catch?"],
      ] } },
      { analogy: "A smoke alarm. Recall is catching every real fire. Precision is not going off every time someone makes toast. Turn the sensitivity up and recall rises while precision falls. Turn it down and the opposite happens." },
      "To fold the two into one number, scikit-learn uses the F-measure, a weighted harmonic mean of precision and recall; the [[F1 score]] weights them equally [ml-060]. scikit-learn's example with `y_true = [0, 1, 0, 1]` and `y_pred = [0, 1, 0, 0]` gives precision 1.0, recall 0.5 and an F1 printed as 0.66..., which is 2/3 cut short [ml-061]. Our rerun of that example is the first three lines of the output on the previous page.",
      { toy: "confusion", label: "Open the Confusion Board and move the threshold" },
    ],
  },
  {
    h: "When one answer is rare",
    body: [
      "Accuracy has a trap. Google describes a data set where only 1% of examples are positive: a model that always predicts negative scores 99% accuracy and is useless [ml-055]. Jurafsky and Martin's version has 100 tweets about pie among a million, and a classifier that always says *not about pie* reaches 99.99% accuracy while finding nothing [ml-056].",
      "Both numbers are easy to check with a lazy machine that always says no:",
      { code: "b08_rare", out: true },
      "Accuracy is 0.99 and 0.9999, exactly the sources' numbers. Recall is 0.0 both times: the lazy machine caught nothing. When the thing you care about is rare, look at precision and recall.",
      "A habit of ours: before you celebrate a score, work out what the laziest possible machine would get. If yours cannot beat *always give the most common answer*, it has not learned anything useful yet.",
      { honest: "That baseline habit is our own advice. The sources cited on this page support the accuracy trap, and say nothing about baselines." },
    ],
  },
  {
    h: "More than two answers",
    body: [
      "With three or more classes, every class gets its own precision. Two ways to combine them: the *macro* average takes the plain average of the per-class scores, so every class counts the same. The *micro* average pools all the counts first, so big classes count more.",
      "In Jurafsky and Martin's three-class example, macroaveraged precision is .60 and microaveraged precision is .73, and microaveraging is dominated by the most frequent class [ml-058]. Our fictional inbox shows the same pull:",
      { code: "b08_average", out: true },
      "The rare *urgent* class has poor precision, and the macro average feels it. The micro average sits close to the *junk* class, because junk supplies most of the counts. If the rare class matters most to you, the macro average is the more honest summary.",
      { machine: ["b08-scores"], label: "Go to your machine: keep score and beat the lazy machine" },
    ],
  },
]);

GLOSS({
  accuracy: "The share of all answers that were right: (TP+TN)/(TP+TN+FP+FN). [ml-054] It misleads when one class is rare. [ml-055]",
  precision: "Of the examples the model called yes, the share that really were yes: TP/(TP+FP). [ml-057]",
  recall: "Of the examples that really were yes, the share the model caught: TP/(TP+FN). [ml-057]",
  "f1 score": "One number from precision and recall: their harmonic mean, weighting both equally. [ml-060]",
  "confusion matrix": "A table that counts, for each true class, how often each class was predicted. Entry (i, j) is really i, predicted j. [ml-059]",
}, "b08");

TOY("confusion", {
  title: "Confusion Board", level: "b08", color: "var(--grape)", wide: true,
  short: "Move the threshold and watch the four boxes and the scores change.",
  goal: "Catch every urgent ticket (recall 1.00) while keeping precision at 0.50 or better.",
  label: "A JavaScript demo of the idea, not Python code. The 20 tickets and their scores are fictional.",
  html: () => `<svg class="board" viewBox="0 0 340 130" role="img" aria-label="Twenty tickets placed by their urgency score, with the threshold line"></svg>
    <div class="row"><label class="sl">threshold <input type="range" class="th" min="5" max="95" step="5" value="50" data-hint="Move the threshold: tickets at or above it get flagged as urgent" aria-label="Threshold"></label><b class="tv readout">0.50</b></div>
    <div class="cm" role="table" aria-label="Confusion matrix">
      <div></div><div class="hd">said yes</div><div class="hd">said no</div>
      <div class="hd">really yes</div><div class="c tp"></div><div class="c fn"></div>
      <div class="hd">really no</div><div class="c fp"></div><div class="c tn"></div>
    </div>
    <div class="row scores" role="status" aria-live="polite"></div>`,
  init(root, ctx) {
    // urgency scores in percent; u = really urgent (fictional)
    const T = [95, 88, 80, 62, 55, 35].map(s => ({ s, u: true })).concat([90, 70, 60, 50, 45, 40, 30, 28, 25, 20, 15, 10, 8, 5].map(s => ({ s, u: false })));
    const svg = $("svg", root), th = $(".th", root);
    const X = s => 20 + s * 3;
    const f2 = v => (isFinite(v) ? v.toFixed(2) : "0.00");
    const draw = () => {
      const t = +th.value;
      let tp = 0, fp = 0, fn = 0, tn = 0;
      T.forEach(k => { const yes = k.s >= t; if (k.u && yes) tp++; else if (!k.u && yes) fp++; else if (k.u) fn++; else tn++; });
      let s = `<rect x="${X(t)}" y="8" width="${320 - X(t)}" height="104" fill="#ffe45c66"/><line x1="20" x2="320" y1="60" y2="60" stroke="#141414" stroke-width="2"/>
        <line x1="${X(t)}" x2="${X(t)}" y1="4" y2="116" stroke="#ff8a1f" stroke-width="3" stroke-dasharray="6 3"/>
        <text x="22" y="20" font-size="11">urgent</text><text x="22" y="108" font-size="11">calm</text><text x="${Math.min(X(t) + 4, 270)}" y="126" font-size="10" fill="#c2570a">flagged ▶</text>`;
      T.forEach((k, i) => { const y = k.u ? 38 : 82, flagged = k.s >= t; s += `<circle cx="${X(k.s)}" cy="${y + (i % 2 ? 7 : -7)}" r="7" fill="${k.u ? (flagged ? "#9be34a" : "#ff6fae") : (flagged ? "#ffd2a8" : "#bfeaea")}" stroke="#141414" stroke-width="2"/>`; });
      svg.innerHTML = s;
      $(".tv", root).textContent = (t / 100).toFixed(2);
      $(".tp", root).innerHTML = `<b>${tp}</b> TP`; $(".fn", root).innerHTML = `<b>${fn}</b> FN`;
      $(".fp", root).innerHTML = `<b>${fp}</b> FP`; $(".tn", root).innerHTML = `<b>${tn}</b> TN`;
      const acc = (tp + tn) / T.length, pre = tp + fp ? tp / (tp + fp) : 0, rec = tp + fn ? tp / (tp + fn) : 0, f1 = pre + rec ? 2 * pre * rec / (pre + rec) : 0;
      $(".scores", root).innerHTML = [["accuracy", acc], ["precision", pre], ["recall", rec], ["F1", f1]].map(([n, v]) => `<span class="chip">${n} <b>${f2(v)}</b></span>`).join(" ");
      if (rec === 1 && pre >= 0.5) ctx.goalDone();
    };
    th.addEventListener("input", draw);
    draw();
  },
});

LEVEL({
  id: "b08", title: "Scorekeeping", job: "Find out how good the urgent-ticket flag really is.",
  color: "#ff6fae", scene: "bench", cast: ["gridlock"], toy: "confusion",
  sticker: { title: "Scorekeeper", glyph: "F1", color: "#ff6fae" },
  goals: ["Fill the four boxes of a confusion matrix", "Compute accuracy, precision and recall", "Spot the rare-class trap"],
  beats: [
    say("gridlock", "{{you}}, the Quote Machine now flags urgent tickets for me. Byte says it is 75% accurate. Is that good? Do I frame it?", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Seventy-five percent of what, though? A single number hides which mistakes it makes. Missing a smoking toaster and flagging a squeaky hinge are very different mistakes.") },
    say("nib", "We sort every answer into four boxes. Caught it, missed it, false alarm, rightly quiet. True positive, false negative, false positive, true negative. Together they form a [[confusion matrix]]."),
    { show: ["nib", "byte"], ...say("byte", "BEEP. I judged twelve tickets. Count my boxes and be gentle.", "wow") },
    { trace: { program: "b08_confusion", note: "Each pass of the loop adds 1 to exactly one of the four counters." } },
    { predict: { program: "b08_confusion", q: "Byte's answers drop into the four boxes. What do the scores come out as?", choices: ["tp 4 fp 0 fn 0 tn 8\naccuracy 1.0 precision 1.0\nrecall 1.0 f1 1.0", "tp 3 fp 2 fn 1 tn 6\naccuracy 0.75 precision 0.6\nrecall 0.75 f1 0.67", "tp 3 fp 1 fn 2 tn 6\naccuracy 0.75 precision 0.75\nrecall 0.6 f1 0.67"], answer: 1,
      why: "Three urgent tickets caught, one missed, two false alarms. Precision divides by everything flagged (3 + 2); recall divides by everything truly urgent (3 + 1)." } },
    say("nib", "Google's definitions: accuracy is (TP+TN) over everything, recall is TP/(TP+FN), and precision is TP/(TP+FP) [ml-054]. Think of a smoke alarm. Recall catches every fire. Precision stays quiet for toast.", "think"),
    { ask: { q: "Ms. Gridlock hates false alarms most of all. Which score should she watch?", choices: ["Recall", "Precision", "Accuracy"], answer: 1,
      why: "Precision is TP/(TP+FP) [ml-054]. Every false alarm adds to FP and pulls precision down." } },
    say("byte", "Two numbers is one too many for my display. BEEP?"),
    say("nib", "Then use the [[F1 score]]: the harmonic mean of precision and recall, weighting them equally [ml-060]. scikit-learn's own example prints 0.66..., which is two thirds cut short [ml-061]. Our rerun agrees."),
    { toy: "confusion", goal: "Catch every urgent ticket (recall 1.00) while keeping precision at 0.50 or better." },
    { show: ["nib", "gridlock"], ...say("gridlock", "So what if I just built a machine that always says *not urgent*? Urgent tickets are rare. It would hardly ever be wrong.", "think") },
    say("nib", "That is the trap exactly. Google's example: with 1% positives, always saying no scores 99% accuracy and is useless [ml-055]. Let us run it."),
    { predict: { program: "b08_rare", q: "The lazy machine always says no. With 10 urgent tickets in 1,000, and with 100 in a million, what are its accuracy and recall?", choices: ["1% positives:       (0.01, 1.0)\n100 in a million:   (0.0001, 1.0)", "1% positives:       (0.99, 0.0)\n100 in a million:   (0.9999, 0.0)", "1% positives:       (0.5, 0.5)\n100 in a million:   (0.5, 0.5)"], answer: 1,
      why: "Huge accuracy, zero recall. Jurafsky and Martin's pie-tweet example lands on the same 99.99% while finding nothing [ml-056]." } },
    { ask: { q: "A rare-fault detector reports 99.9% accuracy. What should you ask next?", choices: ["Nothing; 99.9% is excellent", "What are its precision and recall on the rare faults?", "How fast does it run?"], answer: 1,
      why: "When one class is rare, accuracy can be high for a machine that finds nothing [ml-055]. Precision and recall look at the rare class directly." } },
    say("nib", "One more wrinkle. With three classes, you can average per-class scores two ways. Jurafsky and Martin's example gets .60 macroaveraged and .73 microaveraged, and the micro average is dominated by the most frequent class [ml-058]."),
    { book: 3, text: "The last book page runs that macro and micro comparison on our own fictional inbox." },
    say("gridlock", "Right. No framing until I see precision and recall. And {{you}}: write the scorekeeper yourself, so I can check Byte."),
    { machine: ["b08-scores"] },
    say("byte", "Precision 0.6, recall 0.75, humility 1.0. BEEP BOOP.", "wow"),
    { sticker: true },
  ],
});
