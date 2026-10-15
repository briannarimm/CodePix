/* A1. Set Up Your Bench: install Python with Homebrew, check which python3, VS Code, hello.py, the REPL. Monday midday. */

// TODO(research): how to start and leave the REPL (typing python3 alone, the >>> prompt, exit()) has no fact yet. The book says so plainly.
// TODO(research): installing VS Code on macOS, and setting up the `code` command for `code .`, are not sourced. The book links the VS Code tutorial.
// TODO(research): the name of the shell configuration file (for example .zprofile) and Homebrew's prefix on Intel Macs are not sourced.
// TODO(research): Linux sources cover pip, venv and IDLE packages only; a per-distribution command that installs Python itself is not sourced.
// TODO(research): real `which python3` and `python3 --version` output from a clean macOS account (lesson plan asks for it).

/* Fixes for the setup troubleshooter. Used by the Setup Checklist toy and by the Troubleshooting page (90-x-trouble.js). */
const SETUP_FIXES = [
  { id: "notfound", q: "Terminal says it cannot find `python3` (command not found).", os: "mac", a: [
    "The shell looks for every command in the folders listed in your [[PATH variable]] [py-006]. If none of those folders holds `python3`, the shell gives up.",
    "Homebrew says `brew install python3` puts its `python3` on your PATH [py-157]. That works once Homebrew itself is set up in your shell, with the `brew shellenv` line from Homebrew's instructions [py-018]. Do both, then run `which python3` again.",
  ] },
  { id: "nobrew", q: "Terminal says it cannot find `brew`.", os: "mac", a: [
    "Homebrew's instructions have you add a line of the form `eval \"$(<prefix>/bin/brew shellenv)\"` to your shell configuration file after it installs [py-018]. On Apple silicon the prefix is `/opt/homebrew` [py-017].",
    "If you skipped that step, copy the exact line from [Homebrew's installation page](https://docs.brew.sh/Installation) and add it.",
  ] },
  { id: "system", q: "`which python3` prints `/usr/bin/python3`.", os: "mac", a: [
    "That is the Python that comes with macOS: an older, incomplete Python meant for Apple's development tools. The Python docs say never to modify or delete it [py-012]. Leave it alone and use Homebrew's.",
    "On Apple silicon, Homebrew lives under `/opt/homebrew` [py-017], so its `python3` has a path that starts there. If you see `/usr/bin/python3`, check that you ran `brew install python3` [py-157] and that Homebrew's `brew shellenv` line is in your shell setup [py-018].",
  ] },
  { id: "win", q: "Windows: `python3` is not recognized, or behaves oddly.", os: "win", a: [
    "On Windows the recommended command for launching Python is `python` [py-026]. The `py` command also starts Python, and it can pick between versions [py-027]. Wherever Code Pix says `python3`, type `python`.",
    "The Python install manager does include a `python3` command, but only to catch the habit from other systems. The documentation says it is not meant to be widely used or recommended [py-177].",
  ] },
  { id: "winstore", q: "Windows: `python` says command not found, or opens the Microsoft Store.", os: "win", a: [
    "The Windows documentation's troubleshooting table covers this. Check that the Python install manager is installed. Then, under **Manage app execution aliases** in Windows settings, check that the Python (default) aliases are enabled [py-179].",
    "If you had other Pythons installed before, or changed your PATH by hand, you may need to remove or undo those first [py-175].",
  ] },
  { id: "nofile", q: "`python3 hello.py` says it cannot open the file.", os: "all", a: [
    "`hello.py` is a relative path, so Python looks for it in your working directory [py-005]. You are probably standing in a different folder.",
    "Run `pwd` to see where you are and `ls` to see what is there, then `cd` into the folder that holds `hello.py` [py-003].",
  ] },
  { id: "pip", q: "`pip install` refuses, with a message about an externally managed environment.", os: "mac", a: [
    "Homebrew's Python does this on purpose. Its formula writes an EXTERNALLY-MANAGED file, and the message says a library that is not in Homebrew should go in a virtual environment [py-155]. The rule comes from PEP 668: outside a virtual environment, the installer should stop with an error [py-033].",
    "Level A13 teaches virtual environments. The short version is `python3 -m venv .venv` and then `source .venv/bin/activate` [py-116].",
  ] },
];

