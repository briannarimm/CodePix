/* A10. Bug Hunt: kinds of errors, reading the last line of a traceback, print debugging, try/except,
   assert, and running tests with unittest. Toy: "bugboard", real recorded tracebacks plus a pattern-matching
   decoder (a JavaScript helper; it never runs pasted text).
   TODO(research): no source yet walks through a multi-frame traceback from top to bottom (lesson plan GAP).
   The book explains the last line [py-092] and the line number and caret [py-194], and leaves the frames
   to the Bug Board's highlighting. */

PAGES("a10", [
  {
    h: "Three kinds of bug",
    body: [
      "A customer's talking kettle keeps announcing the wrong temperature. Something in its program is off. Before you hunt, it helps to know what kinds of bug exist. Think Python separates three: syntax errors, runtime errors (also called exceptions) and semantic errors [py-096].",
      { table: { head: ["Kind", "What you see", "Shop picture"], rows: [
        ["syntax error", "Python refuses to start the program", "the recipe card is written so badly nobody can read it"],
        ["runtime error ([[exception]])", "the program starts, then stops with a message", "halfway through, the card says *add the gear*, and there is no gear"],
        ["semantic error", "the program runs and gives a wrong answer", "the card is readable and complete, and the cake still tastes of motor oil"],
      ] } },
      { honest: "The middle and right-hand columns are our own descriptions. The three names come from Think Python [py-096]." },
      "Syntax errors are also known as parsing errors. The tutorial's example is `while True print('Hello world')`, which gives `SyntaxError: invalid syntax` [py-091].",
      "Errors found while the program runs are exceptions. The last line of the error message says what happened, and it shows the exception type, such as `ZeroDivisionError` or `NameError` [py-092]. The whole message is called a [[traceback]]: OpenStax describes it as Python's report of the location and type of error [py-195].",
      { code: "a10_typo", out: true },
      "The last line says `NameError`, and it names `prise`. Using a name that has no value raises a `NameError` [py-045]. One typo, one clue.",
    ],
  },
  {
    h: "Read the last line first",
    body: [
      "A traceback can look like a wall of text. Start at the bottom. The last line names the exception type and says what happened [py-092].",
      "Then look up. OpenStax lists what an error message shows: the line number, the type of error, and more details. A caret (`^`) marks where Python found the error, and that spot may be a line or two after the real mistake [py-194]. So when the named line looks fine, check the line above it.",
      { code: "a10_zero", out: true },
      "Notice that `Minutes: 0` printed first. Everything before the bad line ran normally. The program stopped at the line that divided by zero.",
      { code: "a10_type", out: true },
      "This one is the tutorial's own example in shop clothes. Adding `'2' + 2` raises `TypeError: can only concatenate str (not \"int\") to str` [py-093]. The fix is to turn the number into text first, for example with `str(count)`.",
      { code: "a10_index", out: true },
      "The list has positions 0, 1 and 2. Asking for position 3 stops the program. Python raises an `IndexError` when a sequence subscript (the number in the square brackets) is out of range [py-201].",
      { code: "a10_value", out: true },
      "A cousin: `ValueError` means an argument has the right type but an inappropriate value [py-201]. `int` happily takes a string, so the type is fine. The string `'ten'` just is not a number `int` can read.",
      { h3: "When the bug is inside a function" },
      { code: "a10_deep", out: true },
      "This traceback is longer, because the error happened inside `price_each`, which `quote` called, which the main program called. Each `File ..., line N` entry names a line of the program. The last line still says what happened: a division by zero [py-092].",
      { honest: "We recorded these tracebacks with the Python version named under each box. When we ran the same programs with Python 3.9, the pointer marks (`^^^` and `~~~`) and the *Did you mean* hint were missing. The last lines matched." },
      { toy: "bugboard", label: "Open the Bug Board" },
    ],
  },
  {
    h: "No message at all: print clues",
    body: [
      "Semantic errors are the sneaky ones [py-096]. Nothing crashes. The answer is just wrong. The average of 30, 45 and 15 minutes should be 30. This program says 5.",
      { code: "a10_printdebug", out: true },
      "The `print` inside the loop is a clue line. It shows `total` after each step, and you can see the problem: `total` never grows. It just copies each time. Line 5 should be `total = total + t`.",
      { analogy: "Print debugging is a detective dusting for fingerprints. You do not guess who did it. You put a `print` where the evidence would be, run the program, and read what it says. Then you take the clue lines out." },
      { trace: "a10_printdebug", label: "🔍 Watch total fail to grow" },
      { nerd: "Grown-up clue lines", body: [
        "Larger programs use the `logging` module instead of loose `print` lines. Automate the Boring Stuff lists five logging levels: DEBUG (the lowest), INFO, WARNING, ERROR and CRITICAL [py-098]. Code Pix sticks to `print` for now.",
      ] },
    ],
  },
  {
    h: "Catching an exception",
    body: [
      "Sometimes you expect trouble. A count typed by a customer might say *ten* instead of 10. A `try` statement lets the program handle an exception and carry on.",
      { code: "a10_try", out: true },
      "Python ran the line under `try`. When `int(\"ten\")` failed, Python jumped to the matching `except` block, printed a note, and went on with the loop.",
      "A `try` statement can have `except` and `else` clauses, and a `finally` clause that defines clean-up actions that must be executed under all circumstances [py-094]. An `except` clause matches exceptions of the class it names, or of a class derived from it, and not the other way around [py-095].",
      { trace: "a10_try", label: "🔍 Watch the jump into except" },
      { honest: "House advice: name the one exception you expect in each `except`, as this program does." },
    ],
  },
  {
    h: "Checks that shout, and tests that check",
    body: [
      { h3: "assert" },
      "An `assert` statement is a sanity check. It raises `AssertionError` when the check fails. Automate the Boring Stuff says assertions are for programmer errors, not user errors [py-097]. So use one to catch *your own* mistakes, such as a function getting a percent of 250.",
      { code: "a10_assert", out: true },
      { h3: "Tests" },
      "A [[test]] is a small program that calls your code and checks the answer. Python's `unittest` module works like this: a test case is a subclass of `unittest.TestCase`, test methods have names that start with the letters `test`, and the checks use methods such as `assertEqual` [py-099].",
      "For a first look, the function and its tests share one file.",
      { code: "a10_test_price", file: "test_repair.py" },
      "Each `assertEqual` is an [[assertion]]: *this value should equal that one*. Tests run from the command line with `python -m unittest`, for example `python -m unittest test_module` [py-100]. Code Pix writes `python3`, as it does everywhere else in the book.",
      { term: [["python3 -m unittest test_repair.py", "Run every test in the file. Each failing test prints what it expected and what it got."]] },
      "You have been doing this since Labeled Boxes: every exercise ships with a `test_` file. Now you know what is inside one.",
      { machine: ["a10-fixit", "a10-sale"], label: "Go to your machine: fix three bugs, then make a failing test pass" },
    ],
  },
]);

