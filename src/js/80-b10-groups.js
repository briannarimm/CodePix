/* B10. Finding Groups: clustering with k-means. */

PAGES("b10", [
  {
    h: "No answers on the tickets",
    body: [
      "Every job so far came with answers: the real repair time, the real *yes* or *no*. Sometimes there are no answers at all. A crate of loose screws arrives, nobody has sorted them, and Ms. Gridlock wants them in sensible piles.",
      "Google describes unsupervised learning as being given data without the correct answers and finding groupings in it, and says many unsupervised models rely on a technique called [[clustering]] [ml-003]. scikit-learn's guide also describes clustering as working on unlabeled data [ml-074].",
      { analogy: "Sorting a mixed bin of screws into piles by eye. Nobody hands you a list of screw types. You notice that some are short and thin, some long and fat, and you start piles where they bunch up." },
      "The catch: the machine finds piles, but it cannot tell you what they mean. Naming a pile *wood screws* is still your job.",
    ],
  },
  {
    h: "Two moves, repeated",
    body: [
      "[[k-means]] is the classic way to make k piles. You choose k. Then you repeat two moves until nothing changes:",
      { ol: [
        "**Assign.** Every point joins the pile of its nearest [[centroid]].",
        "**Move.** Every centroid jumps to the average of the points in its pile.",
      ] },
      "Here it is in plain Python, on six fictional screws measured by length and width in millimeters:",
      { code: "b10_kmeans", out: true },
      "The two starting guesses were both short screws. After the first assign, the second centroid had to cover four screws: one short and three long. It moved to their average and landed in between. On the second round the short screw switched to the other pile, the centroid settled among the long ones, and from then on nothing moved.",
      { trace: "b10_kmeans", label: "🔍 Watch the piles form" },
      { toy: "kmeans", label: "Open the Pile Maker and step it yourself" },
      { honest: "The pictures in the Pile Maker are a JavaScript demo. The printed centroids above are from a real Python run." },
    ],
  },
  {
    h: "k-means in scikit-learn",
    body: [
      "scikit-learn's `KMeans` separates samples into groups of equal variance by minimizing the *inertia*, the within-cluster sum of squares, and it needs you to say how many clusters you want [ml-071]. Smaller inertia means points sit closer to their centroids.",
      { code: "b10_sklearn", out: true },
      "Look at the four single random starts at the bottom. scikit-learn warns that k-means may land in a local minimum that depends heavily on where the centroids start, and that the k-means++ start (`init='k-means++'`) helps [ml-072]. A start with higher inertia than the others has settled into a worse set of piles. Our main model asks for the k-means++ start.",
      "k-means also has a favorite shape. scikit-learn warns that it assumes convex, similarly shaped clusters and does poorly on elongated or irregular ones [ml-073]. Round blobs of screws suit it. A long curving line of screws would not.",
      "GeeksforGeeks lists DBSCAN and mean-shift as other clustering methods, and PCA for reducing the number of features [ml-009]. This book names them and does not cover them.",
      { machine: ["b10-piles"], label: "Go to your machine: make the piles by hand" },
    ],
  },
]);

GLOSS({
  clustering: "Finding groups in data that has no answers attached. Many unsupervised models rely on it. [ml-003] [ml-074]",
  "k-means": "A clustering method that makes k groups by keeping the inertia (within-cluster sum of squares) small. You choose k. [ml-071]",
  centroid: "The center point of a group. In our k-means program it is the average of the group's points. (Our own plain-words definition.)",
}, "b10");

