/* B7. Train, Validate, Test: splits, overfitting, cross-validation, leakage. */
// Split sizes are cited as examples, never as a rule: [ml-152] to [ml-156] (lesson plan decision 3).

PAGES("b07", [
  {
    h: "Grading your own homework",
    body: [
      "Ms. Gridlock's favorite question is *does it work?* Dr. Nib's favorite question is *how do you know?* This chapter is about answering the second one honestly.",
      "The tempting answer is to score the machine on the tickets it learned from. scikit-learn calls that a methodological mistake: a model that only repeated the labels it had already seen would score perfectly and still predict nothing useful [ml-048].",
      { analogy: "A student who memorizes last year's test can recite every answer. Give them this year's test and they are lost. A fair exam uses questions the student has never seen." },
      "So we hold some tickets back. scikit-learn says to keep part of the data aside as a [[test set]], and its example holds out 40% with `train_test_split(X, y, test_size=0.4, random_state=0)` [ml-103]. Google goes one step further: a split into only training and test sets is not optimal, so add a [[validation set]] as well [ml-045].",
      { table: { head: ["Pile", "What it is for (our shop words)"], rows: [
        ["[[training set|Training set]]", "The tickets the machine learns from."],
        ["[[validation set|Validation set]]", "Tickets for choosing between machines and settings while you work."],
        ["[[test set|Test set]]", "Tickets locked in a drawer until the very end, for one honest final score."],
      ] } },
      "Here is a three-way split in plain Python. Shuffling first matters: if the tickets were sorted by date, an unshuffled split would test only on the newest ones.",
      { code: "b07_split", out: true },
      { honest: "The seed makes the shuffle repeatable on this Python. The `random` module's algorithms can change between Python versions, so a seed does not promise the same order everywhere [py-122]." },
    ],
  },
  {
    h: "How big is each pile?",
    body: [
      "There is no single right answer, and the sources say so. Google says the training set usually has more examples than the validation or test set, but there are no percentage requirements for the different sets [ml-153]. So treat every ratio below as an example, never a rule.",
      { table: { head: ["Who", "Their example"], rows: [
        ["Google", "Splits training and test 80-20 in its example [ml-152]"],
        ["scikit-learn's tutorial", "Holds out 40% for testing [ml-103]"],
        ["scikit-learn's `train_test_split`", "Uses a test size of 0.25 if you give no size [ml-156]"],
      ] } },
      "Google adds that, in theory, the validation set and the test set should hold the same number of examples, or nearly so [ml-154]. Byte's split above deals two and two.",
      "In `train_test_split`, `test_size` is the proportion (or number) of samples for the test split. If you give neither `test_size` nor `train_size`, the test size is 0.25 [ml-156]. Here it is on twenty fictional tickets, first with no size and then with Google's 80-20 example:",
      { code: "b07_default", out: true },
      "A quarter of twenty is five, and a fifth is four. Same tickets, two piles of different sizes, and neither one is wrong.",
      "The size is only one question. Google lists what a good test set needs. It must be large enough for statistically significant results. It must represent the data set as a whole and the real-world data the model will meet. And it must have zero examples duplicated in the training set [ml-155].",
      { analogy: "A duplicated ticket is the memorized exam question all over again. If the same repair sits in both piles, the test asks something the machine has already seen." },
    ],
  },
  {
    h: "Too simple, too clever",
    body: [
      "Google defines [[overfitting]] as making a model that matches, or memorizes, the training set so closely that it fails on new data, and lists an overly complex model as one cause [ml-047]. The opposite problem, [[underfitting]], is a model too simple to follow the pattern at all.",
      "scikit-learn's documentation has a famous demonstration: fitting a noisy cosine curve, a degree-1 polynomial underfits, degree 4 fits well, and degree 15 overfits and learns the noise in the training data [ml-051]. We ran the same kind of experiment on 20 fictional repair tickets. Every second ticket was held back as a test set.",
      { code: "b07_overfit", out: true },
      "Read the two columns from top to bottom. Training error keeps falling, because a bendier curve can always pass closer to the tickets it has seen. Test error falls at first and then climbs. At the highest degree the curve passes through every training ticket and does worst of all on the tickets it never saw.",
      { toy: "overfit", label: "Open the Overfit Lab and bend the curve yourself" },
      { nerd: "What \"error\" means here", body: [
        "Each error is a mean squared error: for every ticket, take the gap between the real minutes and the curve's minutes, square it, and average the squares. Bigger is worse. The Measuring Mistakes job has more on measuring loss.",
      ] },
      "Words can overfit too. Jurafsky and Martin show that higher-order n-gram models copy their training text more closely, and a 4-gram model trained on Shakespeare reproduces a line from *King John* [ml-053]. The Words as Numbers job builds n-grams.",
    ],
  },
  {
    h: "Taking turns: cross-validation",
    body: [
      "With only a few tickets, one validation pile is a small and lucky-or-unlucky sample. [[cross-validation|Cross-validation]] gives every ticket a turn. In k-fold cross-validation the training data is split into k parts, the model trains on k-1 of them and is checked on the last one, and the reported score is the average over the k runs [ml-049].",
      "Here are the turns for 10 tickets and k = 5, dealt by hand:",
      { code: "b07_folds", out: true },
      { trace: "b07_folds", label: "🔍 Watch the slices move along" },
      "scikit-learn's `cross_validate` helper performs 5-fold cross-validation by default [ml-104]. Our program asks for accuracy, the share of held-out tickets it got right. The Scorekeeping job measures that properly.",
      { code: "b07_cv", out: true },
      { honest: "Twenty fictional tickets make a tiny data set, so the scores jump around from round to round. That jumpiness is exactly why the average of five turns is more trustworthy than any single turn." },
    ],
  },
  {
    h: "Leaks",
    body: [
      "A test is only honest if nothing about the test tickets reaches the machine while it learns. When something does sneak through, we call it [[data leakage]].",
      "The sneakiest leak hides in preparation steps. scikit-learn says preprocessing such as standardization should be learnt from the training set and then applied to the held-out data, and that a `Pipeline` does this for you inside cross-validation [ml-050]. That is why `b07_cv.py` puts `StandardScaler` inside `make_pipeline`: in each round, the scaler only ever sees that round's training part.",
      "The slowest leak is you. Google warns that the more often you reuse the same test set, the more likely the model ends up fitting that test set [ml-046]. Every peek at the test score that changes a decision is a little bit of training.",
      { ul: [
        "Split first, before any scaling, cleaning or choosing.",
        "Use the validation set (or cross-validation) to choose settings such as the degree.",
        "Open the test drawer once, at the end.",
      ] },
      { honest: "The checklist is our own shop habit, built from the sources cited above." },
      { machine: ["b07-folds", "b07-degrees"], label: "Go to your machine: deal folds, then run the lab" },
    ],
  },
]);

