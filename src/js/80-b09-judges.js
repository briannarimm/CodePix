/* B9. Neighbors, Trees and Odds: k-nearest neighbors, decision trees, naive Bayes, and a short look at random forests and SVMs [ml-119] to [ml-124]. */

PAGES("b09", [
  {
    h: "Ask the neighbors",
    body: [
      "A new gadget comes in: 5 years old, with a repair estimate of 60 dollars. Should the shop fix it or replace it? One very human way to decide: think of the past gadgets most like this one, and do what the shop did for most of them.",
      "That is [[k-nearest neighbors]]. scikit-learn describes it as storing the training examples and giving a new point the class that has the most representatives among its k nearest neighbors [ml-064]. There is no learning step beyond remembering.",
      { analogy: "Asking the regulars. You describe your broken kettle to the three customers whose kettles were most like yours, and you go with what most of them did." },
      { code: "b09_knn", out: true },
      "`math.dist` measures the straight-line distance between two points. `sorted` with a `key` lines up the past gadgets from nearest to farthest. The three nearest vote, and *replace* wins two to one.",
      { trace: "b09_knn", label: "🔍 Watch the votes being counted" },
      "How many neighbors should vote? scikit-learn says the best k is highly data-dependent [ml-064]. With k = 1 the same gadget would follow its single nearest neighbor, which said *fix*. Try it in the toy.",
      { toy: "neighbors", label: "Open the Neighbor Vote" },
      { honest: "Our two features use different units: years, and tens of dollars. Distance treats one year and ten dollars as the same size step. That choice is ours, and it changes who counts as a neighbor." },
    ],
  },
  {
    h: "Twenty questions: decision trees",
    body: [
      "A [[decision tree]] learns a set of if-then-else rules from the data. scikit-learn says trees are simple to understand and interpret and can be drawn, and also that they can overfit; settings such as `max_depth` and `min_samples_leaf` keep them in check [ml-065].",
      "scikit-learn's `export_text` prints a fitted tree as indented text rules [ml-066]. Here is the tree for our eight gadgets, limited to depth 2:",
      { code: "b09_tree", out: true },
      "It needed only one question. Every *fix* gadget in our tiny set has an estimate of 4 or less (in tens of dollars), and every *replace* gadget is above 5, so one cut separates them. Real data is rarely this tidy, and the tree would grow more branches.",
      { analogy: "A game of twenty questions. Each question splits the remaining possibilities, and the leaves at the bottom hold the answers." },
    ],
  },
  {
    h: "Odds: naive Bayes",
    body: [
      "[[naive Bayes|Naive Bayes]] uses Bayes' theorem with one bold shortcut: it assumes the features are independent of each other once you know the class [ml-067]. In shop words, it treats the gadget's age and its estimate as separate clues that have nothing to do with each other.",
      "The shortcut sounds too simple to work. Even so, scikit-learn says naive Bayes has worked well for document classification and spam filtering, and calls it a decent classifier but a bad estimator of probabilities [ml-068]. So trust its answers more than its percentages.",
      "Our program uses scikit-learn's `GaussianNB` class. The Words as Numbers job uses its word-counting cousin to sort the shop inbox.",
    ],
  },
  {
    h: "Three judges",
    body: [
      "Same eight gadgets, three different models, two new tickets. Each model learns with `fit` and answers with `predict` [ml-026].",
      { code: "b09_judges", out: true },
      "On the first ticket all three agree. On the second, an old gadget with a cheap estimate, the tree disagrees with the others. The tree only ever asks about the estimate, while the neighbors and naive Bayes also weigh the gadget's age. Different models notice different things, which is why the Train, Validate, Test job compares them on held-out tickets.",
      "GeeksforGeeks also lists random forests and support vector machines among classification algorithms [ml-008]. The next page lets them judge too.",
    ],
  },
  {
    h: "Two more judges: a forest and a margin",
    body: [
      "An [[ensemble]] combines the predictions of several base models to be more general or more robust than any one of them. scikit-learn names random forests and gradient-boosted trees as famous examples [ml-119].",
      "A [[random forest]] is a crowd of decision trees. Each tree learns from a bootstrap sample of the training set, drawn with replacement, and considers only a random subset of the features while it grows [ml-120]. So every tree sees a slightly different shop.",
      "Why bother? scikit-learn says a single decision tree typically has high variance and tends to overfit, and averaging many diverse trees lets some of their errors cancel out. Its forests average the trees' probability predictions instead of taking a vote [ml-121].",
      { analogy: "One apprentice who memorized last month's tickets has strong opinions about everything. Ask a hundred apprentices who each studied a different handful of tickets, and average their hunches. The odd ideas wash out." },
      "A [[support vector machine]] is a supervised method for classification, regression and outlier detection. Its decision function uses only some of the training points, called [[support vectors]] [ml-122]. Intuitively, it separates the classes with the line (in general, a hyperplane) that has the largest distance to the nearest training points of any class. That distance is the margin [ml-123].",
      { analogy: "Lay the widest possible plank on the floor between the fix pile and the replace pile. Only the gadgets touching the plank's edges decide where it goes. Those are the support vectors." },
      { code: "b09_more", out: true },
      "The forest grew 100 trees, and its averaged odds land close to half and half on both tickets: eight gadgets are thin evidence. The SVM's support vectors are three of the eight gadgets: (4, 4) from the fix pile, and (8, 6) and (6, 9) from the replace pile. They are the gadgets nearest the gap.",
      "Both new judges say *fix* for the (5, 6) ticket, and the first three judges said *replace*. That ticket sits in the gap between the piles, where reasonable judges disagree. One more note: scikit-learn says SVMs do not directly provide probability estimates [ml-124], so the program asks the SVM only for its answers.",
      { honest: "The forest uses a fixed seed (`random_state=0`), so the build gets the same trees every run. A different seed grows different trees and can tip a ticket this close the other way." },
      { machine: ["b09-neighbors"], label: "Go to your machine: write the neighbor vote" },
    ],
  },
]);

