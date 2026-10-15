# Module A: Intro to CS and Python (lesson plan)

Status: research draft, 2026-10-14; gaps closed 2026-10-15 (Windows and Linux install, Windows terminal, int and float, error reading, troubleshooting, git and GitHub, the A13 package, a history timeline). Content and accuracy first.

How to read this plan:

- **[py-123]** style tags are fact IDs from `sources/facts.json`. The sentence they follow says no more than that fact says. Look the ID up in `docs/source-notes.md` for the exact wording, source and location.
- **◇** marks our own explanation, definition or analogy. It is uncited on purpose and must not state a fact about the outside world.
- **⚙** marks a number, output or example that must come from running real Python (the trace and exercise pipelines) before it is shown.
- **GAP** marks something we could not source yet. Do not write book text for it until the gap is closed.
- Every example, shop, customer and data file is fictional (Gadget Gulch Repair & Tinker Shop).

Audience: an adult beginner who has never programmed. macOS first, Windows and Linux in collapsible alternates.

## Module shape

| # | Job title | One-line aim |
|---|---|---|
| A0 | Open the Shop | Terminal, folders, paths |
| A1 | Set Up Your Bench | Install Python and VS Code, run a first script |
| A2 | Bits and Bytes | Bits, bytes, text as numbers |
| A3 | Labeled Boxes | Variables, types, aliasing |
| A4 | Calculator Talk | Operators, strings, f-strings |
| A5 | Yes or No | Comparisons, booleans, if/elif/else |
| A6 | The Conveyor Belt | while, for, range, break, continue |
| A6b | Optional: Draw With a Turtle | turtle graphics |
| A7 | The Shopping List | Lists |
| A8 | The Filing Cabinet | Dicts, tuples, sets |
| A9 | Recipe Cards | Functions |
| A10 | Bug Hunt | Errors, tracebacks, tests |
| A11 | The Mail Room | Files, split/join, csv, json |
| A12 | Shortcuts | Comprehensions, enumerate, zip, sorted, lambda |
| A13 | The Toolbox Drawer | Modules, venv, pip, pytest, random |
| A14 | Make Your Own Gadget | Classes |
| A15 | Find It Fast | Search, sort, Big O, timing |
| A16 | Mirrors Inside Mirrors | Recursion |
| A17 | Saturday Showcase | Capstone: inventory tracker or quiz game |
| A-Bonus | Save Your Work | git basics |

Completing A17 (certificate) unlocks Module B. See `docs/lessons/module-b-machine-learning.md` and the open questions in `docs/research-summary.md`.

## Decisions that shape every level (see research summary)

1. **Python versions.** As read on 2026-10-14: python.org offers Python 3.15.0 [py-009]; the developer guide lists 3.9 (ended 2025-10-31) and 3.10 (ended 2026-10-01) as end-of-life [py-010] [py-011]. Plan: every example must run on 3.9 and on the current release, so the exercise checker runs on both. Learners will normally install the current release (A1).
2. **Text encoding.** The 3.15 tutorial says the default encoding for text files is UTF-8 [py-104]. The 3.9 documentation says the default there is platform dependent [py-154]. So every `open()` in the book names its encoding explicitly (our own rule).
3. **Install path on macOS: Homebrew.** Homebrew needs the Xcode Command Line Tools when building from source [py-016]. The Python docs list Homebrew as an alternative distribution that the core team does not maintain or support [py-014], so the book says so plainly.
4. **Global pip is blocked on Homebrew Python.** Homebrew's formula writes an EXTERNALLY-MANAGED file whose message says to use a virtual environment for libraries not in Homebrew [py-155]. That is why A13 teaches venv before pip.

---

## A0. Open the Shop

**Job (story).** Ms. Gridlock hands the apprentice a key to the back office. The only way to talk to the office computer is a text window.

**Goals.** Open a terminal; say where you are; move around folders; make a folder.

**Concept points.**
- On a Mac you open Terminal from Spotlight (type Terminal) or from the Utilities folder inside Applications [py-001].
- The shell is a textual interface for giving the computer commands [py-002].
- `pwd` prints the working directory, `cd` changes it, and `ls` lists a directory [py-003].
- `.` means the current directory and `..` means its parent [py-004].
- A path that starts with `/` is absolute; any other path is relative to the current working directory [py-005].
- `mkdir` makes a directory, `mv` moves or renames, and `cp` copies [py-007].
- The `$PATH` variable lists the directories the shell searches for a command, and `which echo` shows the file a command runs [py-006].
- Optional: `>` sends output to a file, `>>` appends, and `|` sends one program's output to another [py-008].
- OpenStax defines a computer as an electronic device that stores and processes information, and a program as a sequence of instructions that a computer can run [py-187].
- An algorithm is a step-by-step list of instructions for solving any instance of a problem [py-189].
- ◇ Our analogy: the computer is a very literal helper. A program is a numbered list of instructions that the helper follows exactly.

**Analogy.** A workshop with labeled rooms; a path is directions to a room. ◇

