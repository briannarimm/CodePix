/* B4. Fit a Line: y' = b + w x, by hand and with scikit-learn.
   TODO(research): a source for LinearRegression's coef_ and intercept_ attributes (shown working in recorded programs only).
   TODO(research): a source for the least-squares slope formula used in b04_byhand (the book checks it against scikit-learn instead). */

PAGES("b04", [
  {
    h: "A line as a model",
    body: [
      "The scatter plot in B3 showed the tickets climbing in a rough straight band. A straight line through that band is the simplest Quote Machine there is.",
      "Google writes the model as y' = b + w1x1, where y' is the predicted label, b the [[bias]], w1 the [[weight]] and x1 the feature [ml-027]. That is [[linear regression]] with one feature. For us, x1 is hours of work and y' is the predicted cost.",
      "scikit-learn's glossary sorts predictors by what comes out. A [[regressor]] has continuous output values. A [[classifier]] has a finite set of discrete possible outputs [ml-113]. A repair cost can land on any amount, so the Quote Machine is a regressor for now. B6 builds a classifier.",
      "Google's own example predicts a car's fuel economy from its weight. There the learned bias is 34 and the weight is -4.6, so a 4,000-pound car is predicted at 15.6 miles per gallon [ml-028].",
      { analogy: "Lay a ruler across the dots. The bias is where the ruler crosses the zero-hours line: the price of a job before any work happens. The weight is how steeply the ruler climbs: the extra dollars for each extra hour." },
      { fig: () => { const f = B0X_PLOT.hoursCost(); let s = f.s; B0X_TICKETS.forEach(t => { s += `<circle cx="${f.sx(t.hours)}" cy="${f.sy(t.cost)}" r="6" fill="#ff8a1f" stroke="#141414" stroke-width="2"/>`; }); s += `<line x1="${f.sx(0)}" y1="${f.sy(20)}" x2="${f.sx(4.5)}" y2="${f.sy(20 + 30 * 4.5)}" stroke="#1a8a8a" stroke-width="4"/>`; return B0X_PLOT.svg(s, "The tickets with a guessed line, b = 20 and w = 30"); },
        cap: "A JavaScript drawing of the twelve fictional tickets with one guessed line: b = 20, w = 30." },
    ],
  },
  {
    h: "Score a guess",
    body: [
      "Any b and w make a line. To compare two lines, give each one a score. For every ticket, take the real cost minus the line's guess. Square that mistake, so misses above and below both count, and big misses count a lot. Add up the squares. Smaller is better.",
      { code: "b04_guess", out: true },
      { trace: "b04_guess", label: "🔍 Watch the errors add up" },
      "Guess B is much better. Look at the fridge ticket: guess A predicts $140 and misses by $32, and that one square, 1024, is most of guess A's score.",
    ],
  },
  {
    h: "The best line, by hand",
    body: [
      "We could keep guessing. There is also a recipe that goes straight to the line with the smallest score. It uses the average hours and the average cost, then one loop.",
      { code: "b04_byhand", out: true },
      { honest: "This book does not prove the recipe. The next page checks it a different way: scikit-learn, working its own way, lands on the same two numbers." },
      "So the Quote Machine's first draft says: about $15 to open the case, plus about $37 for every hour of work. A 2.5-hour job comes to $106.77.",
    ],
  },
  {
    h: "The best line, by scikit-learn",
    body: [
      "Now let the library do it. scikit-learn's `LinearRegression` fits its coefficients by minimizing the residual sum of squares [ml-032]: the same sum of squared mistakes you scored by hand. Like every scikit-learn estimator it is fitted with `fit(X, y)` and used with `predict`, with `X` shaped `(n_samples, n_features)` [ml-026].",
      { code: "b04_sklearn", out: true },
      "The same w, the same b and the same price for a 2.5-hour job. `coef_` holds the learned weight and `intercept_` the learned bias. The new ticket goes into `predict` as a one-row table with an `hours` column, the same shape as the training `X`.",
      { nerd: "Why double brackets in `df[[\"hours\"]]`?", body: [
        "`X` must be a table, even with one feature: one row per ticket, one column per feature [ml-026]. Double brackets keep it a DataFrame with shape (12, 1). Single brackets would give a Series of shape (12,).",
      ] },
      { toy: "linefitter", label: "Open the Line Fitter" },
      { machine: ["b04-line", "b04-fit"], label: "Go to your machine: score a line, then fit one" },
    ],
  },
]);

GLOSS({
  "linear regression": "A model that predicts a number with a straight line. Google writes it as y' = b + w1x1. [ml-027]",
  weight: "In y' = b + w1x1, the number w1 that multiplies the feature x1: how much the prediction changes per unit of the feature. [ml-027]",
  bias: "In y' = b + w1x1, the number b added on its own: the prediction when the feature is zero. [ml-027]",
  regressor: "A supervised predictor whose output values are continuous, such as a price. [ml-113]",
}, "b04");