TOY("kmeans", {
  title: "Pile Maker", level: "b10", color: "var(--grape)",
  short: "Step k-means by hand: assign the screws, move the centroids, repeat.",
  goal: "Step until the piles stop changing.",
  label: "A JavaScript demo of the idea, not Python code. The screws are fictional.",
  html: () => `<svg class="board" viewBox="0 0 300 240" role="img" aria-label="Screws by length and width, colored by pile, with centroids as stars"></svg>
    <div class="row ctl">
      <span class="kk"><span>k =</span>${[2, 3, 4].map(k => `<button type="button" class="btn small ${k === 3 ? "sky" : "plain"}" data-k="${k}" data-hint="Make ${k} piles">${k}</button>`).join("")}</span>
      <button type="button" class="btn small lime step" data-hint="Do the next move: assign or move">Step: assign</button>
      <button type="button" class="btn small plain fresh" data-hint="Throw the centroids somewhere new and start again">New start</button>
    </div>
    <p class="say" role="status" aria-live="polite"></p>`,
  init(root, ctx) {
    const pts = [[12, 2.5], [14, 3], [11, 2], [13, 2.2], [15, 3.4], [30, 6], [33, 5.5], [29, 6.4], [31, 7], [34, 6.2], [21, 9], [23, 10], [20, 9.5], [22, 8.4], [19, 10.4]];
    const COL = ["#ff8a1f", "#1a8a8a", "#9b6bff", "#ff6fae"];
    const svg = $("svg", root), step = $(".step", root);
    const X = v => 20 + (v - 8) * 9.5, Y = v => 220 - v * 19;
    let k = 3, cents = [], labels = pts.map(() => -1), phase = "assign", seed = 1, rounds = 0;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const fresh = () => {
      const pool = pts.slice(); cents = [];
      for (let i = 0; i < k; i++) cents.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0].slice());
      labels = pts.map(() => -1); phase = "assign"; rounds = 0; draw("New starting centroids. Press Step.");
    };
    const inertia = () => pts.reduce((s, p, i) => labels[i] < 0 ? s : s + (p[0] - cents[labels[i]][0]) ** 2 + (p[1] - cents[labels[i]][1]) ** 2, 0);
    const draw = msg => {
      let s = `<line x1="20" y1="220" x2="290" y2="220" stroke="#141414" stroke-width="2"/><line x1="20" y1="10" x2="20" y2="220" stroke="#141414" stroke-width="2"/>
        <text x="155" y="236" text-anchor="middle" font-size="11">length (mm)</text><text x="10" y="115" font-size="11" text-anchor="middle" transform="rotate(-90 10 115)">width</text>`;
      pts.forEach((p, i) => { if (labels[i] >= 0) s += `<line x1="${X(p[0])}" y1="${Y(p[1])}" x2="${X(cents[labels[i]][0])}" y2="${Y(cents[labels[i]][1])}" stroke="${COL[labels[i]]}" stroke-width="1.5" opacity=".7"/>`; });
      pts.forEach((p, i) => { s += `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="6" fill="${labels[i] < 0 ? "#fff" : COL[labels[i]]}" stroke="#141414" stroke-width="2"/>`; });
      cents.forEach((c, j) => { const x = X(c[0]), y = Y(c[1]); s += `<path d="M${x} ${y - 13} l4 8 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1z" fill="${COL[j]}" stroke="#141414" stroke-width="2.5"/>`; });
      svg.innerHTML = s;
      step.textContent = "Step: " + phase;
      const inr = labels[0] < 0 ? "" : ` Inertia: **${inertia().toFixed(1)}**.`;
      $(".say", root).innerHTML = rich((msg || "") + inr);
    };
    step.addEventListener("click", () => {
      if (phase === "assign") {
        const next = pts.map(p => { let b = 0, bd = Infinity; cents.forEach((c, j) => { const d = Math.hypot(p[0] - c[0], p[1] - c[1]); if (d < bd) { bd = d; b = j; } }); return b; });
        const changed = next.some((v, i) => v !== labels[i]);
        labels = next; phase = "move"; rounds++;
        if (!changed) { draw(`Round ${rounds}: no screw changed piles. k-means has settled.`); ctx.goalDone("The piles stopped changing. Try New start to see whether it settles somewhere else."); phase = "assign"; return; }
        draw(`Round ${rounds}, assign: every screw joined its nearest star.`);
      } else {
        cents = cents.map((c, j) => { const m = pts.filter((_, i) => labels[i] === j); return m.length ? [m.reduce((s, p) => s + p[0], 0) / m.length, m.reduce((s, p) => s + p[1], 0) / m.length] : c; });
        phase = "assign";
        draw(`Round ${rounds}, move: every star jumped to the average of its pile.`);
      }
    });
    $(".fresh", root).addEventListener("click", fresh);
    $$(".kk button", root).forEach(b => b.addEventListener("click", () => {
      k = +b.dataset.k;
      $$(".kk button", root).forEach(x => { x.classList.toggle("sky", x === b); x.classList.toggle("plain", x !== b); });
      fresh();
    }));
    fresh();
  },
});