**Toy: Folder Map.** Click through a fictional folder tree and watch the `cd` and `ls` commands that match. JS demo, labeled as not Python.

**On your machine.** Open Terminal. Run `pwd`, then `mkdir codepix`, `cd codepix`, `pwd`.

**Quiz ideas.** What does `cd ..` do? Which paths are absolute? (All from [py-004] [py-005].)

**Windows alternate (collapsible).**
- Windows PowerShell is a command-line shell that comes preinstalled on modern Windows [py-166]. On Windows 11, type PowerShell into the search bar to find it [py-167].
- On Windows, PowerShell has compatibility aliases, so `cd`, `ls`, `pwd`, `cp` and `mv` still work. They run `Set-Location`, `Get-ChildItem`, `Get-Location`, `Copy-Item` and `Move-Item` [py-168].
- Microsoft's alias table pairs `mkdir` with the cmdlet `New-Item` [py-169]. These aliases exist only on Windows [py-170].
- Windows paths use `\` between folders, and each disk partition has its own root, such as `C:\` [py-171].
- ◇ Show the same five commands in both shells side by side. ⚙ Record the Windows output on a real Windows machine before showing it.

**Open issues.** The source for the shell is a 2020 course (CC BY-NC-SA); cite and paraphrase only. Microsoft's PowerShell docs are CC BY 4.0 (attribute Microsoft). Linux uses the same shell commands as macOS.

---

## A1. Set Up Your Bench

**Job.** The shop's old programs need a helper that can run them. Set up the bench.

**Goals.** Install Python and VS Code, check them, run `hello.py`, try the interactive session.

**Concept points.**
- *Which Python?* As of 2026-10-14 python.org named Python 3.15.0 as the latest release [py-009]. Python 3.9 and 3.10 are end-of-life [py-010] [py-011]. (Show a "last verified" date on this page.)
- *macOS already has a Python you should leave alone.* Recent macOS versions include `/usr/bin/python3`, an older and incomplete Python for Apple's development tools; the docs say never to modify or delete it [py-012].
- *Why we use Homebrew.* The macOS docs also describe a python.org installer, a universal2 build that runs on Apple silicon and Intel Macs [py-013]. Homebrew is listed as an alternative distribution not maintained by the core Python team [py-014]. VS Code's tutorial says the system Python on macOS is not supported and suggests a package manager such as Homebrew [py-023]. (Brianna chose Homebrew.)
- *Steps (macOS).* Homebrew needs the Command Line Tools when building from source (`xcode-select --install`) [py-016]. Homebrew's home page gives a one-line install command that runs `install.sh` with `/bin/bash` [py-019] (copy the command from the live page, never from this plan). On Apple silicon it installs under `/opt/homebrew` [py-017], and you add it to your shell with an `eval "$(<prefix>/bin/brew shellenv)"` line [py-018]. Then `brew install python3` [py-156]; Homebrew says this puts its `python3` on your PATH [py-157]. The versioned formula installs the interpreter as `python3.14` under `$HOMEBREW_PREFIX/bin` [py-020].
- *Which `python3` am I running?* Teach `which python3` [py-006] and `python3 --version` [py-165]; compare with the system `/usr/bin/python3` [py-012]. ⚙ Show real output from a clean macOS account.
- *Editor.* VS Code needs Python 3, VS Code and the Python extension [py-022]. Make a `hello` folder, `cd hello`, and `code .` [py-025]. The Run Python File button runs `python3 hello.py` on macOS and Linux [py-024]. IDLE ships with official Python distributions [py-015] and is the fallback.
- *Interactive session.* The glossary calls the REPL the read-eval-print loop, another name for the interactive interpreter shell [py-030].
- *What an interpreter is.* The glossary says Python is interpreted rather than compiled, though the line is blurry because of the bytecode compiler, and source files can be run directly [py-031]. Python source is compiled to bytecode and cached in `.pyc` files [py-032].
- *High-level language.* Python is a high-level language: its source code is meant for humans to read, while computers understand only low-level machine code of 1s and 0s [py-190].
- *Shell tip.* In most Python shells the up arrow brings back the previous line and the down arrow the next one [py-191].
- *Windows alternate (collapsible).*
  - Windows does not include a system supported Python [py-172]. Get it from the CPython team with the Python Install Manager, from python.org/downloads or the Microsoft Store app [py-173].
  - From the Store, click Install, then open a terminal and type `python`. For the python.org file, double-click it and select Install [py-174].
  - Afterwards the `python`, `py` and `pymanager` commands should work. Older installs or PATH changes may need removing first [py-175].
  - `python` launches the current latest version, and `py list` shows which version that is [py-176]. The docs name `python` as the recommended launch command [py-026]. `py` also starts Python and accepts version choices [py-027].
  - The install manager includes a `python3` command only to catch POSIX habits, and the docs do not recommend it [py-177].
  - ◇ Our rule: on Windows, type `python` wherever the book shows `python3`.
  - If `python` says command not found or opens the Store, check that the install manager is installed and that the Python (default) aliases are on under Manage app execution aliases [py-179].
  - VS Code on Windows: the tutorial checks the install with `py -3 --version` in a command prompt [py-227], and its Run Python File button runs `python hello.py` [py-228].
- *Linux alternate (collapsible).*
  - Python comes preinstalled on most distributions and is a package on the rest [py-028]. Check it with `python3 --version` [py-165].
  - On Debian and Ubuntu, the Packaging User Guide runs `sudo apt update` and then `sudo apt install python3-venv python3-pip` [py-183]. On Fedora it runs `sudo dnf install python3-pip python3-wheel` [py-184].
  - That page is marked incomplete and was last reviewed on 2021-07-26, so the book shows a "last checked" date next to these commands [py-185].
  - If IDLE is missing: `sudo apt install idle` on Debian and Ubuntu, `sudo dnf install python3-idle` on Fedora [py-186].
  - For scripts, the docs recommend the shebang `#!/usr/bin/env python3` [py-029].