/* ---- Toy: Line Fitter (JS demo) ---- */
TOY("linefitter", {
  title: "Line Fitter", level: "b04", color: "var(--teal)",
  short: "Move a line through the ticket dots and watch the mistakes shrink.",
  goal: "Get your line's total squared error within 10% of the best line's.",
  label: "A JavaScript demo of the idea, not Python code. The tickets are fictional; the red sticks are each ticket's mistake.",
  html: () => `<div class="lf-board"></div>
    <div class="panel lf-ctrl">
      <label class="lf-s" data-hint="Bias b: where the line crosses zero hours">b (bias) <b class="lf-bv"></b><input type="range" class="lf-b" min="-20" max="80" step="1" value="60" aria-label="Bias b" data-hint="Drag to move the whole line up or down"></label>
      <label class="lf-s" data-hint="Weight w: dollars per extra hour">w (weight) <b class="lf-wv"></b><input type="range" class="lf-w" min="0" max="60" step="0.5" value="10" aria-label="Weight w" data-hint="Drag to make the line steeper or flatter"></label>
      <p class="readout lf-score" aria-live="polite"></p>
      <div class="row"><button type="button" class="btn small sky lf-best" data-hint="Draw the best line, the one with the smallest total squared error">Show the best line</button>
      <button type="button" class="btn small plain lf-reset" data-hint="Put the line back where it started">Reset</button></div>
    </div>`,
  init(root, ctx) {
    const T = B0X_TICKETS, n = T.length;
    const mx = T.reduce((a, t) => a + t.hours, 0) / n, my = T.reduce((a, t) => a + t.cost, 0) / n;
    let top = 0, bot = 0;
    T.forEach(t => { top += (t.hours - mx) * (t.cost - my); bot += (t.hours - mx) ** 2; });
    const bw = top / bot, bb = my - bw * mx;
    const sse = (b, w) => T.reduce((a, t) => a + (t.cost - (b + w * t.hours)) ** 2, 0);
    const best = sse(bb, bw);
    let showBest = false;
    const bIn = $(".lf-b", root), wIn = $(".lf-w", root);
    const draw = () => {
      const b = +bIn.value, w = +wIn.value, f = B0X_PLOT.hoursCost();
      let s = f.s;
      const clipY = v => clamp(f.sy(v), B0X_PLOT.T, B0X_PLOT.H - B0X_PLOT.B);
      T.forEach(t => { s += `<line x1="${f.sx(t.hours)}" y1="${f.sy(t.cost)}" x2="${f.sx(t.hours)}" y2="${clipY(b + w * t.hours)}" stroke="#e0245e" stroke-width="3"/>`; });
      if (showBest) s += `<line x1="${f.sx(0)}" y1="${f.sy(bb)}" x2="${f.sx(4.5)}" y2="${f.sy(bb + bw * 4.5)}" stroke="#9b6bff" stroke-width="3" stroke-dasharray="8 6"/>`;
      s += `<line x1="${f.sx(0)}" y1="${clipY(b)}" x2="${f.sx(4.5)}" y2="${clipY(b + w * 4.5)}" stroke="#1a8a8a" stroke-width="4"/>`;
      T.forEach(t => { s += `<circle cx="${f.sx(t.hours)}" cy="${f.sy(t.cost)}" r="6" fill="#ff8a1f" stroke="#141414" stroke-width="2"/>`; });
      $(".lf-board", root).innerHTML = B0X_PLOT.svg(s, `Ticket dots with the line b = ${b}, w = ${w}`);
      $(".lf-bv", root).textContent = b; $(".lf-wv", root).textContent = w;
      const mine = sse(b, w);
      $(".lf-score", root).innerHTML = `Your total squared error: ${Math.round(mine).toLocaleString("en-US")}` + (showBest ? `<br>Best line (b = ${bb.toFixed(2)}, w = ${bw.toFixed(2)}): ${Math.round(best).toLocaleString("en-US")}` : "");
      if (mine <= best * 1.1) ctx.goalDone("Your line is within 10% of the best one. Now compare your b and w with what scikit-learn found.");
    };
    bIn.oninput = draw; wIn.oninput = draw;
    $(".lf-best", root).onclick = () => { showBest = true; draw(); };
    $(".lf-reset", root).onclick = () => { bIn.value = 60; wIn.value = 10; showBest = false; draw(); };
    draw();
  },
});

