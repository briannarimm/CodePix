/* B6. Yes or No Machines: classification, the sigmoid, logistic regression. */

PAGES("b06", [
  {
    h: "Questions with two answers",
    body: [
      "So far the Quote Machine has guessed numbers: minutes, dollars. Many shop questions have only two answers instead. Does this kettle need a new part? Is this ticket urgent? Is this email junk?",
      "Sorting each example into one of a fixed set of answers is called [[classification]]. The answers are often just *yes* and *no*. scikit-learn's glossary calls a predictor with a finite set of discrete possible outputs a [[classifier]], and one with continuous outputs a [[regressor]] [ml-113]. B4's line was a regressor. GeeksforGeeks lists logistic regression, decision trees, random forests, k-nearest neighbors, naive Bayes and support vector machines as classification methods [ml-008]. This job builds the first one on that list by hand.",
      { analogy: "A dimmer switch. Any score at all, from very negative to very positive, goes in. Out comes a light level between fully off (0) and fully on (1). The middle of the dial is half bright." },
      "A yes-or-no machine works in two moves. First it adds up evidence into a single score. Then it squeezes that score into a [[probability]], a number between 0 and 1 that says how sure it is. A [[threshold]] turns the probability into an answer: at or above the line means yes.",
    ],
  },
  {
    h: "The squeezer",
    body: [
      "Google's crash course computes the score first, z = b + w1x1 + ... + wnxn, and then passes z through the [[sigmoid]], y' = 1 / (1 + e^-z) [ml-037]. Here *b* is the bias, each *w* is a weight, and each *x* is one piece of evidence about the ticket.",
      "We wrote the sigmoid as a five-line Python function and fed it the same four scores as Google's table. The table gives 0.119 for z = -2, 0.50 for z = 0, 0.731 for z = 1 and 0.881 for z = 2 [ml-038].",
      { code: "b06_sigmoid", out: true },
      "The numbers agree. Python prints 0.5 without the trailing zero, and `round(..., 3)` keeps three decimal places. Notice the shape: a score of 0 lands exactly in the middle, big positive scores crowd toward 1, and big negative scores crowd toward 0. The sigmoid never quite reaches either end.",
      { trace: "b06_sigmoid", label: "🔍 Watch each score go through the squeezer" },
      { toy: "sigmoid", label: "Open the Sigmoid Dial" },
    ],
  },
  {
    h: "A hand-made yes-or-no machine",
    body: [
      "Jurafsky and Martin describe [[logistic regression]] this way: it learns one weight for each feature plus a bias term, adds up the weighted features into a sum z, and passes z through the sigmoid, which is also called the logistic function [ml-040].",
      "Before anything learns, we can guess the weights ourselves. Here is a machine for the question *does this gadget need a new part?* It looks at two clues: the gadget's age in years, and whether it rattles (1) or not (0).",
      { code: "b06_score", out: true },
      "Each year of age adds 0.5 to the score, and a rattle adds 2. The bias of -3 means a brand-new, quiet gadget starts well on the *no* side. The toaster's score of -2 gives a low probability, so the answer is no. The radio is old and rattles, so it lands near 1.",
      "At test time, a logistic regression classifier works out the probability of each class and returns the label with the higher probability [ml-039]. With only two classes, *yes* has the higher probability exactly when it is above one half, so our threshold of 0.5 gives the same answers.",
      { trace: "b06_score", label: "🔍 Step through the three tickets" },
    ],
  },
  {
    h: "Let scikit-learn find the weights",
    body: [
      "Our weights were guesses. The point of machine learning is to get them from examples. Here we give scikit-learn twelve fictional past tickets, each with the answer the shop found, and ask it to [[logistic regression|fit a logistic regression]].",
      "In scikit-learn every model is fitted with `fit(X, y)` and then used with `predict`, where X has one row per example and one column per feature [ml-026]. The name can mislead: scikit-learn's guide explains that, despite the word *regression*, `LogisticRegression` is a linear model for classification [ml-042].",
      { code: "b06_sklearn", out: true },
      "`coef_` holds the learned weights and `intercept_` holds the bias. `predict_proba` gives the probability of each class; we kept only the *yes* column. `predict` gives the final answers: 0 for no, 1 for yes.",
      { honest: "The tickets are fictional, so the weights mean nothing outside this shop. The output is from a real run; another scikit-learn version may print slightly different decimals, which is why the program prints its version." },
      { machine: ["b06-sigmoid"], label: "Go to your machine: build the squeezer" },
    ],
  },
]);

