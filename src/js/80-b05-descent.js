/* B5. Measuring Mistakes: loss and gradient descent in plain Python, compared with scikit-learn.
   Loss and MSE: [ml-148] to [ml-151]. Hyperparameters: [ml-114] [ml-116] [ml-117]. */

PAGES("b05", [
  {
    h: "One number for how wrong",
    body: [
      "B4 scored a line by adding up squared mistakes. Learners need a score like that all the time, so it gets a name. During supervised training the model compares its prediction with the label's actual value, and the difference is the [[loss]] [ml-006].",
      "Google defines loss as a numerical metric that describes how wrong a model's predictions are, and says the goal of training is to minimize the loss [ml-149]. So a smaller loss means a better line, just as in B4.",
      "This level measures the loss with [[MSE]], mean squared error. scikit-learn defines it as the average, over the samples, of the squared difference between each true value and its prediction [ml-148]. Google builds it in two steps. [[L2 loss]] is the sum of the squared differences between predicted and actual values, and MSE is the average of L2 losses across N examples [ml-150]. B4's score was the sum. This level divides by the number of tickets.",
      "scikit-learn's documentation gives a small example: true values 3, -0.5, 2 and 7, predictions 2.5, 0.0, 2 and 8, and an MSE of 0.375 [ml-148]. Here it is twice, once by hand and once with the library's own `mean_squared_error`:",
      { code: "b05_mse", out: true },
      "In this book's programs, `mse()` does the same job for a line through the tickets: square each ticket's mistake, then take the average.",
      { snippet: "def mse(b, w):\n    total = 0\n    for x, y in zip(hours, costs):\n        total = total + (y - (b + w * x)) ** 2\n    return total / len(hours)", lang: "py", file: "from b05_descent.py" },
      "The average keeps the number readable whether you have four tickets or four thousand. Google's gradient descent example reports its loss as MSE too: 303.71 at iteration 1, and 42.17 after six iterations [ml-034].",
    ],
  },
  {
    h: "The trouble with squares",
    body: [
      "Squaring has a side effect. Squaring makes a large difference between prediction and label even larger. So L2 loss penalizes an [[outlier]] much more than L1 loss does, and MSE moves the model more toward outliers than MAE, mean absolute error, does [ml-151].",
      "Here are five fictional tickets. The line misses four of them by a few dollars. The fifth customer haggled, and the line misses that one by $30. The program prints each miss with its sign dropped and squared, then both averages:",
      { code: "b05_outlier", out: true },
      "One haggled ticket supplies almost all of the squared total. A learner that minimizes MSE will lean its line toward that one ticket to shrink its giant square.",
      { analogy: "Picture a seesaw where every miss sits on the board. With MSE, a miss twice as far out weighs four times as much, so one far-off ticket can tip the whole board." },
      { honest: "This book sticks with MSE, the loss in Google's gradient descent example [ml-034]. When a table has a wild ticket in it, look at that ticket before you trust the line." },
    ],
  },
  {
    h: "Walking downhill",
    body: [
      "B4 found the best line with a recipe. This level finds it a second way, by improving a bad guess step by step. The method is called [[gradient descent]]. Google describes it as four repeated steps: compute the loss, decide which direction lowers it, move the weight and bias a small amount that way, and repeat until the loss stops improving [ml-033].",
      { analogy: "You are on a hillside in thick fog and want to reach the valley floor. You cannot see the bottom. You can feel which way the ground tilts under your boots. Take a small step downhill. Feel again. Step again. The loss is your height on the hill; b and w are where you stand." },
      "Our program feels the slope the simplest possible way. It nudges b a tiny bit up and a tiny bit down, and sees which way the loss changes. Then it does the same for w. Then it steps both of them a small amount downhill.",
      { code: "b05_descent", out: true },
      "The loss falls fast at first, from over 10,000 to under 35 in five steps. Then it creeps. At step 23 one more step improves the loss by less than 0.001, and the program stops.",
    ],
  },
  {
    h: "How big a step?",
    body: [
      "The program multiplies each slope by `learning_rate = 0.05` before moving. Zhang and colleagues' open textbook does the same: it multiplies the gradient by a predetermined small positive value called the [[learning rate]] [ml-114]. scikit-learn says the learning rate controls the step size, and can stay constant or slowly decay [ml-115]. Our gradient is the pair of slopes we felt by nudging.",
      "Here is the same program with `learning_rate = 0.2`:",
      { code: "b05_toobig", out: true },
      "Each step jumps clean over the valley and lands higher up the other side, so the loss grows every time. Too small a step wastes time; too big a step never arrives.",
      "Nobody learns the learning rate from the data. The same textbook calls tunable values like it, which the training loop never updates, [[hyperparameter|hyperparameters]] [ml-114]. Google says hyperparameters are variables that control different aspects of training, and that the learning rate is a number you set that influences how quickly the model converges [ml-117]. scikit-learn says hyperparameters are not learnt directly within estimators. You pass them to the estimator's constructor, and they are best chosen by searching for the best cross validation score [ml-116]. B7 explains cross validation.",
      { analogy: "The weight and bias are the dials the machine turns for itself. A hyperparameter is a dial on the machine's case that you set before you press Start." },
      { toy: "downhill", label: "Open Downhill and try three learning rates" },
    ],
  },
  {
    h: "Stopping, and checking the answer",
    body: [
      "When should descent stop? Google says a model has converged when more iterations no longer reduce the loss meaningfully, and that linear models have a convex loss surface [ml-035]. Picture *convex* as a single bowl with one bottom, so walking downhill from anywhere leads to the same place. Our stopping rule, \"less than 0.001 better\", is our own choice of *meaningfully*. That is [[convergence]].",
      "So how do we know it found the right bottom? Ask scikit-learn about the same four tickets. `LinearRegression` minimizes the residual sum of squares directly [ml-032].",
      { code: "b05_compare", out: true },
      "Descent stopped at b = 14.66, w = 38.55 with a loss of 33.81. scikit-learn says b = 14.87, w = 38.47 with a loss of 33.79. Close, and a tighter stopping rule would get closer. Two methods, one answer: that is how you know it works.",
      { machine: ["b05-descent"], label: "Go to your machine: walk downhill yourself" },
    ],
  },
]);

