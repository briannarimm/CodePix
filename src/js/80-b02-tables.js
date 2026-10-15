/* B2. Tables of Numbers: features, labels, arrays and DataFrames.
   TODO(research): a source for pandas.read_csv and DataFrame.head (the book only shows them working in recorded programs). */

/* The twelve fictional tickets in content/programs/data/b02_tickets.csv. B3 and B4 toys draw these too. Keep the two in step. */
const B0X_TICKETS = [
  ["T01", "toaster", 0.5, 1, 42], ["T02", "kettle", 1.0, 0, 48], ["T03", "fan", 1.5, 2, 78],
  ["T04", "radio", 2.0, 1, 86], ["T05", "lamp", 0.5, 0, 30], ["T06", "blender", 2.5, 3, 118],
  ["T07", "clock", 1.0, 1, 55], ["T08", "fridge", 4.0, 4, 172], ["T09", "vacuum", 3.0, 2, 120],
  ["T10", "kettle", 2.0, 0, 74], ["T11", "toaster", 3.5, 2, 136], ["T12", "fan", 1.5, 1, 65],
].map(([id, app, hours, parts, cost]) => ({ id, app, hours, parts, cost }));

PAGES("b02", [
  {
    h: "One ticket, one row",
    body: [
      "A learner cannot read a crumpled repair ticket. It needs numbers in rows. So the first job is copying each ticket into a row of numbers, the same way every time.",
      "Remember the two roles from B0. The [[feature|features]] are what the model uses to predict the [[label]], and the label is the answer we want predicted [ml-005]. For the Quote Machine, hours of work and parts used are features. The final cost is the label.",
      { code: "b02_rows", out: true },
      { trace: "b02_rows", label: "🔍 Watch the rows split into X and y" },
      { analogy: "Each ticket becomes one row in a ledger. The columns are the things we wrote down about every repair. The last column, the cost, is the one the Quote Machine must learn to fill in by itself." },
      "scikit-learn's documentation writes `fit(X, y)` [ml-026], so this book uses the same names: capital `X` for the table of features, small `y` for the list of labels. The ticket id stays out of both. It names the ticket and says nothing about the repair.",
    ],
  },
  {
    h: "NumPy arrays",
    body: [
      "Lists of lists work. [[NumPy]] has its own container made for numbers. A NumPy [[ndarray]] is an N-dimensional array whose elements all have the same type, and its size cannot change once created [ml-021].",
      { code: "b02_numpy", out: true },
      "Arrays describe themselves. They have `ndim`, `shape` and `size` attributes; a 3-by-4 array has shape (3, 4) and size 12 [ml-022]. Our array has 3 rows and 2 columns, so its shape is (3, 2) and its size is 6.",
      "Arrays also have `sum`, `min` and `max` methods, and arithmetic between an array and a single number is applied to every element, which NumPy calls broadcasting [ml-023]. That is how `y + 5` added the call-out fee to every ticket without a loop.",
      { nerd: "Why the 1 printed as 1.", body: [
        "Every element of an ndarray has the same type [ml-021]. The hours had decimals, so the whole array holds decimal numbers, and the part counts print as `1.`, `2.` and `4.`.",
      ] },
    ],
  },
  {
    h: "pandas tables",
    body: [
      "Real tickets have words in them too, like *toaster*. A [[DataFrame]] from [[pandas]] is a two-dimensional data structure that can hold different types in its columns, and a [[Series]] is a single column [ml-024].",
      "This program reads all twelve fictional tickets from `b02_tickets.csv`. It prints the first three rows, then a summary.",
      { code: "b02_pandas", out: true },
      "`describe()` summarizes the numerical columns of a table [ml-025]. Read the cost column: the cheapest repair was $30, the dearest $172, and the mean is a little over $85. The text columns, `ticket` and `appliance`, are left out of the summary.",
      "The last two lines pick columns. Two names in a list give a DataFrame with two columns: that is `X`. One name gives a Series: that is `y`.",
      { honest: "All twelve tickets are fictional. The tables above are what real pandas printed when the site was built." },
    ],
  },
  {
    h: "The shape scikit-learn wants",
    body: [
      "Every learner in scikit-learn takes its data the same way. Estimators are fitted with `fit(X, y)` and used with `predict`, and `X` has shape `(n_samples, n_features)` [ml-026].",
      { table: { head: ["Name", "What it is", "Shape for our tickets"], rows: [
        ["`X`", "one row per ticket, one column per feature", "(12, 2)"],
        ["`y`", "one label per ticket", "(12,)"],
      ] } },
      "So the pandas program above already made exactly what B4 needs. The order matters: row 5 of `X` and item 5 of `y` must be the same ticket.",
      { toy: "tickettable", label: "Open the Ticket Table" },
      { machine: ["b02-rows", "b02-table"], label: "Go to your machine: rows, then a table" },
    ],
  },
]);

