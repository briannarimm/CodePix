/* A17. Saturday Showcase: the Module A capstone. Two templates: a stock tracker and a quiz game.
   Toy: workshop (project board: pick a template, work a checklist, ship it). Finishing A17 unlocks Module B
   and the certificate (handled by the engine and UI). */

// TODO(research): a fact for `if __name__ == "__main__":`. Both templates use it; the book does not explain it yet.

PAGES("a17", [
  {
    h: "Saturday Showcase",
    body: [
      "Every Saturday afternoon, Gadget Gulch clears a table by the window and the apprentices show what they built that week. This week the apprentice is you.",
      "A [[capstone]] project pulls a whole course together. Yours is a small, real program that reads and writes a file, keeps its data in a dictionary, splits its work into functions, and comes with tests that prove it works.",
      "Pick one of two templates. Each one is a short program with some functions left for you to finish, plus a test file.",
      { table: { head: ["Template", "What it does", "What it uses"], rows: [["Stock tracker", "Keeps the shop's parts count in a JSON file, adds and removes stock, and reports what is running low.", "dictionaries, JSON files, functions, `sorted()`, tests"], ["Quiz night", "Asks questions from a JSON question bank, checks the answers and keeps score.", "lists of dictionaries, JSON files, strings, loops, tests"]] } },
      { toy: "workshop", label: "Open the Workshop Board" },
      { honest: "Both templates, their parts and their questions are fictional. You can change anything you like once the tests pass." },
    ],
  },
  {
    h: "Template one: the stock tracker",
    body: [
      "The stock book is a dictionary: each part name is a key, and each count is its value. Dictionaries are indexed by keys, which can be any immutable type [py-078].",
      "To keep the stock book between runs, the tracker saves it in a file. `json.dump(x, f)` writes an object to a text file and `json.load(f)` reads it back [py-105]. Here is the whole idea in one small program:",
      { code: "a17_inventory", out: true },
      "Opening a file with mode `'w'` writes and erases, and mode `'r'` reads [py-101]. The `with` block closes the file automatically, even if an error happens [py-102]. Following this book's house rule, every `open()` names its encoding.",
      { trace: "a17_inventory", label: "🔍 Watch the stock book go out to a file and come back" },
      "The template splits this into functions: `load_stock`, `save_stock`, `add`, `remove` and `low_stock`. The first two already work. You finish the other three.",
      { machine: ["a17-tracker"], label: "Go to your machine: the stock tracker" },
    ],
  },
  {
    h: "Template two: quiz night",
    body: [
      "The quiz keeps its questions in a JSON file as a list of small dictionaries, one per question, each with the question and its answer. The program asks each question, checks the reply and keeps a score.",
      { code: "a17_quiz", out: true },
      { honest: "When the site recorded this run, Code Pix typed the replies *gear* and *4* for you, so they do not show in the output. On your own machine you type them, and they appear after each question." },
      "The `strip()` and `lower()` calls make the check forgiving about capital letters and stray spaces. `lower()` is one of the string methods the Python docs list [py-160].",
      { trace: "a17_quiz", label: "🔍 Watch the score go up (or not)" },
      "The template keeps the questions in `questions.json`, so you can add a question without touching the code.",
      { machine: ["a17-quiz"], label: "Go to your machine: quiz night" },
    ],
  },
  {
    h: "Ship it",
    body: [
      "A showcase project is ready when someone else can run it. Before you call it done, work down this list.",
      { ol: [
        "Run the tests. A test case is a subclass of `unittest.TestCase`, and its tests are methods whose names start with `test` [py-099]. Run them from the folder with `python3 -m unittest` and the test file's name [py-100].",
        "Run the program itself and read what it prints. Then read the JSON file it uses, in VS Code.",
        "Change one thing on purpose: add a part, or a question. Run the tests again.",
        "If you add a package from pip, keep it in a virtual environment. Homebrew's Python asks for that for any library that Homebrew does not provide [py-155], and you activate one with `source <venv>/bin/activate` [py-114].",
        "Show it to someone. Byte counts as someone.",
      ] },
      { toy: "workshop", label: "Tick it off on the Workshop Board" },
      { h3: "What comes next" },
      "Finishing this job finishes Module A. It earns your certificate (in the toolbox) and opens Module B, Intro to Machine Learning, at the Learning Bench in the back office.",
      "Module B uses scikit-learn, and scikit-learn 1.7 requires Python 3.10 or newer [ml-016]. You can check which Python you have with `python3 --version` [py-165].",
      { analogy: "Module A built the toolbox. Module B uses it to build a machine that learns from examples. Bring your tests: Dr. Nib's favorite question next week is \"how do you know it works?\"" },
    ],
  },
]);

