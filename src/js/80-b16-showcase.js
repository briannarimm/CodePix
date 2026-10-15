/* B16. Saturday Showcase (Module B capstone): a model report on fictional repair data. Toy: modelreport (Card Maker).
   Finishing b16 shows the Learning Bench Certificate (40-ui.js). */
// TODO(research): no sourced rule of thumb for split percentages (GAP in the lesson plan); the library program
// copies scikit-learn's own example (test_size=0.4, random_state=0) [ml-103] and the book says so.

PAGES("b16", [
  {
    h: "The Showcase brief",
    body: [
      "It is Saturday again, and the Learning Bench is on show. Ms. Gridlock's brief fits on a sticky note: *Will this ticket be a big job, costing 150 or more? And how do you know?*",
      "The data is 80 fictional repair tickets in `b16_tickets.csv`. Each row has the appliance, its age in years, the number of parts, the estimated hours, the final cost and a `big_job` column: 1 for a big job, 0 for not.",
      { h3: "The plan" },
      { ol: [
        "Hold some tickets back as a test set, and never train on them [ml-103].",
        "Build the simplest honest model in plain Python, then a better one with scikit-learn.",
        "Compare both with a baseline that always says *not big*.",
        "Report accuracy, precision and recall [ml-054].",
        "Write a model card: data, intended use and limits [ml-100].",
      ] },
      { honest: "Every ticket is fictional, and the numbers on these pages come from running the programs when the site was built." },
    ],
  },
  {
    h: "Plain Python first",
    body: [
      "The first Quote Machine has one rule: *big job if hours is at least some cutoff*. Training means trying every cutoff on the first 60 tickets and keeping the one with the best accuracy. The last 20 tickets are the test set.",
      { code: "b16_plain", out: true },
      "Google defines accuracy as (TP+TN)/(TP+TN+FP+FN), recall as TP/(TP+FN) and precision as TP/(TP+FP) [ml-054]. Here *positive* means *big job*.",
      "Now look at the baseline's line. A machine that always says *not big* scores a respectable accuracy and finds no big jobs at all, so its recall is 0. Google makes the same point: a model that always predicts negative on a dataset with 1% positives would score 99% accuracy yet be useless [ml-055].",
      { analogy: "The baseline is the shop's laziest apprentice, who answers *not big* to every ticket without reading it. Any model worth plugging in has to beat that apprentice on the numbers you care about." },
    ],
  },
  {
    h: "The same job with the library",
    body: [
      "The library version uses three features at once: age, parts and hours. scikit-learn's guide says to hold out part of the data as a test set, and its own example uses `train_test_split(X, y, test_size=0.4, random_state=0)` to hold out 40% [ml-103]. We copy that call exactly.",
      "Every scikit-learn model is fitted with `fit(X, y)` and used with `predict` [ml-026]. That makes swapping models easy. The program runs the same loop twice: once for a baseline, once for logistic regression.",
      "scikit-learn calls comparing your model against simple rules of thumb a sanity check. Its `DummyClassifier` with the `most_frequent` strategy always predicts the most frequent label in the training set, and its predictions ignore the input data [ml-118]. That is the laziest apprentice, built into the library.",
      { code: "b16_report", out: true },
      "scikit-learn defines precision as tp/(tp+fp), recall as tp/(tp+fn), and F1 as their harmonic mean with equal weight [ml-060]. The baseline's precision, recall and F1 are all 0: it never flags anything.",
      { nerd: "Why not score on the training tickets?", body: [
        "scikit-learn calls evaluating a model on its own training data a methodological mistake: a model that just repeats the labels it has seen would score perfectly and predict nothing useful [ml-048].",
        "Google also recommends a validation set on top of the training and test sets [ml-045]. Our Showcase does no tuning, so it skips that set. If you start trying many settings, add one.",
      ] },
    ],
  },
  {
    h: "The model card",
    body: [
      "The last lines of the program are a [[model card]]. Jurafsky and Martin recommend documenting a model this way [ml-100]. A card is short. It says what the model saw, what it is for, and where it should not be trusted.",
      "A good card is specific. *Works great* tells Ms. Gridlock nothing. *Misses some big jobs; a person checks every quote* tells the shop exactly how to use the machine.",
      { toy: "modelreport", label: "Try it: Card Maker" },
      { machine: ["b16-report"], label: "Go to your machine: the Quote Machine's report card" },
    ],
  },
  {
    h: "What you built this week",
    body: [
      "Look back at the Learning Bench. You built a neural unit by hand, a next-word machine from counts, a learner that runs on rewards, and a check for unfair mistakes. Today you put a model through a proper test and wrote down what it can and cannot do.",
      { ul: [
        "Little Brains: units, layers and the XOR wall.",
        "Maps and Next-Word Machines: words as points, and counting next words.",
        "Other Ways to Learn: rewards and labels for free.",
        "Careful and Fair: mistakes by group, and model cards.",
      ] },
      { level: "b12", label: "Replay: Little Brains" },
      "Finishing this job puts the Learning Bench Certificate in your toolbox, next to the Certificate of Tinkering.",
    ],
  },
]);

