/* A13. The Toolbox Drawer: import, a few standard modules, venv, pip, pytest. Friday midday.
   TODO(research): a fact that defines "the standard library" (so the term can go in the glossary).
   TODO(research): pick the small pure-Python package for the pip practice and add facts from its PyPI page.
   TODO(research): a fact for the command that runs pytest (the getting-started page shows `pytest`).
   TODO(research): Windows activation commands for venv (in the venv docs, not yet in the ledger). */

PAGES("a13", [
  {
    h: "Borrow tools instead of building them",
    body: [
      "You have written recipe cards of your own. Python also comes with whole drawers of them. Each drawer is a [[module]]: the glossary defines a module as an organizational unit of Python code with its own namespace, and a [[package]] as a module that can hold submodules [py-124].",
      "To use a drawer, you [[import]] it. Then a dot reaches inside for one tool. The `math` module provides `math.sqrt(x)`, `math.floor(x)`, `math.ceil(x)` and the constant `math.pi` [py-163].",
      { code: "a13_math", out: true },
      "Read the second line of output: `math.floor(2.7)` gave 2 and `math.ceil(2.1)` gave 3. Floor rounds down, ceil rounds up.",
      { analogy: "A module is a toolbox drawer. `import math` pulls the drawer open. `math.ceil` means \"the ceil tool, from the math drawer\". Two drawers can both hold a tool with the same name, and the drawer label keeps them apart." },
      "The last line answers a real packing question: 50 springs at 12 per box need 5 boxes, because the last box is only partly full and still counts.",
      { h3: "Dates without the clock" },
      "`datetime.date.today()` returns the current local date, and a `timedelta` is a duration: the difference between two dates [py-164]. The book never prints today's date, because every output here must be the same each time the site is built. So this example uses two fixed dates.",
      { code: "a13_dates", out: true },
      { nerd: "Two ways to write an import", body: [
        "`import math` brings in the whole drawer, so you write `math.sqrt`. The dates program uses `from datetime import date`, which takes one tool out of the drawer and sets it on the bench, so you write plain `date`. Both programs ran on real Python above.",
      ] },
    ],
  },
  {
    h: "Random, with a seed",
    body: [
      "The raffle bin needs a random prize. The `random` module picks one, and `random.seed()` initializes its random number generator [py-121]. Seed it with the same number and the same picks come out again: watch the first and last lines below.",
      { code: "a13_random", out: true },
      { honest: "These numbers came from Python " + (DATA.programs.a13_random ? DATA.programs.a13_random.python : "") + " when the site was built. The random module's algorithms and seeding functions can change between Python versions, so a seed does not promise the same numbers on every version [py-122]. Your machine may print different prizes." },
      "One more warning from the documentation: `random` is not suitable for security, and the `secrets` module is the documented choice for that [py-123]. Raffles, yes. Passwords, no.",
      { trace: "a13_random", label: "🔍 Watch the seed reset the raffle" },
    ],
  },
  {
    h: "Why the workbench comes first",
    body: [
      "Everything so far came with Python. Other people's packages have to be installed. On a Mac with Homebrew, that is where beginners hit a wall.",
      "PEP 668 describes an EXTERNALLY-MANAGED marker file. When it is present and you are outside a virtual environment, the installer should exit with an error message [py-033]. Homebrew's Python writes that file, and its error text says a library that is not in Homebrew should be installed in a [[virtual environment]] [py-155].",
      { analogy: "Homebrew's Python is the shop's shared workbench, and Homebrew keeps it tidy. A virtual environment is your own bench for one project. Clamp anything you like to it; the shared bench stays clean." },
      "A virtual environment is built on top of a base Python and, by default, is isolated from the packages in the base environment [py-112]. `python -m venv` creates one: a folder with a `pyvenv.cfg` file inside. An option named `--without-pip` exists, so pip is installed by default [py-113].",
      { os: {
        mac: [{ term: [
          ["python3 -m venv .venv", "Make an environment in a folder named .venv, inside your project folder [py-116]."],
          ["source .venv/bin/activate", "Step onto the new bench [py-116]."],
          ["which python3", "Activating puts the environment's bin folder first on your PATH, so python runs the environment's interpreter [py-115]. This shows which one you get."],
          ["deactivate", "Step off the bench when you are done [py-115]."],
        ] }],
        linux: [{ term: [
          ["python3 -m venv .venv", "Make an environment in a folder named .venv [py-116]."],
          ["source .venv/bin/activate", "Activate it, with bash or zsh [py-114]."],
          ["which python3", "Check which Python now runs [py-115]."],
          ["deactivate", "Leave the environment [py-115]."],
        ] }],
        win: [{ honest: "The Windows commands for activating an environment are not checked against a source yet. They will arrive in a later beta." }],
      } },
      { honest: "Make a fresh environment for each project folder. The name `.venv` is the one the Packaging User Guide uses [py-116]." },
    ],
  },
  {
    h: "Installing with pip, testing with pytest",
    body: [
      "With the environment active, the Packaging User Guide installs a package with `python3 -m pip install requests` [py-117]. [[pip]] is the installer. With the environment active, what you install lands on *your* bench.",
      "The first package you will install is pytest, a tool for running tests. It is installed with `pip install -U pytest` [py-119]. pytest finds tests in files named `test_*.py` or `*_test.py`, and when an `assert` fails it reports the values behind it [py-120].",
      { term: [
        ["source .venv/bin/activate", "Be on your own bench first (macOS and Linux)."],
        ["pip install -U pytest", "Install pytest into the environment [py-119]."],
        ["pytest", "Run every test file in this folder whose name starts with test_ [py-120]."],
      ], title: "Terminal, inside your project folder" },
      "When a project needs several packages, list them in a `requirements.txt` file. `pip install -r requirements.txt` installs everything in it, and `pip freeze` lists the versions you have installed [py-118].",
      { honest: "Which small package to practise with is still being chosen and checked. For now, pytest is the one package this book installs." },
      { machine: ["a13-drawer"], label: "Go to your machine: make a venv, use the math drawer" },
    ],
  },
]);

