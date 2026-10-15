/* B12. Little Brains: neural units, weights, activation, layers, XOR. Toy: neuron (Wire a Brain). */

/* A figure: the four XOR cases on a square. Our own drawing. */
function b12XorFig() {
  const pt = (x, y, on) => A.circ(70 + x * 180, 230 - y * 180, 20, on ? "#ff8a1f" : "#5cc8ff", { sw: 4 }) + A.text(70 + x * 180, 238 - y * 180, on ? "1" : "0", { size: 20 });
  let s = A.rect(0, 0, 320, 290, "#fffdf6", { sw: 0 });
  s += A.line(40, 260, 300, 260, { sw: 2 }) + A.line(40, 260, 40, 20, { sw: 2 });
  s += A.text(170, 285, "x1", { size: 16, font: "JetBrains Mono, monospace" }) + A.text(22, 140, "x2", { size: 16, font: "JetBrains Mono, monospace" });
  s += pt(0, 0, false) + pt(1, 1, false) + pt(0, 1, true) + pt(1, 0, true);
  s += A.path("M40 150 L300 120", "none", { sw: 3, stroke: "#9aa3ad", extra: ' stroke-dasharray="8 8"' });
  return A.svg("0 0 320 290", s, "", "The four XOR cases: orange 1s at top left and bottom right, blue 0s at bottom left and top right. A dashed straight line cannot separate the colors.");
}

