/* B0. Rules or Examples? What machine learning is, and its main types. */

PAGES("b00", [
  {
    h: "Rules or examples?",
    body: [
      "Monday morning, new week, new bench. Ms. Gridlock wants a Quote Machine: type in a repair, get a price. Before anyone builds it, it helps to know what kind of machine it is.",
      "Google defines [[machine learning]] as the process of training software, called a [[model]], to make useful predictions or generate content from data [ml-001]. The important word is *data*. All through Module A, you wrote the rules yourself. Here, the program works rules out from examples.",
      "Here is the old way first. Ms. Gridlock wrote two rules for sorting tickets into big jobs and quick jobs. The program checks the rules against five tickets where we already know the answer.",
      { code: "b00_rules", out: true },
      "Two of five wrong, and both rules looked sensible. Jurafsky and Martin make the same point: handwritten classification rules can be fragile, and the most common approach is supervised machine learning with a labeled training set and a learning algorithm [ml-012].",
      { analogy: "A rule says: \"if the fan grinds, the bearing is shot.\" An example set says: \"here are 200 fans, what each one sounded like, and what was really wrong.\" The helper is still a very literal helper. With examples, it gets to find the pattern itself." },
    ],
  },
  {
    h: "Learning from examples",
    body: [
      "Now the new way. This program never says what grinding means. It counts what happened in eight past jobs and lets the counts decide.",
      { code: "b00_examples", out: true },
      { trace: "b00_examples", label: "🔍 Watch the tallies fill up" },
      "That is a very small learner, and it already has the vocabulary of the whole module. In supervised learning the [[feature|features]] are what the model uses to predict the [[label]], and the label is the answer we want predicted [ml-005]. Here the sound is the feature and the job size is the label.",
      "Real learners improve step by step. During supervised [[training]] the model compares its prediction with the label's actual value; the difference is the [[loss]], and the model gradually updates its solution [ml-006]. Our tally learner does all its learning in one pass. Levels B4 and B5 build one that improves a little at a time.",
      { honest: "The tickets, sounds and job sizes are fictional. The outputs above are what real Python printed." },
    ],
  },
  {
    h: "Four kinds of learning",
    body: [
      "Google's introduction names four types of ML system: [[supervised learning]], [[unsupervised learning]], [[reinforcement learning]] and [[generative AI]] [ml-002].",
      { table: { head: ["Type", "What it gets", "Shop example (our own)"], rows: [
        ["Supervised", "examples with the right answers (labels) [ml-005]", "past tickets with their final prices"],
        ["Unsupervised", "data without the correct answer; it finds groupings, often by clustering [ml-003]", "sort 500 old tickets into piles nobody named"],
        ["Reinforcement", "rewards and penalties; it produces a policy [ml-004]", "a sorting arm that gets a point for each right bin"],
        ["Generative AI", "data, to generate content [ml-001]", "drafting a reply to a customer's note"],
      ] } },
      "GeeksforGeeks lists three main types (supervised, unsupervised and reinforcement) and also covers semi-supervised and self-supervised learning [ml-007]. Only that one source covers semi-supervised learning for us so far, so this book keeps it to that one sentence.",
      { nerd: "Why the table has a column of our own", body: [
        "The first two columns come from the sources. The shop examples are ours, to make the types easy to tell apart. Later levels go deeper into each type with their own sources.",
      ] },
    ],
  },
  {
    h: "The Quote Machine plan",
    body: [
      "A Quote Machine predicts a price. We have old tickets, and each one has its final price written on it. That is labeled data, so the Quote Machine is a supervised learning job [ml-005].",
      { ol: [
        "**B1:** set up a bench on your computer with the tools.",
        "**B2:** turn tickets into tables of numbers.",
        "**B3:** draw the data and look at it.",
        "**B4:** fit a straight line through it.",
        "**B5:** measure the line's mistakes and walk them downhill.",
      ] },
      { toy: "rulesvsexamples", label: "Try writing rules yourself" },
      { machine: ["b00-learn"], label: "Go to your machine: learn a rule from examples" },
    ],
  },
]);

GLOSS({
  "machine learning": "Training software, called a model, to make useful predictions or generate content from data. [ml-001]",
  model: "The software that machine learning trains to make predictions or generate content. [ml-001]",
  feature: "In supervised learning, something the model uses to predict the label, such as a ticket's hours of work. [ml-005]",
  label: "In supervised learning, the answer we want the model to predict, such as a ticket's final cost. [ml-005]",
  "supervised learning": "Learning from examples that come with the answers (labels). [ml-005] Handwritten rules can be fragile; supervised learning with a labeled training set is the most common approach. [ml-012]",
  "unsupervised learning": "Learning from data without the correct answers, by finding groupings in it, often with clustering. [ml-003]",
  "reinforcement learning": "Learning from rewards and penalties, which produces a policy. [ml-004]",
  "generative ai": "One of the four types of ML system in Google's introduction [ml-002]: models that generate content from data. [ml-001]",
  training: "In supervised training the model compares its prediction with the label's actual value and gradually updates its solution. [ml-006]",
  loss: "The difference between a model's prediction and the label's actual value during training. [ml-006]",
}, "b00");