LEVEL({
  id: "b04", title: "Fit a Line", job: "Build the first Quote Machine: a straight line.",
  color: "#8fe0e0", scene: "bench", cast: ["nib", "byte"], toy: "linefitter",
  sticker: { title: "Line Layer", glyph: "y=", color: "#8fe0e0" },
  goals: ["Read y' = b + w x", "Score a line by its squared mistakes", "Fit the best line by hand and with scikit-learn"],
  beats: [
    say("byte", "Yesterday's dots made a straight band. Today I lay a line through them. I have been practicing with a ruler. BEEP.", "wow"),
    say("nib", "Google writes the line as y' = b + w1x1: y' is the prediction, b the [[bias]], w1 the [[weight]], x1 the feature [ml-027]."),
    { show: ["nib", "byte", "gridlock"], ...say("gridlock", "In shop words, please.", "think") },
    say("nib", "The bias is the price before any work starts. The weight is the extra dollars per hour. Hours go in, a price comes out.", "think"),
    { ask: { q: "A line has b = 20 and w = 30. What does it predict for a 2-hour job?", choices: ["$50", "$80", "$100"], answer: 1,
      why: "y' = b + w x = 20 + 30 × 2 = 80. The bias adds once; the weight multiplies the hours." } },
    say("nib", "A machine that answers with a number from a smooth range is a [[regressor]]. One that picks from a fixed list of answers is a [[classifier]] [ml-113]. Prices are smooth, so today we build a regressor."),
    { ask: { q: "Which of these jobs is a regressor's job?", choices: ["Guess how many minutes a repair will take", "Guess whether a kettle needs a new part: yes or no", "Guess which of five shelves a part belongs on"], answer: 0,
      why: "Minutes come from a continuous range, so that is a regressor's job. Yes or no, and one of five shelves, are finite sets of answers: a classifier's job [ml-113]." } },
    say("nib", "Google's example does the same with cars: bias 34, weight -4.6, and a 4,000-pound car comes out at 15.6 miles per gallon [ml-028]."),
    say("byte", "I can draw lots of lines. How do I know which one is good?", "think"),
    say("nib", "Exactly my favorite question. Score each line. For every ticket, square the gap between the real cost and the line's guess, and add them up. Smaller wins."),
    { predict: { program: "b04_guess", q: "Two guessed lines, four tickets. Which score does each line get?",
      choices: ["guess A (b=20, w=30): 1113.0\nguess B (b=10, w=40): 168.0", "guess A (b=20, w=30): 168.0\nguess B (b=10, w=40): 1113.0", "guess A (b=20, w=30): 47.0\nguess B (b=10, w=40): 20.0"], answer: 0,
      why: "Guess A misses the fridge-sized $172 job by 32, and 32 squared is 1024. Squares make big misses count a lot." } },
    { trace: { program: "b04_guess", note: "Watch `error` for each ticket, and `total` growing by its square." } },
    { ask: { q: "Why square each mistake before adding?", choices: ["so misses above and below both count, and big misses count more", "to make the numbers smaller", "because Python cannot add negative numbers"], answer: 0,
      why: "A miss of -10 and a miss of +10 would cancel if you added them raw. Squared, both count as 100, and a miss of 30 counts as 900." } },
    say("nib", "Now the best line for all twelve tickets, first with a plain-Python recipe, then with scikit-learn. If two methods agree, I start to believe them."),
    { predict: { program: "b04_byhand", q: "The recipe in plain Python. What line does it find?" } },
    say("nib", "scikit-learn's `LinearRegression` picks the line with the smallest residual sum of squares [ml-032]. That is the score you just used.", "think"),
    { predict: { program: "b04_sklearn", q: "Same twelve tickets, fitted by scikit-learn. Does it agree with the recipe?" } },
    { show: ["nib", "byte", "gridlock"], ...say("gridlock", "Fifteen dollars to open the case and thirty-seven an hour. That is... roughly what I charge. Did the machine read my mind?", "wow") },
    say("nib", "It read your old tickets, which is the next best thing."),
    { ask: { q: "In `model.fit(X, y)`, what shape must `X` have for twelve tickets and one feature?", choices: ["(12,)", "(12, 1)", "(1, 12)"], answer: 1,
      why: "`X` has shape `(n_samples, n_features)` [ml-026]: twelve rows, one column. That is why the program uses `df[[\"hours\"]]` with double brackets." } },
    { book: 3, text: "The book has every program in this level, and a note on the double brackets." },
    { toy: "linefitter", goal: "Get your line's total squared error within 10% of the best line's." },
    say("nib", "Now on your machine: score a line yourself, then let scikit-learn fit one."),
    { machine: ["b04-line", "b04-fit"] },
    say("byte", "One line, twelve tickets, smallest squares. The Quote Machine has a first draft! BEEP BOOP.", "wow"),
    { sticker: true },
  ],
});
