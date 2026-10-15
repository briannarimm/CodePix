/* A4. Calculator Talk: operators, precedence, // % **, strings, slicing, f-strings, round, print sep/end.
   Toy: Expression Tree (exprtree). The steps come from content/programs/a04_steps.py, which asks real
   Python for the value of each sub-expression at build time; the tree drawing is our JavaScript. */

PAGES("a04", [
  {
    h: "The shop calculator",
    body: [
      "The cash register at Gadget Gulch is a box of wires that cannot add. Python can. Type a sum into a program and Python works it out before it does anything else with the line.",
      "The symbols that do the work, such as `+`, `-`, `*` and `/`, are called [[operator|operators]]. A piece of code that works out to a value, such as `3 * 0.25`, is an [[expression]].",
      { code: "a04_receipt", out: true },
      "Line 5 adds three boxes together. Python looks up what each name holds right now, adds the numbers and puts the result in a new box called `total`. The last line works out `paid - total` on the spot and prints it without saving it anywhere.",
      { trace: "a04_receipt", label: "🔍 Watch the receipt add up" },
      { analogy: "Think of a paper receipt. Each line has its own little sum (3 springs at 25 cents), and the bottom line adds the line totals. An expression is the same idea: small sums feed bigger ones until one number is left." },
    ],
  },
  {
    h: "Three ways to divide",
    body: [
      "Python has three division operators, and each answers a different question. Division with `/` always returns a float; `//` is floor division and `%` gives the remainder [py-046].",
      { code: "a04_divide", out: true },
      { table: { head: ["Operator", "The question it answers (17 bolts, 5 bins)"], rows: [["`/`", "How much per bin, exactly? (3.4)"], ["`//`", "How many whole bolts per bin? (3)"], ["`%`", "How many bolts are left over? (2)"]] } },
      { honest: "The table's questions are our own shop wording. The numbers are the recorded output above." },
      "`%` shows up far more than you might guess. A number is even when `n % 2` is 0, and a remainder of 0 means one number divides another exactly. You will use that trick in the FizzBuzz exercise in A6.",
      { analogy: "Hand out 17 bolts into 5 bins, one round at a time. After three full rounds every bin has 3 bolts (that is `//`) and 2 bolts are still in your hand (that is `%`)." },
    ],
  },
  {
    h: "Who goes first?",
    body: [
      "When an expression has several operators, Python has to pick an order. Here are four lines that look alike and print different numbers.",
      { code: "a04_order", out: true },
      "The first line printed 14, so Python did the multiplication before the addition. Brackets change the order: the second line printed 20.",
      "Powers use `**`. In Python `**` has higher precedence than a unary minus, so `-3**2` is `-(3**2)`, which is -9 [py-052]. Write `(-3) ** 2` when you mean the square of minus three.",
      { analogy: "On a receipt you work out each line before the grand total. Brackets are a way of saying \"this line first\" when Python would otherwise pick a different order." },
      "The Expression Tree toy takes an expression apart into a tree and shows each step as it happens. At each step, the highlighted part is the piece Python works out next.",
      { toy: "exprtree", label: "Open the Expression Tree" },
      { nerd: "How it really works", body: [
        "The toy's steps come from a small Python program, `a04_steps.py`, that uses the `ast` module to split each expression into parts and asks Python for the value of each part. We ran it when the site was built. The tree pictures are drawn by our JavaScript.",
      ] },
    ],
  },
  {
    h: "Text is a row of characters",
    body: [
      "A [[string]] is text in quotes. Python can count it, cut it and join it.",
      { code: "a04_strings", out: true },
      "Each character has a position number, an [[index]]. Slicing is supported as well as indexing: `word[0:2]` gives the characters from position 0 (included) to 2 (excluded), and negative indexes such as `word[-1]` count from the right [py-053]. So `part[0]` is the first letter, `part[-1]` is the last, and `part[0:4]` is a [[slice]] of four letters.",
      "`+` joins strings, `*` repeats them, and `len()` returns a string's length [py-054]. Strings also have methods, which are actions written after a dot, including `upper()`, `lower()`, `startswith()`, `count()` and `replace()` [py-160].",
      { analogy: "A string is a row of lettered tiles in a tray, each tray slot numbered from 0. A slice lifts out the tiles from one slot up to, but not including, another." },
      { ul: [
        "Counting from 0 feels odd for about a week. After that it feels normal.",
        "In `word[0:4]`, the end number is the first slot you do *not* take. `range()` in A6 works the same way.",
      ] },
    ],
  },
  {
    h: "Tidy output",
    body: [
      "A receipt has to look the same every time. An [[f-string]] starts with `f`, puts expressions in braces, and accepts a format such as `.3f` after a colon [py-055]. `.2f` means two decimal places, which suits prices.",
      { code: "a04_fstring", out: true },
      "Line 7 holds a surprise. `round()` uses round-half-to-even, so `round(0.5)` is 0 and `round(1.5)` is 2 [py-056]. The recorded output shows `round(2.5)` is 2 as well. If you want shop prices on the page, format them with `.2f` and leave the numbers alone.",
      "`print()` writes its arguments separated by `sep` and followed by `end`, to `sys.stdout` unless a file is given [py-057]. That is why lines 8 to 10 print `bolt | nut | washer` and then `Total: 4.5` on one line: the first `print` ended with `\": \"` instead of a new line.",
      { trace: "a04_fstring", label: "🔍 Watch the receipt line form" },
      { machine: ["a04-change", "a04-receipt"], label: "Go to your machine: fix the register" },
    ],
  },
]);

