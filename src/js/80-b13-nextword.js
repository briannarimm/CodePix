/* B13. Maps and Next-Word Machines: embeddings, language models, transformers. Toy: wordmap (Word Map). */
// TODO(research): Google's embeddings and LLM pages are a GAP. Add facts before teaching cosine similarity,
// how embeddings are learned, tokens, or how attention works. This level only names those ideas.

PAGES("b13", [
  {
    h: "Words as points on a map",
    body: [
      "The Quote Machine reads repair notes. To do anything clever with words, a model needs numbers. One idea is to give every word a place on a map.",
      "Jurafsky and Martin picture word meaning as points in space. In their picture, *sweet* sits near *honey*, *juice* and *candy*, and far from *fried* or *soup* [ml-086]. In Code Pix we call a word's place, written as a list of numbers, its [[embedding]].",
      { analogy: "Think of the shop floor. The kettles, teapots and toasters live by the kitchen bench. Bolts, springs and washers live by the hardware drawers. If you know where something sits, you already know a little about what it is." },
      "Here is a tiny map of shop words in plain Python. Each word has two numbers: how far across and how far up.",
      { code: "b13_wordmap", out: true },
      { honest: "We invented these positions for the demo. No model learned them. Real embeddings come from training, and Code Pix does not cover that yet." },
      "The same map fits neatly into a NumPy array, one row per word. NumPy then measures every distance in one line.",
      { code: "b13_wordmap_np", out: true },
      { toy: "wordmap", label: "Try it: the Word Map" },
    ],
  },
  {
    h: "Next-word machines",
    body: [
      "Jurafsky and Martin define a [[language model]] as a computational system that can predict the next word from previous words [ml-087].",
      "The oldest trick is counting. The n-gram idea approximates a word's probability given its whole history by using only the last few words [ml-088]. Our machine looks back just one word. It counts which word follows which in four fictional repair notes, then keeps taking the most common next word.",
      { code: "b13_nextword", out: true },
      { trace: "b13_nextword", label: "🔍 Watch the counting cabinet fill up" },
      { analogy: "The counts are a filing cabinet. Each drawer is labeled with a word, and inside are tally marks for every word that came right after it." },
      "This idea has a long history. Jurafsky and Martin say Fred Jelinek and colleagues at IBM, between 1975 and 1985, invented the term *language model* and developed n-gram language models [ml-089].",
    ],
  },
  {
    h: "Choosing the next word",
    body: [
      "Once a model has its counts or probabilities, it still has to pick a word. Jurafsky and Martin describe several decoding choices: greedy decoding, random sampling, temperature sampling, and top-k and top-p sampling [ml-091].",
      "The machine on the last page always took the top word, which is what we call the greedy choice here. This version draws the next word at random, weighted by its count.",
      { code: "b13_sample", out: true },
      "Look at the first line. *The toaster needs a new knob* is not in any of the four notes. The machine glued together pieces it had seen.",
      { honest: "The random module's algorithms and seeding are subject to change across Python versions, so a seed does not promise the same words on every version [py-122]." },
      { nerd: "Copying versus creating", body: [
        "Look back further and the machine copies more. Jurafsky and Martin show that higher-order n-gram models copy their training text more closely, and a 4-gram model trained on Shakespeare reproduces a line from *King John* [ml-053].",
      ] },
      { machine: ["b13-nextword"], label: "Go to your machine: build a next-word machine" },
    ],
  },
  {
    h: "Transformers and large language models",
    body: [
      "Jurafsky and Martin picture a [[large language model]] as a structured neural network that represents tokens internally as vectors [ml-087]. That is the map idea again, inside a much bigger machine.",
      "One design you will hear about is the [[transformer]]. Jurafsky and Martin date the transformer architecture to 2017 (Vaswani et al.) and the rise of prompting to 2019 [ml-092].",
      "Their chapter on transformers covers [[attention]], transformer blocks, input embeddings for tokens and positions, the language modeling head, and decoding [ml-090]. Each of those is a chapter of its own.",
      { honest: "Code Pix stops here for now. Our sources on embeddings and large language models are still being checked, so the book does not yet explain how attention works." },
      "One more thing to carry into the next job: where do the labels come from? Jurafsky and Martin call language-model pretraining self-supervised, because the natural sequence of words supplies its own labels [ml-013]. Every next word in a pile of text is a free answer key.",
      { level: "b14", label: "Next job: Other Ways to Learn" },
    ],
  },
]);