**Analogy.** Setting up the workbench before the first job. ◇

**Toy: Setup Checklist.** OS tabs and a "did it work?" troubleshooter (wrong Python, command not found).

**On your machine.** Install, run `python3 --version`, `which python3`; create `hello.py` with a `print` line; run it from the terminal and from VS Code; type `2 + 2` in the REPL.

**Open issues.** Every command is re-copied from the live source at build time and shown with a verified date. `python3` on the system may differ from Homebrew's; the troubleshooter must handle PATH order. ⚙ Check on a Mac with no developer tools.

---

## A2. Bits and Bytes

**Job.** The shop's talking toaster only understands switches.

**Goals.** Read binary; know what a byte is; see letters as numbers.

**Concept points.**
- A bit is a zero or a one, off or on, stored by transistors that act as switches [py-034].
- Eight bits can count as high as 255 (`11111111`); three can count as high as seven [py-035].
- Computers generally use eight bits, a byte, to represent a number [py-036].
- In ASCII the capital letter A maps to 65, which is `01000001` [py-037].
- Unicode gives each character a code point from 0 to `0x10FFFF` [py-041]. In UTF-8, code points below 128 take one byte, and larger ones take two to four bytes [py-042].
- Python tools: `bin(3)` gives `'0b11'` [py-038]; `int('01110011', base=2)` gives 115 [py-039]; `ord()` and `chr()` convert between a character and its code point [py-040].

**Analogy.** A row of light switches. ◇

**Toy: Bit Board.** Flip switches; see the number and the letter. JS demo, labeled as not Python.

**On your machine.** In the REPL: `bin(65)`, `int('1000001', 2)`, `ord('A')`, `chr(66)`. ⚙ All outputs from real Python.

**Quiz ideas.** What is the largest number in 8 bits? [py-035] Which function turns `'A'` into its code number? [py-040] What number is the letter A in ASCII? [py-037]

---

## A3. Labeled Boxes

**Job.** The shop's inventory needs names for things.

**Goals.** Assign variables; know the types; understand that two names can point at one object.

**Concept points.**
- A variable is a name that refers to a value; an assignment statement creates it [py-043].
- A name with punctuation, such as `million!`, is illegal and gives a SyntaxError; keywords such as `class` cannot be variable names [py-044].
- In the tutorial, using a name that has no value raises a NameError [py-045].
- `type(obj)` shows an object's type [py-050].
- Whole numbers such as 2, 4 and 20 have type `int`; numbers with a fractional part such as 5.0 and 1.6 have type `float` [py-192].
- OpenStax adds that an integer is a whole number, a floating-point number is a decimal number, and the format used to represent data is called a data type [py-193].
- Strings are immutable: assigning to `word[0]` raises a TypeError [py-047]. The glossary lists numbers, strings and tuples as immutable [py-049].
- Assigning one list to another name does not copy it; a slice makes a shallow copy [py-048]. The tutorial says multiple names can be bound to one object, known as aliasing in other languages, and it matters for mutable objects [py-051].

**Analogy.** Labeled boxes on a shelf; a label can be stuck on a box that already has another label. ◇

**Toy: Memory Shelf.** Variables as boxes updating as a recorded trace steps; two labels on one list box. ⚙ Traces recorded from real Python. Label: "a simplified model of memory."

**On your machine.** Swap two variables; predict values after reassignments; make an alias and change it.

**Open issues.** `int` and `float` are now sourced. GAP: no one-sentence definitions of `bool` and `None` are in the ledger yet; show them only through recorded `type()` output. ⚙

---

## A4. Calculator Talk

**Job.** The cash register must add up a receipt.

**Goals.** Use operators, slicing and f-strings.

**Concept points.**
- `/` always returns a float; `//` is floor division; `%` is the remainder [py-046].
- `**` binds tighter than a unary minus, so `-3**2` is `-9` [py-052].
- Strings index from 0 and negative indexes count from the right; `word[0:2]` takes positions 0 up to but not including 2 [py-053].
- `+` joins strings, `*` repeats them, `len()` gives the length [py-054].
- String methods include `upper()`, `lower()`, `startswith()`, `count()` and `replace()` [py-160].
- An f-string puts expressions in braces and accepts a format such as `.3f` [py-055].
- `round()` rounds ties to the even choice: `round(0.5)` is 0 and `round(1.5)` is 2 [py-056].
- `print()` separates arguments with `sep`, ends with `end`, and writes to `sys.stdout` by default [py-057].

