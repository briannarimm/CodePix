/* B14. Other Ways to Learn: reinforcement, semi-supervised, self-supervised. Toy: rewards (Fuse Hunt). */

PAGES("b14", [
  {
    h: "More than one way to learn",
    body: [
      "So far the Learning Bench has learned from examples with answers attached: tickets with their real costs, notes with their real labels. In supervised learning, the label is the answer the model learns to predict [ml-005]. There are other kinds.",
      "Google's introduction names four types of machine learning system: supervised learning, unsupervised learning, reinforcement learning and generative AI [ml-002]. GeeksforGeeks lists three main types (supervised, unsupervised and reinforcement) and also covers semi-supervised and self-supervised learning [ml-007].",
      { table: { head: ["Kind", "Where the answers come from (our own summary)"], rows: [
        ["Supervised", "A person attached the right answer to every example."],
        ["Unsupervised", "No answers at all. The model looks for groups. [ml-003]"],
        ["Reinforcement", "Rewards and penalties after each try. [ml-004]"],
        ["Self-supervised", "The data supplies its own labels. [ml-013]"],
        ["Semi-supervised", "Some examples have labels and the rest do not. [ml-135]"],
      ] } },
      "This chapter visits the last three.",
    ],
  },
  {
    h: "Learning from rewards",
    body: [
      "In Google's introduction, reinforcement learning learns from rewards and penalties and produces a policy [ml-004]. Nobody hands the learner the right answer. It tries something, gets a [[reward]] or nothing, and slowly builds a habit. That habit is its [[policy]].",
      { analogy: "Byte is hunting for a spare fuse on three shelves. Nobody tells Byte which shelf is best. Each time Byte finds a fuse, it gets a gold star. After many tries, Byte's habit is to check the shelf with the most stars per try first." },
      "Here is that hunt in plain Python. Each shelf has a hidden chance of holding a fuse. Byte keeps the average reward for each shelf, usually picks the best so far, and sometimes picks at random to keep exploring.",
      { code: "b14_rewards", out: true },
      { honest: "The shelves and their chances are fictional. This program is our own small example of learning from rewards, and it is not any named algorithm. The random module's seeds are subject to change across Python versions, so your numbers may differ [py-122]." },
      "Real reinforcement learning algorithms have names of their own. GeeksforGeeks lists Q-learning and SARSA [ml-010]. Code Pix does not cover them.",
      { toy: "rewards", label: "Try it: Fuse Hunt" },
      { machine: ["b14-rewards"], label: "Go to your machine: learn from rewards" },
    ],
  },
  {
    h: "Labels for free",
    body: [
      "Labels are expensive. Somebody has to sit down and write the right answer next to every example. Self-supervised learning skips that step.",
      "Jurafsky and Martin call language-model pretraining self-supervised, because the natural sequence of words supplies its own labels [ml-013]. Each next word in the text is the answer for the words before it.",
      "This program takes one fictional repair note and turns it into five training examples, without anyone typing a label.",
      { code: "b14_selfsup", out: true },
      { trace: "b14_selfsup", label: "🔍 Watch the pairs appear" },
      "GeeksforGeeks gives BERT and GPT as examples of self-supervised models that predict masked words from context [ml-011]. Same trick, different blank: hide a word, then guess it.",
      "This is how large language models learn. Zhang and colleagues say decoder-only transformers, the de facto architecture for large-scale language modeling, learn from unlabeled text through self-supervised learning [ml-130].",
    ],
  },
  {
    h: "A few labels go a long way",
    body: [
      "Sometimes there is a middle road. A person labels a handful of examples and leaves the rest blank.",
      "scikit-learn describes [[semi-supervised learning]] as learning from training data in which some samples are not labeled. Its semi-supervised estimators use the unlabeled data to better capture the shape of the data, and they can do well with very few labeled points and many unlabeled ones [ml-135]. GeeksforGeeks lists it as a type of machine learning too [ml-007].",
      "To mark a point as unlabeled, scikit-learn's semi-supervised estimators use the integer -1 in `y` [ml-136].",
      { analogy: "Ms. Gridlock sorts two tickets into the trays herself: one small job, one big job. The other eight sit on the counter. Each one goes to whichever tray its nearest neighbors went to, and the sorting spreads outward from the two she did." },
      "This program gives `LabelSpreading`, one of scikit-learn's semi-supervised classes, ten fictional tickets. Only two carry a label.",
      { code: "b14_semisup", out: true },
      "Two labels in, ten labels out. The small jobs cluster at the low end and the big ones at the high end, so the two labels had plenty of shape to spread along.",
      { honest: "The tickets are fictional and the two groups are far apart on purpose. Real data is rarely this tidy, and a label in the wrong place can spread just as far as a right one. (Our own caution.)" },
    ],
  },
]);