GLOSS({
  mse: "Mean squared error: the average, over the samples, of the squared difference between each true value and its prediction. [ml-148] [ml-150]",
  "gradient descent": "Repeat: compute the loss, decide which direction lowers it, move the weight and bias a small amount that way, until the loss stops improving. [ml-033]",
  convergence: "A model has converged when more iterations no longer reduce the loss meaningfully. [ml-035]",
  "learning rate": "The small positive value that gradient descent multiplies the gradient by. It controls the step size. [ml-114] [ml-115]",
  hyperparameter: "A tunable setting, such as the learning rate, that training does not update. You choose it; the model does not learn it. [ml-114] [ml-116] [ml-117]",
  "l2 loss": "The sum of the squared differences between predicted and actual values. MSE is its average across N examples. [ml-150]",
  outlier: "A data point far from the rest. Squared losses such as L2 and MSE penalize it much more than L1 loss does. [ml-151]",
}, "b05");

/* ---- Toy: Downhill (JS demo) ---- */
const B05_DATA = { x: [0.5, 1.0, 2.0, 4.0], y: [42, 48, 86, 172], b: 14.87 };
TOY("downhill", {
  title: "Downhill", level: "b05", color: "var(--lime-d)",
  short: "A ball walks down the loss curve one step at a time. Pick the learning rate.",
  goal: "Reach the bottom of the valley: keep stepping until the loss stops improving.",
  label: "A JavaScript demo of the idea, not Python code. It uses the four fictional tickets from b05_descent, with b held at 14.87 so the hill fits on one curve.",
  html: () => `<div class="row" role="group" aria-label="Learning rate">Learning rate:
      <button type="button" class="btn small plain dh-size" data-s="0.01" data-hint="A tiny step: safe and slow">0.01</button>
      <button type="button" class="btn small lime dh-size" data-s="0.05" aria-pressed="true" data-hint="The learning rate b05_descent uses">0.05</button>
      <button type="button" class="btn small plain dh-size" data-s="0.2" data-hint="A big step: watch what happens">0.2</button></div>
    <div class="dh-board"></div>
    <p class="panel dh-read" aria-live="polite"></p>
    <div class="row"><button type="button" class="btn tang dh-step" data-hint="Feel the slope and take one step downhill">Step</button>
      <button type="button" class="btn small sky dh-ten" data-hint="Take ten steps in a row">10 steps</button>
      <button type="button" class="btn small plain dh-reset" data-hint="Put the ball back at the start">Reset</button></div>`,
  init(root, ctx) {
    const D = B05_DATA;
    const mse = w => D.x.reduce((a, x, i) => a + (D.y[i] - (D.b + w * x)) ** 2, 0) / D.x.length;
    const slope = w => (mse(w + 0.001) - mse(w - 0.001)) / 0.002;
    let size = 0.05, w = 5, path = [5], done = false, n = 0, last = "";
    const f = () => B0X_PLOT.frame({ L: 62, x0: 0, x1: 80, y0: 0, y1: 10000, xt: [0, 20, 40, 60, 80], yt: [0, 2500, 5000, 7500, 10000], xl: "w (weight)", yl: "loss (MSE)" });
    const draw = () => {
      const F = f();
      let s = F.s, d = "";
      for (let v = 0; v <= 80; v += 1) d += (v ? "L" : "M") + F.sx(v).toFixed(1) + " " + F.sy(Math.min(mse(v), 10000)).toFixed(1);
      s += `<path d="${d}" fill="none" stroke="#9b6bff" stroke-width="3"/>`;
      const on = v => v >= 0 && v <= 80 && mse(v) <= 10000;
      const pts = path.filter(on);
      for (let k = 1; k < path.length; k++) if (on(path[k - 1]) && on(path[k])) s += `<line x1="${F.sx(path[k - 1])}" y1="${F.sy(mse(path[k - 1]))}" x2="${F.sx(path[k])}" y2="${F.sy(mse(path[k]))}" stroke="#141414" stroke-width="1.5" stroke-dasharray="4 3"/>`;
      pts.slice(0, -1).forEach(v => { s += `<circle cx="${F.sx(v)}" cy="${F.sy(mse(v))}" r="3" fill="#141414"/>`; });
      if (on(w)) s += `<circle cx="${F.sx(w)}" cy="${F.sy(mse(w))}" r="9" fill="#ff8a1f" stroke="#141414" stroke-width="2.5"/>`;
      $(".dh-board", root).innerHTML = B0X_PLOT.svg(s, `Loss curve with the ball at w = ${w.toFixed(2)}`);
      const off = on(w) ? "" : " The ball has flown off the chart.";
      $(".dh-read", root).innerHTML = rich(`Step ${n}: w = **${w.toFixed(2)}**, loss = **${mse(w).toFixed(2)}**.${off} ${last}`);
      $(".dh-step", root).disabled = $(".dh-ten", root).disabled = done;
    };
    const step = () => {
      if (done) return;
      const before = mse(w);
      w = w - size * slope(w); n++; path.push(w);
      const after = mse(w);
      if (after > before) last = "The loss went **up**. The step jumped over the valley.";
      else if (before - after < 0.001) { last = "Less than 0.001 better: the loss **stopped improving**. Converged."; done = true; ctx.goalDone("You reached the bottom. Try 0.01 and 0.2 too, and compare the number of steps."); }
      else last = `Down by ${(before - after).toFixed(2)}.`;
      if (Math.abs(w) > 1e6) { last = "The loss is exploding. This learning rate will never arrive. Press Reset."; done = true; }
    };
    const reset = () => { w = 5; path = [5]; n = 0; done = false; last = "Press Step."; draw(); };
    $(".dh-step", root).onclick = () => { step(); draw(); };
    $(".dh-ten", root).onclick = () => { for (let k = 0; k < 10 && !done; k++) step(); draw(); };
    $(".dh-reset", root).onclick = reset;
    $$(".dh-size", root).forEach(b => b.onclick = () => {
      size = +b.dataset.s;
      $$(".dh-size", root).forEach(x => { const on = x === b; x.classList.toggle("lime", on); x.classList.toggle("plain", !on); x.setAttribute("aria-pressed", String(on)); });
      reset();
    });
    reset();
  },
});