**Analogy.** Order of operations on a receipt. ◇

**Toy: Expression Tree.** An expression reduces step by step (recorded trace). ⚙

**On your machine.** Compute change from a fictional bill; format a receipt line with an f-string.

---

## A5. Yes or No

**Job.** The shop gives discounts by age and by item.

**Goals.** Compare, combine with `and`/`or`/`not`, branch with `if`/`elif`/`else`.

**Concept points.**
- Comparison operators: `<`, `>`, `==`, `<=`, `>=`, `!=` [py-158].
- Comparisons can be chained: `a < b == c` means `a < b and b == c` [py-061].
- `not` binds tighter than `and`, which binds tighter than `or` [py-059].
- `and` and `or` short-circuit and return the last operand evaluated: `'' or 'Trondheim'` gives `'Trondheim'` [py-060].
- Any non-zero integer is true, zero is false; sequences with length greater than zero are true and empty ones are false [py-062].
- `elif` is short for `else if`; an `if`/`elif` chain stands in for `switch` [py-058].

**Analogy.** A fork in the road with signs. ◇

**Toy: Gate Garden.** Drag conditions into branches and send inputs through. JS demo, labeled as not Python.

**On your machine.** Classify a number as negative, zero or positive; price a ticket by age.

---

## A6. The Conveyor Belt

**Job.** A belt of broken gadgets arrives; the helper must handle each one.

**Goals.** Loop with `while` and `for`; use `range`, `break`, `continue`; build totals.

**Concept points.**
- Python's `for` iterates over the items of any sequence in order [py-063].
- `range()` never includes its end point: `list(range(5, 10))` is `[5, 6, 7, 8, 9]` and `list(range(0, 10, 3))` is `[0, 3, 6, 9]` [py-064].
- `break` leaves the innermost loop and `continue` moves to the next pass [py-065].
- A loop's `else` runs if the loop finishes without a `break` [py-066].
- The tutorial's `while` loop prints the Fibonacci numbers below 10 [py-067].
- ◇ The accumulator pattern (start a total, add each item) and off-by-one errors are our own teaching; ⚙ every example is run.

**Analogy.** A conveyor belt delivering items to the helper. ◇

**Toy: Loop Belt.** Items ride the belt through the loop body (recorded trace). ⚙

**On your machine.** Sum 1..n; count vowels; FizzBuzz (our own wording, run on 3.9 and current).

### A6b. Optional lesson: Draw With a Turtle

- `turtle` needs `tkinter`, which is built on Tk; if `import turtle` fails with an error mentioning `_tkinter`, look for the install fix from whoever provided Python [py-068]. On Homebrew the formula `python-tk@3.14` exists, described as the Python interface to Tcl/Tk [py-072] and `brew install python-tk@3.14` is named for IDLE's tkinter [py-021]. Homebrew's python and python3 aliases select its current default Python formula, which changes as releases are adopted [py-280]; today that is python@3.15, whose caveat names `brew install python-tk@3.15` [py-281], and the formula source builds the name as python-tk@ plus the Python formula's major.minor version [py-282]. Linux: Ubuntu lists `python3-tk` [py-283] and Fedora lists `python3-tkinter` [py-284]. GAP: other distributions' package names.
- `forward`, `left`, `right`, `penup`, `pendown` move and turn the turtle [py-069]; `turtle.done()` or `mainloop()` must be last to keep the window open [py-070].
- The module implements drawing tools introduced in Logo in 1967 [py-071].
- In the app, a build-time recorded replay of the drawing is shown, labeled "a replay of what your program draws."

---

## A7. The Shopping List

**Job.** The parts list keeps growing.

**Goals.** Index, slice, change, and loop over lists.

**Concept points.**
- Slicing a list returns a new list [py-077]. Assigning a list to a second name does not copy it [py-048].
- List methods include `append`, `extend`, `insert`, `remove`, `pop`, `index`, `count`, `sort`, `reverse` [py-073].
- Methods like `insert`, `remove` and `sort` change the list and return `None` [py-074].
- `append()` and `pop()` make a last-in, first-out stack [py-075]. Lists are slow as queues; `collections.deque` is fast at both ends [py-076].

**Analogy.** A numbered shopping list. ◇

**Toy: List Shelf.** Cubbies with indices; a brace shows a slice. ⚙ traces.

**On your machine.** Reverse a list; find the largest by hand; remove duplicates (a first look at sets appears in A8).

---

## A8. The Filing Cabinet

**Job.** Customers are looked up by name, not by number.

**Goals.** Dictionaries, tuples, sets.

