/* B3. Draw the Data: look before you model.
   TODO(research): saving a figure to a file (savefig) is a GAP; the book says so and the recorded programs never call plt.show(). */

/* A tiny SVG chart helper shared by the B3, B4 and B5 toys and figures (hand-written, no library). */
const B0X_PLOT = {
  W: 360, H: 260, L: 46, R: 12, T: 12, B: 40,
  frame(o) {
    const { W, H, R, T, B } = this, L = o.L || this.L;
    const sx = v => L + (v - o.x0) / (o.x1 - o.x0) * (W - L - R), sy = v => H - B - (v - o.y0) / (o.y1 - o.y0) * (H - T - B);
    let s = `<rect x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}" fill="#fff"/>`;
    o.xt.forEach(v => { s += `<line x1="${sx(v)}" y1="${T}" x2="${sx(v)}" y2="${H - B}" stroke="#e4e4e4"/><text x="${sx(v)}" y="${H - B + 16}" font-size="12" text-anchor="middle">${v}</text>`; });
    o.yt.forEach(v => { s += `<line x1="${L}" y1="${sy(v)}" x2="${W - R}" y2="${sy(v)}" stroke="#e4e4e4"/><text x="${L - 6}" y="${sy(v) + 4}" font-size="12" text-anchor="end">${v}</text>`; });
    s += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="#141414" stroke-width="2"/><line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="#141414" stroke-width="2"/>`;
    s += `<text x="${(L + W - R) / 2}" y="${H - 6}" font-size="13" text-anchor="middle" font-weight="700">${o.xl}</text>`;
    s += `<text x="12" y="${(T + H - B) / 2}" font-size="13" text-anchor="middle" font-weight="700" transform="rotate(-90 12 ${(T + H - B) / 2})">${o.yl}</text>`;
    return { s, sx, sy };
  },
  hoursCost() { return this.frame({ x0: 0, x1: 4.5, y0: 0, y1: 200, xt: [0, 1, 2, 3, 4], yt: [0, 50, 100, 150, 200], xl: "hours of work", yl: "cost ($)" }); },
  svg(inner, label) { return `<svg class="board" viewBox="0 0 ${this.W} ${this.H}" role="img" aria-label="${esc(label)}" font-family="Comic Neue, sans-serif">${inner}</svg>`; },
  scatterSVG() {
    const f = this.hoursCost();
    let s = f.s;
    B0X_TICKETS.forEach(t => { s += `<circle cx="${f.sx(t.hours)}" cy="${f.sy(t.cost)}" r="6" fill="#ff8a1f" stroke="#141414" stroke-width="2"/>`; });
    return this.svg(s, "Scatter plot of hours against cost for twelve fictional tickets");
  },
};

PAGES("b03", [
  {
    h: "Look before you model",
    body: [
      "Byte is itching to fit a model. Dr. Nib says to look first. A picture of the data shows things a table hides: a ticket far from the others, a pile of cheap jobs, a trend that bends.",
      "The first picture needs no library at all. This program sorts the twelve fictional costs into $40-wide bins and draws each bin as a row of `#` marks.",
      { code: "b03_texthist", out: true },
      { trace: "b03_texthist", label: "🔍 Watch the bins fill" },
      "That is a histogram: how many values land in each range. Most jobs cost between $40 and $79. One lonely job sits up in the $160s.",
      { analogy: "A histogram is a set of bins on the shop floor. Each ticket gets dropped into the bin for its price range, and then you look at how tall the piles are." },
    ],
  },
  {
    h: "Matplotlib's pattern",
    body: [
      "[[Matplotlib]] draws on a Figure that can contain one or more Axes, and Axes methods include `plot`, `scatter` and `hist` [ml-102]. Its basic example has three steps: `plt.subplots()` makes a figure with one Axes, `ax.plot` draws on it, and `plt.show()` displays it [ml-020].",
      "This program uses `scatter` in place of `plot`, so each ticket becomes one dot: hours across, cost up.",
      { code: "b03_scatter", out: true },
      "The build computer has no screen, so the recorded program reports what it drew. On your machine, add one line at the end and a window opens with the picture:",
      { snippet: "plt.show()", lang: "py", file: "add at the end" },
      { fig: () => B0X_PLOT.scatterSVG(), cap: "A JavaScript drawing of the same twelve numbers, made for this page. Matplotlib's own picture looks a little different." },
      { honest: "Saving the picture to an image file is not covered yet; the page we read for Matplotlib does not show it." },
    ],
  },
  {
    h: "The same histogram, by Matplotlib",
    body: [
      "`hist` is also an Axes method [ml-102]. This program gives it the same $40 bin edges as the text version.",
      { code: "b03_hist", out: true },
      "Same twelve costs, same bins, same counts: 1, 6, 2, 2 and 1. Matplotlib did the counting our loop did, and on your machine it draws the bars too.",
      { nerd: "Why check against the text version?", body: [
        "Two different methods that agree are good evidence that both are right. You will see Dr. Nib use this trick again in B4, where a plain-Python line fit and scikit-learn land on the same numbers.",
      ] },
    ],
  },
  {
    h: "What the pictures say",
    body: [
      "Read the scatter plot from left to right. Longer jobs cost more, and the dots climb in a rough straight band. That suggests the Quote Machine could start with a straight line through the dots, which is B4's job.",
      "Then find the dot in the top right corner: T08, the fridge, four hours and $172. It still sits near the band, so it looks like a big job priced the usual way. A dot far off the band would be worth a second look at its ticket before trusting any model built on it.",
      { toy: "plotlab", label: "Open the Plot Lab" },
      { machine: ["b03-bins", "b03-scatter"], label: "Go to your machine: count the bins, then see the dots" },
    ],
  },
]);