GLOSS({
  capstone: "A final project that pulls a whole course together. Module A's capstone is the Saturday Showcase.",
}, "a17");

/* ---------- Toy: Workshop Board (pick a template, work the checklist, ship it) ---------- */
const WORKSHOP = {
  tracker: { title: "Stock tracker", ex: "a17-tracker", color: "var(--sky)", steps: [
    "Download tracker.py, test_tracker.py and stock.json into one folder",
    "Run the tests once and watch them fail (that is the starting line)",
    "Finish add()",
    "Finish remove()",
    "Finish low_stock()",
    "Run the tests: every test passes",
    "Run python3 tracker.py and open stock.json to see the change",
    "Show it to someone (Byte counts)",
  ] },
  quiz: { title: "Quiz night", ex: "a17-quiz", color: "var(--pink)", steps: [
    "Download quiz.py, test_quiz.py and questions.json into one folder",
    "Run the tests once and watch them fail (that is the starting line)",
    "Finish is_right()",
    "Finish score()",
    "Run the tests: every test passes",
    "Play one whole game with python3 quiz.py",
    "Add a question of your own to questions.json and play again",
    "Show it to someone (Byte counts)",
  ] },
};

TOY("workshop", {
  title: "Workshop Board", level: "a17", color: "var(--tang)",
  short: "Your showcase project board: pick a template, tick off the checklist, and ship it.",
  goal: "Pick a template, tick every step, and press Ship it.",
  label: "Code Pix cannot see your computer, so the ticks are on your honor.",
  html: () => `
    <div class="ws-pick" role="group" aria-label="Pick a template">
      ${Object.keys(WORKSHOP).map(k => `<button type="button" class="ws-card" data-t="${k}" style="--c:${WORKSHOP[k].color}" data-hint="Work on the ${WORKSHOP[k].title} template">
        <b>${WORKSHOP[k].title}</b><span>${k === "tracker" ? "Count parts, save them, spot low stock." : "Ask questions, check answers, keep score."}</span></button>`).join("")}
    </div>
    <div class="ws-board" hidden>
      <div class="ws-head"><h3 class="ws-title"></h3><button type="button" class="btn small sky ws-files" data-hint="Open this template's files and steps">Get the files</button></div>
      <div class="ws-bar" aria-hidden="true"><i></i></div>
      <ul class="ws-list"></ul>
      <div class="row"><button type="button" class="btn tang ws-ship" data-hint="Ship your project when every step is ticked" disabled>🚀 Ship it!</button><span class="ws-left" role="status"></span></div>
      <div class="ws-stamp" hidden role="status"><b>SHIPPED</b><span></span></div>
    </div>`,
  init(root, ctx) {
    const st = S.workshop = Object.assign({ pick: null, ticks: {}, shipped: {} }, S.workshop || {});
    const board = $(".ws-board", root), list = $(".ws-list", root), ship = $(".ws-ship", root), left = $(".ws-left", root), stamp = $(".ws-stamp", root);
    const show = k => {
      st.pick = k; save();
      const T = WORKSHOP[k], ticks = st.ticks[k] = st.ticks[k] || [];
      $$(".ws-card", root).forEach(c => c.classList.toggle("ws-on", c.dataset.t === k));
      board.hidden = false;
      $(".ws-title", root).textContent = T.title;
      list.innerHTML = "";
      T.steps.forEach((s, i) => {
        const cb = el("input", { type: "checkbox", checked: ticks[i] ? true : null, "data-hint": "Tick this step when it is done" });
        cb.addEventListener("change", () => { ticks[i] = cb.checked; save(); update(); });
        list.append(el("li", {}, el("label", { "data-hint": "Tick this step when it is done" }, cb, el("span", {}, s))));
      });
      update();
    };
    const update = () => {
      const k = st.pick, T = WORKSHOP[k], ticks = st.ticks[k] || [];
      const n = T.steps.filter((_, i) => ticks[i]).length;
      $(".ws-bar i", root).style.width = (100 * n / T.steps.length) + "%";
      ship.disabled = n < T.steps.length;
      left.textContent = n < T.steps.length ? `${T.steps.length - n} step${T.steps.length - n === 1 ? "" : "s"} to go` : "Ready to ship.";
      stamp.hidden = !st.shipped[k];
      if (st.shipped[k]) $("span", stamp).textContent = `${T.title}, by ${you()}`;
    };
    $$(".ws-card", root).forEach(c => c.addEventListener("click", () => show(c.dataset.t)));
    $(".ws-files", root).addEventListener("click", () => MACHINE.open([WORKSHOP[st.pick].ex]));
    ship.addEventListener("click", () => {
      st.shipped[st.pick] = new Date().toISOString().slice(0, 10); save();
      update();
      SND.play("sticker");
      const r = ship.getBoundingClientRect();
      for (let i = 0; i < 6; i++) sparkle(r.left + Math.random() * r.width, r.top + Math.random() * r.height);
      ctx.goalDone("Shipped! Show it off, then finish the job to open Module B.");
    });
    if (st.pick) show(st.pick);
  },
});