GLOSS({
  ndarray: "NumPy's N-dimensional array. All its elements have the same type, and its size cannot change once created. [ml-021]",
  dataframe: "A pandas two-dimensional table whose columns can hold different types. [ml-024]",
  series: "A single column of a pandas DataFrame. [ml-024]",
}, "b02");

/* ---- Toy: Ticket Table (JS demo) ---- */
TOY("tickettable", {
  title: "Ticket Table", level: "b02", color: "var(--sky)",
  short: "Click a repair ticket and find its row of features and its label.",
  goal: "Click three different tickets and find each one's row.",
  label: "A JavaScript demo of the idea, not Python code. The tickets are fictional.",
  html: () => `<div class="tt-wrap"><div class="tt-cards" role="group" aria-label="Repair tickets"></div>
    <div class="panel tt-side"><div class="tt-detail" aria-live="polite">Click a ticket.</div>
    <div class="row"><button type="button" class="btn small plain tt-hide" aria-pressed="false" data-hint="Hide the label column to see only what the model gets to look at">Hide the label</button></div>
    <table class="tt-table"><thead><tr><th scope="col">ticket</th><th scope="col" class="tt-x">hours</th><th scope="col" class="tt-x">parts</th><th scope="col" class="tt-y">cost</th></tr>
    <tr class="tt-roles"><td></td><td colspan="2" class="tt-x">features: X</td><td class="tt-y">label: y</td></tr></thead><tbody></tbody></table>
    <p class="tt-shape">X shape (12, 2) &nbsp; y shape (12,)</p></div></div>`,
  init(root, ctx) {
    const seen = new Set();
    let hide = false, cur = null;
    const cards = $(".tt-cards", root), tbody = $("tbody", root), detail = $(".tt-detail", root);
    B0X_TICKETS.forEach((t, i) => {
      cards.append(el("button.tt-card", { type: "button", "data-i": i, "data-hint": `Ticket ${t.id}: a ${t.app}. Click to find its row.` }, el("b", {}, t.id), el("span", {}, t.app)));
    });
    const draw = () => {
      tbody.innerHTML = "";
      B0X_TICKETS.forEach((t, i) => tbody.append(el("tr" + (i === cur ? ".on" : ""), {},
        el("td", {}, t.id), el("td.tt-x", {}, t.hours.toFixed(1)), el("td.tt-x", {}, String(t.parts)), el("td.tt-y", {}, hide ? "?" : "$" + t.cost))));
      $$(".tt-card", cards).forEach((c, i) => { c.classList.toggle("on", i === cur); c.classList.toggle("seen", seen.has(i)); });
      if (cur != null) {
        const t = B0X_TICKETS[cur];
        detail.innerHTML = rich(`**${t.id}**, a ${t.app}. It took ${t.hours} hours and ${t.parts} part${t.parts === 1 ? "" : "s"}, and cost ${hide ? "*hidden*" : "$" + t.cost}.<br>Features: \`[${t.hours.toFixed(1)}, ${t.parts}]\` &nbsp; Label: \`${hide ? "?" : t.cost}\``);
      }
    };
    cards.addEventListener("click", e => {
      const b = e.target.closest(".tt-card");
      if (!b) return;
      cur = +b.dataset.i; seen.add(cur); draw();
      const row = tbody.children[cur];
      if (row && row.scrollIntoView) row.scrollIntoView({ block: "nearest" });
      if (seen.size >= 3) ctx.goalDone("Every ticket is one row: two features, then the label.");
    });
    const hb = $(".tt-hide", root);
    hb.onclick = () => { hide = !hide; hb.setAttribute("aria-pressed", String(hide)); hb.textContent = hide ? "Show the label" : "Hide the label"; draw(); };
    draw();
  },
});