/* ---- Toy: Plot Lab (JS demo) ---- */
TOY("plotlab", {
  title: "Plot Lab", level: "b03", color: "var(--tang)",
  short: "A scatter plot and a histogram of the twelve fictional tickets. Tap dots and bars.",
  goal: "Find the most expensive ticket on the scatter plot and tap its dot.",
  label: "A JavaScript demo of the idea, not Python code. It draws the same fictional numbers the Python programs print.",
  html: () => `<div class="row" role="tablist">
      <button type="button" class="btn small tang pl-tab" data-k="scatter" role="tab" aria-selected="true" data-hint="Show hours against cost, one dot per ticket">Scatter: hours and cost</button>
      <button type="button" class="btn small plain pl-tab" data-k="hist" role="tab" aria-selected="false" data-hint="Show how many tickets fall in each $40 price range">Histogram: cost</button></div>
    <div class="pl-board"></div><p class="panel pl-read" aria-live="polite">Tap a dot or a bar.</p>`,
  init(root, ctx) {
    const board = $(".pl-board", root), read = $(".pl-read", root);
    const bins = [0, 40, 80, 120, 160];
    const scatter = () => {
      const f = B0X_PLOT.hoursCost();
      let s = f.s;
      B0X_TICKETS.forEach((t, i) => { s += `<circle class="pl-dot" data-i="${i}" cx="${f.sx(t.hours)}" cy="${f.sy(t.cost)}" r="8" tabindex="0" role="button" aria-label="${t.id} ${t.app}" data-hint="Ticket ${t.id}: tap to read it"/>`; });
      board.innerHTML = B0X_PLOT.svg(s, "Scatter plot of hours against cost");
    };
    const hist = () => {
      const f = B0X_PLOT.frame({ x0: 0, x1: 200, y0: 0, y1: 7, xt: [0, 40, 80, 120, 160, 200], yt: [0, 2, 4, 6], xl: "cost ($)", yl: "tickets" });
      let s = f.s;
      bins.forEach((b, k) => {
        const n = B0X_TICKETS.filter(t => t.cost >= b && t.cost < b + 40).length;
        s += `<rect class="pl-bar" data-k="${k}" x="${f.sx(b) + 2}" y="${f.sy(n)}" width="${f.sx(b + 40) - f.sx(b) - 4}" height="${f.sy(0) - f.sy(n)}" tabindex="0" role="button" aria-label="$${b} to $${b + 39}: ${n} tickets" data-hint="Tap to see which tickets cost $${b} to $${b + 39}"/>`;
      });
      board.innerHTML = B0X_PLOT.svg(s, "Histogram of ticket costs in $40 bins");
    };
    const pick = node => {
      if (node.classList.contains("pl-dot")) {
        $$(".pl-dot", board).forEach(d => d.classList.remove("on")); node.classList.add("on");
        const t = B0X_TICKETS[+node.dataset.i];
        read.innerHTML = rich(`**${t.id}**, a ${t.app}: ${t.hours} hours, ${t.parts} part${t.parts === 1 ? "" : "s"}, **$${t.cost}**.`);
        if (t.cost === Math.max(...B0X_TICKETS.map(x => x.cost))) ctx.goalDone("T08, the fridge, is the dot in the top right corner.");
      } else if (node.classList.contains("pl-bar")) {
        $$(".pl-bar", board).forEach(d => d.classList.remove("on")); node.classList.add("on");
        const b = bins[+node.dataset.k], list = B0X_TICKETS.filter(t => t.cost >= b && t.cost < b + 40);
        read.innerHTML = rich(`**$${b} to $${b + 39}:** ${list.length} ticket${list.length === 1 ? "" : "s"} (${list.map(t => `${t.id} $${t.cost}`).join(", ")}).`);
      }
    };
    board.addEventListener("click", e => { const n = e.target.closest(".pl-dot,.pl-bar"); if (n) pick(n); });
    board.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target.closest(".pl-dot,.pl-bar")) { e.preventDefault(); pick(e.target); } });
    $$(".pl-tab", root).forEach(b => b.onclick = () => {
      $$(".pl-tab", root).forEach(x => { const on = x === b; x.setAttribute("aria-selected", String(on)); x.classList.toggle("tang", on); x.classList.toggle("plain", !on); });
      read.textContent = "Tap a dot or a bar.";
      if (b.dataset.k === "hist") hist(); else scatter();
    });
    scatter();
  },
});