PAGES("a01", [
  {
    h: "Which Python?",
    body: [
      "Python is the language the shop's helper understands. It comes in numbered releases. When we checked python.org on 2026-10-14, it named Python 3.15.0 as the latest release [py-009]. Older releases retire: the Python developer guide lists Python 3.9 as end-of-life since 2025-10-31 [py-010] and Python 3.10 since 2026-10-01 [py-011].",
      { honest: "Last verified 2026-10-14. Release numbers change, so trust python.org over this page if they disagree. Every Module A program in this book was checked on Python 3.9 and on a newer Python when the site was built." },
      { h3: "Your Mac already has a Python. Leave it alone." },
      "Recent macOS versions include `/usr/bin/python3`, an older and incomplete Python meant for Apple's development tools. The Python documentation says never to modify or delete it [py-012]. You will install a separate, current Python next to it.",
      { h3: "Why Homebrew" },
      "There is more than one way to install Python on a Mac. python.org offers an installer that runs natively on Apple silicon and Intel Macs [py-013]. The Python docs also list Homebrew as an alternative distribution, and they say plainly that the core Python team does not maintain or support such distributions [py-014]. The VS Code Python tutorial says the system Python on macOS is not supported, and suggests a package manager such as Homebrew [py-023].",
      "Code Pix uses [[Homebrew]] on macOS. It keeps your tools in one place and gives you a `python3` command that is separate from Apple's.",
    ],
  },
  {
    h: "Set up your bench",
    body: [
      "Pick your computer. The steps for the one you chose in Settings come first.",
      { os: {
        mac: [
          { h3: "1. Command Line Tools" },
          { term: [["xcode-select --install", "Homebrew needs the Xcode Command Line Tools when it builds from source, and this command installs them [py-016]."]] },
          { h3: "2. Homebrew" },
          "Homebrew's home page gives a one-line install command that runs `install.sh` with `/bin/bash` [py-019]. Copy that command from [brew.sh](https://brew.sh/) itself, so you always get the current one, and paste it into Terminal.",
          "After it installs, Homebrew's instructions have you add a line of the form `eval \"$(<prefix>/bin/brew shellenv)\"` to your shell configuration file [py-018]. On Apple silicon the prefix is `/opt/homebrew` [py-017]. Copy the exact line from [Homebrew's installation page](https://docs.brew.sh/Installation).",
          { h3: "3. Python" },
          { term: [["brew install python3", "The VS Code tutorial gives this command for installing Python with Homebrew [py-156]. Homebrew says it keeps Homebrew's python3 on your PATH [py-157]."]] },
          { h3: "4. Check it" },
          { term: [["python3 --version", "Print the version. The VS Code tutorial checks the install this way [py-165]."], ["which python3", "Show which file runs when you type python3 [py-006]."]] },
          { honest: "We do not show sample answers here because they depend on your machine. The next page explains how to read yours." },
        ],
        win: [
          "Unlike most Unix systems, Windows does not include a system supported installation of Python [py-172]. So there is no old Python to leave alone, and you install one yourself.",
          { h3: "1. The Python install manager" },
          "To get Python from the CPython team, the documentation says to use the Python Install Manager. Download it from [python.org/downloads](https://www.python.org/downloads/), or get it through the Microsoft Store app [py-173].",
          { ul: [
            "From the Store: click Install. Then open a terminal and type `python` [py-174].",
            "From python.org: double-click the downloaded file and select Install [py-174].",
          ] },
          "Afterwards the `python`, `py` and `pymanager` commands should be available. If you already had other Pythons installed, or changed your PATH, you may need to remove or undo those first [py-175]. The full guide is [Using Python on Windows](https://docs.python.org/3/using/windows.html).",
          { h3: "2. Check it" },
          { term: [["py -3 --version", "Print the version. The VS Code tutorial checks a Windows install this way [py-227]."],["py list", "Show which installed version is current. The global python command launches that one [py-176]."]], title: "Windows terminal" },
          { h3: "3. Type python, not python3" },
          "`py` also starts Python and can choose between versions [py-027]. The install manager includes a `python3` command only to catch habits from other systems, and the documentation does not recommend it [py-177]. So wherever Code Pix says `python3`, type `python`.",
          { h3: "4. VS Code" },
          "Install VS Code and its Python extension from the [VS Code Python tutorial](https://code.visualstudio.com/docs/python/python-tutorial) [py-022]. Its Run Python File button runs `python hello.py` on Windows [py-228].",
          { honest: "Last verified 2026-10-14 against the Python documentation. If `python` opens the Microsoft Store, see the troubleshooter below." },
        ],
        linux: [
          "Python comes preinstalled on most Linux distributions and is available as a package on all the others [py-028]. Check what you have:",
          { term: [["python3 --version", "Print the version [py-165]."], ["which python3", "Show which file runs [py-006]."]] },
          { h3: "pip and venv (needed from A13)" },
          "On Debian, Ubuntu and their relatives, the Python Packaging User Guide installs these with two commands [py-183]:",
          { term: [["sudo apt update", "Refresh the package lists."], ["sudo apt install python3-venv python3-pip", "Install the venv and pip packages [py-183]."]], title: "Debian and Ubuntu" },
          "On Fedora it installs pip with one command [py-184]:",
          { term: [["sudo dnf install python3-pip python3-wheel", "Install pip [py-184]."]], title: "Fedora" },
          { honest: "The Packaging User Guide marks this Linux page as incomplete, and it was last reviewed on 2021-07-26 [py-185]. We checked it on 2026-10-14. If your distribution's own docs disagree, follow them." },
          { alt: "IDLE is missing", body: [
            "The Python docs install IDLE with `sudo apt install idle` on Debian and Ubuntu, and with `sudo dnf install python3-idle` on Fedora, RHEL and CentOS [py-186]. Code Pix uses VS Code, so this is optional.",
          ] },
        ],
      } },
      { toy: "setup", label: "Open the Setup Checklist (with a troubleshooter)" },
    ],
  },
  {
    h: "Which python3 am I running?",
    body: [
      "On a Mac with Homebrew there are now two Pythons: Apple's and yours. Which one runs when you type `python3` depends on the folders in your [[PATH variable]], the list the shell searches for commands. `which` shows you the file a command really runs [py-006].",
      { term: [["which python3", "Which file runs?"], ["python3 --version", "Which version is it? [py-165]"]] },
      { table: { head: ["If `which python3` prints a path that starts with...", "You are running"], rows: [
        ["`/usr/bin/`", "Apple's Python for its developer tools [py-012]. Fix your setup; see the troubleshooter."],
        ["`/opt/homebrew/`", "Homebrew's Python on Apple silicon [py-017] [py-157]. This is the one you want."],
      ] } },
      { nerd: "What Homebrew actually installs", body: [
        "Homebrew's `python@3.14` formula installs the interpreter as `$HOMEBREW_PREFIX/bin/python3.14`, with unversioned `python3` and `pip` links in its `libexec/bin` folder [py-020].",
      ] },
      { toy: "setup", label: "Did it work? Open the troubleshooter" },
    ],
  },
  {
    h: "Your editor and your first program",
    body: [
      "You will write programs in VS Code. Its Python tutorial needs three things: Python 3, VS Code and the Python extension [py-022]. Install VS Code and its Python extension by following the [VS Code Python tutorial](https://code.visualstudio.com/docs/python/python-tutorial).",
      "The tutorial makes a folder with `mkdir hello`, moves into it with `cd hello`, and opens VS Code on it with `code .` [py-025]. Do it inside your `codepix` folder.",
      { term: [["cd codepix", "Go into your Code Pix folder from A0."], ["mkdir hello", "Make a folder for this job."], ["cd hello", "Walk into it."], ["code .", "Open VS Code on this folder. The dot means here."]] },
      "In VS Code, make a new file named `hello.py` and type one line:",
      { code: "a01_hello", out: true },
      "Run it from the terminal with `python3 hello.py`. VS Code's **Run Python File** button does the same thing for you: it opens a terminal and runs `python3 hello.py` on macOS and Linux [py-024]. On Windows the same button runs `python hello.py` [py-228].",
      { nerd: "Another editor that is already there", body: [
        "IDLE is the development environment that comes as a standard part of official Python distributions [py-015]. With Homebrew's Python, IDLE needs tkinter from a separate formula, `python-tk@3.14` [py-021]. Code Pix uses VS Code, so you can skip this.",
      ] },
      { machine: ["a01-hello"], label: "Go to your machine: say hello" },
    ],
  },
  {
    h: "Reader, the interpreter",
    body: [
      "Python is a [[high-level language]]. OpenStax explains that its source code is meant for humans to understand, while computers understand only low-level machine code made of 1s and 0s [py-190]. Something has to bridge that gap.",
      "When you run `python3 hello.py`, a program called the [[interpreter]] reads your file and carries it out. The Python glossary calls Python an interpreted language, as opposed to a compiled one, though it says the line can be blurry. Source files can be run directly, without first making a separate program file [py-031].",
      "Under the hood, Python first compiles your source code into **bytecode**, which it caches in `.pyc` files [py-032].",
      { analogy: "In this book the interpreter is Reader: a tiny runner with a clipboard who reads your program one line at a time, from the top, and does what each line says." },
      "Here is what that looks like when line 3 has a typo. Lines 1 and 2 run. Line 3 stops everything, and line 4 never runs. The error is a `NameError`, which Python raises when you use a name that has no value [py-045].",
      { code: "a01_reader", out: true },
      { trace: "a01_reader", label: "🔍 Watch Reader stop at line 3" },
      { h3: "The REPL" },
      "Python can also take one line at a time, straight from you. The glossary calls this the [[REPL]], short for read-eval-print loop: another name for the interactive interpreter shell [py-030]. You type a line, Python reads it, works it out, prints the answer and waits for the next one.",
      { code: "a01_sums", out: true },
      "A handy trick: in most Python shells, the up arrow brings back the previous line you typed and the down arrow the next one, so you can repeat a line without retyping it [py-191].",
      { honest: "The exact steps for opening the REPL on your machine are still being checked against a source. Until then, every REPL example in this book is also a program file you can run with `python3`." },
    ],
  },
]);