PAGES("b12", [
  {
    h: "One unit: weigh, add, squash",
    body: [
      "Ms. Gridlock wants a brain for the Quote Machine. A real neural network is built from many small, simple parts. This chapter builds those parts by hand.",
      "Jurafsky and Martin describe a neural [[unit]] like this: take a weighted sum of the inputs, add a bias, and call the result z. Then pass z through a non-linear [[activation function]] such as the sigmoid, tanh or ReLU [ml-082].",
      { analogy: "Picture a parts inspector with three clues on the bench. Each clue has a dial that says how much it counts: the weight. The inspector multiplies each clue by its dial, adds them up, adds a personal hunch (the bias), and then turns the total into a verdict." },
      "Here is their worked example in plain Python. Three weights, three inputs and a bias of 0.5 give z = 0.87 and an output of about .70 [ml-083]. Our program prints the same.",
      { code: "b12_unit", out: true },
      { trace: "b12_unit", label: "🔍 Watch z grow, one input at a time" },
      "ReLU is the simplest activation to read. It outputs z when z is positive and 0 otherwise [ml-085]. That is why the last line prints 0.87 again.",
      { nerd: "How it really works", body: [
        "Sigmoid and tanh can saturate: far from zero, their output barely changes. Jurafsky and Martin connect that to the vanishing gradient problem [ml-085]. The last page of this chapter says where a network's gradients come from. The vanishing problem itself stays out of this book.",
      ] },
    ],
  },
  {
    h: "One unit, two jobs: AND and OR",
    body: [
      "A unit with two inputs can already make small decisions. To keep the arithmetic easy, this program uses a step for its activation: the unit answers 1 when z is above 0 and 0 otherwise.",
      { honest: "The step is our own simplification for this page. The activations Jurafsky and Martin name are sigmoid, tanh and ReLU [ml-082]." },
      { code: "b12_gates", out: true },
      "The two units differ only in their bias. With a bias of -1.5, both inputs must be on before z climbs above 0. That is AND. With a bias of -0.5, one input is enough. That is OR.",
      { toy: "neuron", label: "Try it: Wire a Brain" },
    ],
  },
  {
    h: "The XOR wall",
    body: [
      "[[XOR]] means *exclusive or*: the answer is 1 when exactly one input is on. Think of a lamp on a staircase with a switch at the top and the bottom. Flip either switch and the lamp changes.",
      "Jurafsky and Martin show that a single [[perceptron]] cannot compute XOR, because XOR is not linearly separable. That limit is what motivates layered networks [ml-084].",
      { fig: b12XorFig, cap: "The four XOR cases. Any straight line leaves an orange 1 and a blue 0 on the same side. (Our own drawing.)" },
      "You do not have to take the picture on trust. This program tries 729 settings of one step unit and keeps the best score.",
      { code: "b12_xor_search", out: true },
      "Three out of four is the ceiling for every setting it tried. One unit draws one straight boundary, and XOR needs more than that.",
    ],
  },
  {
    h: "Layers",
    body: [
      "The fix is to stack units. A [[layer]] is a row of units that all read the same inputs. A [[hidden layer]] sits between the inputs and the output.",
      "Google's course says the nodes in hidden layers are called neurons, and that a [[neuron]]'s value is calculated the same way as the output of a linear model. It also says a network of only linear nodes cannot learn nonlinearities [ml-081]. The activation function is what bends the line.",
      "Here is a hand-wired [[neural network]] for XOR. Hidden unit 1 counts how many inputs are on. Hidden unit 2 wakes up only when both are on. The output takes two away in that case.",
      { code: "b12_xor", out: true },
      { trace: "b12_xor", label: "🔍 Watch the hidden units light up" },
      { analogy: "Two inspectors write notes, and a third reads the notes instead of the raw clues. The third inspector can now make a call that no single inspector could make alone." },
      { machine: ["b12-unit", "b12-xor"], label: "Go to your machine: build a unit, then wire XOR" },
    ],
  },
  {
    h: "Letting the computer find the weights",
    body: [
      "We picked those weights by hand. A real network learns them from examples. Jurafsky and Martin say training neural networks by error backpropagation became widespread with Rumelhart et al. (1986) [ml-093].",
      "How does it learn them? You met [[gradient descent]] in Measuring Mistakes. A network needs a gradient for every weight and bias, and [[backpropagation]] computes them. It goes through the network in reverse order, from the output layer back to the input layer, using the chain rule from calculus [ml-125].",
      { analogy: "Picture the inspectors from page one after a wrong verdict. The last inspector works out how much each note they read pushed the verdict off. Each note-writer then does the same for their own clues. The blame flows backward, one row at a time." },
      "Zhang and colleagues, in their open deep learning textbook, add a practical cost: training needs significantly more memory than plain prediction [ml-126]. The backward trip needs the numbers from the forward trip, so they have to be kept around. (That last sentence is our own explanation.)",
      "The program below hands the same four XOR examples to `MLPClassifier`, a class from scikit-learn's `neural_network` module, and asks for its predictions. scikit-learn says its multi-layer perceptron trains with a form of gradient descent, with gradients calculated by backpropagation [ml-127]. The program also prints the shape of the weights it found for its hidden layer.",
      { code: "b12_mlp", out: true },
      "The weights it found will not look like ours. Any weights that get all four cases right do the job. The program prints the scikit-learn version, so you can compare your run with this one.",
    ],
  },
]);

GLOSS({
  "neural network": "A model built from units arranged in layers. The nodes in its hidden layers are called neurons. [ml-081]",
  neuron: "A node in a hidden layer of a neural network. Its value is calculated the same way as the output of a linear model. [ml-081]",
  unit: "One small part of a neural network: a weighted sum of its inputs plus a bias, passed through a non-linear activation. [ml-082]",
  "activation function": "The non-linear step a unit applies to its weighted sum, such as the sigmoid, tanh or ReLU. [ml-082] ReLU outputs z when z is positive and 0 otherwise. [ml-085]",
  layer: "A row of units that all read the same inputs. (Our own wording.)",
  "hidden layer": "A layer between a network's inputs and its output. Its nodes are called neurons. [ml-081]",
  xor: "Exclusive or: 1 when exactly one of two inputs is 1. A single perceptron cannot compute it, because it is not linearly separable. [ml-084]",
  backpropagation: "How a neural network gets the gradients for its weights: go through the network in reverse order, from the output layer to the input layer, using the chain rule from calculus. [ml-125] scikit-learn's multi-layer perceptron uses it with a form of gradient descent. [ml-127]",
  perceptron: "An early single-unit learning machine, named in the title of Rosenblatt's 1958 article. [ml-098] A single perceptron cannot compute XOR. [ml-084]",
}, "b12");

