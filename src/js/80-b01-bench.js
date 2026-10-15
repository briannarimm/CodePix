/* B1. The Machine Bench: a virtual environment and the four tools.
   TODO(research): official install lines for NumPy, pandas and Matplotlib (we reuse the Packaging guide's pip command shape).
   TODO(research): Windows activation and install steps for the venv (py-116 covers Unix and macOS only).
   TODO(research): which Python the current scikit-learn requires; the install page we read ends at 1.7 (ml-016). */

PAGES("b01", [
  {
    h: "A clean bench for new tools",
    body: [
      "Module A used only what comes with Python. Module B needs four extra libraries: [[NumPy]] for arrays of numbers, [[pandas]] for tables, [[Matplotlib]] for pictures, and [[scikit-learn]] for the learning itself.",
      "First, the Python version. scikit-learn's install page states that scikit-learn 1.7 requires Python 3.10 or newer [ml-016]. So every Module B program in this book is for Python 3.10 or newer. Check yours:",
      { term: [["python3 --version", "Shows which Python you have [py-165]. You need 3.10 or newer for this module."]] },
      "Second, where the libraries go. A virtual environment is created on top of a base Python and by default is isolated from the packages in the base environment [py-112]. That keeps this module's tools in one box that you can throw away and rebuild.",
      "On a Mac with Homebrew there is one more reason. Homebrew's Python is marked as externally managed, and its error text says a library that is not in Homebrew should be installed in a virtual environment [py-155]. So a plain `pip install` outside an environment stops with an error. That is expected.",
      { analogy: "A virtual environment is a separate toolbox drawer for one project. The machine learning tools go in this drawer, and the rest of your computer never notices them." },
    ],
  },
  {
    h: "Make the environment",
    body: [
      "Make a folder for Module B and open it in Terminal. Then create the environment and switch it on. The Packaging User Guide uses these two commands on Unix and macOS [py-116]:",
      { term: [
        ["mkdir -p ~/codepix/module-b", "Make a folder for this module."],
        ["cd ~/codepix/module-b", "Move into it."],
        ["python3 -m venv .venv", "Create a virtual environment in a folder named `.venv` [py-116]."],
        ["source .venv/bin/activate", "Switch it on for this terminal window [py-116]."],
      ], title: "Terminal (macOS)" },
      "Activating prepends the environment's `bin` folder to your PATH, so `python` runs the environment's interpreter, and you leave with `deactivate` [py-115]. When you open a new terminal window for this module, `cd` into the folder and run the `source` line again.",
      { alt: "Linux and Windows", body: [
        "**Linux:** with bash or zsh, activation is the same `source <venv>/bin/activate` [py-114], so the commands above work as written.",
        "**Windows:** the steps for this module are still being checked against sources for the next beta. They are not covered yet.",
      ] },
    ],
  },
  {
    h: "Install the four tools",
    body: [
      "With the environment active, install the tools. scikit-learn's own install page runs `pip install -U scikit-learn` inside its environment [ml-015]. The Packaging guide installs a package with `python3 -m pip install requests` [py-117]; our second line uses that same command shape with this module's three other package names.",
      { term: [
        ["pip install -U scikit-learn", "Install scikit-learn, as its install page does [ml-015]."],
        ["python3 -m pip install numpy pandas matplotlib", "Install the other three tools into the same environment."],
        ["python -m pip show scikit-learn", "Check the install, as scikit-learn's page does [ml-017]."],
      ], title: "Terminal, with the environment active" },
      { honest: "The second command is our own, built from the Packaging guide's pattern. The install pages for NumPy, pandas and Matplotlib are not in our sources yet." },
      { nerd: "If pip says \"externally managed\"", body: [
        "That message means the environment is not active, so pip is talking to Homebrew's Python [py-155]. Run `source .venv/bin/activate` in this window and try again.",
      ] },
    ],
  },
  {
    h: "Check the bench",
    body: [
      "Each library has a short name that everybody uses: `import numpy as np` [ml-018], `import pandas as pd` [ml-019] and `import matplotlib.pyplot as plt` for Matplotlib's plotting part [ml-020]. This program imports all four tools and prints their versions.",
      { code: "b01_check", out: true },
      { honest: "These version numbers are the ones on the computer that built this site. Yours will probably differ, and that is fine for this module." },
      "If the program prints a version for every tool, your bench is ready. If it stops with `ModuleNotFoundError`, the environment is probably not active in this window.",
      { machine: ["b01-bench"], label: "Go to your machine: check the bench" },
    ],
  },
]);