LEVEL({
  id: "a17", title: "Saturday Showcase", job: "Build one real program and show it off.",
  color: "#9be34a", scene: "showcase", cast: ["gridlock"], toy: "workshop",
  sticker: { title: "Showcase Builder", glyph: "★", color: "#9be34a" },
  goals: ["Pick a template and finish its functions", "Make every test pass", "Ship it and open Module B"],
  beats: [
    nar("Saturday afternoon. Someone has hung bunting across the window, and the display table is waiting."),
    say("gridlock", "Welcome to the Saturday Showcase! Every apprentice shows one working gadget. This week, {{you}}, that means one working program.", "wow"),
    { show: ["gridlock", "nib"], ...say("nib", "A [[capstone]]: one project that uses the whole week. Files, dictionaries, functions, loops and tests, all in one place.") },
    say("nib", "You get two templates. A stock tracker that keeps the parts count in a file, or a quiz game with a question bank. Each comes with tests, so you will know when it works."),
    { toy: "workshop", goal: "Pick the template you want to build. You can switch later." },
    { show: ["nib", "byte"], ...say("byte", "BEEP. Show me the tracker first. I like counting things.", "wow") },
    say("nib", "The stock book is a dictionary [py-078]. `json.dump` writes it to a file and `json.load` reads it back [py-105]."),
    { predict: { program: "a17_inventory", q: "The program sells one gear, saves the stock book, loads it again and lists anything below 5. What will it print?",
      choices: ["Loaded: {'spring': 14, 'gear': 2, 'bolt': 40}\nRunning low: ['gear']", "Loaded: {'spring': 14, 'gear': 3, 'bolt': 40}\nRunning low: ['gear']", "Loaded: {'spring': 14, 'gear': 2, 'bolt': 40}\nRunning low: []"], answer: 0,
      why: "The gear count drops from 3 to 2 before saving, so the file holds 2. Only the gears are below 5." } },
    { trace: { program: "a17_inventory", note: "Watch `stock` go out to the file and come back as a new dictionary named `loaded`." } },
    { ask: { q: "Why does the tracker keep its stock book in a JSON file?", choices: ["So the counts survive after the program stops", "Because dictionaries cannot hold numbers", "Because Python needs a file to run"], answer: 0,
      why: "A dictionary lives only while the program runs. Writing it with `json.dump` and reading it with `json.load` [py-105] carries it over to the next run." } },
    { show: ["nib", "gridlock"], ...say("gridlock", "And the quiz? I want to stump the regulars.", "think") },
    { predict: { program: "a17_quiz", q: "Two questions. Code Pix typed the replies `gear` and `4` for this run. What does the quiz print?",
      choices: ["What turns a clock's hands? Right!\nHow many legs does the shop stool have? The answer was 3\nScore: 1/2", "What turns a clock's hands? Right!\nHow many legs does the shop stool have? Right!\nScore: 2/2", "Score: 1/2"], answer: 0,
      why: "The first reply matches, the second does not (the stool has three legs). The typed replies do not appear in the recorded output." } },
    { ask: { q: "Before you show your project, what proves it works?", choices: ["It looks tidy", "Its tests pass when you run `python3 -m unittest`", "It has comments"], answer: 1,
      why: "Tests run from the command line with `python -m unittest` [py-100]. Passing tests are proof you can show someone." } },
    { book: 3, text: "The book's *Ship it* page has the checklist, and what opens next." },
    say("nib", "Now go to your machine. Pick one template, or both if you are feeling heroic. Make the tests pass."),
    { machine: ["a17-tracker", "a17-quiz"] },
    { toy: "workshop", goal: "Tick every step on your template's checklist, then press Ship it." },
    { scene: "showcase", show: ["gridlock", "nib", "byte"], ...say("gridlock", "Shipped and working. I have seen grown engineers take a month to get there. Nicely done, {{you}}.", "wow") },
    say("nib", "That finishes Module A. Your certificate is in the toolbox, and Module B, Intro to Machine Learning, is open."),
    say("gridlock", "Monday, report to the Learning Bench in the back office. I want a Quote Machine that guesses what a repair will cost.", "think"),
    say("nib", "Module B uses scikit-learn, which needs Python 3.10 or newer [ml-016]. Check yours with `python3 --version` [py-165]. And bring your tests. I will be asking how you know it works."),
    say("byte", "Certificate printed. Bunting slightly crooked. BEEP BOOP."),
    { sticker: true },
  ],
});