GLOSS({
  exception: "An error found while a program runs [py-092]. Unless something catches it, the program stops and prints a traceback.",
  traceback: "Python's report of the location and type of an error [py-195]. Its last line says what happened and names the exception type [py-092].",
  test: "A small program that calls your code and checks the result. With `unittest`, tests are methods whose names start with `test` [py-099].",
  assertion: "A check that a value is what you expect. `assert` raises `AssertionError` when its check fails [py-097]; `assertEqual` is the unittest version [py-099].",
}, "a10");

/* Notes the decoder may show. Each sentence stays inside its cited fact. Types without a source get a plain
   "no checked notes yet" message. */
const BUG_NOTES = {
  NameError: "Python met a name with no value. Using a name that has no value raises a `NameError` [py-045]. Check the spelling, and check that the name was given a value on an earlier line.",
  TypeError: "The tutorial's example is `'2' + 2`, which raises `TypeError: can only concatenate str (not \"int\") to str` [py-093]. Assigning to one letter of a string raises it too [py-047]. Look for two different kinds of value meeting on the line it names.",
  ZeroDivisionError: "The tutorial names it as an example of an exception [py-092]. Look for a `/`, `//` or `%` whose right-hand side is zero.",
  KeyError: "A dictionary was asked for a key it does not have. `get()` returns `None` instead, and `in` tests for the key first [py-079].",
  SyntaxError: "Syntax errors are also called parsing errors [py-091]: the way the code is written breaks Python's rules. Names with punctuation, and keywords used as names, cause them too [py-044].",
  AssertionError: "An `assert` check failed [py-097]. Someone wrote down what they expected, and it was not true here.",
  RecursionError: "If a recursion never reaches its base case, Python stops it with this error [py-141]. The Mirrors Inside Mirrors job covers this.",
  IndexError: "A sequence subscript is out of range [py-201]: the program asked for a position the list or string does not have. Positions start at 0, so a list of three ends at position 2.",
  ValueError: "An argument has the right type but an inappropriate value [py-201]. `int('ten')` is the classic: a string is fine, that string is not.",
  IndentationError: "Indentation is wrong. It is a kind of `SyntaxError` [py-197]. An accidental space or Tab at the start of a line gives `IndentationError: unexpected indent` [py-196].",
  TabError: "The indentation mixes tabs and spaces inconsistently [py-197]. Re-indent the lines it names with one kind only.",
  FileNotFoundError: "A file or directory was requested but does not exist [py-199]. Check the spelling, and check which folder the terminal is in with `pwd` and `ls` [py-003].",
  ModuleNotFoundError: "`import` could not locate the module [py-200]. If it is a package you installed, check that the right virtual environment is active.",
  PermissionError: "An operation ran without adequate access rights, for example filesystem permissions [py-198].",
};