GLOSS({
  reward: "The signal reinforcement learning learns from: rewards and penalties after each try. [ml-004]",
  policy: "What reinforcement learning produces, in Google's introduction. [ml-004] In the Fuse Hunt toy, the policy is Byte's habit of which shelf to check first.",
  "self-supervised learning": "Learning where the data supplies its own labels, as in language-model pretraining, where each next word is the label. [ml-013]",
  "semi-supervised learning": "Learning from training data in which some samples are not labeled; the unlabeled data helps capture the shape of the data. [ml-135] scikit-learn marks an unlabeled point with -1 in y. [ml-136]",
}, "b14");

/* Toy: Fuse Hunt. A JavaScript demo of learning from rewards (a three-shelf bandit). */
TOY("rewards", {
  title: "Fuse Hunt", level: "b14", color: "var(--lime-d)",
  short: "Byte learns which shelf hides fuses, from rewards alone.",
  goal: "Let Byte try at least 30 times, until its habit points at the best shelf.",
  label: "A JavaScript demo of the idea, not Python code. The chances are fictional and change each time you reset.",
  html: () => `<div class="rw-shelves"></div>
    <p class="readout rw-habit" aria-live="polite"></p>
    <label class="rw-explore">How often Byte explores at random: <b></b><input type="range" min="0" max="50" step="5" value="10" data-hint="How often Byte ignores its habit and tries a random shelf"></label>
    <div class="row">
      <button type="button" class="btn small lime rw-one" data-hint="Byte searches one shelf">Try once</button>
      <button type="button" class="btn small sky rw-ten" data-hint="Byte searches ten times in a row">Try 10 times</button>
      <button type="button" class="btn small plain rw-reveal" data-hint="Show the hidden chances">Peek at the chances</button>
      <button type="button" class="btn small plain rw-reset" data-hint="New shelves, new chances, and Byte forgets everything">Reset</button>
    </div>
    <p class="rw-log" aria-live="polite"></p>`,
  init(root, ctx) {
    const names = ["top", "middle", "bottom"];
    const presets = [[0.2, 0.7, 0.4], [0.6, 0.3, 0.15], [0.25, 0.35, 0.75], [0.5, 0.1, 0.3]];
    let chance, total, tries, n, peek;
    const slider = $("input", root), shelves = $(".rw-shelves", root), habit = $(".rw-habit", root), log = $(".rw-log", root);
    const avg = i => (tries[i] ? total[i] / tries[i] : 0);
    const best = () => [0, 1, 2].reduce((a, b) => (avg(b) > avg(a) ? b : a), 0);
    const realBest = () => [0, 1, 2].reduce((a, b) => (chance[b] > chance[a] ? b : a), 0);
    function reset() {
      chance = presets[Math.floor(Math.random() * presets.length)].slice();
      total = [0, 0, 0]; tries = [0, 0, 0]; n = 0; peek = false; log.textContent = "";
      draw();
    }
    function draw() {
      $("b", $(".rw-explore", root)).textContent = slider.value + "%";
      shelves.innerHTML = "";
      const b = best();
      names.forEach((nm, i) => {
        shelves.append(el("button.rw-shelf" + (n && i === b ? ".best" : ""), { type: "button", "data-hint": `Make Byte search the ${nm} shelf`, onclick: () => step(i) },
          el("span.rw-name", {}, nm + " shelf"),
          el("span.rw-bar", { style: { "--w": Math.round(avg(i) * 100) + "%" } }),
          el("span.rw-num", {}, `${tries[i]} tries, average ${avg(i).toFixed(2)}`),
          peek ? el("span.rw-peek", {}, `hidden chance ${chance[i]}`) : null));
      });
      habit.textContent = n ? `Byte's habit (policy): look on the ${names[b]} shelf first. ${n} tries so far.` : "Byte has not tried any shelf yet.";
      if (n >= 30 && best() === realBest()) ctx.goalDone("Byte's habit now matches the best shelf, learned from rewards alone.");
    }
    function step(forced) {
      let i = forced;
      if (i == null) {
        const untried = [0, 1, 2].find(k => !tries[k]);
        if (untried != null) i = untried;
        else if (Math.random() * 100 < +slider.value) i = Math.floor(Math.random() * 3);
        else i = best();
      }
      const r = Math.random() < chance[i] ? 1 : 0;
      total[i] += r; tries[i]++; n++;
      log.textContent = `Try ${n}: ${names[i]} shelf, ${r ? "found a fuse! Reward 1." : "nothing. Reward 0."}`;
      draw();
    }
    $(".rw-one", root).addEventListener("click", () => step());
    $(".rw-ten", root).addEventListener("click", () => { for (let k = 0; k < 10; k++) step(); });
    $(".rw-reveal", root).addEventListener("click", () => { peek = !peek; draw(); });
    $(".rw-reset", root).addEventListener("click", reset);
    slider.addEventListener("input", draw);
    reset();
  },
});