LEVEL({
  id: "b10", title: "Finding Groups", job: "Sort a crate of unlabeled screws into piles.",
  color: "#9be34a", scene: "bench", cast: ["gridlock"], toy: "kmeans",
  sticker: { title: "Pile Maker", glyph: "k=3", color: "#9be34a" },
  goals: ["Say what clustering is for", "Run k-means by hand", "See why starting points matter"],
  beats: [
    say("gridlock", "{{you}}, a supplier sent us a crate of screws. No labels, no packing list, nothing. I need them in piles by lunch.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "No answers on the tickets this time. Google calls this unsupervised learning: data without the correct answers, where the model finds groupings. Many such models rely on [[clustering]] [ml-003].") },
    say("nib", "Think of how you would sort them by eye. You would notice the short thin ones bunching together, the long fat ones elsewhere, and start piles where they crowd."),
    { show: ["nib", "byte"], ...say("byte", "BEEP. I measured every screw. Length and width, in millimeters. Now what?", "wow") },
    say("nib", "Now [[k-means]]. Pick k, the number of piles. Drop k [[centroid|centroids]], one per pile. Then repeat two moves. Assign: each screw joins its nearest centroid. Move: each centroid jumps to the average of its pile."),
    { ask: { q: "In the *move* step, where does a centroid go?", choices: ["To the average of the points in its pile", "To the point farthest from it", "Back to where it started"], answer: 0,
      why: "That is the move step in our program: each centroid becomes the average length and width of its pile." } },
    { predict: { program: "b10_kmeans", q: "Six screws, two piles, and both starting guesses are short screws. Byte runs three rounds. Do the centroids keep moving every round?" } },
    { trace: { program: "b10_kmeans", note: "Watch `piles` refill on every round, then `centroids` jump to the averages." } },
    say("nib", "Rounds two and three print the same centroids. Nothing moved, so the piles have settled. That is when k-means stops.", "think"),
    { toy: "kmeans", goal: "Step until the piles stop changing." },
    { show: ["nib", "gridlock"], ...say("gridlock", "Do I have to tell it how many piles? What if I do not know?", "think") },
    say("nib", "You do have to. scikit-learn's `KMeans` needs the number of clusters, and it works by minimizing the inertia, the sum of squared distances inside each pile [ml-071]. Choosing k is a judgment call you make by looking."),
    { ask: { q: "What does scikit-learn's `KMeans` try to make small?", choices: ["The inertia: the within-cluster sum of squares", "The number of clusters", "The test error"], answer: 0,
      why: "KMeans separates the samples by minimizing the inertia [ml-071]. Points close to their centroids give a small inertia." } },
    say("byte", "Also, I tried different starting spots. Sometimes I made silly piles. BEEP. Sorry."),
    say("nib", "Not your fault. scikit-learn warns that k-means can land in a local minimum that depends on the starting centroids, and that the k-means++ start helps [ml-072]. Let us compare.", "think"),
    { predict: { program: "b10_sklearn", q: "Nine screws, three piles. scikit-learn runs k-means++ with ten starts, then four single random starts. Will all the random starts find the same inertia?" } },
    { ask: { q: "A long, curved snake of screws lies in the crate. Is k-means a good tool for it?", choices: ["Yes, k-means handles any shape", "Probably not: k-means assumes round, similarly shaped clusters", "Only if k is 1"], answer: 1,
      why: "scikit-learn warns that k-means assumes convex, similarly shaped clusters and does poorly on elongated or irregular ones [ml-073]." } },
    { book: 1, text: "The book walks through both moves, the scikit-learn version and the warnings." },
    say("gridlock", "Three neat piles before lunch. {{you}}, write the two moves on your own machine, so the next crate is your problem.", "wow"),
    { machine: ["b10-piles"] },
    say("byte", "I have sorted the screws, the nuts and, by accident, my own spare parts. BEEP BOOP."),
    { sticker: true },
  ],
});