GLOSS({
  Homebrew: "A package manager for macOS that installs tools such as Python. The Python docs list it as an alternative distribution that the core Python team does not maintain. [py-014]",
  interpreter: "The program that reads your Python code and carries it out. Python is an interpreted language, so source files can be run directly. [py-031]",
  "high-level language": "A language whose source code is meant for humans to understand. Computers understand only low-level machine code made of 1s and 0s. Python is high-level. [py-190]",
  REPL: "Short for read-eval-print loop: the interactive interpreter shell, where you type one line and see the answer. [py-030]",
}, "a01");

/* Setup Checklist toy: per-OS steps to tick, and a "did it work?" troubleshooter. */
TOY("setup", {
  title: "Setup Checklist", level: "a01", color: "var(--lime-d)",
  short: "Tick off the setup steps for your computer, and look up fixes when something goes wrong.",
  goal: "Pick a problem in the troubleshooter and read its fix.",
  label: "A checklist and lookup table. It cannot see your computer; the ticks are on your honor.",
  html: () => `<div class="su-wrap">
      <div class="panel su-list"><p class="su-h">Steps</p><div class="su-tabs" role="tablist" aria-label="Your computer"></div><ol class="su-steps"></ol><p class="su-count" aria-live="polite"></p></div>
      <div class="panel su-fix"><p class="su-h">Did it work? Pick what you see.</p><div class="su-qs"></div><div class="su-ans" aria-live="polite"></div></div>
    </div>`,
  init(root, ctx) {
    const STEPS = {
      mac: [
        "Open Terminal from Spotlight or from Applications, Utilities [py-001].",
        "Run `xcode-select --install` for the Command Line Tools [py-016].",
        "Install Homebrew with the one-line command from [brew.sh](https://brew.sh/) [py-019].",
        "Add Homebrew's `brew shellenv` line to your shell configuration file [py-018].",
        "Run `brew install python3` [py-156].",
        "Run `python3 --version` [py-165] and `which python3` [py-006].",
        "Install VS Code and its Python extension [py-022].",
        "Run `hello.py` from the terminal and with Run Python File [py-024].",
      ],
      win: [
        "Install the Python Install Manager from python.org/downloads or the Microsoft Store [py-173].",
        "Open PowerShell (type PowerShell into the search bar on Windows 11) [py-167].",
        "Run `py -3 --version` [py-227] and `py list` [py-176].",
        "Install VS Code and its Python extension [py-022].",
        "Run `hello.py` with Run Python File, which runs `python hello.py` [py-228].",
      ],
      linux: [
        "Check for Python with `python3 --version` [py-165]. Most distributions include it [py-028].",
        "Check which one runs with `which python3` [py-006].",
        "Debian or Ubuntu: `sudo apt update`, then `sudo apt install python3-venv python3-pip` [py-183]. Fedora: `sudo dnf install python3-pip python3-wheel` [py-184].",
        "Install VS Code and its Python extension [py-022].",
        "Run `hello.py` from the terminal and with Run Python File [py-024].",
      ],
    };
    const names = { mac: "macOS", win: "Windows", linux: "Linux" };
    const tabs = $(".su-tabs", root), list = $(".su-steps", root), count = $(".su-count", root), qs = $(".su-qs", root), ans = $(".su-ans", root);
    const ticks = { mac: [], win: [], linux: [] };
    let os = STEPS[S.settings.os] ? S.settings.os : "mac";
    const drawSteps = () => {
      $$("button", tabs).forEach(b => b.setAttribute("aria-selected", b.dataset.os === os ? "true" : "false"));
      list.innerHTML = "";
      STEPS[os].forEach((s, i) => {
        const cb = el("input", { type: "checkbox", checked: ticks[os][i] ? true : null, "data-hint": "Tick this when you have done it on your own computer" });
        cb.onchange = () => { ticks[os][i] = cb.checked; tally(); };
        list.append(el("li", {}, el("label", {}, cb, el("span", { html: rich(s) }))));
      });
      tally();
    };
    const tally = () => {
      const n = ticks[os].filter(Boolean).length, all = STEPS[os].length;
      count.textContent = n === all ? `All ${all} steps done. Your bench is ready.` : `${n} of ${all} steps done.`;
    };
    Object.keys(STEPS).forEach(k => tabs.append(el("button", { type: "button", role: "tab", "data-os": k, "data-hint": "Show the steps for " + names[k], onclick: () => { os = k; drawSteps(); } }, names[k])));
    SETUP_FIXES.forEach(f => {
      const b = el("button.btn.small.plain.su-q", { type: "button", "data-hint": "Show the fix for this problem", html: rich(f.q) });
      b.onclick = () => {
        $$(".su-q", qs).forEach(x => x.classList.toggle("on", x === b));
        ans.innerHTML = "";
        ans.append(el("p.su-for", {}, f.os === "all" ? "Any computer" : names[f.os]));
        f.a.forEach(p => ans.append(el("p", { html: rich(p) })));
        ctx.goalDone();
      };
      qs.append(b);
    });
    ans.append(el("p.su-none", {}, "Pick a problem above to see what it means and how to fix it."));
    drawSteps();
  },
});

