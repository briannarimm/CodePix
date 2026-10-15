/* A5. Yes or No: comparisons, booleans, and/or/not, short-circuit, truthiness, if/elif/else.
   Toy: Gate Garden (gategarden), a JavaScript demo of a two-gate if/elif/else chain. */

// TODO(research): no source yet for how indentation marks a block, or for IndentationError (lesson plan GAP).
// The book describes indentation only as what the recorded programs show.

PAGES("a05", [
  {
    h: "Questions with yes-or-no answers",
    body: [
      "Ms. Gridlock's discounts depend on questions. Is the customer under 12? Is this a member? Each question has two possible answers, and Python writes them as `True` and `False`. Those two values are called [[boolean|booleans]].",
      "A [[comparison]] asks one of those questions. The standard comparison operators are `<` (less than), `>` (greater than), `==` (equal to), `<=` (less than or equal to), `>=` (greater than or equal to) and `!=` (not equal to) [py-158].",
      { code: "a05_compare", out: true },
      "Line 4 printed `False`: to Python, `\"bolt\"` and `\"Bolt\"` are different strings. Comparisons can be chained, so `a < b == c` means `a < b and b == c` [py-061]. Line 6 uses that to ask whether 3 sits between 1 and 5.",
      { nerd: "One equals sign or two?", body: [
        "`=` puts a value in a box (A3). `==` asks whether two values are equal. Mixing them up is one of the most common beginner slips, so read `==` aloud as \"is equal to\".",
      ] },
    ],
  },
  {
    h: "and, or, not",
    body: [
      "Bigger questions are built from smaller ones with `and`, `or` and `not`. In Python's boolean precedence, `not` binds tighter than `and`, which binds tighter than `or` [py-059]. When in doubt, add brackets; they cost nothing.",
      "`and` and `or` short-circuit and return the last operand evaluated, so `'' or 'Trondheim'` gives `'Trondheim'` [py-060]. Short-circuit means Python stops as soon as it knows the answer.",
      "That raises a question: why would an empty string count as false? Any non-zero integer value is true and zero is false; any sequence with a non-zero length is true and empty sequences are false [py-062]. We call this a value's [[truthiness]].",
      { code: "a05_truthy", out: true },
      "Look at the last line. `1 / 0` would stop the program with an error, yet the program printed `0` and finished. `0` is false, so `and` already knew its answer and never looked at the division.",
      { analogy: "`and` is a door with two locks: if the first lock holds, nobody bothers trying the second key. `or` is a shop with two doors: if the first door opens, you walk in and never check the second." },
    ],
  },
  {
    h: "Forks in the road",
    body: [
      "A [[condition]] is a question whose answer decides what happens next. `if` runs a block of lines only when its condition is true. `elif` is short for else if, and an `if`/`elif` chain stands in for the `switch` statement of other languages [py-058]. `else` catches everything left over.",
      { code: "a05_ticket", out: true },
      "The indented lines under `if`, `elif` and `else` are the branches. Watch the recording: Python checks `age < 12` first, finds it false, moves on to the `elif`, finds that true, and runs that one branch. It never even looks at the `else`.",
      { trace: "a05_ticket", label: "🔍 Watch the program pick a branch" },
      { analogy: "A fork in the road with signs. The first sign says \"Under 12? Turn here.\" If that is not you, walk on to the next sign. The last road has no sign: it is where everyone else goes." },
      { toy: "gategarden", label: "Open the Gate Garden" },
    ],
  },
  {
    h: "Order matters",
    body: [
      "Python checks the conditions from the top and takes the first branch whose condition is true, as the recording showed. So the order you write them in is part of the meaning.",
      "In the ticket program, a 10-year-old member gets the kids' price of 5, because `age < 12` comes first. Swap the two conditions and the same child pays 8. The Gate Garden has a switch that swaps the gates, so you can watch it happen.",
      { ul: [
        "Put the narrowest case first (both FizzBuzz and the shipping exercise depend on this).",
        "Use `else` for \"everything else\", and make sure it really is everything else.",
        "Test the edges. If the rule says \"under 5 kg\", try exactly 5.",
      ] },
      { honest: "The tips are our own advice. The program and its output above were recorded from real Python." },
      { machine: ["a05-classify", "a05-shipping"], label: "Go to your machine: sort numbers and parcels" },
    ],
  },
]);