GLOSS({
  "k-nearest neighbors": "A classifier that remembers the training examples and gives a new point the most common class among its k nearest neighbors. [ml-064]",
  "decision tree": "A model that learns if-then-else rules from the data. Easy to read; can overfit unless limited. [ml-065]",
  "naive Bayes": "A classifier that uses Bayes' theorem and assumes the features are independent once the class is known. [ml-067]",
  ensemble: "A model that combines the predictions of several base models to be more general or robust than one. Random forests are an example. [ml-119]",
  "random forest": "An ensemble of decision trees, each built from a bootstrap sample of the training set with a random subset of the features. scikit-learn averages the trees' probabilities. [ml-120] [ml-121]",
  "support vector machine": "A supervised method for classification, regression and outlier detection that separates classes with the widest possible margin. [ml-122] [ml-123]",
  "support vectors": "The subset of training points that a support vector machine's decision function uses: the ones nearest the dividing line. [ml-122] [ml-123]",
}, "b09");

TOY("neighbors", {
  title: "Neighbor Vote", level: "b09", color: "var(--grape)",
  short: "Drop a new gadget on the map and let its k nearest neighbors vote.",
  goal: "Find a spot where changing k changes the answer.",
  label: "A JavaScript demo of the idea, not Python code. The gadgets are fictional.",
  html: () => `<svg class="board" viewBox="0 0 300 300" tabindex="0" role="img" aria-label="Past gadgets by age and estimate. Tap or click to place the new gadget; arrow keys move it." data-hint="Tap or click to place the new gadget (arrow keys move it)"></svg>
    <div class="row ks"><span>k =</span>${[1, 3, 5, 7].map(k => `<button type="button" class="btn small ${k === 3 ? "sky" : "plain"}" data-k="${k}" data-hint="Let the ${k} nearest gadget${k > 1 ? "s" : ""} vote">${k}</button>`).join("")}</div>
    <p class="say" role="status" aria-live="polite"></p>`,
  init(root, ctx) {
    const P = [[1, 2, "fix"], [2, 3, "fix"], [3, 2, "fix"], [4, 4, "fix"], [2, 6, "fix"], [3, 5, "fix"], [5, 3, "fix"], [6, 2, "fix"], [1, 8, "fix"],
      [7, 8, "replace"], [8, 6, "replace"], [9, 9, "replace"], [6, 9, "replace"], [8, 3, "replace"], [9, 5, "replace"], [5, 7, "replace"], [7, 5, "replace"]];
    const svg = $("svg", root);
    let q = [5, 6], k = 3, seen = {};
    const X = v => 25 + v * 26, Y = v => 275 - v * 26;
    const draw = () => {
      const ranked = P.map(p => ({ p, d: Math.hypot(p[0] - q[0], p[1] - q[1]) })).sort((a, b) => a.d - b.d);
      const near = ranked.slice(0, k), votes = { fix: 0, replace: 0 };
      near.forEach(n => votes[n.p[2]]++);
      const ans = votes.fix > votes.replace ? "fix" : "replace";
      seen[k] = ans;
      let s = `<line x1="25" y1="275" x2="290" y2="275" stroke="#141414" stroke-width="2"/><line x1="25" y1="10" x2="25" y2="275" stroke="#141414" stroke-width="2"/>
        <text x="157" y="295" text-anchor="middle" font-size="11">age (years)</text><text x="12" y="142" font-size="11" text-anchor="middle" transform="rotate(-90 12 142)">estimate</text>`;
      const r = near[near.length - 1].d * 26;
      s += `<circle cx="${X(q[0])}" cy="${Y(q[1])}" r="${r.toFixed(1)}" fill="#ffe45c55" stroke="#c2570a" stroke-dasharray="4 3"/>`;
      near.forEach(n => { s += `<line x1="${X(q[0])}" y1="${Y(q[1])}" x2="${X(n.p[0])}" y2="${Y(n.p[1])}" stroke="#141414" stroke-width="2"/>`; });
      P.forEach(p => {
        s += p[2] === "fix" ? `<rect x="${X(p[0]) - 7}" y="${Y(p[1]) - 7}" width="14" height="14" fill="#5cc8ff" stroke="#141414" stroke-width="2"/>` : `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="8" fill="#ff6fae" stroke="#141414" stroke-width="2"/>`;
      });
      s += `<path d="M${X(q[0])} ${Y(q[1]) - 12} l4 8 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1z" fill="${ans === "fix" ? "#5cc8ff" : "#ff6fae"}" stroke="#141414" stroke-width="2"/>`;
      svg.innerHTML = s;
      $(".say", root).innerHTML = rich(`New gadget at age **${q[0].toFixed(1)}**, estimate **${q[1].toFixed(1)}**. With k = ${k}: **${votes.fix}** say fix (blue squares), **${votes.replace}** say replace (pink circles). Answer: **${ans}**.`);
      if (new Set(Object.values(seen)).size > 1) ctx.goalDone("Same gadget, different k, different answer. The best k depends on the data.");
    };
    const place = e => {
      const r = svg.getBoundingClientRect();
      const vx = (e.clientX - r.left) / r.width * 300, vy = (e.clientY - r.top) / r.height * 300;
      q = [clamp((vx - 25) / 26, 0, 10), clamp((275 - vy) / 26, 0, 10)];
      seen = {}; draw();
    };
    svg.addEventListener("pointerdown", place);
    svg.addEventListener("keydown", e => {
      const d = { ArrowLeft: [-0.5, 0], ArrowRight: [0.5, 0], ArrowUp: [0, 0.5], ArrowDown: [0, -0.5] }[e.key];
      if (!d) return;
      e.preventDefault();
      q = [clamp(q[0] + d[0], 0, 10), clamp(q[1] + d[1], 0, 10)]; seen = {}; draw();
    });
    $$(".ks button", root).forEach(b => b.addEventListener("click", () => {
      k = +b.dataset.k;
      $$(".ks button", root).forEach(x => { x.classList.toggle("sky", x === b); x.classList.toggle("plain", x !== b); });
      draw();
    }));
    draw();
  },
});