**Concept points.**
- Dictionaries are indexed by keys, which can be any immutable type; you cannot use lists as keys because lists can be modified in place [py-078].
- In the tutorial's `tel` example, a missing key raises a KeyError, `get('irv')` returns `None`, and `'guido' in tel` tests for a key [py-079].
- The glossary defines a dictionary as an associative array [py-082].
- A set is an unordered collection with no duplicates; an empty set needs `set()` because `{}` is an empty dict [py-080].
- Tuples are immutable sequences that can be unpacked [py-081].

**Analogy.** A filing cabinet with labeled folders. ◇

**Toy: Cabinet.** Drawers open by key (recorded trace). ⚙

**On your machine.** Count words in a fictional repair note; build a phone-book lookup.

---

## A9. Recipe Cards

**Job.** Repair steps repeat; write each once.

**Goals.** `def`, parameters, `return`, defaults, scope.

**Concept points.**
- `def` introduces a function and its first statement can be a docstring [py-083]. A docstring's first line is a short summary, available as `__doc__` [py-089].
- Functions without a `return` return `None` [py-084].
- An argument is a value passed when calling; a parameter is the named entity in the definition [py-090].
- Name lookup goes local, enclosing, global, built-in [py-085].
- Default values are evaluated once, so a default list is shared between calls [py-086]; the fix is a `None` default and a new list inside the function [py-087].
- Arguments can be passed by keyword [py-088].

**Analogy.** A recipe card; a tower of cards in progress is the call stack. ◇

**Toy: Call Stack Tower.** Frames stack up and clear (recorded trace). ⚙

**On your machine.** Write `is_even`, `average`, `clamp`; fix the shared-default bug.

---

## A10. Bug Hunt

**Job.** A customer's gadget is behaving oddly. Find out why.

**Goals.** Read errors, handle them, test.

**Concept points.**
- Three kinds of error: syntax, runtime (exceptions) and semantic [py-096].
- Syntax errors are also called parsing errors; the tutorial shows `SyntaxError: invalid syntax` [py-091].
- Errors during execution are exceptions; the last line of the message says what happened and shows the exception type, for example `ZeroDivisionError` or `NameError` [py-092]. `'2' + 2` raises `TypeError: can only concatenate str (not "int") to str` [py-093].
- A `try` statement can have `except` and `else`, plus a `finally` clause for clean-up that must run under all circumstances [py-094]. An `except` matches the named class and its subclasses [py-095].
- `assert` raises `AssertionError` when a check fails; assertions are for programmer errors, not user errors [py-097]. Logging levels run DEBUG, INFO, WARNING, ERROR, CRITICAL [py-098].
- A unittest test case subclasses `unittest.TestCase`, test methods start with `test`, and checks use methods like `assertEqual` [py-099]. Run with `python -m unittest` [py-100].
- A traceback is Python's report of the location and type of an error [py-195]. An error message shows the line number, the type of error and more details. The caret (^) marks where Python noticed the problem, which can be a line or two after the real mistake [py-194].
- An accidental space or Tab at the start of a line gives `IndentationError: unexpected indent` [py-196]. `IndentationError` is the syntax error for bad indentation, and `TabError` means tabs and spaces are mixed [py-197].
- GAP: no source walks through a multi-frame traceback from top to bottom. The tutorial explains the last line [py-092]. The Automate the Boring Stuff chapter shows tracebacks but does not explain them, so it must not be cited for that.

**Analogy.** A detective reading clues. ◇

**Toy: Bug Board.** Real tracebacks recorded from broken snippets, clue lines highlighted. ⚙

**On your machine.** Fix six broken scripts; make a failing test pass.

---

## A11. The Mail Room

**Job.** Letters (data files) arrive and must be sorted.

**Goals.** Read and write files, split text, use csv and json.

**Concept points.**
- `open(filename, mode)` returns a file object; `'r'` reads, `'w'` writes and erases, `'a'` appends [py-101].
- `with` closes the file automatically, even if an exception occurs [py-102].
- Looping over a file reads it line by line; `f.write(string)` writes [py-103].
- Encoding: the 3.15 tutorial says the default is UTF-8 [py-104]; the 3.9 docs say it was platform dependent [py-154]. ◇ Our own rule: every `open()` in the book names its encoding.
- `str.split` returns a list of words using a delimiter; `str.join` concatenates strings from an iterable [py-159].
- `csv.reader` processes lines of a CSV file and the file should be opened with `newline=''` [py-161]. `csv.DictReader` maps each row to a dict [py-162].
- `json.dump(x, f)` writes and `json.load(f)` reads [py-105].

**Analogy.** A mail room sorting letters. ◇

**Toy: Mail Room.** A file read line by line (animation).

**On your machine.** Read a provided fictional CSV; total a column; write a report file.

---

## A12. Shortcuts

**Job.** Do the same job in one line.

**Concept points.**
- A list comprehension builds a list from an expression and `for`/`if` clauses: `[x**2 for x in range(10)]` [py-106].
- `enumerate()` gives index and value, `zip()` loops over sequences in parallel, `sorted()` returns a new list [py-107] [py-109].
- Lambda expressions are limited to one expression; `list.sort()` can take one as `key` [py-108].
- `any()` and `all()`: any is true if some element is true and false for an empty iterable; all is true if every element is true or the iterable is empty [py-110].
- `max()` and `min()` take an iterable or several arguments and accept `key` [py-111].