/* Toy: Wire a Brain. One unit with two inputs; sliders for the weights and bias. */
TOY("neuron", {
  title: "Wire a Brain", level: "b12", color: "var(--grape)",
  short: "One unit, two inputs. Turn the dials and see which jobs it can do.",
  goal: "Set the dials so the unit gets 4 of 4 on AND or on OR.",
  label: "A JavaScript demo of the idea, not Python code.",
  html: () => `<div class="nr-wrap">
    <div class="nr-left">
      <div class="nr-pic" aria-live="polite"></div>
      <div class="row nr-targets" role="group" aria-label="Which job should the unit do?">
        <button type="button" class="btn small sky" data-t="and" data-hint="Target job: AND, 1 only when both inputs are 1">AND</button>
        <button type="button" class="btn small plain" data-t="or" data-hint="Target job: OR, 1 when at least one input is 1">OR</button>
        <button type="button" class="btn small plain" data-t="xor" data-hint="Target job: XOR, 1 when exactly one input is 1">XOR</button>
      </div>
      <div class="row nr-acts" role="group" aria-label="Activation">
        <button type="button" class="btn small sky" data-a="step" data-hint="Activation: step (1 if z is above 0)">step</button>
        <button type="button" class="btn small plain" data-a="sigmoid" data-hint="Activation: sigmoid (squashes z between 0 and 1)">sigmoid</button>
        <button type="button" class="btn small plain" data-a="relu" data-hint="Activation: ReLU (z if positive, else 0)">ReLU</button>
      </div>
    </div>
    <div class="nr-right">
      <label class="nr-dial">weight 1 <b data-v="w1"></b><input type="range" min="-2" max="2" step="0.5" data-k="w1" data-hint="Weight on input x1"></label>
      <label class="nr-dial">weight 2 <b data-v="w2"></b><input type="range" min="-2" max="2" step="0.5" data-k="w2" data-hint="Weight on input x2"></label>
      <label class="nr-dial">bias <b data-v="b"></b><input type="range" min="-2" max="2" step="0.5" data-k="b" data-hint="The bias: added to the weighted sum"></label>
      <table class="nr-table"><thead><tr><th>x1</th><th>x2</th><th>z</th><th>out</th><th>says</th><th>want</th><th></th></tr></thead><tbody></tbody></table>
      <p class="readout nr-score"></p>
      <p class="nr-note"></p>
      <button type="button" class="btn small plain nr-reset" data-hint="Put every dial back to 0">Reset dials</button>
    </div>
  </div>`,
  init(root, ctx) {
    const st = { w1: 0, w2: 0, b: 0, act: "step", target: "and" };
    const T = { and: [0, 0, 0, 1], or: [0, 1, 1, 1], xor: [0, 1, 1, 0] };
    const cases = [[0, 0], [0, 1], [1, 0], [1, 1]];
    const actF = { step: z => (z > 0 ? 1 : 0), sigmoid: z => 1 / (1 + Math.exp(-z)), relu: z => Math.max(z, 0) };
    const fmt = v => (Math.round(v * 100) / 100).toString();
    const pic = $(".nr-pic", root), tbody = $("tbody", root), score = $(".nr-score", root), note = $(".nr-note", root);
    function wire(x1, y1, x2, y2, w) {
      const c = w > 0 ? "#ff8a1f" : w < 0 ? "#5cc8ff" : "#d9dde2";
      return A.line(x1, y1, x2, y2, { stroke: c, sw: 2 + Math.abs(w) * 4 });
    }
    function draw() {
      let s = A.rect(0, 0, 300, 200, "#fffdf6", { sw: 0 });
      s += wire(60, 60, 170, 100, st.w1) + wire(60, 150, 170, 100, st.w2) + A.line(205, 100, 270, 100, { sw: 4 });
      s += A.circ(50, 60, 22, "#ffe45c") + A.text(50, 66, "x1", { size: 14, font: "JetBrains Mono, monospace" });
      s += A.circ(50, 150, 22, "#ffe45c") + A.text(50, 156, "x2", { size: 14, font: "JetBrains Mono, monospace" });
      s += A.circ(185, 100, 32, "#9b6bff") + A.text(185, 96, "Σ", { size: 20, fill: "#fff", font: "Lora, serif" }) + A.text(185, 116, st.act, { size: 11, fill: "#fff", font: "JetBrains Mono, monospace" });
      s += A.text(185, 168, "bias " + st.b, { size: 13, font: "JetBrains Mono, monospace" });
      s += A.path("M262 92 l12 8 l-12 8", "none", { sw: 4 });
      pic.innerHTML = A.svg("0 0 300 200", s, "board", "A unit with two input wires. Orange wires have positive weights, blue wires negative; thicker means bigger.");
    }
    function update() {
      ["w1", "w2", "b"].forEach(k => { $(`[data-v=${k}]`, root).textContent = st[k]; });
      draw();
      tbody.innerHTML = "";
      let right = 0;
      cases.forEach(([x1, x2], i) => {
        const z = st.w1 * x1 + st.w2 * x2 + st.b, out = actF[st.act](z), says = out >= 0.5 ? 1 : 0, want = T[st.target][i];
        if (says === want) right++;
        tbody.append(el("tr", { class: says === want ? "ok" : "no" }, el("td", {}, x1), el("td", {}, x2), el("td", {}, fmt(z)), el("td", {}, fmt(out)), el("td", {}, says), el("td", {}, want), el("td", {}, says === want ? "✓" : "✗")));
      });
      score.textContent = `${st.target.toUpperCase()}: ${right} of 4 right`;
      note.innerHTML = st.target === "xor"
        ? rich("One unit draws one straight boundary. Jurafsky and Martin show a single perceptron cannot compute XOR [ml-084]. The best you can do here is 3 of 4.")
        : rich("*says* is 1 when the output is 0.5 or more. Try a negative bias.");
      if (right === 4 && st.target !== "xor") ctx.goalDone(`The unit does ${st.target.toUpperCase()}. Now try XOR.`);
    }
    $$("input[type=range]", root).forEach(inp => {
      inp.value = st[inp.dataset.k];
      inp.addEventListener("input", () => { st[inp.dataset.k] = +inp.value; update(); });
    });
    const pick = (sel, key, attr) => $$(sel, root).forEach(b => b.addEventListener("click", () => {
      st[key] = b.dataset[attr];
      $$(sel, root).forEach(x => { x.classList.toggle("sky", x === b); x.classList.toggle("plain", x !== b); });
      update();
    }));
    pick("[data-t]", "target", "t");
    pick("[data-a]", "act", "a");
    $(".nr-reset", root).addEventListener("click", () => { st.w1 = st.w2 = st.b = 0; $$("input[type=range]", root).forEach(i => (i.value = 0)); update(); });
    update();
  },
});