LEVEL({
  id: "b09", title: "Neighbors, Trees and Odds", job: "Fix it or replace it? Ask three different judges.",
  color: "#5cc8ff", scene: "bench", cast: ["gridlock"], toy: "neighbors",
  sticker: { title: "Three Judges", glyph: "kNN", color: "#5cc8ff" },
  goals: ["Classify by asking the nearest neighbors", "Read a decision tree's rules", "Compare five models on the same tickets"],
  beats: [
    say("gridlock", "{{you}}, customers keep asking whether to fix an old gadget or just replace it. I answer from gut feeling. Can the bench answer from the records instead?", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "What does your gut actually do? It remembers similar gadgets and what happened to them. We can do that on purpose. It is called [[k-nearest neighbors]].") },
    say("nib", "scikit-learn describes it plainly: keep the past examples, then give a new one the class most of its k nearest neighbors have [ml-064]. No formula to learn. Just a good memory and a ruler."),
    { show: ["nib", "byte"], ...say("byte", "BEEP. I have a ruler. It is `math.dist`. New gadget: five years old, sixty dollar estimate.", "wow") },
    { predict: { program: "b09_knn", q: "Byte asks the three nearest past gadgets. Fix or replace?", choices: ["nearest: [(4, 4, 'fix'), (3, 2, 'fix'), (2, 3, 'fix')]\nvotes: {'fix': 3}\nanswer: fix", "nearest: [(4, 4, 'fix'), (7, 8, 'replace'), (8, 6, 'replace')]\nvotes: {'fix': 1, 'replace': 2}\nanswer: replace", "nearest: [(7, 8, 'replace'), (8, 6, 'replace'), (9, 9, 'replace')]\nvotes: {'replace': 3}\nanswer: replace"], answer: 1,
      why: "The single nearest gadget, at (4, 4), said fix. The next two said replace. Two votes beat one." } },
    { trace: { program: "b09_knn", note: "Watch `votes` grow as each of the three nearest gadgets casts its vote." } },
    say("nib", "Notice the nearest single gadget said *fix*. With k = 1 the answer flips. scikit-learn says the best k is highly data-dependent [ml-064]. Go and find a flip yourself.", "think"),
    { toy: "neighbors", goal: "Find a spot where changing k changes the answer." },
    { ask: { q: "What does a k-nearest-neighbors classifier do during training?", choices: ["It stores the training examples", "It finds a weight for every feature", "It writes if-then rules"], answer: 0,
      why: "It keeps the training instances and does the real work when a new point arrives [ml-064]." } },
    { show: ["nib", "gridlock"], ...say("gridlock", "I like it, but I cannot explain *nearest neighbors* to a customer. I need a reason I can say out loud.", "think") },
    say("nib", "Then you want a [[decision tree]]. It learns if-then-else rules, and scikit-learn says trees are simple to understand and can be drawn [ml-065]. `export_text` even prints the rules as text [ml-066]."),
    { predict: { program: "b09_tree", q: "scikit-learn grows a tree of depth 2 for the same eight gadgets. How many questions does it ask before it can answer?" } },
    say("gridlock", "One question! *Is the estimate over fifty dollars?* I can say that to a customer.", "wow"),
    say("nib", "Trees have a weakness too: they can overfit, which is why we capped this one with `max_depth` [ml-065]. Grown without limits, a tree can carve a rule for every single gadget."),
    { ask: { q: "Why did we set `max_depth=2`?", choices: ["To keep the tree from overfitting by growing too many rules", "Because scikit-learn cannot make deeper trees", "To make it run faster on large data"], answer: 0,
      why: "scikit-learn names `max_depth` as one way to control a tree that would otherwise overfit [ml-065]." } },
    { show: ["nib", "byte"], ...say("byte", "May I bring a third judge? It is called [[naive Bayes]]. It treats every clue as a separate piece of evidence. BEEP.", "wow") },
    say("nib", "Naive Bayes uses Bayes' theorem with a naive shortcut: it treats the features as independent once the class is known [ml-067]. scikit-learn says it is a decent classifier and a bad estimator of probabilities [ml-068].", "think"),
    { predict: { program: "b09_judges", q: "All three judges see two new tickets: (5, 6) and an old cheap one, (9, 4). Will they agree?" } },
    { ask: { q: "On the old gadget with a cheap estimate, the tree said fix and the others said replace. Why might that be?", choices: ["The tree only asks about the estimate; the others also weigh the age", "The tree is broken", "Naive Bayes copied the neighbors"], answer: 0,
      why: "Our tree's only rule is about the estimate. The other two judges use both features, and this gadget is very old." } },
    { book: 3, text: "The book has the three judges side by side." },
    say("nib", "Two more judges want a turn. A [[random forest]] is many trees, each trained on a bootstrap sample with a random subset of the features [ml-120]. It averages their probabilities [ml-121].", "think"),
    say("nib", "And a [[support vector machine]] looks for the dividing line with the widest margin to the nearest gadgets on each side [ml-123]. Those nearest gadgets are the [[support vectors]] [ml-122]."),
    { predict: { program: "b09_more", q: "A 100-tree forest and an SVM judge the same two tickets. What do they say?" } },
    { ask: { q: "The SVM's support vectors are (4, 4), (8, 6) and (6, 9). Why those three gadgets?", choices: ["They sit nearest the gap between the fix pile and the replace pile", "They are the three newest gadgets", "The SVM picks three gadgets at random"], answer: 0,
      why: "The SVM's line keeps the largest distance to the nearest training points of each class [ml-123], and its decision function uses only those points, the support vectors [ml-122]." } },
    { ask: { q: "Why does a random forest usually beat one lonely tree?", choices: ["Averaging many diverse trees lets some of their errors cancel out", "Each tree in a forest is deeper", "A forest never overfits"], answer: 0,
      why: "scikit-learn says single trees have high variance and tend to overfit, and averaging many diverse trees lets some errors cancel out [ml-121]." } },
    { book: 4, text: "The last book page has the forest, the margin and the five-judge vote." },
    say("gridlock", "Five judges, and they argue. Just like my family. Fine: {{you}}, write the neighbor vote by hand so I know it is not magic."),
    { machine: ["b09-neighbors"] },
    say("byte", "I asked my neighbors whether I deserve a sticker. Two out of three said yes. BEEP BOOP."),
    { sticker: true },
  ],
});
