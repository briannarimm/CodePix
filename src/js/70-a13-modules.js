/* A13. The Toolbox Drawer: import, a few standard modules, venv, pip, pytest. Friday midday.
   The pip practice package is texttable 1.7.1 [py-205]. a13_table.py needs it installed where the site is built
   (CI: pip install texttable==1.7.1 for the build Python and for the 3.9 verify run). */

PAGES("a13", [
  {
    h: "Borrow tools instead of building them",
    body: [
      "You have written recipe cards of your own. Other people have written thousands more. OpenStax calls a collection of code that can be used in other programs a [[library]] [py-188].",
      "Python also comes with whole drawers of recipe cards. Each drawer is a [[module]]: the glossary defines a module as an organizational unit of Python code with its own namespace, and a [[package]] as a module that can hold submodules [py-124].",
      "The biggest cabinet of drawers is Python's [[standard library]]. It is a collection of modules, most written in Python and some in C, and all of them can be imported into your program to add functionality [py-251].",
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
        win: [
          "Python's Windows documentation recommends a virtual environment for each project, made with `python -m venv` [py-178]. On Windows, type `python` where this book writes `python3`: the `python3` command there exists to catch the usual POSIX habit, and the documentation does not recommend it [py-177].",
          { term: [
            ["python -m venv .venv", "Make an environment in a folder named .venv, inside your project folder [py-178]."],
            [".venv\\Scripts\\Activate.ps1", "Activate it in PowerShell. On Windows the environment's scripts live in Scripts, where macOS and Linux use bin [py-180]."],
            [".venv\\Scripts\\activate.bat", "Or activate it in cmd.exe [py-180]."],
            ["deactivate", "Leave the environment [py-115]."],
          ], title: "PowerShell or cmd.exe" },
          { alt: "PowerShell says running scripts is disabled on this system", body: [
            "Microsoft says the default PowerShell execution policy on Windows 10 and Windows 11 is Restricted. Under it you can't run PowerShell scripts, and the error says running scripts is disabled on this system. Commands you type yourself still run [py-181]. `Activate.ps1` is a script, so it is blocked.",
            "Microsoft's guide changes the policy with `Set-ExecutionPolicy` and recommends `RemoteSigned` unless you sign your scripts. It says to read the about_Execution_Policies article first, and changing the policy for the whole machine needs an administrator PowerShell [py-182].",
            "If you would rather leave the policy alone, open cmd.exe instead and use `activate.bat` [py-180].",
          ] },
        ],
      } },
      { alt: "Linux: python3 -m venv fails on Debian or Ubuntu", body: [
        "On Debian, Ubuntu and their relatives, the Packaging User Guide first runs `sudo apt update` and then `sudo apt install python3-venv python3-pip` [py-183].",
      ] },
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
        ["pytest", "Run all files of the form test_*.py or *_test.py in this folder and its subfolders [py-252]."],
      ], title: "Terminal, inside your project folder" },
      "That bare `pytest` command is how the pytest getting-started page runs tests [py-252]. You do not name a file. pytest goes looking for test files on its own.",
      "When a project needs several packages, list them in a `requirements.txt` file. `pip install -r requirements.txt` installs everything in it, and `pip freeze` lists the versions you have installed [py-118].",
      { h3: "Your practice package: texttable" },
      "The second package draws tables in plain text. texttable 1.7.1 describes itself as a module to create simple ASCII tables. It was uploaded to PyPI on 2026-10-12 under the MIT license, as a single wheel file [py-205]. It lists no required dependencies [py-206], so installing it adds just one package to your bench.",
      { term: [
        ["source .venv/bin/activate", "On your own bench first (macOS and Linux; the Windows command is on the previous page)."],
        ["python3 -m pip install texttable", "Install it into the environment, the same way the Packaging User Guide installs a package [py-117]."],
        ["pip freeze", "List what is installed, with versions [py-118]. This book recorded its output with texttable 1.7.1."],
      ], title: "Terminal, inside your project folder" },
      { code: "a13_table", out: true },
      { honest: "This output was recorded with texttable 1.7.1 installed. The parts and shelves are fictional." },
      "If you run it with a Python that does not have texttable, for example after `deactivate`, the import stops with `ModuleNotFoundError`. `import` raises that error when a module could not be located [py-200]. The fix is to step back onto the bench where you installed it.",
      { machine: ["a13-drawer"], label: "Go to your machine: make a venv, use the math drawer, install texttable" },
    ],
  },
]);

GLOSS({
  module: "A drawer of ready-made Python code with its own namespace, such as `math`. [py-124]",
  package: "A module that can contain submodules or subpackages. [py-124]",
  import: "Opening a module so your program can use its tools: after `import math`, you can call `math.sqrt`. [py-163]",
  library: "A collection of code that can be used in other programs. [py-188]",
  "standard library": "Python's own collection of modules, most written in Python and some in C. All of them can be imported into your program. [py-251]",
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
    say("nib", "This whole cabinet is the [[standard library]]: a collection of modules, and all of them can be imported into your program [py-251]."),
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
    say("nib", "And the command to run them is one word: `pytest`. It runs every `test_*.py` or `*_test.py` file in the folder and its subfolders [py-252].", "think"),
    say("nib", "Then one package just for fun: texttable, a module to create simple ASCII tables [py-205]. Install it on your bench and it draws the parts list as a neat grid."),
    { ask: { q: "Your program stops with `ModuleNotFoundError: No module named 'texttable'`. You installed it an hour ago. What is the likeliest cause?", choices: ["The environment you installed it into is not active", "texttable deleted itself overnight", "Python cannot draw tables"], answer: 0,
      why: "`import` raises `ModuleNotFoundError` when it could not locate the module [py-200]. You installed texttable on your own bench, so step back onto that bench first." } },
    say("nib", "On Windows the bench's scripts live in `Scripts` instead of `bin`. Activate with `.venv\\Scripts\\activate.bat` in cmd.exe, or `.venv\\Scripts\\Activate.ps1` in PowerShell [py-180]."),
    { book: 3, text: "The book has every command, with macOS, Windows and Linux tabs, and the texttable program with its real output." },
    say("nib", "To your machine. Make a bench, pack some boxes with the math drawer, then install texttable.", "think"),
    { machine: ["a13-drawer"] },
    { toy: "drawer", goal: "Open all four drawers." },
    say("byte", "Drawers open. Bench clean. Lunch? BEEP BOOP."),
    { sticker: true },
  ],
});