TOY("bugboard", {
  title: "Bug Board", level: "a10", color: "var(--pink)", wide: true,
  short: "Real tracebacks pinned to a board, with the clues highlighted, plus a decoder for your own.",
  goal: "Decode a traceback: pin a recorded one, or paste one from your own machine.",
  label: "A JavaScript demo of the idea, not Python code.",
  html: () => `
    <div class="bb-pins row" aria-label="Recorded bugs"></div>
    <div class="bb-case"></div>
    <h3 class="bb-h">Decoder</h3>
    <p class="bb-small">Paste a traceback from your own terminal. The decoder only matches text patterns. It is a helper, not a diagnosis, and it never runs anything you paste.</p>
    <textarea class="bb-paste" rows="6" wrap="off" spellcheck="false" aria-label="Paste a traceback here" placeholder="Traceback (most recent call last):&#10;  File &quot;fixit.py&quot;, line 4, in &lt;module&gt;&#10;..." data-hint="Paste a traceback here. Code Pix reads it as plain text and never runs it."></textarea>
    <div class="row">
      <button type="button" class="btn small tang bb-go" data-hint="Look for the error type and the line numbers in the pasted text">Decode</button>
      <button type="button" class="btn small plain bb-sample" data-hint="Copy the pinned recording into the box, to see how the decoder works">Use the pinned bug</button>
      <button type="button" class="btn small plain bb-clear" data-hint="Empty the box">Clear</button>
    </div>
    <div class="bb-result" role="status" aria-live="polite"></div>`,
  init(root, ctx) {
    const BUGS = [["a10_typo", "Typo"], ["a10_zero", "No jobs"], ["a10_type", "Text plus number"], ["a10_index", "Too far"], ["a10_value", "Words for numbers"], ["a05_indent", "Stray space"], ["a11_lost", "Lost letter"], ["a08_missing", "Missing key"], ["a10_deep", "Deep inside"], ["a10_assert", "Failed check"]]
      .filter(([p]) => DATA.programs[p] && DATA.programs[p].err);
    const pins = $(".bb-pins", root), box = $(".bb-case", root), ta = $(".bb-paste", root), res = $(".bb-result", root);
    let current = BUGS.length ? BUGS[0][0] : null;

    /* Pattern matching only. Returns {type, msg, where: [{file, line, fn}]} or null. */
    const decode = text => {
      const lines = String(text).replace(/\r\n/g, "\n").split("\n").map(l => l.replace(/\s+$/, "")).filter(Boolean);
      const where = [];
      lines.forEach(l => { const m = l.match(/^\s*File "([^"]+)", line (\d+)(?:, in (.+))?$/); if (m) where.push({ file: m[1], line: +m[2], fn: m[3] || "" }); });
      for (let k = lines.length - 1; k >= 0; k--) {
        const m = lines[k].match(/^([A-Za-z_][\w.]*(?:Error|Exception|Exit|Interrupt|Warning))(?::\s?(.*))?$/);
        if (m) return { type: m[1].split(".").pop(), msg: m[2] || "", where };
      }
      return where.length ? { type: null, msg: "", where } : null;
    };
    const classify = l => /^Traceback \(most recent call last\):/.test(l) ? "head" : /^\s*File "/.test(l) ? "where" : /^\s*[\^~]+[\s\^~]*$/.test(l) ? "marks" : /^[A-Za-z_][\w.]*(Error|Exception|Exit|Interrupt|Warning)\b/.test(l) ? "clue" : "src";

    const showResult = (d, fromPin) => {
      res.innerHTML = "";
      if (!d) { res.append(el("p.bb-none", {}, "No traceback pattern found. Paste everything from the line that starts with Traceback down to the last line.")); return; }
      const card = el("div.bb-card");
      if (d.type) {
        card.append(el("p", { html: `<b>Error type:</b> <code>${esc(d.type)}</code>` + (d.msg ? `<br><b>Message:</b> <code>${esc(d.msg)}</code>` : "") }));
        card.append(el("p", { html: BUG_NOTES[d.type] ? rich(BUG_NOTES[d.type]) : rich(`Code Pix has no checked notes for \`${d.type}\` yet. Read its message carefully, and search the Python documentation for the type's name.`) }));
      } else card.append(el("p", {}, "No error type on a last line. Did the paste stop early?"));
      if (d.where.length) {
        const ul = el("ul.bb-where");
        d.where.forEach(w => ul.append(el("li", { html: `<code>${esc(w.file)}</code>, line <b>${w.line}</b>${w.fn ? ` (in <code>${esc(w.fn)}</code>)` : ""}` })));
        card.append(el("p", {}, "Lines the traceback names:"), ul);
      }
      res.append(card);
      if (d.type) ctx.goalDone(fromPin ? "You decoded a recorded traceback." : "You decoded a traceback.");
    };

    const pin = id => {
      current = id;
      $$("button", pins).forEach(b => b.setAttribute("aria-pressed", b.dataset.id === id ? "true" : "false"));
      const p = DATA.programs[id], d = decode(p.err);
      box.innerHTML = "";
      const named = new Set(d ? d.where.map(w => w.line) : []);
      const code = codeBlock(p.src, { file: id + ".py" });
      $$(".ln", code.pre).forEach((ln, k) => ln.classList.toggle("err", named.has(k + 1)));
      const tb = el("pre.bb-tb", { tabindex: "0", "aria-label": "Recorded traceback" });
      (p.out ? p.out.replace(/\n$/, "").split("\n").map(l => el("span.bb-l.out", {}, l)) : []).forEach(n => tb.append(n));
      p.err.replace(/\n$/, "").split("\n").forEach(l => tb.append(el("span.bb-l." + classify(l), {}, l)));
      box.append(
        el("div.bb-grid", {}, el("div", {}, code), el("div", {}, el("div.bb-tbwrap", {}, el("div.bb-bar", {}, "Real output, ending in a traceback"), tb, el("div.bb-note", {}, `Recorded from real Python ${p.python} when the site was built.`)))),
        el("ul.bb-legend", {},
          el("li", { html: '<span class="bb-key clue">pink</span> ' + rich("the last line: what happened, and the exception type [py-092]") }),
          el("li", {}, el("span.bb-key.where", {}, "blue"), " lines that name a file and a line number; those lines are marked in the code"),
          el("li", {}, el("span.bb-key.out", {}, "plain"), " output printed before the error")));
    };

    BUGS.forEach(([id, label], k) => pins.append(el("button.btn.small.plain", { type: "button", "data-id": id, "aria-pressed": k ? "false" : "true", "data-hint": "Pin the recorded traceback from " + id + ".py", onclick: () => pin(id) }, "📌 " + label)));
    $(".bb-go", root).addEventListener("click", () => showResult(decode(ta.value), false));
    $(".bb-sample", root).addEventListener("click", () => { if (current) { ta.value = DATA.programs[current].err; showResult(decode(ta.value), true); } });
    $(".bb-clear", root).addEventListener("click", () => { ta.value = ""; res.innerHTML = ""; ta.focus(); });
    if (current) pin(current);
    else box.append(el("p", {}, "No recordings yet."));
  },
});

LEVEL({
  id: "a10", title: "Bug Hunt", job: "A customer's gadget is behaving oddly. Find out why.",
  color: "#ff6fae", scene: "shop", cast: ["gridlock"], toy: "bugboard",
  sticker: { title: "Bug Hunter", glyph: "bug", color: "#ff6fae" },
  goals: ["Read the last line of a traceback", "Catch an exception with try", "Run a test file"],
  beats: [
    nar("Thursday, after lunch. A talking kettle sits on the bench, announcing the wrong temperature in a very confident voice."),
    say("gridlock", "{{you}}, the kettle's program crashes half the time and lies the other half. The customer wants it back by five. Find the bugs.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Splendid. A mystery. Think Python sorts bugs into three kinds: syntax errors, runtime errors, which are exceptions, and semantic errors [py-096].", "wow") },
    say("nib", "Syntax errors are also called parsing errors [py-091]. Exceptions are errors found while the program runs [py-092]. Semantic errors let it run and give a wrong answer."),
    { show: ["nib", "byte"], ...say("byte", "BEEP. My screen just filled with red text. Am I broken?", "wow") },
    say("nib", "You are informative. That red text is a [[traceback]]. Start at the bottom: the last line says what happened, and names the exception type [py-092].", "think"),
    { trace: { program: "a10_typo", note: "Step to the end. The last line names the error and the name Python could not find." } },
    { ask: { q: "Where in a traceback does Python say what happened and name the exception type?", choices: ["the first line", "the last line", "the line with the pointer marks"], answer: 1,
      why: "The last line of the error message says what happened and shows the exception type [py-092]." } },
    say("nib", "Then read upward. The message gives a line number, and a caret (`^`) marks where Python found the error. That spot may be a line or two after the real mistake [py-194]."),
    { ask: { q: "The caret points at line 7, and line 7 looks perfect. Where do you look next?", choices: ["a line or two above it", "the last line of the file", "nowhere: Python must be wrong"], answer: 0,
      why: "The caret shows where Python found the error, which may be a line or two after the real mistake [py-194]." } },
    { predict: { program: "a10_zero", q: "Zero jobs today. What prints before the program stops? (Show the last line of the error too.)",
      choices: ["Minutes: 0\nAverage: 0", "Minutes: 0\nZeroDivisionError: division by zero", "ZeroDivisionError: division by zero"], answer: 1,
      why: "The first `print` ran normally. The second divided by zero, and the program stopped with a `ZeroDivisionError` [py-092]." } },
    say("nib", "Here is one from the tutorial itself, in shop clothes. Joining text and a number with `+` raises a `TypeError` [py-093]."),
    { toy: "bugboard", goal: "Decode a traceback: pin a recorded one, or paste one from your own machine." },
    say("gridlock", "Fine, it crashes less. But it says the average brew takes 5 minutes. It takes 30.", "think"),
    say("nib", "No message at all. A semantic error [py-096]. We put clue lines in with `print`, run it, and read the evidence."),
    { trace: { program: "a10_printdebug", note: "Watch `total`. It should grow on every step." } },
    { ask: { q: "A program runs to the end and prints a wrong number. Which kind of error is that?", choices: ["a syntax error", "a runtime error", "a semantic error"], answer: 2,
      why: "Nothing crashed, so it is neither a syntax error nor an exception. The logic is wrong: a semantic error [py-096]." } },
    { show: ["nib", "byte", "reader"], ...say("reader", "Sometimes trouble is expected. A customer types *ten* instead of 10. With `try` and `except`, I can catch that exception and keep reading [py-094].") },
    { predict: { program: "a10_try", q: "One of the four counts is the word *ten*. What prints?",
      choices: ["Total: 22", "Skipping ten\nTotal: 22", "Total: 22\nSkipping ten"], answer: 1,
      why: "The `except ValueError` block caught the bad count, printed a note, and the loop carried on." } },
    say("nib", "For your own mistakes, use `assert`. It raises `AssertionError` when a check fails, and it is for programmer errors, not user errors [py-097]."),
    say("nib", "And the best bug hunter of all is a [[test]]. A `unittest` test case subclasses `unittest.TestCase`, and its methods start with `test` [py-099]. You run them with `python -m unittest` [py-100].", "think"),
    { ask: { q: "In a `unittest` file, which method name will the test runner pick up as a test?", choices: ["`def check_price(self):`", "`def test_price(self):`", "`def price_test(self):`"], answer: 1,
      why: "Test methods have names that start with the letters `test` [py-099]." } },
    { book: 1, text: "The book has the whole chapter. This page shows real tracebacks, including one from deep inside a function." },
    say("gridlock", "Kettle's fixed. Good. Now there is a stock report on your machine with three bugs in it, and a sale price that fails its test.", "think"),
    { machine: ["a10-fixit", "a10-sale"] },
    say("byte", "Bugs found: all of them. Red text: now my friend. BEEP BOOP.", "wow"),
    { sticker: true },
  ],
});