GLOSS({
  embedding: "In Code Pix, a word's place on a map of meaning, written as a list of numbers. Jurafsky and Martin picture word meaning as points in space. [ml-086]",
  "language model": "A computational system that can predict the next word from previous words. [ml-087]",
  "large language model": "A language model pictured as a structured neural network that represents tokens internally as vectors. [ml-087]",
  transformer: "An architecture that Jurafsky and Martin date to 2017 (Vaswani et al.). [ml-092] Their transformer chapter covers attention, transformer blocks and input embeddings for tokens and positions. [ml-090]",
  attention: "A part of the transformer, covered in Jurafsky and Martin's transformer chapter. [ml-090] Code Pix does not explain it yet.",
}, "b13");

/* Toy: Word Map. Invented positions for shop words; click a word to see its nearest neighbors. */
const B13_WORDS = {
  kettle: [1.4, 8.8], teapot: [2.6, 7.4], toaster: [4, 9.4], blender: [0.9, 6.2],
  spring: [9, 3.6], bolt: [6.6, 1], washer: [8.6, 1.4], gear: [7.2, 2.6],
  radio: [5, 6], lamp: [3.6, 4.6], fuse: [6.4, 4.8], switch: [5, 3.4],
};
TOY("wordmap", {
  title: "Word Map", level: "b13", color: "var(--sky)",
  short: "Shop words as points on a map. Near means related.",
  goal: "Pick three different words and look at their nearest neighbors.",
  label: "A JavaScript demo of the idea, not Python code. The positions are invented for this demo; no model learned them.",
  html: () => `<div class="wm-wrap"><div class="wm-map"></div><div class="wm-side"><p class="wm-pick-label">Pick a word:</p><div class="row wm-words"></div><div class="panel wm-out" aria-live="polite">Pick a word to see its three nearest neighbors.</div></div></div>`,
  init(root, ctx) {
    const map = $(".wm-map", root), out = $(".wm-out", root), words = $(".wm-words", root);
    const seen = new Set();
    const X = x => 20 + x * 26, Y = y => 280 - y * 26;
    const dist = (a, b) => Math.hypot(B13_WORDS[a][0] - B13_WORDS[b][0], B13_WORDS[a][1] - B13_WORDS[b][1]);
    let cur = null;
    function draw() {
      let s = A.rect(0, 0, 300, 300, "#fffdf6", { sw: 0 });
      for (let k = 0; k <= 10; k += 2) s += A.line(X(k), Y(0), X(k), Y(10), { stroke: "#eee2c4", sw: 1 }) + A.line(X(0), Y(k), X(10), Y(k), { stroke: "#eee2c4", sw: 1 });
      const near = cur ? Object.keys(B13_WORDS).filter(w => w !== cur).sort((a, b) => dist(cur, a) - dist(cur, b)).slice(0, 3) : [];
      near.forEach(w => { s += A.line(X(B13_WORDS[cur][0]), Y(B13_WORDS[cur][1]), X(B13_WORDS[w][0]), Y(B13_WORDS[w][1]), { stroke: "#ff8a1f", sw: 4 }); });
      Object.entries(B13_WORDS).forEach(([w, [x, y]]) => {
        const on = w === cur, nb = near.includes(w);
        s += `<g class="wm-dot" data-w="${w}" tabindex="0" role="button" aria-label="${w}" data-hint="Show the words nearest to ${w}">` +
          A.circ(X(x), Y(y), on ? 10 : 7, on ? "#ff8a1f" : nb ? "#ffe45c" : "#5cc8ff", { sw: 2 }) +
          A.text(X(x), Y(y) - 13, w, { size: 12, font: "JetBrains Mono, monospace" }) + "</g>";
      });
      map.innerHTML = A.svg("0 0 300 300", s, "board", "A map of twelve shop words. Kitchen gadgets sit top left, hardware bottom right, electrical parts in the middle.");
      $$(".wm-dot", map).forEach(g => {
        g.addEventListener("click", () => choose(g.dataset.w));
        g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(g.dataset.w); } });
      });
      if (cur) {
        out.innerHTML = "";
        out.append(el("p", { html: rich(`Nearest to **${cur}**:`) }), el("ol", {}, near.map(w => el("li", {}, `${w} (distance ${dist(cur, w).toFixed(2)})`))));
      }
    }
    function choose(w) {
      cur = w; seen.add(w);
      $$("button", words).forEach(b => { b.classList.toggle("sky", b.dataset.w === w); b.classList.toggle("plain", b.dataset.w !== w); });
      draw();
      if (seen.size >= 3) ctx.goalDone("Related words sit close together on this map. A real model learns its map from text.");
    }
    Object.keys(B13_WORDS).forEach(w => words.append(el("button.btn.small.plain", { type: "button", "data-w": w, "data-hint": "Show the words nearest to " + w, onclick: () => choose(w) }, w)));
    draw();
  },
});