GLOSS({
  boolean: "One of the two values `True` and `False`. Comparisons such as `3 < 5` produce them. (Our own definition.)",
  comparison: "A question about two values, written with `<`, `>`, `==`, `<=`, `>=` or `!=`. [py-158]",
  condition: "A question in an `if`, `elif` or `while` line whose answer decides what runs next. (Our own definition.)",
  truthiness: "Whether a value counts as true. Any non-zero integer is true and zero is false; non-empty sequences are true and empty ones are false. [py-062]",
}, "a05");

/* ---------- Gate Garden toy ---------- */
TOY("gategarden", {
  title: "Gate Garden", level: "a05", color: "var(--lime)", wide: true,
  short: "Send customers through two gates and see which price they get.",
  goal: "Land a customer in each of the three price bins.",
  label: "A JavaScript demo of the idea, not Python code.",
  html: () => "",
  init(root, ctx) {
    const st = { age: 70, member: false, swapped: false, hits: [0, 0, 0], busy: false };
    const KID = { label: ["age < 12"], test: s => [[`age < 12`, s.age < 12]], bin: 0 };
    const SEN = { label: ["age >= 65", "or member"], test: s => s.age >= 65 ? [["age >= 65", true], ["member", null]] : [["age >= 65", false], ["member", s.member]], bin: 1 };
    const BINS = ["price = 5", "price = 8", "price = 10"];
    const gates = () => st.swapped ? [SEN, KID] : [KID, SEN];
    const board = el("div.board");
    const age = el("input", { type: "range", min: 0, max: 99, value: st.age, "aria-label": "Customer age", "data-hint": "Drag to choose the customer's age" });
    const ageOut = el("b.readout", {}, String(st.age));
    const mem = el("button.btn.small.plain", { type: "button", "aria-pressed": "false", "data-hint": "Is this customer a member? Click to switch" }, "member = False");
    const send = el("button.btn.lime", { type: "button", "data-hint": "Send this customer through the gates" }, "Send customer ▶");
    const swap = el("button.btn.small.plain", { type: "button", "aria-pressed": "false", "data-hint": "Swap the order of the two gates and see what changes" }, "Swap the gate order");
    const log = el("ol.log", { "aria-live": "polite" });
    const code = el("div.code-wrap");
    root.append(
      el("div.controls", {}, el("label.agebox", { "data-hint": "Drag to choose the customer's age" }, "age = ", ageOut, age), mem),
      el("div.row", {}, send, swap),
      board, log, code);
    age.oninput = () => { st.age = +age.value; ageOut.textContent = String(st.age); };
    mem.onclick = () => { st.member = !st.member; mem.textContent = "member = " + (st.member ? "True" : "False"); mem.setAttribute("aria-pressed", String(st.member)); mem.classList.toggle("lime", st.member); mem.classList.toggle("plain", !st.member); };
    swap.onclick = () => { if (st.busy) return; st.swapped = !st.swapped; swap.setAttribute("aria-pressed", String(st.swapped)); swap.classList.toggle("pink", st.swapped); swap.classList.toggle("plain", !st.swapped); draw(); showCode(); };

    // geometry (viewBox 0 0 360 430)
    const G = [{ x: 120, y: 92 }, { x: 120, y: 236 }], BINXY = [{ x: 296, y: 92 }, { x: 296, y: 236 }, { x: 120, y: 374 }];
    const draw = (res) => {
      const gs = gates();
      let s = `<svg viewBox="0 0 360 430" role="img" aria-label="Two gates in a row. The first true gate sends the customer to its price bin; otherwise the customer reaches the last bin.">`;
      s += `<path class="road" d="M120 18 V 374 M120 92 H 296 M120 236 H 296" />`;
      s += `<text class="tag" x="176" y="82">True</text><text class="tag" x="176" y="226">True</text><text class="tag" x="128" y="168">False</text><text class="tag" x="128" y="312">False</text>`;
      s += `<circle class="start" cx="120" cy="18" r="12" />`;
      gs.forEach((g, i) => {
        const { x, y } = G[i], r = res && res[i];
        s += `<g class="gate${r ? (r.ok ? " yes" : " no") : ""}"><path d="M${x} ${y - 46} L${x + 78} ${y} L${x} ${y + 46} L${x - 78} ${y} Z" />`;
        g.label.forEach((t, k) => { s += `<text x="${x}" y="${y + 5 + (g.label.length === 2 ? (k ? 10 : -8) : 0)}">${esc(t)}</text>`; });
        s += `</g>`;
        if (r) s += `<text class="verdict" x="${x - 76}" y="${y - 50}">${r.parts.map(([n, v]) => `${esc(n)}: ${v == null ? "skipped" : v ? "True" : "False"}`).join(", ")}</text>`;
      });
      const order = st.swapped ? [1, 0, 2] : [0, 1, 2];
      order.forEach((b, pos) => {
        const { x, y } = BINXY[pos];
        s += `<g class="bin${res && res.bin === b ? " hit" : ""}"><rect x="${x - 58}" y="${y - 24}" width="116" height="48" rx="8" /><text x="${x}" y="${y - 2}">${BINS[b]}</text><text class="count" x="${x}" y="${y + 16}">${st.hits[b]} sent here</text></g>`;
      });
      s += `<circle class="token" cx="120" cy="18" r="11" /></svg>`;
      board.innerHTML = s;
    };
    const showCode = () => {
      code.innerHTML = "";
      if (!st.swapped) {
        code.append(el("p.own", {}, "The same decision in real Python (a05_ticket.py). The garden's age and member stand in for lines 2 and 3."), codeBlock(DATA.programs.a05_ticket.src, { file: "a05_ticket.py" }));
      } else {
        code.append(el("p.own", { html: rich("With the gates swapped, the program would test `age >= 65 or member` first and `age < 12` second. Try a 10-year-old member both ways.") }));
      }
    };
    const moveTo = (tok, x, y) => new Promise(r => {
      tok.setAttribute("cx", x); tok.setAttribute("cy", y);
      setTimeout(r, reducedMotion() ? 0 : 380);
    });
    send.onclick = async () => {
      if (st.busy) return;
      st.busy = true; send.disabled = true;
      const gs = gates(), res = [];
      let bin = 2;
      for (let i = 0; i < gs.length; i++) {
        const parts = gs[i].test(st);
        const ok = parts.some(([, v]) => v === true);
        res.push({ ok, parts });
        if (ok) { bin = gs[i].bin; break; }
      }
      res.bin = bin;
      draw();
      const tok = $(".token", board);
      for (let i = 0; i < res.length; i++) {
        await moveTo(tok, G[i].x, G[i].y);
        draw(Object.assign(res.slice(0, i + 1), { bin: -1 }));
        $(".token", board).setAttribute("cx", G[i].x); $(".token", board).setAttribute("cy", G[i].y);
      }
      const pos = (st.swapped ? [1, 0, 2] : [0, 1, 2]).indexOf(bin);
      await moveTo($(".token", board), BINXY[pos].x, BINXY[pos].y);
      st.hits[bin]++;
      draw(res);
      $(".token", board).setAttribute("cx", BINXY[pos].x); $(".token", board).setAttribute("cy", BINXY[pos].y);
      log.prepend(el("li", { html: rich(`age = ${st.age}, member = ${st.member ? "True" : "False"} → \`${BINS[bin]}\`${st.swapped ? " (gates swapped)" : ""}`) }));
      while (log.children.length > 5) log.lastChild.remove();
      if (st.hits.every(n => n > 0)) ctx.goalDone();
      st.busy = false; send.disabled = false;
    };
    draw(); showCode();
  },
});