/* Toy: Card Maker. Pick the most useful line for each part of a model card; counts give live metrics. */
const B16_CARD = [
  { key: "data", h: "Data", opts: [
    ["Lots of data", "How much? From where? Who is missing?"],
    ["80 fictional repair tickets; 32 held out for testing", "Specific: how many, and how many were kept back for the test."],
    ["The best data", "Every model card says this. It tells the reader nothing."],
  ], good: 1 },
  { key: "use", h: "Intended use", opts: [
    ["Sets prices on its own", "Nobody checks it? One wrong flag becomes a wrong bill."],
    ["Use it for anything", "A model is tested for one job. Say which."],
    ["Flags big jobs so a person double-checks the quote", "Names the job and who checks the output."],
  ], good: 2 },
  { key: "limits", h: "Limits", opts: [
    ["Tiny made-up data; never tested on real customers; misses some big jobs", "Honest and specific: the reader knows where not to trust it."],
    ["None", "Every model has limits. This one has several."],
    ["Might be wrong sometimes", "True of everything. Which mistakes, and when?"],
  ], good: 0 },
  { key: "groups", h: "Results by group", opts: [
    ["Not checked", "Then nobody knows who pays for the mistakes."],
    ["Error rate for online and for phone bookings, side by side", "This is how the phone-booking problem gets caught."],
    ["Same for everyone", "Did you measure it? Say how."],
  ], good: 1 },
];
TOY("modelreport", {
  title: "Card Maker", level: "b16", color: "var(--lemon)",
  short: "Build a model card for the Quote Machine, and work out its scores from counts.",
  goal: "Pick the most useful line for all four parts of the card.",
  label: "A JavaScript demo of the idea, not Python code. The counts are yours to change; the tickets are fictional.",
  html: () => `<div class="mr-wrap"><div class="mr-pick"></div><div class="mr-side">
    <div class="panel mr-counts"><p class="mr-h">Test counts</p><div class="mr-grid"></div><p class="mr-metrics" aria-live="polite"></p></div>
    <div class="panel mr-card" aria-live="polite"></div></div></div>`,
  init(root, ctx) {
    const choice = {}, cnt = { tp: 4, fp: 1, fn: 2, tn: 25 };
    const pick = $(".mr-pick", root), card = $(".mr-card", root), grid = $(".mr-grid", root), met = $(".mr-metrics", root);
    const names = { tp: "big, flagged (tp)", fp: "small, flagged (fp)", fn: "big, missed (fn)", tn: "small, left alone (tn)" };
    function metrics() {
      const { tp, fp, fn, tn } = cnt, n = tp + fp + fn + tn;
      const p = tp + fp ? tp / (tp + fp) : 0, r = tp + fn ? tp / (tp + fn) : 0, f = p + r ? 2 * p * r / (p + r) : 0;
      met.innerHTML = rich(`accuracy **${n ? ((tp + tn) / n).toFixed(2) : "0.00"}**, precision **${p.toFixed(2)}**, recall **${r.toFixed(2)}**, F1 **${f.toFixed(2)}**`);
    }
    Object.keys(cnt).forEach(k => {
      const out = el("b", {}, String(cnt[k]));
      const step = d => () => { cnt[k] = clamp(cnt[k] + d, 0, 99); out.textContent = cnt[k]; metrics(); renderCard(); };
      grid.append(el("div.mr-count", {}, el("span", {}, names[k]),
        el("button.btn.small.plain", { type: "button", "aria-label": "One fewer " + names[k], "data-hint": "One fewer " + names[k], onclick: step(-1) }, "−"), out,
        el("button.btn.small.plain", { type: "button", "aria-label": "One more " + names[k], "data-hint": "One more " + names[k], onclick: step(1) }, "+")));
    });
    function renderCard() {
      card.innerHTML = "";
      card.append(el("p.mr-h", {}, "MODEL CARD: Quote Machine"));
      B16_CARD.forEach(s => card.append(el("p", { html: `<b>${esc(s.h)}:</b> ${choice[s.key] != null ? esc(s.opts[choice[s.key]][0]) : "<i>not filled in</i>"}` })));
      card.append(el("p", { html: `<b>Scores:</b> ${met.innerHTML}` }));
      if (B16_CARD.every(s => choice[s.key] === s.good)) ctx.goalDone("A card someone can actually use. Now write your own on your machine.");
    }
    B16_CARD.forEach(s => {
      const fb = el("p.mr-fb", { role: "status" });
      const row = el("div.row");
      s.opts.forEach(([txt, why], i) => row.append(el("button.btn.small.plain", { type: "button", "data-hint": `Use this line for ${s.h}`, onclick: e => {
        choice[s.key] = i;
        $$("button", row).forEach(b => { b.classList.remove("lime", "pink"); b.classList.add("plain"); });
        e.currentTarget.classList.remove("plain"); e.currentTarget.classList.add(i === s.good ? "lime" : "pink");
        fb.textContent = (i === s.good ? "Useful. " : "Hmm. ") + why;
        renderCard();
      } }, txt)));
      pick.append(el("div.mr-sec", {}, el("p.mr-h", {}, s.h), row, fb));
    });
    metrics(); renderCard();
  },
});