LEVEL({
  id: "b05", title: "Measuring Mistakes", job: "Teach Byte to improve a line one small step at a time.",
  color: "#c6f08a", scene: "bench", cast: ["nib", "byte"], toy: "downhill",
  sticker: { title: "Downhill Walker", glyph: "dw", color: "#c6f08a" },
  goals: ["Measure a model's mistakes with one loss number", "Write gradient descent in plain Python", "Know when to stop, and check against scikit-learn"],
  beats: [
    say("byte", "Yesterday I used a recipe for the best line. Today Dr. Nib says: no recipe allowed. Then how do I learn?", "think"),
    say("nib", "They start with a bad guess and improve it, step by step. Every step needs to know one thing: how wrong are we right now?"),
    say("nib", "That number is the [[loss]]. In training, the model compares its prediction with the label's actual value; the difference is the loss [ml-006]."),
    say("nib", "Google puts it plainly: loss is a number for how wrong the predictions are, and training tries to make it as small as possible [ml-149]."),
    say("nib", "We will use [[MSE]], mean squared error: square each mistake, then take the average over the samples [ml-148].", "think"),
    { predict: { program: "b05_mse", q: "scikit-learn's own example: four true values, four predictions. What MSE do the hand loop and the library get?" } },
    { ask: { q: "Two tickets. The line misses one by 2 and the other by 4. What is the MSE?", choices: ["3", "10", "20"], answer: 1,
      why: "Square each mistake: 4 and 16. Their average is (4 + 16) / 2 = 10." } },
    { show: ["nib", "byte", "gridlock"], ...say("gridlock", "Last month a customer haggled a $30 discount out of me. Does that one ticket spoil your number?", "think") },
    say("nib", "Squaring makes a big miss much bigger. So MSE leans toward outliers more than MAE, the average miss without signs [ml-151]."),
    { predict: { program: "b05_outlier", q: "Four small misses and one $30 miss. How much of the squared total comes from the $30 miss?" } },
    { ask: { q: "Why does one $30 miss outweigh four small ones in MSE?", choices: ["Squaring makes a large difference even larger", "MSE ignores small misses", "MSE only counts the last ticket"], answer: 0,
      why: "Squaring makes a large difference between prediction and label even larger, so L2 loss and MSE penalize an outlier much more [ml-151]. 30 squared is 900; 2 squared is 4." } },
    say("byte", "So the loss is my height on a hill, and I want to walk down to the lowest spot?", "wow"),
    say("nib", "Precisely. That walk is [[gradient descent]]: compute the loss, find which direction lowers it, move the weight and bias a little that way, repeat [ml-033]."),
    say("nib", "We feel the slope by nudging. Push b a tiny bit up and down and see which way the loss moves. Same for w. Then step downhill."),
    { predict: { program: "b05_descent", q: "Start at b = 0, w = 0 with learning rate 0.05. How does the loss change as Byte walks?" } },
    say("byte", "Huge drops first, then tiny ones. Then I stopped at step 23. Why did I stop?", "think"),
    say("nib", "Because more steps no longer helped much. Google says a model has converged when more iterations no longer reduce the loss meaningfully [ml-035]. We decided \"meaningfully\" means 0.001."),
    { ask: { q: "Which line of the program decides that descent has stopped improving?", choices: ["`learning_rate = 0.05`", "`if loss - new_loss < 0.001:`", "`for i in range(1, 501):`"], answer: 1,
      why: "It compares the old loss with the new one. When a step helps by less than 0.001, the program stops: our version of convergence [ml-035]." } },
    { show: ["nib", "byte", "gridlock"], ...say("gridlock", "Why such baby steps? Take a big one and finish before lunch.", "think") },
    { predict: { program: "b05_toobig", q: "The same walk with learning rate 0.2. Does it finish faster?" } },
    say("byte", "I jumped over the valley and landed higher every time! Ten thousand, twenty thousand... BEEP BEEP BEEP.", "wow"),
    say("nib", "That 0.2 is the [[learning rate]]: the small value that multiplies the gradient [ml-114]. It sets the step size [ml-115]. Too small is slow; too big never arrives."),
    say("nib", "Nobody learns it from the tickets. Settings that training never updates are [[hyperparameter|hyperparameters]] [ml-114]. Google says the learning rate is a number you set that influences how quickly the model converges [ml-117].", "think"),
    { ask: { q: "In `b05_descent`, which is a hyperparameter?", choices: ["`b`, the bias", "`w`, the weight", "`learning_rate`"], answer: 2,
      why: "The loop updates `b` and `w` on every step. It never touches `learning_rate`. Tunable values that the training loop does not update are hyperparameters [ml-114]." } },
    { toy: "downhill", goal: "Reach the bottom of the valley: keep stepping until the loss stops improving." },
    say("nib", "And now my favorite question. How do we know descent found the right bottom?", "think"),
    { predict: { program: "b05_compare", q: "scikit-learn fits the same four tickets directly. Does it agree with descent's b = 14.66, w = 38.55?" } },
    { ask: { q: "Why can descent on a linear model trust that the bottom it finds is the real bottom?", choices: ["Linear models have a convex loss surface: one bowl, one bottom", "Gradient descent always takes exactly 23 steps", "scikit-learn checks every step"], answer: 0,
      why: "Google says linear models have a convex loss surface [ml-035]. A bowl has one lowest point, so downhill always leads there." } },
    { book: 4, text: "The book has the whole chapter, with both programs side by side." },
    say("nib", "Now write it yourself: your own `mse` and your own downhill `step`."),
    { machine: ["b05-descent"] },
    say("gridlock", "So the Quote Machine learns by being wrong a little less each time. I have employees like that.", "think"),
    say("byte", "Loss measured. Hill walked. Answer checked twice. BEEP BOOP!", "wow"),
    { sticker: true },
  ],
});