**Toy: Loop vs Shortcut.** Two traces side by side. ⚙

**On your machine.** Rewrite loops as comprehensions.

---

## A13. The Toolbox Drawer

**Job.** Borrow tools instead of building every one.

**Goals.** Import modules; make a virtual environment; install a package; run pytest.

**Concept points.**
- A module is an organizational unit of code with a namespace; a package is a module that can contain submodules [py-124].
- OpenStax defines a library as a collection of code that can be used in other programs, and the syntax of a language as the rules for how code must be structured [py-188].
- `math.sqrt`, `math.floor`, `math.ceil`, `math.pi` [py-163]. `datetime.date.today()` gives the current local date [py-164]. `json` as in A11 [py-105].
- `random.seed()` initializes the generator [py-121]; algorithms may change across Python versions, so a seed does not promise the same numbers everywhere [py-122]. The module is not for security; `secrets` is [py-123].
- *Why a virtual environment comes first.* PEP 668 describes an EXTERNALLY-MANAGED file that makes installers refuse to change a protected Python outside a virtual environment [py-033]. Homebrew's Python is marked this way and its message points to a virtual environment [py-155].
- A virtual environment is isolated from the base environment's packages by default [py-112]. `python -m venv ...` creates one with a `pyvenv.cfg`, and `--without-pip` exists, so pip is installed by default [py-113]. On macOS and Linux with bash or zsh, activate with `source <venv>/bin/activate` [py-114]; `deactivate` leaves it, and activating prepends its `bin` to PATH [py-115].
- The Packaging User Guide uses `python3 -m venv .venv` and `source .venv/bin/activate` [py-116], then `python3 -m pip install requests` [py-117], and `requirements.txt` with `pip install -r` and `pip freeze` [py-118].
- pytest installs with `pip install -U pytest` [py-119] and finds `test_*.py` or `*_test.py` files [py-120].

**Toy: Drawer.** Browse modules with real examples. ⚙

- *The package we install: texttable.* texttable 1.7.1 is a module to create simple ASCII tables, released on 2026-10-12 under the MIT license, as a single wheel file `texttable-1.7.1-py2.py3-none-any.whl` [py-205]. It lists no required dependencies [py-206].
- ◇ Why texttable: the wheel is tiny, the project has been on PyPI for about a decade, and it prints plain text, so its output is easy to record and show in the app. The scout ran a small fictional parts table on the oldest and newest Pythons available to it and got identical output (details in the research summary). ⚙ The book's own output must still come from the exercise pipeline.
- Backup: colorama 0.4.6 makes colored terminal text work on Windows, does nothing elsewhere, and needs only the standard library [py-207].
- ◇ Colorama's output is ANSI color codes, which are harder to record and display, so it stays the backup.
- *Windows alternate (collapsible).* The Windows docs recommend a virtual environment per project, made with `python -m venv <env path>` [py-178]. Activate it with `<venv>\Scripts\activate.bat` in cmd.exe or `<venv>\Scripts\Activate.ps1` in PowerShell [py-180].
  - On Windows 10 and Windows 11 the default PowerShell execution policy is Restricted, so `Activate.ps1` fails with "running scripts is disabled on this system" [py-181]. Microsoft's guide changes the policy with `Set-ExecutionPolicy` and recommends `RemoteSigned`. It says to read about_Execution_Policies first, and changing the policy for the whole machine needs an administrator PowerShell [py-182].
- *Linux alternate.* On Debian and Ubuntu, install `python3-venv` before making a venv [py-183].

**On your machine.** Make a venv, `pip install texttable`, print a fictional parts table, run a pytest file.

**Open issues.** Pin `texttable==1.7.1` in `requirements.txt` so 3.9 and the current release install the same version. Its PyPI classifiers list Python versions only up to 3.9 [py-205], so the exercise checker must keep running it on the current release.

---

## A14. Make Your Own Gadget

**Concept points.**
- A class statement creates a class object when the class definition is left normally [py-125].
- Calling the class runs `__init__` with your arguments [py-126].
- `x.f()` passes the instance as the first argument, conventionally `self` [py-127].
- Class variables are shared by all instances; instance variables belong to one; a mutable class variable such as a `tricks` list is shared by every object [py-128].
- A leading underscore marks a non-public name by convention [py-129].
- A derived class names its base class in parentheses; lookup falls back to the base class [py-130].

**Analogy.** A blueprint and the gadgets built from it. ◇

**Toy: Blueprint Table.** Class to instances, attributes in boxes (recorded trace). ⚙

**On your machine.** Build a `Counter`; build a fictional `Account` class.

---

## A15. Find It Fast