GLOSS({
  numpy: "A Python library for arrays of numbers. Its ndarray holds elements that all share one type. Imported as `np`. [ml-018] [ml-021]",
  pandas: "A Python library for tables. Its DataFrame is a two-dimensional table, and a Series is one column. Imported as `pd`. [ml-019] [ml-024]",
  matplotlib: "A Python library for drawing. It draws on a Figure that holds one or more Axes; `scatter` and `hist` are Axes methods. [ml-102]",
  "scikit-learn": "A Python library for machine learning. Its estimators are fitted with `fit(X, y)` and used with `predict`. [ml-026]",
}, "b01");

LEVEL({
  id: "b01", title: "The Machine Bench", job: "Set up the Learning Bench on your own computer.",
  color: "#a8e6ff", scene: "bench", cast: ["nib"],
  sticker: { title: "Bench Builder", glyph: "pip", color: "#a8e6ff" },
  goals: ["Check your Python version", "Make and activate a virtual environment", "Install and check the four tools"],
  beats: [
    say("nib", "Before Byte can learn anything, your computer needs the right tools. Four libraries: NumPy, pandas, Matplotlib and scikit-learn."),
    { show: ["nib", "byte"], ...say("byte", "Four new tools! Where do they go? My drawers are full of Module A.", "wow") },
    say("nib", "In a fresh drawer. First, though, a version check. scikit-learn's install page says version 1.7 requires Python 3.10 or newer [ml-016].", "think"),
    { ask: { q: "`python3 --version` prints `Python 3.9.6`. Can this Python run Module B?", choices: ["Yes, any Python 3 works", "No, it needs 3.10 or newer", "Only if you use pandas"], answer: 1,
      why: "scikit-learn 1.7 requires Python 3.10 or newer [ml-016]. Module A's install level shows how to get a current Python." } },
    say("nib", "Now the fresh drawer: a virtual environment. It sits on top of your Python and is isolated from the packages already installed there [py-112]."),
    say("byte", "So if I make a mess in that drawer, the rest of the computer stays tidy? BEEP of relief."),
    { show: ["nib", "byte", "gridlock"], ...say("gridlock", "Why not just install everything straight onto the computer? Fewer steps.", "think") },
    say("nib", "On a Mac with Homebrew, pip refuses. Homebrew marks its Python as externally managed and says to use a virtual environment for libraries [py-155]."),
    { book: 1, text: "The book walks through the commands. Read the page, then come back." },
    { ask: { q: "You open a brand-new terminal window. What do you run before working on Module B?", choices: ["`python3 -m venv .venv` again", "`source .venv/bin/activate`", "`pip install -U scikit-learn` again"], answer: 1,
      why: "The environment already exists, so there is nothing to create or install. You only switch it on again with the `source` line [py-116]." } },
    say("nib", "Then the installs. scikit-learn's page uses `pip install -U scikit-learn` inside the environment [ml-015], and checks it with `python -m pip show scikit-learn` [ml-017]."),
    { book: 2, text: "Here are the install commands, with a note on what to do if pip complains." },
    say("byte", "And then a program that imports all four tools and says hello. I wrote one. It is very polite."),
    { predict: { program: "b01_check", q: "This program imports the four tools and prints their versions. Your numbers may differ. What does the build computer print?" } },
    say("nib", "Notice the short names: `np`, `pd` and `plt`. The libraries' own documentation uses them [ml-018] [ml-019] [ml-020], so code you find elsewhere reads the same way."),
    { ask: { q: "Which line imports pandas under its usual name?", choices: ["`import pandas`", "`import pandas as pd`", "`from pandas import *`"], answer: 1,
      why: "pandas is imported with `import pandas as pd` [ml-019]." } },
    say("nib", "Your turn. Make the environment, install the tools, and make the bench check pass on your own machine."),
    { machine: ["b01-bench"] },
    say("gridlock", "So the Quote Machine is... a folder with a dot in its name. Wonderful.", "think"),
    say("byte", "A very important folder! Bench ready. BEEP."),
    { sticker: true },
  ],
});