LEVEL({
  id: "b16", title: "Saturday Showcase", job: "Show the Quote Machine, and prove it works.",
  color: "#ffe45c", scene: "showcase", cast: ["gridlock"], toy: "modelreport",
  sticker: { title: "Learning Bench Graduate", glyph: "ML", color: "#ffe45c" },
  goals: ["Split the data and keep a test set", "Beat a baseline, and report precision and recall", "Write a model card"],
  beats: [
    say("gridlock", "Saturday Showcase, {{you}}! The whole street is coming to see the Quote Machine. I promised them it flags the big jobs. Please tell me it flags the big jobs.", "wow"),
    { show: ["gridlock", "nib"], ...say("nib", "We will find out, honestly. All week I have asked one question: how do you know it works? Today you answer it, with numbers and in writing.") },
    say("nib", "Step one: hold some tickets back as a test set, and never train on them [ml-103]. Those tickets are our stand-in for customers we have not met.", "think"),
    { ask: { q: "Why not just score the model on the tickets it trained on?", choices: ["It would take too long", "A model that repeats labels it has seen would score perfectly and predict nothing useful", "scikit-learn does not allow it"], answer: 1,
      why: "scikit-learn calls that a methodological mistake [ml-048]." } },
    say("nib", "Step two: plain Python first. One rule, *big job if hours is at least a cutoff*. We try every cutoff on the training tickets and keep the best."),
    { predict: { program: "b16_plain", q: "The machine learns a cutoff on 60 tickets and is tested on 20. Write down your guess for its accuracy, and for the baseline that always says *not big*." } },
    { show: ["gridlock", "nib", "byte"], ...say("byte", "BEEP. The lazy baseline gets a decent accuracy and finds zero big jobs. I am not jealous. I am a little jealous.", "wow") },
    { ask: { q: "Which number shows the baseline is useless for Ms. Gridlock's job?", choices: ["Its accuracy", "Its recall of 0", "The number of test tickets"], answer: 1,
      why: "Recall is TP/(TP+FN) [ml-054]. The baseline flags nothing, so it finds none of the big jobs." } },
    say("nib", "Accuracy alone can fool you. Google's example: always predicting negative on data with 1% positives scores 99% accuracy and is useless [ml-055].", "think"),
    say("nib", "Step three: the library. Three features, scikit-learn's own split from its guide, and a baseline run through the very same code [ml-103] [ml-026]."),
    say("nib", "The library even ships the lazy apprentice. `DummyClassifier` with `most_frequent` always predicts the most common training label and ignores the input. scikit-learn calls comparing against rules like that a sanity check [ml-118].", "think"),
    { predict: { program: "b16_report", q: "Both models get the same split. Which one do you expect to have the higher recall, and what will its precision look like?" } },
    { ask: { q: "A precision of 0.80 would mean:", choices: ["80% of the big jobs were found", "80% of the tickets it flagged really were big", "80% of all tickets were right"], answer: 1,
      why: "Precision is tp/(tp+fp): of the flagged tickets, the share that were really big [ml-060]." } },
    { show: ["gridlock", "nib"], ...say("gridlock", "So it is good. Can I let it set the prices on its own and go fishing?", "think") },
    say("nib", "No fishing. It still misses some big jobs. That goes in the [[model card]], which Jurafsky and Martin recommend for documenting a model [ml-100]. The card says what it is for and where not to trust it."),
    { toy: "modelreport", goal: "Pick the most useful line for all four parts of the card." },
    { book: 3, text: "The book has the full Showcase: both programs, their real output and the model card." },
    say("gridlock", "Then the final job. Write the report card on your own machine, and I will pin it next to the machine.", "think"),
    { machine: ["b16-report"] },
    { show: ["gridlock", "nib", "byte"], ...say("nib", "{{you}}, you tested a model honestly, beat a baseline, checked who gets the mistakes and wrote it all down. That is the job. Congratulations.", "wow") },
    say("byte", "Learning Bench Certificate printing. BEEP BOOP BEEP. It is very shiny."),
    { sticker: true },
  ],
});