GLOSS({
  classification: "Sorting each example into one of a fixed set of answers, such as yes or no. (Our own plain-words definition.)",
  classifier: "A supervised predictor with a finite set of discrete possible output values, such as yes or no. [ml-113]",
  sigmoid: "The squeezer y' = 1 / (1 + e^-z). It turns any score z into a number between 0 and 1. [ml-037]",
  "logistic regression": "A classifier that weights each feature, adds a bias, and passes the sum through the sigmoid. [ml-040] Despite the name, it is used for classification. [ml-042]",
  probability: "A number from 0 to 1 that says how likely something is: 0 means never, 1 means certain. (Our own plain-words definition.)",
  threshold: "The line that turns a probability into an answer. At or above it means yes. You choose it. (Our own plain-words definition.)",
}, "b06");

TOY("sigmoid", {
  title: "Sigmoid Dial", level: "b06", color: "var(--grape)",
  short: "Slide a score and watch the sigmoid squeeze it into a probability.",
  goal: "Find a score z that gives a probability above 0.95.",
  label: "A JavaScript demo of the idea, not Python code.",
  html: () => `<svg class="board" viewBox="0 0 320 200" role="img" aria-label="The sigmoid curve with a dot at the chosen score"></svg>
    <div class="row"><label class="sl">score z <input type="range" class="z" min="-6" max="6" step="0.1" value="0" data-hint="Slide the score z left or right" aria-label="Score z"></label><b class="zv readout">0.0</b></div>
    <div class="row"><label class="sl">threshold <input type="range" class="th" min="0.1" max="0.9" step="0.05" value="0.5" data-hint="Move the line that turns a probability into yes or no" aria-label="Threshold"></label><b class="tv readout">0.50</b></div>
    <p class="say" role="status" aria-live="polite"></p>`,
  init(root, ctx) {
    const svg = $("svg", root), z = $(".z", root), th = $(".th", root);
    const sig = v => 1 / (1 + Math.exp(-v));
    const X = v => 20 + (v + 6) * (280 / 12), Y = p => 180 - p * 160;
    let curve = "";
    for (let v = -6; v <= 6.001; v += 0.25) curve += (curve ? "L" : "M") + X(v).toFixed(1) + " " + Y(sig(v)).toFixed(1);
    const draw = () => {
      const zv = +z.value, t = +th.value, p = sig(zv), yes = p >= t;
      svg.innerHTML = `<line x1="20" y1="180" x2="300" y2="180" stroke="#141414" stroke-width="2"/><line x1="${X(0)}" y1="16" x2="${X(0)}" y2="184" stroke="#9aa3ad" stroke-dasharray="4 4"/>
        <line x1="20" y1="${Y(t)}" x2="300" y2="${Y(t)}" stroke="#ff8a1f" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="296" y="${Y(t) - 5}" text-anchor="end" font-size="11" fill="#c2570a">threshold</text>
        <text x="24" y="${Y(1) + 4}" font-size="11">1</text><text x="24" y="${Y(0) - 4}" font-size="11">0</text>
        <path d="${curve}" fill="none" stroke="#9b6bff" stroke-width="4"/>
        <line x1="${X(zv)}" y1="180" x2="${X(zv)}" y2="${Y(p)}" stroke="#141414" stroke-width="1.5"/>
        <circle cx="${X(zv)}" cy="${Y(p)}" r="9" fill="${yes ? "#9be34a" : "#ff6fae"}" stroke="#141414" stroke-width="3"/>`;
      $(".zv", root).textContent = zv.toFixed(1);
      $(".tv", root).textContent = t.toFixed(2);
      $(".say", root).innerHTML = rich(`z = ${zv.toFixed(1)} gives probability **${p.toFixed(3)}**. Answer: **${yes ? "yes" : "no"}**.`);
      if (p > 0.95) ctx.goalDone();
    };
    z.addEventListener("input", draw); th.addEventListener("input", draw);
    draw();
  },
});