LEVEL({
  id: "a01", title: "Set Up Your Bench", job: "Install Python so your own computer can run the shop's programs.",
  color: "#9be34a", scene: "office", cast: ["nib", "byte"], toy: "setup",
  sticker: { title: "Bench Ready", glyph: ">>>", color: "#9be34a" },
  goals: ["Install Python with Homebrew (or your computer's way)", "Check which python3 you run", "Run hello.py two ways", "Meet the interpreter and the REPL"],
  beats: [
    { show: ["gridlock", "nib"], ...say("gridlock", "Good news, {{you}}. The shop has boxes of old programs for the gadgets. Bad news: nothing here can run them. Set up a bench that can.", "think") },
    say("nib", "To run Python programs, your computer needs Python itself. When we last checked python.org, on 2026-10-14, the latest release was Python 3.15.0 [py-009]."),
    say("nib", "Older releases retire. The developer guide lists Python 3.9 and 3.10 as end-of-life [py-010] [py-011]. You will install a current one.", "think"),
    { show: ["nib", "byte"], ...say("byte", "Plot twist. Your Mac already has a Python at `/usr/bin/python3`. BEEP. It belongs to Apple's developer tools.", "wow") },
    say("nib", "Right. It is older and incomplete, and the Python docs say never to modify or delete it [py-012]. We leave it alone and install our own next to it."),
    say("nib", "On a Mac we use [[Homebrew]]. The Python docs call it an alternative distribution that the core Python team does not maintain [py-014]. VS Code's tutorial suggests it for macOS [py-023]."),
    { ask: { q: "Your Mac has `/usr/bin/python3`. What should you do with it?", choices: ["Delete it to avoid confusion", "Leave it alone and install your own Python", "Update it in place"], answer: 1,
      why: "The docs say never to modify or delete it, because Apple's tools use it [py-012]." } },
    say("byte", "Steps! First `xcode-select --install`, because Homebrew needs the Command Line Tools [py-016]. Then Homebrew. Then `brew install python3` [py-156]. I love a numbered list."),
    say("nib", "Copy Homebrew's install command from its own home page [py-019], so you always get the current one. Then add Homebrew's `brew shellenv` line to your shell setup [py-018].", "think"),
    { toy: "setup", goal: "Pick a problem in the troubleshooter and read its fix." },
    say("nib", "Now the big question: which `python3` runs when you type it? `which python3` shows the file [py-006], and `python3 --version` shows the version [py-165]."),
    { ask: { q: "`which python3` prints `/usr/bin/python3`. Whose Python is that?", choices: ["Homebrew's", "Apple's, for its developer tools", "VS Code's"], answer: 1,
      why: "`/usr/bin/python3` is the one that comes with macOS [py-012]. On Apple silicon, Homebrew's lives under `/opt/homebrew` [py-017]." } },
    say("nib", "Next, the editor. VS Code's Python tutorial needs Python 3, VS Code and the Python extension [py-022]. It opens a folder with `code .` [py-025]."),
    say("byte", "Windows bench? Windows has no system Python [py-172]. Get the Python Install Manager [py-173], then type `python` where I say `python3` [py-026]. BEEP. Two fewer keystrokes."),
    say("nib", "One more idea before Reader takes over. Python is a [[high-level language]]: its code is meant for humans to read. Computers understand only machine code made of 1s and 0s [py-190].", "think"),
    { show: ["nib", "byte", "reader"], ...say("reader", "My turn. When you run a program, I am the one who reads it. Officially I am the [[interpreter]]. Python source files can be run directly [py-031].") },
    say("reader", "I start at the top and read one line at a time. If a line makes no sense, I stop right there. Watch this program with a typo on line 3.", "think"),
    { predict: { program: "a01_reader", q: "Line 3 says `prnt` instead of `print`. What gets printed before Reader stops?" } },
    { trace: { program: "a01_reader", note: "Lines 1 and 2 run. Reader stops at line 3, and line 4 never runs." } },
    say("nib", "That `NameError` means Python met a name with no value [py-045]. Typos make lots of them. The last line of an error message is the one to read first.", "think"),
    { ask: { q: "A program has an error on line 3. What happens to lines 1 and 2?", choices: ["They still ran, before Reader reached line 3", "Nothing runs at all", "Python skips line 3 and keeps going"], answer: 0,
      why: "Reader reads from the top, one line at a time. The recording shows lines 1 and 2 printing before line 3 stops the program." } },
    say("nib", "Python can also take one line at a time, straight from you. That is the [[REPL]], the read-eval-print loop [py-030]."),
    { predict: { program: "a01_sums", q: "If you typed these three lines into the REPL, one at a time, what would you see?", choices: ["2 + 2\n12 * 3\nbolt + s", "4\n36\nbolts", "4\n36\nbolt s"], answer: 1,
      why: "Python works out each line before printing it. With text, `+` joins the pieces [py-054]." } },
    { book: 1, text: "The book has the full setup steps for macOS, Windows and Linux, with links to each source." },
    say("gridlock", "Enough talk. Prove the bench works. I want the computer to say hello to the shop.", "think"),
    { machine: ["a01-hello"], text: "Write `hello.py`, run it, and run its tests." },
    { show: ["nib", "byte"], ...say("byte", "Hello received. Bench ready. BEEP BOOP.", "wow") },
    { sticker: true },
  ],
});