GLOSS({
  operator: "A symbol that works on values, such as `+`, `*` or `//`. Division with `/` always gives a float; `//` is floor division and `%` gives the remainder. [py-046]",
  expression: "A piece of code that Python works out to a single value, such as `2 + 3 * 4`. (Our own definition.)",
  string: "Text in quotes, such as `\"sprocket\"`. `+` joins strings, `*` repeats them and `len()` gives the length. [py-054]",
  "f-string": "A string that starts with `f` and holds expressions in braces, optionally with a format such as `.2f` after a colon. [py-055]",
  index: "A position number in square brackets, as in `word[0]`. Negative indexes such as `word[-1]` count from the right. [py-053]",
  slice: "A piece cut out of a sequence: `word[0:2]` gives the characters from position 0 (included) to 2 (excluded). [py-053]",
}, "a04");

/* ---------- Expression Tree toy ---------- */
TOY("exprtree", {
  title: "Expression Tree", level: "a04", color: "var(--sky)", wide: true,
  short: "Watch an expression shrink, one step at a time.",
  goal: "Step an expression all the way down to one value.",
  label: "A JavaScript demo of the idea, not Python code.",
  html: () => "",
  init(root, ctx) {
    const p = DATA.programs.a04_steps;
    let all = [];
    try { all = p.out.trim().split("\n").map(l => JSON.parse(l)); } catch (e) { all = []; }
    if (!all.length) { root.append(el("p", {}, "The recorded steps are missing from this build.")); return; }
    let cur = 0, k = 0;
    const pick = el("div.picks", { role: "group", "aria-label": "Choose an expression" });
    const board = el("div.board");
    const line = el("p.line", { "aria-live": "polite" });
    const say = el("p.what", { role: "status" });
    const stepno = el("span.stepno");
    const back = el("button.btn.small.plain", { type: "button", "data-hint": "Go back one step", onclick: () => go(k - 1) }, "◀ Back");
    const next = el("button.btn.small.sky", { type: "button", "data-hint": "Let Python work out the highlighted part", onclick: () => go(k + 1) }, "Step ▶");
    const reset = el("button.btn.small.plain", { type: "button", "data-hint": "Start this expression again", onclick: () => go(0) }, "Start over");
    all.forEach((x, i) => pick.append(el("button.btn.small" + (i ? ".plain" : ".sky"), { type: "button", "data-hint": "Take apart " + x.expr, onclick: e => {
      $$("button", pick).forEach(b => { b.classList.remove("sky"); b.classList.add("plain"); });
      e.currentTarget.classList.add("sky"); e.currentTarget.classList.remove("plain");
      cur = i; go(0);
    } }, el("code", {}, x.expr))));
    root.append(pick, board, line, el("div.row", {}, back, next, reset, stepno), say,
      el("p.own", {}, `Each value was worked out by real Python ${p.python} when the site was built (program a04_steps.py). The tree drawing is our JavaScript.`));

    const draw = (tree) => {
      // lay out: leaves left to right, parents centred over their children
      const W = n => Math.max(64, n[0].length * 11 + 26);
      let x = 0, depth = 0;
      const place = (n, d) => {
        depth = Math.max(depth, d);
        const kids = n.slice(2);
        if (!kids.length) { const w = W(n); n.x = x + w / 2; x += w + 12; }
        else { kids.forEach(c => place(c, d + 1)); n.x = (kids[0].x + kids[kids.length - 1].x) / 2; }
        n.d = d;
      };
      place(tree, 0);
      const width = Math.max(x, 220), height = depth * 78 + 64;
      let lines = "", nodes = "";
      const walk = n => {
        const y = n.d * 78 + 32;
        n.slice(2).forEach(c => { lines += `<line x1="${n.x}" y1="${y}" x2="${c.x}" y2="${c.d * 78 + 32}" />`; walk(c); });
        const w = W(n), leaf = n.length === 2, hot = n[1] === 1;
        nodes += `<g class="${hot ? "hot" : leaf ? "leaf" : "op"}"><rect x="${n.x - w / 2}" y="${y - 20}" width="${w}" height="40" rx="${leaf ? 8 : 20}" /><text x="${n.x}" y="${y + 6}">${esc(n[0])}</text></g>`;
      };
      walk(tree);
      board.innerHTML = `<svg viewBox="-6 0 ${width + 6} ${height}" role="img" aria-label="Expression tree"><g class="edges">${lines}</g>${nodes}</svg>`;
    };
    const go = i => {
      const steps = all[cur].steps;
      k = clamp(i, 0, steps.length - 1);
      const s = steps[k];
      draw(JSON.parse(JSON.stringify(s.tree)));
      if (s.span) {
        const t = s.text;
        line.innerHTML = `<code>${esc(t.slice(0, s.span[0]))}<mark>${esc(t.slice(s.span[0], s.span[1]))}</mark>${esc(t.slice(s.span[1]))}</code>`;
        say.innerHTML = rich(`Next, Python works out \`${t.slice(s.span[0], s.span[1])}\` and gets \`${s.value}\`.`);
      } else {
        line.innerHTML = `<code>${esc(s.text)}</code>`;
        say.innerHTML = rich(`Done. The whole expression is worth \`${all[cur].value}\`.`);
        ctx.goalDone();
      }
      stepno.textContent = `Step ${k + 1} of ${steps.length}`;
      back.disabled = k === 0;
      next.disabled = k === steps.length - 1;
    };
    go(0);
  },
});