LEVEL({
  id: "b03", title: "Draw the Data", job: "Look at the tickets before trusting any model.",
  color: "#ffc48a", scene: "bench", cast: ["nib", "byte"], toy: "plotlab",
  sticker: { title: "Chart Peeker", glyph: "::", color: "#ffc48a" },
  goals: ["Draw a histogram in plain Python", "Know Matplotlib's Figure and Axes pattern", "Read a scatter plot for trends and odd dots"],
  beats: [
    say("byte", "Table ready! Can I fit a model now? Please? I have been very patient for a robot.", "wow"),
    say("nib", "Not yet. First we look. A picture shows what a table hides. How do you know the data makes sense if you never looked at it?", "think"),
    say("nib", "Start with no library at all. Sort the costs into $40 bins and print a row of marks for each bin."),
    { predict: { program: "b03_texthist", q: "Twelve costs into $40-wide bins. Which picture comes out?",
      choices: ["    $0-39 #\n   $40-79 ######\n  $80-119 ##\n $120-159 ##\n $160-199 #", "   $40-79 ######\n  $80-119 ##\n $120-159 ##\n $160-199 #", "    $0-39 ##\n   $40-79 #####\n  $80-119 ##\n $120-159 ##\n $160-199 #"], answer: 0,
      why: "Only the $30 lamp lands in the first bin. `cost // 40 * 40` turns 30 into 0, so it starts the $0-39 row." } },
    { trace: { program: "b03_texthist", note: "Watch `start` for each cost. `//` throws away the remainder, so 78 becomes 40." } },
    { ask: { q: "Where does a cost of exactly $80 go?", choices: ["the $40-79 bin", "the $80-119 bin", "nowhere, it is an edge"], answer: 1,
      why: "`80 // 40 * 40` is 80, so it starts the $80-119 bin. Each bin includes its own starting value." } },
    say("nib", "Now the proper tool. [[Matplotlib]] draws on a Figure that holds Axes, and Axes have methods such as `scatter` and `hist` [ml-102].", "think"),
    say("nib", "The basic pattern: `fig, ax = plt.subplots()`, draw on `ax`, then `plt.show()` to display it [ml-020]."),
    { predict: { program: "b03_scatter", q: "This program makes a scatter plot. The build computer has no screen, so the program reports what it drew. What does it print?" } },
    say("byte", "Twelve dots on one Axes. I wish I could see them. My screen is only a face.", "think"),
    { ask: { q: "The recorded programs leave out one line that you add on your own machine to open the picture. Which?", choices: ["`plt.subplots()`", "`ax.scatter(hours, costs)`", "`plt.show()`"], answer: 2,
      why: "`plt.show()` displays the figure [ml-020]. The build computer has no screen, so the recorded programs stop before it." } },
    { predict: { program: "b03_hist", q: "Matplotlib's `hist` with the same bin edges. Do its counts match the text histogram?" } },
    { show: ["nib", "byte", "gridlock"], ...say("gridlock", "So what does the picture say about my prices?", "think") },
    say("nib", "Longer jobs cost more, in a rough straight band. And there is one dot up in the corner: the fridge. It sits near the band, so we keep it."),
    { book: 1, text: "The book shows the pattern, the code, and a drawing of the same twelve dots." },
    { toy: "plotlab", goal: "Find the most expensive ticket on the scatter plot and tap its dot." },
    say("nib", "On your machine: count bins in plain Python, then open a real Matplotlib window."),
    { machine: ["b03-bins", "b03-scatter"] },
    say("byte", "A straight band of dots. I know what comes next. A line! BEEP."),
    { sticker: true },
  ],
});