LEVEL({
  id: "b02", title: "Tables of Numbers", job: "Copy the old tickets into a table Byte can read.",
  color: "#9fe8d0", scene: "bench", cast: ["gridlock", "byte"], toy: "tickettable",
  sticker: { title: "Table Setter", glyph: "X,y", color: "#9fe8d0" },
  goals: ["Split tickets into features and a label", "Make NumPy arrays and read their shape", "Load a table with pandas"],
  beats: [
    nar("Ms. Gridlock drops a shoebox on the bench. It is full of old repair tickets, some with coffee rings."),
    say("gridlock", "Twelve tickets from last month. Every one has the hours, the parts and what the customer paid. Teach the machine from these.", "think"),
    say("byte", "BEEP. I cannot read coffee rings. I need numbers in rows, please.", "think"),
    { show: ["gridlock", "byte", "nib"], ...say("nib", "Then we copy each ticket into a row. Remember B0: the [[feature|features]] are what the model uses, and the [[label]] is the answer it must predict [ml-005]."),
    },
    { ask: { q: "For the Quote Machine, which columns of a ticket are **features**?", choices: ["hours and parts", "cost only", "the ticket id and the cost"], answer: 0,
      why: "Hours and parts are what the model gets to look at. The cost is the label it must predict [ml-005]. The ticket id names the ticket and tells nothing about the repair." } },
    say("nib", "Start in plain Python, with lists. Capital `X` holds the feature rows, small `y` holds the labels."),
    { predict: { program: "b02_rows", q: "Three tickets go in. What comes out?",
      choices: ["X = [[0.5, 1], [1.5, 2], [4.0, 4]]\ny = [42, 78, 172]\n3 rows, 2 features each", "X = [['T01', 0.5, 1], ['T03', 1.5, 2], ['T08', 4.0, 4]]\ny = [42, 78, 172]\n3 rows, 3 features each", "X = [0.5, 1.5, 4.0]\ny = [1, 2, 4]\n3 rows, 1 features each"], answer: 0,
      why: "Each row of `X` takes items 1 and 2 of a ticket (hours, parts). `y` takes item 3 (cost). The id at item 0 is left out." } },
    say("byte", "Lists are fine for three tickets. For three thousand, I would like a proper tray."),
    say("nib", "That tray is NumPy's [[ndarray]]: an N-dimensional array whose elements all share one type [ml-021]. It knows its own `shape` [ml-022].", "think"),
    { predict: { program: "b02_numpy", q: "The same three tickets as a NumPy array. What does it print?" } },
    { ask: { q: "An array holds 12 tickets with 2 features each. What is its `shape`?", choices: ["`(2, 12)`", "`(12, 2)`", "`24`"], answer: 1,
      why: "Shape lists rows first, then columns: a 3-by-4 array has shape (3, 4) [ml-022]. Twelve rows of two features is (12, 2). Its `size` would be 24." } },
    say("nib", "And for a whole table with words and numbers mixed, pandas. A [[DataFrame]] can hold different types in its columns; a [[Series]] is one column [ml-024]."),
    { predict: { program: "b02_pandas", q: "Twelve tickets from a CSV file. What do the summary and the shapes look like?" } },
    say("gridlock", "Mean cost eighty-five dollars. I'd have guessed sixty. Huh.", "wow"),
    say("nib", "`describe()` summarizes the numerical columns [ml-025]. And look at the shapes. scikit-learn wants `X` with one row per sample and one column per feature [ml-026]."),
    { ask: { q: "Which line gives a **Series** with the costs?", choices: ["`df[[\"cost\"]]`", "`df[\"cost\"]`", "`df.describe()`"], answer: 1,
      why: "One column name in single brackets picks one column, a Series [ml-024]. Double brackets around a list of names give a DataFrame, which is how `X` was picked." } },
    { book: 3, text: "The book has the whole chapter. This last page shows the shape scikit-learn expects." },
    { toy: "tickettable", goal: "Click three different tickets and find each one's row." },
    say("nib", "Now on your own machine: first rows by hand, then the same table with pandas. Use the virtual environment from B1."),
    { machine: ["b02-rows", "b02-table"] },
    say("byte", "Twelve rows, two features, one label. Table set. BEEP."),
    { sticker: true },
  ],
});