**Concept points.**
- Linear search goes through the doors from left to right [py-131]. Binary search looks at the middle door, then searches the left or right half, and needs sorted data [py-132].
- Big O describes how running time grows with input size; linear search is O(n), binary search O(log n) [py-133].
- Selection sort takes (n-1) + (n-2) + ... + 1 steps, which is n(n-1)/2, so O(n squared) [py-134]. Bubble sort swaps elements repeatedly and quits when a pass has no swaps [py-135]. Merge sort splits down the middle, sorts the halves and merges; O(n log n) [py-136].
- Time code with `python -m timeit` [py-137]; the docs advise taking the minimum of repeated timings [py-138]. ⚙ Timing numbers differ by machine and are never printed as fixed results.

**Analogy.** Looking up a name in a shuffled pile versus an alphabetized pile; Big O is how effort grows as the pile grows. ◇

**Toy: Race Track and Sort Dance.** JS demos that count real comparisons, labeled as JavaScript versions of the algorithms.

**On your machine.** Write linear search; count comparisons; time two versions with `timeit`.

---

## A16. Mirrors Inside Mirrors

**Concept points.**
- A recursive function calls itself; in the countdown example it prints n and calls itself with n - 1 [py-139]. The stack diagram has one frame per call, and the call with n equal to 0 is the base case [py-140].
- A recursion that never reaches its base case ends with a RecursionError saying the maximum recursion depth was exceeded [py-141].
- CS50 describes the same idea: a function calling itself, with a base case that stops it [py-142].

**Analogy.** Nested dolls. ◇

**Toy: Doll Stack.** Recursion in the Call Stack Tower. ⚙

**On your machine.** Sum a list recursively; countdown.

---

## A17. Saturday Showcase (capstone)