LEVEL({
  id: "b14", title: "Other Ways to Learn", job: "Byte keeps losing the spare fuses.",
  color: "#9be34a", scene: "bench", cast: ["byte"], toy: "rewards",
  sticker: { title: "Gold Star Learner", glyph: "★", color: "#9be34a" },
  goals: ["Learn from rewards and build a policy", "Make labels from raw text", "Know which kinds of learning Code Pix covers"],
  beats: [
    say("byte", "BEEP. Ms. Gridlock asked for a spare fuse. There are three shelves. Nobody labeled them. I am sad in a very efficient way.", "think"),
    { show: ["byte", "nib"], ...say("nib", "Then nobody can give you the right answers, and supervised learning is out. Good. Today we meet the other ways machines learn.") },
    say("nib", "Google's introduction names four types: supervised, unsupervised, reinforcement learning and generative AI [ml-002]. Reinforcement learning learns from rewards and penalties and produces a policy [ml-004].", "think"),
    say("nib", "So here is the deal, Byte. Each time you find a fuse, you get a [[reward]] of 1. Nothing found, 0. Keep an average for each shelf."),
    { show: ["byte", "nib", "gridlock"], ...say("gridlock", "And I pay in gold stars. Very cheap. Very motivating.") },
    { toy: "rewards", goal: "Let Byte try at least 30 times, until its habit points at the best shelf." },
    { ask: { q: "In reinforcement learning, what does the learner end up with?", choices: ["A labeled training set", "A policy: a habit for what to do", "A list of clusters"], answer: 1,
      why: "Google's introduction says reinforcement learning produces a policy [ml-004]." } },
    say("nib", "Why let Byte pick a random shelf now and then? Think about it before you look at the program.", "think"),
    { ask: { q: "What could go wrong if Byte never explored at random?", choices: ["Nothing; the first lucky shelf is always the best", "An early lucky streak could lock Byte onto a worse shelf", "Byte would run out of fuses"], answer: 1,
      why: "If Byte only ever checks its current favorite, it never collects the evidence that another shelf is better." } },
    { predict: { program: "b14_rewards", q: "Byte searches 200 times. The middle shelf has the best hidden chance. Which shelf do you expect Byte to try most?" } },
    { show: ["nib", "byte"], ...say("byte", "Middle shelf, most of the time. My policy is excellent. My shelf-walking is tired.", "wow") },
    say("nib", "Now a different trick. Labels are expensive: someone has to write every right answer. What if the data wrote its own labels?"),
    say("nib", "Jurafsky and Martin call language-model pretraining self-supervised, because the natural sequence of words supplies its own labels [ml-013]. Every next word is a free answer.", "wow"),
    { predict: { program: "b14_selfsup", q: "One note, *the fan rattles when it spins*. Each line pairs the words so far with the next word. How many pairs?" } },
    { trace: { program: "b14_selfsup", note: "Watch `pairs` grow. Nobody typed a single label." } },
    { ask: { q: "In self-supervised learning, who writes the labels?", choices: ["A person, one at a time", "The data itself, such as the next word in a text", "The reward signal"], answer: 1,
      why: "The natural sequence of words supplies its own labels [ml-013]." } },
    say("nib", "One more middle road: [[semi-supervised learning]]. Some examples have labels and the rest do not. The unlabeled ones still show the shape of the data [ml-135].", "think"),
    { show: ["nib", "gridlock"], ...say("gridlock", "So I label two tickets and the machine sorts the other eight? I can live with two.") },
    { ask: { q: "In scikit-learn's semi-supervised estimators, how do you mark a ticket that has no label?", choices: ["Leave it out of the data", "Put -1 in y", "Put 0 in y"], answer: 1,
      why: "scikit-learn's semi-supervised estimators mark unlabeled points with the integer -1 in y [ml-136]." } },
    { book: 1, text: "The book has the whole chapter, including the Fuse Hunt program." },
    say("gridlock", "Gold stars work on robots. Noted. Now teach the same trick to the real computer.", "think"),
    { machine: ["b14-rewards"] },
    say("byte", "Fuse found. Reward received. Sticker incoming. BEEP BOOP."),
    { sticker: true },
  ],
});