LEVEL({
  id: "b06", title: "Yes or No Machines", job: "The Quote Machine has to answer yes or no.",
  color: "#9b6bff", scene: "bench", cast: ["gridlock"], toy: "sigmoid",
  sticker: { title: "Yes-No Squeezer", glyph: "y/n", color: "#9b6bff" },
  goals: ["Say what classification is", "Squeeze a score with the sigmoid", "Fit a logistic regression"],
  beats: [
    say("gridlock", "{{you}}, the Quote Machine guesses prices nicely. Now I need one question answered before the price: does this gadget need a new part? Yes or no. Parts take a week to arrive.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "A yes-or-no question! That is [[classification]]: sorting each ticket into one of a fixed set of answers. Our line-fitting machine gives any number at all. We need it to give a *chance* instead.") },
    say("nib", "Here is the plan. Add up the evidence into one score. Then squeeze the score into a [[probability]] between 0 and 1. Then draw a line, a [[threshold]], and answer yes above it."),
    { show: ["nib", "byte"], ...say("byte", "BEEP. I have a squeezer. Feed me a score, any score, and I will hand back a number between 0 and 1.", "wow") },
    say("nib", "Byte means the [[sigmoid]]. Google's crash course writes it as y' = 1 / (1 + e^-z), where z is the score [ml-037]. Picture a dimmer switch: any score in, a light level from off to on out."),
    { predict: { program: "b06_sigmoid", q: "Byte squeezes the scores -2, 0, 1 and 2. What comes out?", choices: ["-2 0.0\n0 0.5\n1 1.0\n2 1.0", "-2 0.119\n0 0.5\n1 0.731\n2 0.881", "-2 0.25\n0 0.5\n1 0.75\n2 1.0"], answer: 1,
      why: "The sigmoid never reaches 0 or 1, and a score of 0 lands exactly at one half. Google's own table shows the same values: 0.119, 0.50, 0.731 and 0.881 [ml-038]." } },
    say("nib", "Those are Google's table values to the last digit [ml-038]. Real Python agrees with the textbook. I find that deeply satisfying.", "wow"),
    { ask: { q: "A ticket gets a score of z = 0. What probability does the sigmoid give?", choices: ["0", "0.5", "1"], answer: 1,
      why: "1 / (1 + e^0) = 1 / (1 + 1) = 0.5. A score of zero means the evidence is perfectly balanced." } },
    { show: ["nib", "byte"], ...say("nib", "Now the score itself. [[logistic regression|Logistic regression]] gives each feature a weight, adds a bias, and squeezes the sum with the sigmoid [ml-040]. Let us guess some weights by hand first.", "think") },
    say("byte", "My guesses: each year of age adds 0.5. A rattle adds 2. And a bias of -3, because most gadgets are fine. BEEP?"),
    { predict: { program: "b06_score", q: "A 2-year-old toaster that does not rattle: z = -3 + 0.5 × 2 + 0 = -2. Will Byte say it needs a new part?" } },
    say("nib", "The toaster says no, and the old rattling radio says a confident yes. The kettle sits at 0.73: yes, but not by much. A threshold of 0.5 is our choice, and the Scorekeeping job will show what moving it costs."),
    { toy: "sigmoid", goal: "Find a score z that gives a probability above 0.95." },
    { show: ["nib", "gridlock"], ...say("gridlock", "Guessed weights? I could guess weights. I thought the bench was supposed to learn.", "think") },
    say("nib", "Quite right. scikit-learn can find the weights from past tickets. Every model there learns with `fit(X, y)` and answers with `predict` [ml-026]. One warning about the name: it says *regression*, yet scikit-learn uses it as a classifier [ml-042]."),
    { predict: { program: "b06_sklearn", q: "scikit-learn learns from twelve fictional tickets, then judges a 3-year-old quiet gadget and an 8-year-old rattler. Guess the two answers (0 is no, 1 is yes)." } },
    { ask: { q: "At test time, how does a logistic regression classifier pick its answer?", choices: ["It picks the class with the higher probability", "It picks whichever class came first in the training data", "It always says yes when z is positive, whatever the bias"], answer: 0,
      why: "It works out the probability of each class and returns the more probable one [ml-039]. With two classes, that is the same as a threshold of one half." } },
    { ask: { q: "In `z = b + w1x1 + w2x2`, what is `b`?", choices: ["A weight for the first feature", "The bias, added no matter what the features are", "The final probability"], answer: 1,
      why: "The bias is the part of the score that does not depend on any feature [ml-037]. Ours was -3, so a new quiet gadget starts on the no side." } },
    { book: 0, text: "The book has the whole chapter: the squeezer, the hand-made machine and the scikit-learn version." },
    say("nib", "Now build the squeezer yourself, on your own machine. Two small functions, and the tests will tell you when they behave."),
    { machine: ["b06-sigmoid"] },
    say("byte", "Yes. No. Yes with 0.73 confidence. I love having opinions. BEEP BOOP.", "wow"),
    { sticker: true },
  ],
});
