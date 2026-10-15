/* B13. Maps and Next-Word Machines: embeddings, tokens, language models, attention. Toy: wordmap (Word Map). */

PAGES("b13", [
  {
    h: "Words as points on a map",
    body: [
      "The Quote Machine reads repair notes. To do anything clever with words, a model needs numbers. One idea is to give every word a place on a map.",
      "Jurafsky and Martin picture word meaning as points in space. In their picture, *sweet* sits near *honey*, *juice* and *candy*, and far from *fried* or *soup* [ml-086]. Zhang and colleagues, in their open deep learning textbook, call vectors that represent words *word vectors*, and the technique of mapping words to real vectors *word embedding* [ml-128]. In Code Pix we call a word's vector, its place on the map, its [[embedding]].",
      { analogy: "Think of the shop floor. The kettles, teapots and toasters live by the kitchen bench. Bolts, springs and washers live by the hardware drawers. If you know where something sits, you already know a little about what it is." },
      "Here is a tiny map of shop words in plain Python. Each word has two numbers: how far across and how far up.",
      { code: "b13_wordmap", out: true },
      { honest: "We invented these positions for the demo. No model learned them. Real embeddings come from training; the next page says how." },
      "The same map fits neatly into a NumPy array, one row per word. NumPy then measures every distance in one line.",
      { code: "b13_wordmap_np", out: true },
      { toy: "wordmap", label: "Try it: the Word Map" },
    ],
  },
  {
    h: "Measuring how alike two words are",
    body: [
      "Distance is one way to compare two points. Another is the angle between them. [[cosine similarity|Cosine similarity]] is the cosine of the angle between two vectors [ml-129]. Two arrows pointing the same way score close to 1. Two arrows at right angles score 0.",
      "The simplest way to turn words into numbers is a one-hot vector: one slot per word in the vocabulary, with a 1 in the word's own slot and 0 everywhere else. (Our own description.) Zhang and colleagues point out its flaw. The cosine similarity of the one-hot vectors of any two different words is 0, so one-hot vectors cannot express that two words are similar [ml-129].",
      "This program checks both kinds of vector. It uses three words, so the one-hot vectors have three slots.",
      { code: "b13_cosine", out: true },
      "With one-hot vectors, *kettle* is exactly as unlike *teapot* as it is unlike *bolt*. On the map, kettle and teapot point almost the same way, and bolt points elsewhere.",
      { honest: "The map positions are still our invented ones. The cosine formula is real; the meaning in the numbers is ours." },
      { analogy: "One-hot vectors are like giving every part its own drawer in a cabinet the size of the warehouse. Every part sits alone. A map puts the kettle drawer right beside the teapot drawer." },
      { h3: "How a real map is learned" },
      "Google describes embeddings as lower-dimensional representations of sparse data [ml-133]. A one-hot vector is that sparse data: one slot per word, nearly all zeros. An embedding packs the same word into a few numbers that can carry meaning.",
      "Where do those numbers come from? Training. The word2vec tool has two models. [[skip-gram|Skip-gram]] assumes a word can be used to generate the words around it. Continuous bag of words (CBOW) assumes a center word is generated from its surrounding context words [ml-169].",
      "So word2vec training predicts some words from the words around them in a corpus. That supervision comes from text with no labels on it, which makes skip-gram and CBOW self-supervised models [ml-170]. Nobody has to tag a single word.",
      "Skip-gram learns two vectors for each word, a center-word vector and a context-word vector, by maximizing the likelihood. The center-word vectors are typically the ones used as the word representations [ml-171].",
      "An embedding can also grow inside a bigger job. Google says you can create one while training a neural network for your task: the network learns weights for the first hidden layer so that the embedding vectors for similar examples end up closer to each other [ml-172].",
      { analogy: "Picture every repair note as a list of parts used on one job. A part that keeps showing up next to the kettle earns a spot near the kettle on the map. Nobody draws the map by hand; the jobs draw it." },
      { honest: "Code Pix describes these training methods in words and does not train an embedding. Our map stays invented." },
    ],
  },
  {
    h: "Next-word machines",
    body: [
      "Jurafsky and Martin define a [[language model]] as a computational system that can predict the next word from previous words [ml-087]. Google puts it in terms of tokens: a language model estimates the probability of a token or sequence of tokens occurring within a longer sequence of tokens [ml-134].",
      { h3: "What is a token?" },
      "Zhang and colleagues say [[token|tokens]] are the atomic (indivisible) units of text, and what counts as a token, for example a word or a character, is a design choice [ml-166]. Google adds the middle option: a token could be a word, a subword (a part of a word) or a single character [ml-168].",
      "Model inputs must be numbers, so a vocabulary gives each distinct token its own index. A token never seen in training, or dropped as rare, becomes a special [[unknown token]] written `<unk>` [ml-167]. Here is that idea in plain Python, with words as tokens.",
      { code: "b13_vocab", out: true },
      "*toaster* never appeared in the notes, so it gets id 0, the `<unk>` slot. The last line shows the other design choice: *kettle* cut into character tokens.",
      { analogy: "The vocabulary is a filing cabinet with numbered drawers, one per token. Anything that arrives without a drawer goes in drawer 0, labeled *unknown*." },
      { h3: "Counting the next word" },
      "One old trick is counting. The n-gram idea approximates a word's probability given its whole history by using only the last few words [ml-088]. Our machine looks back just one word. It counts which word follows which in four fictional repair notes, then keeps taking the most common next word.",
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
      "Their chapter on transformers covers [[attention]], transformer blocks, input embeddings for tokens and positions, the language modeling head, and decoding [ml-090]. Each of those is a chapter of its own. We open just one: attention.",
      { h3: "Attention is a weighted sum" },
      "Zhang and colleagues define attention over a set of key-value pairs. A query is compared with each key to give a scalar attention weight, and the result is a weighted sum of the values. The name comes from paying particular attention to the terms whose weight is large [ml-173].",
      "The most common setting keeps the weights nonnegative and adding up to 1, which a [[softmax]] can produce [ml-174].",
      "Our program builds that with three invented two-number vectors. The note is *the kettle sat on the bench because it was leaking*, and the query stands for *it*. To score each key we use a dot product, our own choice for the demo. Then a softmax turns the scores into weights.",
      { code: "b13_attention", out: true },
      "The weights add up to 1, and *kettle* gets the biggest share. The last line is the weighted sum of the three values: mostly kettle, a little of the rest.",
      { analogy: "A recipe card that says: six spoons of kettle, three of leaking, a pinch of bench. Change the query and the amounts change, while the jars of ingredients stay the same." },
      "Transformers use this everywhere. Google says transformers rely heavily on [[self-attention]], which asks, for each input token, how much each other token affects its interpretation. In *The animal didn't cross the street because it was too tired*, *animal* matters more than *street* to the pronoun *it* [ml-175].",
      { honest: "Our vectors are invented, so our weights say nothing about real kettles. And even in a real model, Zhang and colleagues warn that reading large weights as the model selecting relevant parts is only an intuition [ml-174]." },
      "Zhang and colleagues say transformers come in three modes: encoder-only, encoder-decoder and decoder-only. Decoder-only transformers are the de facto architecture for large-scale language modeling, and they learn from unlabeled text through self-supervised learning [ml-130].",
      "Where do the labels come from? Jurafsky and Martin call language-model pretraining self-supervised, because the natural sequence of words supplies its own labels [ml-013]. In GPT-style pretraining, the target sequence is the input sequence shifted by one token [ml-131].",
      { analogy: "That shift is the counting cabinet's game. Our n-gram machine learned that *kettle* comes after *the* by reading the next word of each note. A big model plays the same next-word game on an enormous pile of text, with a far bigger machine." },
      "A pretrained model can also take on a task without any more training. Zhang and colleagues call this [[in-context learning]]: the model produces a task's output from a task description, examples and a prompt, with no parameter update. It comes in zero-shot, one-shot and few-shot forms [ml-132].",
      "Here is a one-shot prompt in that shape: a task description, one worked example, then the new case. The notes are our own fictional ones.",
      { snippet: "Turn each repair note into a part name.\nnote: kettle hums, lid sticks -> part: lid\nnote: radio crackles, dial loose -> part:", lang: "text", file: "prompt.txt" },
      { level: "b14", label: "Next job: Other Ways to Learn" },
    ],
  },
]);