GLOSS({
  module: "A drawer of ready-made Python code with its own namespace, such as `math`. [py-124]",
  package: "A module that can contain submodules or subpackages. [py-124]",
  import: "Opening a module so your program can use its tools: after `import math`, you can call `math.sqrt`. [py-163]",
  pip: "The tool that installs packages. Inside an active environment, `python3 -m pip install requests` installs one. [py-117]",
  "virtual environment": "A private set of installed packages built on top of a base Python, isolated from the base environment's packages by default. [py-112]",
  venv: "The module that makes virtual environments: `python -m venv <folder>` creates one, with pip installed by default. [py-113]",
}, "a13");

/* The Drawer toy: browse four modules, each with a program recorded from real Python. */
const A13_DRAWERS = [
  { id: "math", program: "a13_math", label: "math", blurb: "Square roots, rounding up and down, and pi [py-163]." },
  { id: "random", program: "a13_random", label: "random", blurb: "Random picks you can repeat with a seed [py-121]. A seed does not promise the same numbers on every Python version [py-122]." },
  { id: "datetime", program: "a13_dates", label: "datetime", blurb: "Dates, and the duration between two of them, a `timedelta` [py-164]." },
  { id: "json", program: "a11_json", label: "json", blurb: "Save a whole structure to a text file and load it back [py-105]." },
];

TOY("drawer", {
  title: "The Toolbox Drawer", level: "a13", color: "var(--tang)",
  short: "Open module drawers and see real recorded examples.",
  goal: "Open all four drawers.",
  label: "Every example in these drawers was recorded from real Python when the site was built.",
  html: () => `<div class="cab" role="group" aria-label="Module drawers">${A13_DRAWERS.map(d =>
    `<button type="button" class="drw" data-d="${d.id}" aria-pressed="false" data-hint="Open the ${d.label} drawer"><span class="pull" aria-hidden="true"></span><code>import ${d.label}</code></button>`).join("")}</div>
    <div class="inside" aria-live="polite"><p class="own">Pick a drawer. Each one holds a real program and what it printed.</p></div>`,
  init(root, ctx) {
    const opened = new Set();
    const inside = $(".inside", root);
    $$(".drw", root).forEach(b => b.addEventListener("click", () => {
      const d = A13_DRAWERS.find(x => x.id === b.dataset.d);
      $$(".drw", root).forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
      b.classList.add("seen");
      inside.innerHTML = "";
      inside.append(el("h3", {}, "The " + d.label + " drawer"), el("p", { html: rich(d.blurb) }));
      const p = prog(d.program);
      inside.append(codeBlock(p.src, { file: d.program + ".py" }), outBlock(p));
      if (p.traced) inside.append(el("p", {}, el("button.btn.small.sky", { type: "button", "data-hint": "Watch this program run step by step", onclick: () => TRACE.open(d.program) }, "🔍 Watch it run")));
      opened.add(d.id);
      if (opened.size === A13_DRAWERS.length) ctx.goalDone("You opened every drawer.");
    }));
  },
});