/* ---- Toy: Rules vs Examples (JS demo) ---- */
const B0_RULES = [
  { id: "fridge", text: "Fridges are big jobs", test: t => t.app === "fridge" },
  { id: "grind", text: "Grinding means a big job", test: t => t.sound === "grinding" },
  { id: "old", text: "Older than 10 years means a big job", test: t => t.age > 10 },
  { id: "hum", text: "Humming means a big job", test: t => t.sound === "humming" },
];
const B0_BATCHES = [
  [
    { app: "fridge", sound: "humming", age: 12, size: "big" },
    { app: "toaster", sound: "grinding", age: 3, size: "big" },
    { app: "kettle", sound: "quiet", age: 2, size: "quick" },
    { app: "fan", sound: "clicking", age: 8, size: "quick" },
    { app: "lamp", sound: "quiet", age: 15, size: "quick" },
    { app: "blender", sound: "grinding", age: 5, size: "big" },
    { app: "radio", sound: "humming", age: 4, size: "quick" },
    { app: "fridge", sound: "quiet", age: 6, size: "big" },
  ],
  [
    { app: "fan", sound: "grinding", age: 1, size: "quick" },
    { app: "fridge", sound: "clicking", age: 2, size: "quick" },
    { app: "kettle", sound: "humming", age: 9, size: "big" },
    { app: "clock", sound: "quiet", age: 3, size: "quick" },
    { app: "vacuum", sound: "grinding", age: 7, size: "big" },
    { app: "toaster", sound: "smoking", age: 6, size: "big" },
  ],
];

TOY("rulesvsexamples", {
  title: "Rules vs Examples", level: "b00", color: "var(--grape)",
  short: "Write sorting rules for repair tickets, then watch new tickets break them.",
  goal: "Switch on rules until every ticket in the first pile is right. Then let the new tickets in.",
  label: "A JavaScript demo of the idea, not Python code. The tickets are fictional.",
  html: () => `<div class="panel"><p class="rv-h">Your rules. A ticket is a <b>big job</b> if any rule you switched on fits it. Otherwise it is quick.</p><div class="rv-rules"></div></div>
    <div class="row rv-bar"><span class="readout rv-score" aria-live="polite"></span>
      <button type="button" class="btn small sky rv-next" data-hint="Let a fresh pile of tickets in and test your rules on them">New tickets arrive</button>
      <button type="button" class="btn small plain rv-back" data-hint="Go back to the first pile of tickets" hidden>First pile</button></div>
    <div class="rv-grid"></div><div class="rv-note panel" hidden></div>`,
  init(root, ctx) {
    const on = new Set();
    let batch = 0, perfect = false;
    const rulesBox = $(".rv-rules", root), grid = $(".rv-grid", root), score = $(".rv-score", root), note = $(".rv-note", root);
    B0_RULES.forEach(r => {
      const b = el("button.btn.small.plain", { type: "button", "aria-pressed": "false", "data-hint": "Switch this rule on or off: " + r.text }, r.text);
      b.onclick = () => { if (on.has(r.id)) on.delete(r.id); else on.add(r.id); b.setAttribute("aria-pressed", on.has(r.id) ? "true" : "false"); b.classList.toggle("lime", on.has(r.id)); b.classList.toggle("plain", !on.has(r.id)); draw(); };
      rulesBox.append(b);
    });
    const guess = t => B0_RULES.some(r => on.has(r.id) && r.test(t)) ? "big" : "quick";
    const draw = () => {
      const list = B0_BATCHES[batch];
      grid.innerHTML = "";
      let right = 0;
      list.forEach(t => {
        const g = guess(t), ok = g === t.size;
        if (ok) right++;
        grid.append(el("div.rv-card" + (ok ? ".ok" : ".bad"), { "data-hint": `${t.app}: rules say ${g}, really ${t.size}` },
          el("b", {}, t.app), el("span", {}, `${t.sound}, ${t.age} yr${t.age === 1 ? "" : "s"}`),
          el("span", {}, "rules say: ", el("b", {}, g)), el("span", {}, "really: ", el("b", {}, t.size)),
          el("span.rv-mark", { "aria-label": ok ? "right" : "wrong" }, ok ? "✔︎" : "✘")));
      });
      score.textContent = `${right} of ${list.length} right`;
      if (batch === 0 && right === list.length) perfect = true;
      $(".rv-next", root).hidden = batch === 1;
      $(".rv-back", root).hidden = batch === 0;
      if (batch === 1) {
        note.hidden = false;
        note.innerHTML = rich(perfect
          ? "Same rules, new tickets, and they break. A new fridge with a loose door is a quick job. A humming kettle can be a big one. Each fix you add is one more rule to keep up to date. Jurafsky and Martin call handwritten rules fragile [ml-012]."
          : "Tip: go back to the first pile and make every ticket right first. Then see what the new pile does to your rules.");
        if (perfect) ctx.goalDone("Your perfect rules met new tickets and broke. That is the case for learning from examples.");
      } else note.hidden = true;
    };
    $(".rv-next", root).onclick = () => { batch = 1; draw(); };
    $(".rv-back", root).onclick = () => { batch = 0; draw(); };
    draw();
  },
});