LEVEL({
  id: "a05", title: "Yes or No", job: "The shop gives discounts by age and by membership.",
  color: "#9be34a", scene: "shop", cast: ["gridlock"], toy: "gategarden",
  sticker: { title: "Gatekeeper", glyph: "if", color: "#9be34a" },
  goals: ["Ask questions with comparisons", "Combine them with and, or, not", "Choose a branch with if, elif and else"],
  beats: [
    say("gridlock", "Tuesday afternoon, {{you}}. The Saturday tinker class needs tickets. Kids pay 5, seniors and members pay 8, everyone else pays 10. The helper keeps charging everybody 10.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Then the helper needs to ask questions. A [[comparison]] such as `age < 12` has two possible answers, `True` or `False`. Those values are called [[boolean|booleans]].") },
    say("nib", "Python's comparison operators are `<`, `>`, `==`, `<=`, `>=` and `!=` [py-158]. Note the double `==`. One `=` fills a box; two of them ask a question."),
    { predict: { program: "a05_compare", q: "Seven yes-or-no questions. Write down what you think each line prints." } },
    { ask: { q: "What does `\"bolt\" == \"Bolt\"` give?", choices: ["`False`", "`True`", "an error"], answer: 0,
      why: "Capital B and small b are different characters, so the strings are not equal. The recorded output of `a05_compare` shows `False`." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. What if I need two questions at once? Like *old enough* and *has a ticket*?", "think") },
    say("nib", "Join them with `and` or `or`, and flip one with `not`. `not` binds tighter than `and`, which binds tighter than `or` [py-059]."),
    say("nib", "And they are lazy in a useful way. `and` and `or` short-circuit: they stop as soon as they know the answer, and give back the last value they looked at [py-060].", "wow"),
    { predict: { program: "a05_truthy", q: "The last line divides by zero. Does the program crash?",
      choices: ["False True\nFalse True\nspare part\n0", "False True\nFalse True\nspare part\nZeroDivisionError"], answer: 0,
      why: "`0` counts as false, so `and` already knows the answer is false and never works out `1 / 0` [py-060]." } },
    { ask: { q: "Which of these counts as false in an `if`?", choices: ["`\"\"` (an empty string)", "`\"0\"` (a string holding a zero)", "`-1`"], answer: 0,
      why: "Empty sequences are false and non-empty ones are true; any non-zero integer is true [py-062]. `\"0\"` has one character in it, so it is true." } },
    { show: ["gridlock", "nib"], ...say("nib", "Now the fork in the road. `if` asks a [[condition]]. `elif` is short for else if [py-058], and `else` catches whoever is left.") },
    { predict: { program: "a05_ticket", q: "The customer is 70 and not a member. What does the ticket program print?",
      choices: ["Ticket price: 8", "Ticket price: 10", "Ticket price: 5"], answer: 0,
      why: "`age < 12` is false, so Python moves to the `elif`. `age >= 65` is true, so `or` stops there and the price is 8." } },
    { trace: { program: "a05_ticket", note: "Watch which lines Python skips. Only one branch runs." } },
    say("reader", "I check the signs from the top. The first sign that says yes, I follow. I never read the rest.", "happy"),
    { toy: "gategarden", goal: "Land a customer in each of the three price bins. Then try the swap switch." },
    { ask: { q: "A 10-year-old member arrives. With the gates in the normal order, which price do they pay?", choices: ["5", "8", "10"], answer: 0,
      why: "`age < 12` is the first gate and it is true, so Python takes that branch and never asks about membership. Swap the gates and the answer changes to 8." } },
    { book: 0, text: "The book has comparisons, and/or/not, truthiness and branching, with sources you can click." },
    { show: ["gridlock", "byte"], ...say("gridlock", "Lovely. Two more jobs on your own machine: a thermometer that says what it sees, and shipping fees for parcels.", "think") },
    { machine: ["a05-classify", "a05-shipping"] },
    say("byte", "True. True. False. True. I could do this all day. BEEP."),
    { sticker: true },
  ],
});