LEVEL({
  id: "a13", title: "The Toolbox Drawer", job: "Borrow tools instead of building every one.",
  color: "#ff8a1f", scene: "shop", cast: ["nib"], toy: "drawer",
  sticker: { title: "Drawer Opener", glyph: "imp", color: "#ff8a1f" },
  goals: ["Import a module and use its tools", "Seed random, and know its limits", "Make a virtual environment, then pip install"],
  beats: [
    nar("Friday, just before lunch. Dr. Nib pulls open a cabinet nobody has noticed before. It is full of labeled drawers."),
    say("nib", "{{you}}, you have been building every tool by hand. Admirable. Also slow. Python comes with drawers full of tools. Each drawer is a [[module]] [py-124].", "wow"),
    say("nib", "You [[import]] a drawer to open it, then reach in with a dot. `math.sqrt`, `math.ceil`, `math.pi` all live in the math drawer [py-163]."),
    { predict: { program: "a13_math", q: "50 springs, 12 to a box. `math.ceil` is the round-up tool. What will this print?" } },
    { trace: { program: "a13_math", note: "There is no box for `math` itself in the picture. Watch `boxes` get its value from `math.ceil`." } },
    { show: ["nib", "gridlock"], ...say("gridlock", "Speaking of tools. The raffle at the Saturday Showcase. I need a fair way to pick prizes.", "think") },
    say("nib", "The `random` drawer. And `random.seed()` sets its starting point [py-121], so the same seed gives the same picks again."),
    { trace: { program: "a13_random", note: "Watch the first pick. After the second `random.seed(2026)`, the same prize comes out again." } },
    { ask: { q: "You run the seeded raffle program on a different Python version. What can you count on?", choices: ["Exactly the same prizes, because of the seed", "Nothing about the numbers; the algorithms may change between versions", "An error, because seeds only work on one version"], answer: 1,
      why: "The random module's algorithms and seeding can change across Python versions, so a seed does not promise the same numbers everywhere [py-122]." } },
    say("nib", "And never use `random` for passwords. The documentation says it is not suitable for security; `secrets` is the choice for that [py-123].", "think"),
    { show: ["nib", "byte"], ...say("byte", "BEEP. I tried to install a new package on the shop computer. It said NO in big letters. Rude.", "wow") },
    say("nib", "Homebrew's Python is marked as externally managed. Its message says a library not in Homebrew belongs in a [[virtual environment]] [py-155]. That refusal is on purpose [py-033]."),
    say("nib", "So: your own workbench first. `python3 -m venv .venv` makes it, and `source .venv/bin/activate` steps onto it [py-116]. It is isolated from the base packages by default [py-112].", "think"),
    { ask: { q: "Why does this book make a virtual environment before it ever uses pip?", choices: ["pip only works on Fridays", "Homebrew's Python refuses installs outside a virtual environment", "A virtual environment makes programs run faster"], answer: 1,
      why: "Homebrew's Python writes an EXTERNALLY-MANAGED file, and its message points you to a virtual environment [py-155]." } },
    say("nib", "On your own bench, [[pip]] can install. The first package you will add is pytest: `pip install -U pytest` [py-119]. It finds files named `test_*.py` and runs them [py-120]."),
    { ask: { q: "Which file would pytest pick up as a test file?", choices: ["`drawer.py`", "`test_drawer.py`", "`drawer_tests.txt`"], answer: 1,
      why: "pytest finds tests in files named `test_*.py` or `*_test.py` [py-120]." } },
    { book: 0, text: "The book has every command, with the macOS and Linux steps side by side." },
    say("nib", "To your machine. Make a bench, then pack some boxes with the math drawer.", "think"),
    { machine: ["a13-drawer"] },
    { toy: "drawer", goal: "Open all four drawers." },
    say("byte", "Drawers open. Bench clean. Lunch? BEEP BOOP."),
    { sticker: true },
  ],
});