Two templates (Brianna's choice): a **shop inventory tracker** and a **quiz game**. Each is a short program that uses files [py-101] [py-102] [py-105], dicts [py-078], functions [py-083], tests [py-099] and a virtual environment if a package is used [py-114].

- Inventory tracker: read and write a JSON inventory, add and remove items, report low stock.
- Quiz game: a JSON question bank, a score, a loop.
- Deliverable: run its tests, then show the program.

**Toy: Workshop Board.** Project templates, a checklist, a certificate.

---

## A-Bonus. Save Your Work (git)

**Concept points.**
- Git stores snapshots rather than a list of changes [py-143], keeps files in three states (modified, staged, committed) [py-144], and has a working tree, a staging area and the Git directory [py-145].
- Most operations are local, so you can work offline and push later [py-146].
- `git status` shows untracked, modified and staged files [py-147]; `git add` begins tracking a new file and `git commit -m` records a commit [py-148]; `.gitignore` lists patterns to ignore [py-149].

**Toy: Logbook.** Commits as pages.

**Install and set up.**
- On macOS the easiest way to get Git is probably the Xcode Command Line Tools: run `git --version` in Terminal, and if Git is missing you will be asked to install it [py-208]. ◇ Learners who installed Homebrew already have these tools (A1).
- Linux: `sudo apt install git-all` on Debian and Ubuntu, `sudo dnf install git-all` on Fedora [py-209]. Windows: download Git for Windows, a separate project, from git-scm.com/download/win [py-210].
- First, set your name and email with `git config --global user.name` and `git config --global user.email`, because every commit uses them [py-211].
- `git init` inside a project folder creates a `.git` subdirectory; nothing is tracked yet [py-212].

**Sharing on GitHub.**
- GitHub asks you to verify your email during sign up. Without a verified email you cannot create a repository, and GitHub strongly recommends two-factor authentication (2FA) [py-215].
- GitHub's quickstart names a new repository with a short, memorable name such as hello-world. It describes a commit as a snapshot of all the files in a project at one point in time [py-216].
- `git remote add <shortname> <url>` adds a remote under a short name [py-213]. `git push <remote> <branch>` sends your commits. It works only with write access and when nobody has pushed in the meantime; otherwise fetch their work first [py-214].

**Open issues.** Sign-up screens change often. Link to GitHub's page and keep the book to the facts above. Authentication for push (HTTPS token or SSH key) is not in the ledger yet (GAP). Show it only by linking to GitHub's docs.

---

## Time machine (history timeline)

A clickable timeline in the shop's back room. Each card shows one dated event and its citation. Only the facts below may appear; the dates are as the sources state them.

- *1906 to 1992.* Grace Hopper (1906-1992) came up with the idea of machine-independent programming languages and imagined a language based on English [py-220].
- *1946.* Penn Engineering says ENIAC was announced on February 14, 1946, and was constructed and operated at the Moore School of Electrical Engineering [py-285]. It filled a room 30 by 50 feet, weighed 30 tons and needed 18,000 vacuum tubes [py-286]. A team of six women ran and programmed it, by plugging in cables and setting switches [py-287].
- *1954 to 1957.* IBM says Fortran, led by John Backus, was created in 1954 and released commercially in 1957 [py-153].
- *1967.* Turtle graphics implements drawing tools introduced in Logo in 1967 [py-071].
- *1989.* Guido van Rossum started Python during the 1989 Christmas holidays [py-217]. The docs place its creation at CWI in the Netherlands, as a successor to a language called ABC [py-150].
- *1991.* He posted Python to USENET in February 1991 [py-217]. Its first release was Version 0.9.0, in 1991 [py-219].
- *The name.* Python is named after Monty Python's Flying Circus, a BBC comedy series from the 1970s, because van Rossum wanted a short, unique and slightly mysterious name [py-218].
- *2001.* The Python Software Foundation was formed [py-151].
- *2005.* Git was born when the Linux kernel community lost free use of BitKeeper and built its own tool [py-221].
- *2004.* PEP 20, The Zen of Python, by Tim Peters, was created on 19 August 2004. It puts Python's guiding design principles into 20 aphorisms, only 19 of which are written down [py-288]. They include "Readability counts", and `import this` prints them [py-152].

Pending cards (researched, NOT citable yet; their sources could not be checked as raw text, so the checker blocks them): Ada Lovelace's 1843 translation and Notes (chm-lovelace, mactutor-lovelace), ENIAC in operation in 1946 (ethw-eniac; the timeline cites Penn Engineering instead), Grace Hopper's A-0 compiler and COBOL (yale-hopper). Run `python3 tools/verify_facts.py --pending` on a networked machine, read the `--audit` output, and only then mark those sources verified. Until then, leave these cards out.

## Troubleshooting

One page, linked from every level. Each entry gives the symptom, the cause and the fix, with citations. ◇ marks our own advice.

**Setup**
- *Command not found (macOS or Linux).* The shell looks for commands in the folders listed in `$PATH`, and `which` shows which file a command runs [py-006]. After installing Homebrew you add it to your shell with a `brew shellenv` line [py-018].
- *The wrong Python runs.* macOS ships an older `/usr/bin/python3` for Apple's developer tools; leave it alone [py-012]. Check with `which python3` [py-006] and `python3 --version` [py-165].
- *Windows: `python` opens the Store or is not found.* Check that the install manager is installed and that the Python (default) aliases are on under Manage app execution aliases [py-179].
- *Windows: `python3` behaves oddly.* That command exists only to catch POSIX habits and is not recommended; type `python` [py-177].
- *Windows: "running scripts is disabled on this system" when activating a venv.* The default PowerShell execution policy is Restricted [py-181]. Microsoft's guide switches to `RemoteSigned` with `Set-ExecutionPolicy`, after reading about_Execution_Policies [py-182]. In cmd.exe, `activate.bat` is the other way in [py-180].
- *"externally-managed-environment" from pip.* Homebrew's Python is marked externally managed, and its message points to a virtual environment [py-033] [py-155].
- ◇ Fix: make and activate a venv (A13). Never run pip with sudo.
- *`import turtle` fails mentioning `_tkinter`.* Install the Tk interface from whoever provided your Python [py-068].

**Errors in your program**
- *Reading any error.* The last line names the exception type and what happened [py-092]. The message also gives the line number, and the caret (^) marks where Python noticed the problem, sometimes a line or two after the real mistake [py-194].
- *`SyntaxError: invalid syntax`.* Python could not parse the line [py-091].
- *`IndentationError: unexpected indent`.* A stray space or Tab at the start of a line [py-196]. A `TabError` means tabs and spaces are mixed [py-197].
- *`NameError`.* A name is used before it has a value [py-045].
- *`TypeError: can only concatenate str (not "int") to str`.* Joining text and a number with `+` [py-093].
- *`KeyError`.* The key is not in the dictionary; the tutorial's `get` returns `None` instead [py-079].
- *`IndexError` or `ValueError`.* An index is out of range, or a value has the right type but an unsuitable value [py-201].
- *`RecursionError`.* A recursion never reached its base case [py-141].

**Files, folders and permissions**
- *`FileNotFoundError`.* The file or folder does not exist where Python looked [py-199]. ◇ Usually the terminal is in a different folder: check with `pwd` and `ls` [py-003].
- *`ModuleNotFoundError`.* `import` could not locate the module [py-200]. ◇ Usually the venv is not active, or the package was installed into another Python.
- *`PermissionError`.* The operation needs access rights you do not have, for example filesystem permissions [py-198].
- *"Permission denied" in the terminal.* `ls -l` shows the read, write and execute permissions (`rwx`) for the owner, the group and everyone else [py-202]. A script run as `./semester` fails without the execute bit, while `sh semester` works, and `chmod` changes the bits [py-204]. The lecture says this error often means a task needs root through `sudo`, and to double-check that you really want that [py-203].
- ◇ Our advice: run your programs as `python3 file.py`, which needs no execute bit, and avoid `sudo` for anything in this book.

## Cross-cutting pages

- **Glossary** terms and definitions come from the Python glossary where it defines them: REPL [py-030], interpreted [py-031], bytecode [py-032], argument and parameter [py-090], module and package [py-124], dictionary [py-082], immutable [py-049].
- **Troubleshooting** page: see the Troubleshooting section above.
- **Terminal cheat sheet** from [py-003] [py-004] [py-005] [py-006] [py-007] [py-008].

## Exercise and trace rules

- Examples run on Python 3.9 and the current release; ⚙ checks run both.
- Tests use `unittest` through A12 [py-099] [py-100]; pytest appears from A13 [py-119].
- All data fictional. No network at lesson time.