GLOSS({
  embedding: "A vector that represents a word; mapping words to real vectors is called word embedding. [ml-128] Google describes embeddings as lower-dimensional representations of sparse data. [ml-133]",
  token: "The atomic unit of text. What counts as a token is a design choice: a word, a subword (part of a word) or a single character. [ml-166] [ml-168]",
  "unknown token": "The special token `<unk>` that stands for any token never seen in training or dropped as rare. [ml-167]",
  "skip-gram": "One of word2vec's two models. It assumes a word can be used to generate the words around it; the other model, CBOW, assumes a center word is generated from its context. [ml-169]",
  softmax: "A function that can turn scores into weights that are nonnegative and add up to 1, the most common setting for attention weights. [ml-174]",
  "self-attention": "For each input token, how much each other token affects its interpretation. Transformers rely heavily on it. [ml-175]",
  "language model": "A computational system that can predict the next word from previous words. [ml-087] Google: it estimates the probability of a token or sequence of tokens within a longer sequence of tokens. [ml-134]",
  "large language model": "A language model pictured as a structured neural network that represents tokens internally as vectors. [ml-087]",
  transformer: "An architecture that Jurafsky and Martin date to 2017 (Vaswani et al.). [ml-092] Their transformer chapter covers attention, transformer blocks and input embeddings for tokens and positions. [ml-090]",
  "cosine similarity": "The cosine of the angle between two vectors. The cosine similarity of the one-hot vectors of any two different words is 0. [ml-129]",
  "in-context learning": "A pretrained language model produces a task's output from a task description, examples and a prompt, with no parameter update. It comes in zero-shot, one-shot and few-shot forms. [ml-132]",
  attention: "A weighted sum of values, with a weight for each key computed from a query and that key. [ml-173] Reading large weights as the model picking relevant parts is only an intuition. [ml-174]",
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
  goals: ["Picture words as points on a map", "Build a next-word machine from counts", "See attention as a weighted sum"],
  beats: [
    say("gridlock", "Customers write notes like *kettle hums, lid sticks*. The Quote Machine just stares at them. Can it read?", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Not yet. A model needs numbers, so first we turn words into numbers. One way is to give each word a place on a map.") },
    say("nib", "Jurafsky and Martin picture word meaning as points in space. *Sweet* sits near *honey*, *juice* and *candy*, and far from *soup* [ml-086]. A word's place is its [[embedding]].", "think"),
    { predict: { program: "b13_wordmap", q: "On our invented map, which two words are nearest to *kettle*? (The positions are in the code.)" } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. Kettle lives next to teapot and toaster. Bolt lives across the room. Very sensible neighborhood.", "wow") },
    { toy: "wordmap", goal: "Pick three different words and look at their nearest neighbors." },
    { ask: { q: "Where did the positions in our Word Map come from?", choices: ["A model learned them from repair notes", "We invented them for the demo", "Jurafsky and Martin's figure"], answer: 1,
      why: "They are made up, and the toy says so. Real embeddings are learned from text. word2vec's skip-gram, for one, assumes a word can be used to generate the words around it [ml-169]." } },
    say("nib", "A real map is learned. word2vec predicts words from the words around them. The text supplies its own answers, with no labels, so it is self-supervised [ml-170].", "think"),
    say("nib", "Now the second idea. A [[language model]] predicts the next word from the words before it [ml-087]. The simplest kind just counts which word follows which.", "think"),
    say("nib", "The pieces a model reads are [[token|tokens]]. A token could be a word, a part of a word or a single character [ml-168]. A vocabulary gives each one a number [ml-167]."),
    { predict: { program: "b13_vocab", q: "The vocabulary is built from three short notes. *toaster* is not in any of them. What ids does *the toaster hums* get?" } },
    say("nib", "The n-gram trick uses only the last few words instead of the whole history [ml-088]. Our machine uses one word of history. Very forgetful. Very fast."),
    say("nib", "To compare two words, measure the angle between their arrows. [[cosine similarity|Cosine similarity]] is the cosine of that angle [ml-129]. Same direction, close to 1. Right angles, 0.", "think"),
    { ask: { q: "Each word gets a one-hot vector: a 1 in its own slot, 0 everywhere else. What is the cosine similarity of *kettle* and *teapot*?", choices: ["About 1, because they are both kitchen things", "0, the same as for any two different words", "0.5"], answer: 1,
      why: "The cosine similarity of the one-hot vectors of any two different words is 0, so one-hot vectors cannot show similarity [ml-129]. The book runs it in Python." } },
    { predict: { program: "b13_nextword", q: "Starting at *the*, the machine keeps taking the most common next word. What sentence does it build?", choices: ["after 'the': {'kettle': 2, 'toaster': 1, 'lid': 1, 'radio': 1}\nafter 'new': {'switch': 1, 'spring': 1, 'knob': 1}\nthe kettle needs a new switch", "after 'the': {'kettle': 2, 'toaster': 1, 'lid': 1, 'radio': 1}\nafter 'new': {'switch': 1, 'spring': 1, 'knob': 1}\nthe kettle hums and the kettle", "after 'the': {'kettle': 2, 'toaster': 1, 'lid': 1, 'radio': 1}\nafter 'new': {'switch': 1, 'spring': 1, 'knob': 1}\nthe radio needs a new knob"], answer: 0,
      why: "*kettle* follows *the* twice. After *kettle* there is a tie, and Python's `max` keeps the first one it met, *needs*. After *new* there is another tie, so *switch* wins." } },
    { trace: { program: "b13_nextword", note: "Watch the dictionary of counts grow, one pair of words at a time." } },
    { show: ["nib", "gridlock"], ...say("gridlock", "Always the same sentence? My customers will think the machine has one joke.") },
    say("nib", "Then let it roll dice. Jurafsky and Martin list several decoding choices, including greedy decoding and random sampling [ml-091]. The book shows a version that samples.", "wow"),
    { ask: { q: "The sampling machine wrote *the toaster needs a new knob*. Which note did it copy that from?", choices: ["The toaster note", "The radio note", "None of them: it glued pieces together"], answer: 2,
      why: "No note says it. *toaster needs a new* comes from one note and *knob* from another." } },
    say("nib", "Jurafsky and Martin picture a [[large language model]] as a neural network that represents tokens as vectors [ml-087]. One design you will hear about is the [[transformer]], which they date to 2017 [ml-092]."),
    { show: ["nib", "byte"], ...say("byte", "How does a transformer work inside? BEEP?", "think") },
    say("nib", "Its parts include [[attention]], transformer blocks and embeddings for tokens and positions [ml-090]. Attention is the famous one, and it is a weighted sum of values [ml-173]."),
    say("nib", "A query scores each key. A [[softmax]] turns the scores into weights that add up to 1 [ml-174]. Mix the values by those weights. A recipe card with changing amounts.", "think"),
    { predict: { program: "b13_attention", q: "In *the kettle sat on the bench because it was leaking*, the query for *it* scores three words. With our invented vectors, which word gets the biggest weight?" } },
    { ask: { q: "*kettle* got weight 0.58. What can we safely say?", choices: ["The model has proved that *it* means the kettle", "The weights add up to 1, and kettle's value counts most in the sum", "Bench is unimportant to every model"], answer: 1,
      why: "The weights are nonnegative and sum to 1, so the output leans toward the values with big weights. Reading big weights as the model choosing what is relevant is only an intuition [ml-174]." } },
    say("nib", "Here is the part you already know. In GPT-style pretraining, the target is the input shifted by one token [ml-131]. Predict the next piece. Your counting cabinet plays the same game.", "wow"),
    { show: ["nib", "gridlock"], ...say("gridlock", "So I could just type *here is one example, now do this one* and it figures out the job?") },
    say("nib", "That is [[in-context learning]]: output from a description, examples and a prompt, with no parameter update. Zero, one or a few examples [ml-132]. Then you check its work. Always check its work."),
    { ask: { q: "Which sentence about the transformer can this chapter back with a source?", choices: ["It was introduced in 2017", "It was invented at IBM in 1975", "It works without any embeddings"], answer: 0,
      why: "Jurafsky and Martin date the transformer to 2017 [ml-092]. IBM's 1975 to 1985 work was on n-gram language models [ml-089]." } },
    { book: 0, text: "The book has the whole chapter, with sources you can click." },
    say("gridlock", "A word map, a counting cabinet and a lot of fancy names. Build me the counting cabinet first.", "think"),
    { machine: ["b13-nextword"] },
    say("byte", "Next word: sticker. BEEP BOOP."),
    { sticker: true },
  ],
});