LEVEL({
  id: "b13", title: "Maps and Next-Word Machines", job: "The Quote Machine has to read the repair notes.",
  color: "#5cc8ff", scene: "bench", cast: ["gridlock"], toy: "wordmap",
  sticker: { title: "Word Cartographer", glyph: "a→b", color: "#5cc8ff" },
  goals: ["Picture words as points on a map", "Build a next-word machine from counts", "Name the parts of a transformer"],
  beats: [
    say("gridlock", "Customers write notes like *kettle hums, lid sticks*. The Quote Machine just stares at them. Can it read?", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Not yet. A model needs numbers, so first we turn words into numbers. One way is to give each word a place on a map.") },
    say("nib", "Jurafsky and Martin picture word meaning as points in space. *Sweet* sits near *honey*, *juice* and *candy*, and far from *soup* [ml-086]. A word's place is its [[embedding]].", "think"),
    { predict: { program: "b13_wordmap", q: "On our invented map, which two words are nearest to *kettle*? (The positions are in the code.)" } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. Kettle lives next to teapot and toaster. Bolt lives across the room. Very sensible neighborhood.", "wow") },
    { toy: "wordmap", goal: "Pick three different words and look at their nearest neighbors." },
    { ask: { q: "Where did the positions in our Word Map come from?", choices: ["A model learned them from repair notes", "We invented them for the demo", "Jurafsky and Martin's figure"], answer: 1,
      why: "They are made up, and the toy says so. Real embeddings are learned, and Code Pix does not cover how yet." } },
    say("nib", "Now the second idea. A [[language model]] predicts the next word from the words before it [ml-087]. The simplest kind just counts which word follows which.", "think"),
    say("nib", "The n-gram trick uses only the last few words instead of the whole history [ml-088]. Our machine uses one word of history. Very forgetful. Very fast."),
    { predict: { program: "b13_nextword", q: "Starting at *the*, the machine keeps taking the most common next word. What sentence does it build?", choices: ["after 'the': {'kettle': 2, 'toaster': 1, 'lid': 1, 'radio': 1}\nafter 'new': {'switch': 1, 'spring': 1, 'knob': 1}\nthe kettle needs a new switch", "after 'the': {'kettle': 2, 'toaster': 1, 'lid': 1, 'radio': 1}\nafter 'new': {'switch': 1, 'spring': 1, 'knob': 1}\nthe kettle hums and the kettle", "after 'the': {'kettle': 2, 'toaster': 1, 'lid': 1, 'radio': 1}\nafter 'new': {'switch': 1, 'spring': 1, 'knob': 1}\nthe radio needs a new knob"], answer: 0,
      why: "*kettle* follows *the* twice. After *kettle* there is a tie, and Python's `max` keeps the first one it met, *needs*. After *new* there is another tie, so *switch* wins." } },
    { trace: { program: "b13_nextword", note: "Watch the dictionary of counts grow, one pair of words at a time." } },
    { show: ["nib", "gridlock"], ...say("gridlock", "Always the same sentence? My customers will think the machine has one joke.") },
    say("nib", "Then let it roll dice. Jurafsky and Martin list several decoding choices, including greedy decoding and random sampling [ml-091]. The book shows a version that samples.", "wow"),
    { ask: { q: "The sampling machine wrote *the toaster needs a new knob*. Which note did it copy that from?", choices: ["The toaster note", "The radio note", "None of them: it glued pieces together"], answer: 2,
      why: "No note says it. *toaster needs a new* comes from one note and *knob* from another." } },
    say("nib", "Jurafsky and Martin picture a [[large language model]] as a neural network that represents tokens as vectors [ml-087]. One design you will hear about is the [[transformer]], which they date to 2017 [ml-092]."),
    { show: ["nib", "byte"], ...say("byte", "How does a transformer work inside? BEEP?", "think") },
    say("nib", "Its parts include [[attention]], transformer blocks and embeddings for tokens and positions [ml-090]. Our sources on the details are still being checked, so the book stops at the names for now."),
    { ask: { q: "Which sentence about the transformer can this chapter back with a source?", choices: ["It was introduced in 2017", "It was invented at IBM in 1975", "It works without any embeddings"], answer: 0,
      why: "Jurafsky and Martin date the transformer to 2017 [ml-092]. IBM's 1975 to 1985 work was on n-gram language models [ml-089]." } },
    { book: 0, text: "The book has the whole chapter, with sources you can click." },
    say("gridlock", "A word map, a counting cabinet and a lot of fancy names. Build me the counting cabinet first.", "think"),
    { machine: ["b13-nextword"] },
    say("byte", "Next word: sticker. BEEP BOOP."),
    { sticker: true },
  ],
});
