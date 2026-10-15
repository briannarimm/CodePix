/* Reference: Troubleshooting. The most common beginner problems, each fix tied to a verified fact.
   The setup fixes are shared with the Setup Checklist toy (SETUP_FIXES in 70-a01-bench.js). */

// TODO(research): VS Code picking a different Python than the terminal (the interpreter picker) is a GAP.
// TODO(research): the `code` command not found on macOS (Shell Command: Install 'code' command in PATH) needs a source.

const X_TROUBLE_OS = { mac: "macOS", win: "Windows", all: "Any computer" };

PAGES("x-trouble", [
  {
    h: "Troubleshooting",
    body: [
      "Something did not work. That happens to everyone. Find the heading that matches what you see.",
      { honest: "Code Pix cannot see your computer. These fixes cover the problems our sources describe. More will come as research continues." },
      ...SETUP_FIXES.flatMap(f => [{ h3: f.q }, `**${X_TROUBLE_OS[f.os]}.** ${f.a[0]}`, ...f.a.slice(1)]),
      { toy: "setup", label: "Open the Setup Checklist" },
    ],
  },
  {
    h: "Reading an error message",
    body: [
      "When Python stops with an error, it prints a [[traceback]]. OpenStax describes a traceback as Python's report of the location and type of the error [py-195].",
      "Read the **last line** first. It says what happened and names the kind of error, such as `ZeroDivisionError` or `NameError` [py-092]. The message also gives the line number. A caret (`^`) shows where Python found the problem, and that can be a line or two after the real mistake [py-194]. So when the marked line looks fine, check the line above it.",
      { h3: "NameError: name '...' is not defined" },
      "You used a name that has no value yet [py-045]. Usually it is a typo, such as `prnt` for `print`, or a name used before the line that gives it a value. Lines above the error still ran.",
      { code: "a01_reader", out: true },
      { h3: "SyntaxError: invalid syntax" },
      "Python could not even read the line. The tutorial calls these parsing errors, and its example is `while True print('Hello world')` [py-091]. Look at the line the error points to, and the line just above it, for a missing colon, bracket or quote.",
      { h3: "IndentationError: unexpected indent" },
      "An accidental space or Tab at the start of a line gives `IndentationError: unexpected indent` [py-196]. `IndentationError` is the base class for syntax errors about indentation, and it is a kind of `SyntaxError`. Its relative `TabError` means the indentation mixes tabs and spaces inconsistently [py-197].",
      { code: "xt_indent", out: true },
      "Line 2 starts with one stray space. The recording shows that even line 1 printed nothing: Python could not read the file, so it ran none of it. Delete the space and every line runs.",
      { analogy: "Indentation is like the shelf a box sits on. Push a box half a step off its shelf and the very literal helper refuses to guess which shelf you meant." },
      { h3: "TypeError: can only concatenate str (not \"int\") to str" },
      "You tried to add text and a number, as in `'2' + 2` [py-093]. Decide whether you meant text or a number, and make both sides the same kind.",
      { h3: "The program runs, but prints the wrong thing" },
      "Python found nothing wrong, so there is no error message. Use the Magnifier on a recorded example, or add a `print` line to show what a value really is at that moment. A10 is all about hunting these bugs.",
    ],
  },
  {
    h: "Wrong position, wrong value",
    body: [
      { h3: "IndexError: list index out of range" },
      "Python raises `IndexError` when a sequence subscript is out of range [py-201]. In plain words: you asked for a position the list does not have. This shop list has three bins, at positions 0, 1 and 2.",
      { code: "xt_index", out: true },
      { trace: "xt_index", label: "🔍 Watch Reader reach for bin 3" },
      "Lines 2 and 3 printed before line 4 stopped. Count from 0, and check how long the list really is.",
      { h3: "ValueError: invalid literal for int()" },
      "Python raises `ValueError` when an argument has the right type but an inappropriate value [py-201]. `int` happily takes the text `\"12\"`. The text `\"twelve\"` is also text, so the type is right, but `int` cannot make a number out of it.",
      { code: "xt_value", out: true },
      "Usually the value came from a file or from someone typing. Print it just before the line that fails, and look at exactly what arrived.",
    ],
  },
  {
    h: "Files, folders and permissions",
    body: [
      { h3: "FileNotFoundError: No such file or directory" },
      "Python raises `FileNotFoundError` when a file or directory is requested but doesn't exist [py-199]. Here the shop's program asks for a notes file that is not in the folder.",
      { code: "xt_nofile", out: true },
      "A plain file name is a relative path, so Python looks for it in the working directory [py-005]. Most often the terminal stands in a different folder from the file. Run `pwd` to see where you are and `ls` to see what is there [py-003]. Then `cd` to the right folder, or fix the name.",
      { h3: "ModuleNotFoundError: No module named '...'" },
      "`import` raises `ModuleNotFoundError` when it could not locate the module [py-200]. Check the spelling first. For a library you installed with pip, the usual cause is that the virtual environment is not active, or that the library went into a different Python. A13 covers virtual environments.",
      { h3: "PermissionError" },
      "Python raises `PermissionError` when an operation runs without adequate access rights, for example filesystem permissions [py-198]. Keep your Code Pix work inside your own `codepix` folder, where you can read and write freely.",
      { h3: "\"Permission denied\" in the terminal" },
      "In a terminal, `ls -l` shows three groups of three characters, `rwx`. They give the read, write and execute permissions of the file's owner, its group and everyone else, and a `-` means that permission is missing [py-202].",
      "The lecture behind our terminal pages has an exercise about this. Running a new script as `./semester` does not work, because of the file's permission bits. Running `sh semester` does work, and `chmod` is the program that changes the bits [py-204].",
      "The lecture adds that a permission denied error usually means you need to do something as root, with `sudo`, and that you should double-check that you really wanted to do it that way [py-203].",
      { honest: "Our own advice: run every program in this book as `python3 file.py`. That needs no execute bit. Nothing in Code Pix needs `sudo` except installing system packages on Linux." },
    ],
  },
  {
    h: "Files and extras",
    body: [
      { h3: "Text from a file looks garbled" },
      "The file was probably read with a different encoding from the one it was saved in. The Python 3.15 tutorial says the default for text files is UTF-8 [py-104], while in the Python 3.9 documentation the default depends on the platform [py-154]. Name the encoding every time you open a text file: `open(\"parts.txt\", encoding=\"utf-8\")`.",
      { h3: "`import turtle` fails with an error that mentions _tkinter" },
      "The turtle module needs tkinter, which is built on Tk. If the import fails with an error that mentions `_tkinter`, install the Tk interface package [py-068]. Homebrew has one, the `python-tk@3.14` formula [py-072]. IDLE needs it too [py-021].",
      { h3: "`pip install` refuses (externally managed)" },
      "See the setup page: Homebrew's Python asks you to install libraries in a virtual environment [py-155]. A13 shows how.",
      { h3: "Windows: \"running scripts is disabled on this system\"" },
      "This can happen when you activate a virtual environment in PowerShell, which runs `<venv>\\Scripts\\Activate.ps1` [py-180]. Microsoft says the default PowerShell execution policy on Windows 10 and Windows 11 is Restricted. Under it you can't run PowerShell scripts, and the error says running scripts is disabled on this system. Commands you type yourself still run [py-181].",
      "Microsoft's guide changes the policy with `Set-ExecutionPolicy` and recommends `RemoteSigned` unless you sign your scripts. It says to read Microsoft's about_Execution_Policies article first, and that changing the policy for the whole machine needs an administrator PowerShell [py-182].",
      "In the older cmd.exe window, `<venv>\\Scripts\\activate.bat` activates the environment instead [py-180].",
      { honest: "Commands on this page that change your computer come from the sources cited next to them. Copy install commands from those sources when you can, since they change over time." },
    ],
  },
]);