LEVEL({
  id: "a04", title: "Calculator Talk", job: "The cash register must add up a receipt.",
  color: "#5cc8ff", scene: "shop", cast: ["gridlock"], toy: "exprtree",
  sticker: { title: "Register Fixer", glyph: "+-", color: "#5cc8ff" },
  goals: ["Use + - * / // % and **", "Cut and join strings", "Print a tidy receipt line with an f-string"],
  beats: [
    say("gridlock", "{{you}}, the register just offered a customer 400 dollars in change for a 4 dollar washer. I would like it to stop doing that.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Then we teach the helper to do sums. In Python, symbols like `+` and `*` are [[operator|operators]], and a line such as `3 * 0.25` is an [[expression]]: something Python works out to one value.") },
    { show: ["nib", "byte"], ...say("byte", "BEEP. I love sums. Sums never argue.", "wow") },
    { predict: { program: "a04_receipt", q: "Three springs, two gears, and 12 dollars of labor. The customer pays 20. What does the receipt print?",
      choices: ["Total: 15.75\nChange: 4.25", "Total: 17.25\nChange: 2.75", "Total: 15.75\nChange: -4.25"], answer: 0,
      why: "3 × 0.25 is 0.75, 2 × 1.5 is 3.0, and 0.75 + 3.0 + 12 is 15.75. Then 20 − 15.75 is 4.25." } },
    { trace: { program: "a04_receipt", note: "Each line works out its sum first, then fills a box." } },
    say("nib", "Division comes in three flavors. `/` always gives a float; `//` is floor division and `%` gives the remainder [py-046].", "think"),
    { predict: { program: "a04_divide", q: "17 bolts, 5 bins. What do `/`, `//` and `%` print?",
      choices: ["3.4\n3\n2", "3\n3\n2", "3.4\n3.4\n2"], answer: 0,
      why: "`/` gives 3.4. `//` keeps the whole part, 3. `%` gives what is left over: 17 − 15 = 2." } },
    { ask: { q: "What is `23 % 5`?", choices: ["3", "4", "4.6"], answer: 0,
      why: "Five fits into 23 four times (that is 20), and 3 is left over. `%` gives the remainder [py-046]." } },
    say("reader", "I read left to right, but I do not *work out* left to right. Some operators jump the queue.", "think"),
    say("nib", "Exactly. And one rule surprises everybody: `**` has higher precedence than a unary minus, so `-3**2` is -9 [py-052].", "wow"),
    { predict: { program: "a04_order", q: "Four lines that look alike. Write down what you think each one prints." } },
    { toy: "exprtree", goal: "Step any expression all the way down to one value." },
    { show: ["gridlock", "nib"], ...say("gridlock", "Numbers, fine. But the receipt also needs the part names on it. Can the helper do words?") },
    say("nib", "Words are [[string|strings]]. Each letter has a position, its [[index]], starting from 0. Negative indexes count from the right, and `word[0:2]` cuts out a [[slice]] [py-053]."),
    { ask: { q: "`part = \"sprocket\"`. What is `part[0:4]`?", choices: ["`'spro'`", "`'sproc'`", "`'proc'`"], answer: 0,
      why: "The slice starts at position 0 and stops *before* position 4, so you get four letters [py-053]. The book's chapter prints it from real Python." } },
    say("nib", "Last trick: an [[f-string]]. Put `f` before the quote and expressions in braces, with a format such as `.2f` after a colon [py-055]. Receipts love it."),
    { trace: { program: "a04_fstring", note: "Watch line 6 build the receipt line from four boxes." } },
    { ask: { q: "The recording printed `round(2.5)`. What did Python give?", choices: ["2", "3", "2.0"], answer: 0,
      why: "`round()` rounds a tie to the even choice: `round(0.5)` is 0 and `round(1.5)` is 2 [py-056]. The recorded output shows 2 for `round(2.5)` too." } },
    { book: 0, text: "The book has the whole chapter: three kinds of division, who goes first, strings and tidy output." },
    { show: ["gridlock", "byte"], ...say("gridlock", "Good. Now fix the real register. Change in dollars and cents, and one tidy receipt line.", "think") },
    { machine: ["a04-change", "a04-receipt"] },
    say("byte", "Change: correct. Receipt: tidy. Customers: only mildly confused. BEEP."),
    { sticker: true },
  ],
});