LEVEL({
  id: "b12", title: "Little Brains", job: "Ms. Gridlock wants a brain for the Quote Machine.",
  color: "#9b6bff", scene: "bench", cast: ["gridlock"], toy: "neuron",
  sticker: { title: "Brain Wirer", glyph: "Σ", color: "#9b6bff" },
  goals: ["Compute one neural unit by hand", "See why one unit cannot do XOR", "Wire two layers that can"],
  beats: [
    say("gridlock", "{{you}}, I read a catalog on the bus. Everybody's Quote Machine has a *neural network* now. I want one. A big one. With blinking lights.", "wow"),
    { show: ["gridlock", "nib"], ...say("nib", "A big one starts as a small one. Let's build the smallest part first, a single [[unit]], and see what it can and cannot do.") },
    say("nib", "A unit takes a weighted sum of its inputs, adds a bias, and passes the result through an [[activation function]] such as sigmoid, tanh or ReLU [ml-082].", "think"),
    say("nib", "Each weight is a dial that says how much one input counts. The bias is the unit's own nudge before it decides."),
    { predict: { program: "b12_unit", q: "Weights 0.2, 0.3 and 0.9, inputs 0.5, 0.6 and 0.1, bias 0.5. What is z? (Work it out on paper first.)" } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. My numbers match the textbook: z = 0.87, output about .70 [ml-083]. I checked twice. Then a third time, for fun.", "wow") },
    { trace: { program: "b12_unit", note: "Watch `z` start at the bias and grow with each weight times input." } },
    { ask: { q: "ReLU gets z = -1.2. What does it output?", choices: ["-1.2", "0", "1"], answer: 1,
      why: "ReLU outputs z when z is positive and 0 otherwise [ml-085]." } },
    say("nib", "Now a unit with two inputs and a simple step: it says 1 when z is above 0. Change only the bias, and one unit does two different jobs.", "think"),
    { predict: { program: "b12_gates", q: "Both units have weights 1 and 1. The AND unit has bias -1.5; the OR unit has bias -0.5. What is the full table?" } },
    { toy: "neuron", goal: "Set the dials so the unit gets 4 of 4 on AND or on OR. Then try XOR." },
    { show: ["nib", "gridlock"], ...say("gridlock", "XOR. Like my staircase lamp: flip either switch and it changes. Surely your little unit can manage a lamp.") },
    say("nib", "It cannot, and that is a famous result. A single [[perceptron]] cannot compute [[XOR]], because XOR is not linearly separable [ml-084].", "wow"),
    { predict: { program: "b12_xor_search", q: "This program tries 729 settings of one unit on the four XOR cases. What is the best score it finds?", choices: ["settings tried: 729\nbest score: 4 out of 4", "settings tried: 729\nbest score: 3 out of 4", "settings tried: 729\nbest score: 2 out of 4"], answer: 1,
      why: "Every straight boundary leaves at least one case on the wrong side." } },
    say("nib", "The fix is layers. A [[hidden layer]] of units sits between the inputs and the output. Google's course adds a warning: a network of only linear nodes cannot learn nonlinearities [ml-081]."),
    { show: ["nib", "byte"], ...say("byte", "So the activation is the bendy part. BEEP. I like bendy parts.") },
    { trace: { program: "b12_xor", note: "Hidden unit `h1` counts the inputs that are on; `h2` wakes up only when both are on." } },
    { ask: { q: "In the hand-wired XOR network, which input pair wakes up hidden unit 2?", choices: ["0 and 0", "0 and 1", "1 and 1"], answer: 2,
      why: "`relu(x1 + x2 - 1)` is above 0 only when both inputs are 1." } },
    say("nib", "We chose those weights by hand. Real networks learn theirs from examples. Training by error backpropagation became widespread with Rumelhart et al. in 1986 [ml-093]."),
    say("nib", "[[backpropagation|Backpropagation]] works out how much each weight should change. It walks the network backward, from the output layer to the input layer, using the chain rule from calculus [ml-125]. Then gradient descent takes the step.", "think"),
    { ask: { q: "Which way does backpropagation go through the network?", choices: ["From the input layer to the output layer", "From the output layer back to the input layer", "Through a random layer each time"], answer: 1,
      why: "It goes through the network in reverse order, from the output to the input layer, using the chain rule [ml-125]." } },
    { book: 4, text: "The book has the whole chapter, including scikit-learn learning XOR by itself." },
    say("gridlock", "So my big brain is lots of little dials. Fine. Prove you can wire the little ones on your own computer.", "think"),
    { machine: ["b12-unit", "b12-xor"] },
    say("byte", "Two layers, one lamp, four cases right. BEEP BOOP."),
    { sticker: true },
  ],
});
