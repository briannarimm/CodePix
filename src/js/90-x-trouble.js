/* Reference: Troubleshooting. The most common beginner problems, each fix tied to a verified fact.
   The setup fixes are shared with the Setup Checklist toy (SETUP_FIXES in 70-a01-bench.js). */

// TODO(research): VS Code picking a different Python than the terminal (the interpreter picker) is a GAP.
// TODO(research): IndentationError and mixing tabs and spaces need a fact before they go here.
// TODO(research): the `code` command not found on macOS (Shell Command: Install 'code' command in PATH) needs a source.
// TODO(research): Windows-specific errors (python opening the Microsoft Store, PATH on Windows) need sources.

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
    h: "Error messages",
    body: [
      "When Python stops with an error, read the **last line** first. It says what happened and names the kind of error, such as `ZeroDivisionError` or `NameError` [py-092].",
      { h3: "NameError: name '...' is not defined" },
      "You used a name that has no value yet [py-045]. Usually it is a typo, such as `prnt` for `print`, or a name used before the line that gives it a value. Lines above the error still ran.",
      { code: "a01_reader", out: true },
      { h3: "SyntaxError: invalid syntax" },
      "Python could not even read the line. The tutorial calls these parsing errors, and its example is `while True print('Hello world')` [py-091]. Look at the line the error points to, and the line just above it, for a missing colon, bracket or quote.",
      { h3: "TypeError: can only concatenate str (not \"int\") to str" },
      "You tried to add text and a number, as in `'2' + 2` [py-093]. Decide whether you meant text or a number, and make both sides the same kind.",
      { h3: "The program runs, but prints the wrong thing" },
      "Python found nothing wrong, so there is no error message. Use the Magnifier on a recorded example, or add a `print` line to show what a value really is at that moment. A10 is all about hunting these bugs.",
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
      { honest: "Commands on this page that change your computer come from the sources cited next to them. Copy install commands from those sources when you can, since they change over time." },
    ],
  },
]);