LEVEL({
  id: "b00", title: "Rules or Examples?", job: "Ms. Gridlock wants a Quote Machine.",
  color: "#c9b5ff", scene: "bench", cast: ["gridlock"], toy: "rulesvsexamples",
  sticker: { title: "Pattern Spotter", glyph: "?!", color: "#c9b5ff" },
  goals: ["Say what machine learning is", "Tell rules from examples", "Name the four types of learning"],
  beats: [
    nar("A new week at Gadget Gulch. Someone has cleared the back office and wheeled in a purple machine with a sign: LEARNING BENCH."),
    say("gridlock", "{{you}}! Customers keep asking what a repair will cost, and I keep guessing. I want a Quote Machine. Type in the job, out comes a price. By Saturday.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "A Quote Machine. Lovely. And my first question, which will also be my last question every day this week: how will you know it works?", "think") },
    say("gridlock", "Easy. I'll write the rules. Fridges cost a lot. Grinding noises cost a lot. Everything else is cheap."),
    say("nib", "Let's test those rules on five old tickets where we already know the answer. Old answers are the cheapest test there is."),
    { predict: { program: "b00_rules", q: "Ms. Gridlock's two rules meet five old tickets. How many do they get right?",
      choices: ["5 of 5 right", "rule broke on: fan grinding\nrule broke on: lamp quiet\n3 of 5 right", "rule broke on: fridge humming\n4 of 5 right"], answer: 1,
      why: "The fan was grinding and was still a quick fix. The quiet lamp turned out to be a big job. Both rules looked sensible." } },
    say("gridlock", "A quiet lamp?! Fine. I'll add a rule for lamps.", "think"),
    say("nib", "And next week a rule for quiet radios, and then one for quiet radios on Tuesdays. Jurafsky and Martin call handwritten rules fragile. The usual approach is to learn from labeled examples instead [ml-012].", "wow"),
    { show: ["nib", "byte"], ...say("byte", "BEEP. I can learn from examples! Give me old jobs and their answers, and I will count.", "wow") },
    say("nib", "Google defines [[machine learning]] as training software, called a [[model]], to make useful predictions or generate content from data [ml-001]."),
    { trace: { program: "b00_examples", note: "Byte never gets a rule about grinding. Watch the tallies decide." } },
    say("nib", "Byte just did supervised learning in miniature. The sound is the [[feature]]: what the model uses to predict. The job size is the [[label]]: the answer we want [ml-005]."),
    { ask: { q: "For the Quote Machine, which part of an old ticket is the **label**?", choices: ["the appliance's name", "the hours of work", "the final price"], answer: 2,
      why: "The label is the answer we want the model to predict [ml-005]. The Quote Machine predicts the price. Hours and appliance are features." } },
    say("nib", "Supervised learning is one of four types in Google's introduction. The others are unsupervised learning, reinforcement learning and generative AI [ml-002].", "think"),
    say("byte", "Unsupervised: nobody gives me answers, and I find groups by myself [ml-003]. Reinforcement: I get points and penalties [ml-004]. Generative: I make new content [ml-001]."),
    { ask: { q: "Predicting a repair cost from old tickets that have their prices on them. Which type is that?", choices: ["supervised learning", "unsupervised learning", "reinforcement learning"], answer: 0,
      why: "The old tickets carry the answers, so they are labeled examples. Learning from labeled examples is supervised learning [ml-005]." } },
    { ask: { q: "Byte gets 500 old tickets with **no** prices and is asked to sort them into piles that look alike. Which type?", choices: ["supervised learning", "unsupervised learning", "generative AI"], answer: 1,
      why: "No correct answers, and the job is finding groupings: that is unsupervised learning, often done with clustering [ml-003]." } },
    { book: 0, text: "The book has this chapter, with the programs and sources you can click." },
    say("gridlock", "Hmph. Before I give up on my rules, let me try writing better ones.", "think"),
    { toy: "rulesvsexamples", goal: "Make every ticket in the first pile right. Then let the new tickets in." },
    say("nib", "Now write a learner of your own. Your machine, your code, real Python."),
    { machine: ["b00-learn"] },
    say("byte", "Rules are fragile. Examples are friends. BEEP BOOP."),
    { sticker: true },
  ],
});