GLOSS({
  "training set": "The examples a model learns from. (Our own plain-words definition.)",
  "validation set": "Examples held back to choose between models and settings. Google recommends one in addition to a test set. [ml-045]",
  "test set": "Examples held back until the end for a final, honest score. [ml-103] Reusing it too often lets the model fit it. [ml-046]",
  overfitting: "A model that memorizes its training set so closely that it fails on new data. An overly complex model is one cause. [ml-047]",
  underfitting: "A model too simple to follow the pattern, such as the degree-1 curve in scikit-learn's example. [ml-051]",
  "cross-validation": "Split the data into k parts; train on k-1, check on the last, repeat for every part, and average the scores. [ml-049]",
  "data leakage": "Information from the held-out data sneaking into training, which makes a test score look better than it is. Learn preprocessing from the training set only. [ml-050]",
}, "b07");

TOY("overfit", {
  title: "Overfit Lab", level: "b07", color: "var(--grape)", wide: true,
  short: "Raise the degree of a curve and watch training and test error part ways.",
  goal: "Find the degree with the lowest test error.",
  label: "The curves and errors were recorded from real Python (b07_curves.py and b07_overfit.py); the toy only draws them.",
  html: () => `<div class="grid">
      <figure><svg class="board fit" viewBox="0 0 320 220" role="img" aria-label="Repair tickets and the fitted curve"></svg><figcaption><span class="dot tr"></span> training ticket &nbsp; <span class="dot te"></span> test ticket</figcaption></figure>
      <figure><svg class="board err" viewBox="0 0 320 220" role="img" aria-label="Training and test error for each degree"></svg><figcaption><span class="k tr"></span> training error &nbsp; <span class="k te"></span> test error (log scale)</figcaption></figure>
    </div>
    <div class="row"><label class="sl">degree <input type="range" class="deg" min="1" max="9" step="1" value="1" data-hint="Change the degree of the curve" aria-label="Degree"></label><b class="dv readout">1</b></div>
    <p class="say" role="status" aria-live="polite"></p>`,
  init(root, ctx) {
    const fitP = DATA.programs.b07_curves, errP = DATA.programs.b07_overfit;
    if (!fitP || !errP) { root.append(el("p", {}, "The recordings are missing from this build.")); return; }
    const tickets = [], curves = {}, errs = {};
    fitP.out.trim().split("\n").forEach(line => {
      const f = line.trim().split(/\s+/);
      if (f[0] === "ticket") tickets.push({ w: +f[1], m: +f[2], test: f[3] === "test" });
      else if (f[0] === "curve") curves[+f[1]] = f.slice(2).map(Number);
    });
    errP.out.trim().split("\n").slice(1).forEach(line => { const f = line.trim().split(/\s+/).map(Number); errs[f[0]] = { tr: f[1], te: f[2] }; });
    const degs = Object.keys(errs).map(Number);
    const best = degs.reduce((a, d) => (errs[d].te < errs[a].te ? d : a), degs[0]);
    const svgF = $("svg.fit", root), svgE = $("svg.err", root), deg = $(".deg", root);
    deg.max = Math.max(...degs);
    const fx = w => 30 + (w + 1) * 140, fy = m => 200 - (m - 0) * 2.2;   // wear -1..1, minutes 0..85
    const lg = v => Math.log10(Math.max(v, 0.1));
    const ex = d => 40 + (d - 1) * (260 / (degs.length - 1)), ey = v => 200 - (lg(v) + 1) * (180 / 6);  // 0.1 .. 100000
    const draw = () => {
      const d = +deg.value, c = curves[d] || [];
      let s = `<line x1="30" y1="200" x2="300" y2="200" stroke="#141414" stroke-width="2"/><line x1="30" y1="10" x2="30" y2="200" stroke="#141414" stroke-width="2"/>
        <text x="165" y="216" text-anchor="middle" font-size="11">wear</text><text x="12" y="105" font-size="11" transform="rotate(-90 12 105)" text-anchor="middle">minutes</text>
        <clipPath id="ofclip"><rect x="30" y="10" width="275" height="190"/></clipPath>`;
      const pts = c.map((v, i) => [fx(-0.95 + i * (1.9 / (c.length - 1))), fy(v)]);
      s += `<path clip-path="url(#ofclip)" d="${pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join("")}" fill="none" stroke="#9b6bff" stroke-width="3.5"/>`;
      tickets.forEach(t => { s += `<circle cx="${fx(t.w).toFixed(1)}" cy="${fy(t.m).toFixed(1)}" r="5" fill="${t.test ? "#fff" : "#ff8a1f"}" stroke="#141414" stroke-width="2"/>`; });
      svgF.innerHTML = s;
      let e = `<line x1="40" y1="200" x2="300" y2="200" stroke="#141414" stroke-width="2"/><line x1="40" y1="20" x2="40" y2="200" stroke="#141414" stroke-width="2"/>`;
      [1, 10, 100, 1000, 10000].forEach(v => { e += `<line x1="40" x2="300" y1="${ey(v)}" y2="${ey(v)}" stroke="#d9dde2"/><text x="36" y="${ey(v) + 4}" text-anchor="end" font-size="9">${v}</text>`; });
      e += `<rect x="${ex(d) - 9}" y="20" width="18" height="180" fill="#ffe45c88"/>`;
      [["tr", "#ff8a1f"], ["te", "#1a8a8a"]].forEach(([k, col]) => {
        e += `<path d="${degs.map((g, i) => (i ? "L" : "M") + ex(g).toFixed(1) + " " + ey(errs[g][k]).toFixed(1)).join("")}" fill="none" stroke="${col}" stroke-width="3"/>`;
        degs.forEach(g => { e += `<circle cx="${ex(g).toFixed(1)}" cy="${ey(errs[g][k]).toFixed(1)}" r="${g === d ? 6 : 3.5}" fill="${col}" stroke="#141414" stroke-width="1.5"/>`; });
      });
      degs.forEach(g => { e += `<text x="${ex(g)}" y="214" text-anchor="middle" font-size="10">${g}</text>`; });
      svgE.innerHTML = e;
      $(".dv", root).textContent = d;
      const r = errs[d];
      let verdict = d < best && r.te > 1.5 * errs[best].te ? "Too stiff: it misses the bend, so both errors are high (underfitting)." : d > best && r.te > 3 * errs[best].te ? "Too bendy: it chases the training tickets and misses the test ones (overfitting)." : "A reasonable fit.";
      if (d === best) verdict = "The lowest test error of all the degrees.";
      $(".say", root).innerHTML = rich(`Degree **${d}**: training error **${r.tr}**, test error **${r.te}**. ${verdict}`);
      if (d === best) ctx.goalDone(`Degree ${best} has the lowest test error.`);
    };
    deg.addEventListener("input", draw);
    draw();
  },
});

LEVEL({
  id: "b07", title: "Train, Validate, Test", job: "Prove the Quote Machine works on tickets it has never seen.",
  color: "#33a3a3", scene: "bench", cast: ["gridlock"], toy: "overfit",
  sticker: { title: "Fair Examiner", glyph: "3/3", color: "#5cc8ff" },
  goals: ["Split tickets into training, validation and test piles", "Spot overfitting", "Run cross-validation without leaks"],
  beats: [
    say("gridlock", "Great news, {{you}}. I asked Byte to check the Quote Machine on last month's tickets. One hundred percent right! Let us put it on the front counter.", "wow"),
    { show: ["gridlock", "nib"], ...say("nib", "Which tickets did it learn from?", "think") },
    say("gridlock", "Last month's tickets. Why?"),
    say("nib", "Then it was marking its own homework. scikit-learn calls scoring a model on its own training data a methodological mistake: a machine that simply repeated the answers it had seen would score perfectly and know nothing [ml-048].", "think"),
    { show: ["nib", "byte"], ...say("byte", "BEEP. I did memorize them. All of them. Is that bad?", "wow") },
    say("nib", "Only if a new ticket comes in. Picture a student who memorized last year's test. Perfect on the old paper, lost on the new one. We need a fair exam."),
    say("nib", "So we deal the tickets into piles. A [[training set]] to learn from, a [[validation set]] to choose settings with, and a [[test set]] locked away for the end. Google says two piles are not enough and recommends the validation pile [ml-045]."),
    { predict: { program: "b07_split", q: "Byte shuffles ten tickets with a fixed seed and deals six, two and two. Which ticket numbers land in the test pile? (Any guess is fine; this is about seeing a real shuffle.)" } },
    { show: ["gridlock", "nib"], ...say("gridlock", "Six, two and two. Is that the official recipe?", "think") },
    say("nib", "There is no official recipe. Google says there are no percentage requirements for the piles [ml-153]. Its own example uses 80-20 [ml-152], and scikit-learn holds out 0.25 if you give no size [ml-156]."),
    { predict: { program: "b07_default", q: "Twenty tickets go through `train_test_split`, once with no size and once with `test_size=0.2`. How many land in each test pile?" } },
    { ask: { q: "A ticket for the same fridge repair was filed twice, and one copy lands in training while the other lands in the test pile. Why is that a problem?", choices: ["A good test set has zero examples duplicated in the training set", "Fridges are too expensive to test", "The test pile must hold exactly 25%"], answer: 0,
      why: "Google lists zero duplicates of training examples as one need of a good test set [ml-155]. A duplicate is a question the machine has already memorized." } },
    { show: ["nib", "byte"], ...say("byte", "So I shuffle, then deal. Why shuffle first?", "think") },
    { ask: { q: "Why shuffle before dealing the piles?", choices: ["So the piles do not depend on the order the tickets were filed in", "Because Python refuses to slice a list that is in order", "So the test pile is always the newest tickets"], answer: 0,
      why: "If the tickets were filed by date, slicing the end off would test only on the newest ones. Shuffling mixes them first. (That reasoning is our own.)" } },
    { show: ["nib", "byte"], ...say("nib", "Now the real danger. Google calls it [[overfitting]]: a model that matches its training tickets so closely that it fails on new ones. An overly complex model is one cause [ml-047].", "think") },
    say("byte", "I can make my curve bendier. Bendier is better, yes? BEEP."),
    say("nib", "Let us find out. We fit curves of degree 1 up to 9 to twenty fictional tickets, holding every second ticket back. scikit-learn's own version finds degree 1 underfits, degree 4 fits well and degree 15 overfits [ml-051]."),
    { predict: { program: "b07_overfit", q: "As the degree rises from 1 to 9, what happens to the training error, and what happens to the test error?" } },
    { toy: "overfit", goal: "Find the degree with the lowest test error." },
    { ask: { q: "Degree 9 has a training error of 0.0. What does that tell you?", choices: ["It is the best model, ship it", "It passes through every training ticket, which says nothing about new ones", "The program has a bug"], answer: 1,
      why: "A perfect training score is what memorizing looks like [ml-048]. The test column is the one that matters, and at degree 9 it is the worst." } },
    { show: ["nib", "gridlock"], ...say("gridlock", "Twenty tickets is all we have for some gadgets. If I lock some in a drawer, the machine learns from even fewer.", "think") },
    say("nib", "Then let every ticket take a turn. [[cross-validation|Cross-validation]] splits the tickets into k parts, trains on k-1 and checks on the last, round after round, and averages the scores [ml-049]."),
    { trace: { program: "b07_folds", note: "Watch `start` jump along by two each round. The two tickets in that slice sit out." } },
    say("nib", "scikit-learn's `cross_validate` does five rounds unless you ask otherwise [ml-104]. And notice where the scaler goes: inside a `Pipeline`, so each round learns it from its own training part [ml-050]."),
    { predict: { program: "b07_cv", q: "Five rounds of cross-validation on twenty fictional tickets. Will every round get the same score?" } },
    { ask: { q: "You scale all twenty tickets first, then cross-validate. What went wrong?", choices: ["Nothing; scaling never matters", "The scaler saw the held-out tickets, so information leaked into training", "Cross-validation cannot handle scaled numbers"], answer: 1,
      why: "That is [[data leakage]]. Preprocessing should be learnt from the training part only, and a Pipeline does that inside cross-validation [ml-050]." } },
    say("nib", "One last leak, and it is us. Google warns that reusing the same test set again and again makes the model fit it [ml-046]. Open the test drawer once.", "think"),
    { book: 1, text: "The chapter covers all three piles, how big each one can be, the overfitting experiment, folds and leaks." },
    say("gridlock", "Fine. The Quote Machine stays in the back until it passes a fair exam. {{you}}, go deal some folds."),
    { machine: ["b07-folds", "b07-degrees"] },
    say("byte", "I have unmemorized everything. Please test me on something new. BEEP BOOP."),
    { sticker: true },
  ],
});
