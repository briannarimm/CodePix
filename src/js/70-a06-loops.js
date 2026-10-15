/* A6. The Conveyor Belt: for, range, while, break/continue, loop else, accumulator, off-by-one.
   Toy: Loop Belt (loopbelt), trace-driven. */

// Stopping a runaway loop: Control-C raises KeyboardInterrupt [py-244] [py-245]. No recording: it needs a real key press.

PAGES("a06", [
  {
    h: "The conveyor belt",
    body: [
      "Wednesday at Gadget Gulch means the repair belt. Broken gadgets roll in one after another, and the helper has to do the same job to each one. Writing the job out once per gadget would be silly. A [[loop]] writes it once and repeats it.",
      "Python's `for` statement iterates over the items of any sequence in order [py-063]. Each trip through the loop body is one [[iteration]].",
      { code: "a06_belt", out: true },
      "The square brackets on line 2 make a list of three numbers. (A7 is all about lists.) On each iteration the name `m` refers to the next number on the belt, and the two indented lines run once for it.",
      { analogy: "A conveyor belt delivers one gadget at a time to the helper's bench. The loop body is what the helper does to each gadget. When the belt is empty, the helper moves on to the next line of the program." },
      { h3: "The accumulator pattern" },
      "`total` starts at 0 before the loop, and every iteration adds one more number to it. When the belt is empty, `total` holds the sum. This shape, start a box at zero and add to it each time round, is called an [[accumulator]]. It is our name for a pattern you will write hundreds of times.",
      { trace: "a06_belt", label: "🔍 Watch the total grow" },
      { toy: "loopbelt", label: "Open the Loop Belt" },
    ],
  },
  {
    h: "Counting with range()",
    body: [
      "Often you want to loop over numbers rather than over a list you already have. [[range|range()]] hands them out. `range()` never includes its end point: `list(range(5, 10))` is `[5, 6, 7, 8, 9]`, and `list(range(0, 10, 3))` is `[0, 3, 6, 9]` [py-064].",
      { code: "a06_range", out: true },
      "Read `range(1, 4)` as \"start at 1, stop before 4\". That rule matches slicing in A4: `word[0:4]` also stops before position 4.",
      { h3: "Off by one" },
      "Here is a program that means well.",
      { code: "a06_offbyone", out: true },
      "The label promises 1 through 5, but `range(1, 5)` stops before 5, so the total is 10 where 15 was meant. The program ran without a single error message and printed a confident wrong answer. That is an off-by-one error, and it is the most common loop bug there is. The fix is `range(1, 6)`, or `range(1, n + 1)` when the last number is `n`.",
      { analogy: "A fence with 5 sections has 6 posts. Counting the posts when you meant the sections is the same slip, just outdoors." },
    ],
  },
  {
    h: "While the battery charges",
    body: [
      "A `for` loop knows in advance how many items it will handle. A `while` loop does not: it keeps going for as long as its [[condition]] is true, and checks the condition again before every iteration.",
      { code: "a06_charge", out: true },
      "The battery stopped at 110, not 100. The condition `charge < 100` is checked only at the top of each iteration. At 80 it was still true, so the loop ran once more and overshot. Watch it happen step by step.",
      { trace: "a06_charge", label: "🔍 Watch the charge climb" },
      "The Python tutorial's first `while` loop prints the Fibonacci numbers below 10 as 0 1 1 2 3 5 8 [py-067]. Here is a version of it, recorded on our build machine.",
      { code: "a06_fib", out: true },
      "Line 2 fills two boxes at once: `a` gets 0 and `b` gets 1. Line 5 does the same trick to move both numbers along. The `end=\" \"` from A4 keeps the numbers on one line.",
      { nerd: "Loops that never stop", body: [
        "If a `while` condition never turns false, the loop keeps going. Before you run a `while` loop, check that something in the body moves the condition toward false. In `a06_charge`, line 4 raises `charge` on every pass.",
        "If one runs away anyway, you can stop it. The tutorial says you can interrupt a program with Control-C (or whatever your operating system supports), and Python signals the interruption by raising [[KeyboardInterrupt]] [py-244]. The library reference names the usual interrupt keys as Control-C or Delete [py-245].",
        "To press it, click into the terminal where the program runs, hold Control and press C.",
        "So a `KeyboardInterrupt` at the bottom of a traceback is no bug in your logic. It means someone pressed the interrupt key. Usually that someone was you.",
      ] },
    ],
  },
  {
    h: "Stopping early and skipping",
    body: [
      "`break` leaves the innermost loop and `continue` moves to the next iteration [py-065].",
      { code: "a06_find", out: true },
      "The belt held three gadgets, but the program only looked at two of them. When it found the radio, `break` stopped the belt, and the kettle never came through.",
      "Did you spot the `else` under the `for`? In a `for` or `while` loop, the `else` clause runs if the loop finishes without executing a `break` [py-066]. Here the loop did break, so `No radio today.` never printed. Take the radio off the belt and the `else` would run.",
      { trace: "a06_find", label: "🔍 Watch the belt stop" },
      { code: "a06_skip", out: true },
      "`continue` skips the rest of one iteration and goes straight to the next number, so the even bins never print. `break` at 7 ends the whole loop, so bins 7 and 9 never open.",
      { table: { head: ["Word", "What happens", "Belt version (our analogy)"], rows: [["`continue`", "skip the rest of this iteration [py-065]", "push this gadget past the bench"], ["`break`", "leave the innermost loop [py-065]", "hit the big red stop button"], ["`else` on a loop", "runs if the loop never hit `break` [py-066]", "the belt ran empty without a stop"]] } },
      { machine: ["a06-total", "a06-vowels", "a06-fizz"], label: "Go to your machine: three belt jobs" },
    ],
  },
]);

GLOSS({
  loop: "Code that runs a block of lines again and again: once per item with `for`, or while a condition stays true with `while`. (Our own definition.)",
  iteration: "One trip through a loop's body. `for` iterates over the items of a sequence in order. [py-063]",
  accumulator: "A box that starts empty or at zero before a loop and collects something on every iteration, such as a running total. (Our own term for the pattern.)",
  KeyboardInterrupt: "The exception Python raises when you press the interrupt key, normally Control-C, to stop a running program. [py-244] [py-245]",
  range: "`range()` hands out a run of whole numbers and never includes its end point: `list(range(5, 10))` is `[5, 6, 7, 8, 9]`. [py-064]",
}, "a06");

TRACETOY("loopbelt", {
  title: "Loop Belt", level: "a06",
  short: "Gadgets ride the belt through a loop, one iteration at a time.",
  goal: "Step through a recording to the very end.",
  programs: [["a06_belt", "Add up the minutes"], ["a06_charge", "Charge the battery"], ["a06_find", "Find the radio (break)"], ["a06_skip", "Skip and stop"], ["a06_fib", "Fibonacci"]],
  notes: {
    a06_belt: "Watch `m` take each value from the belt in turn while `total` grows.",
    a06_charge: "The condition is checked at the top of each pass. Watch what happens at 80.",
    a06_find: "Count how many gadgets get checked before `break`.",
    a06_skip: "Even numbers hit `continue` and jump straight back to the top.",
    a06_fib: "Both boxes change at once on line 5.",
  },
});

LEVEL({
  id: "a06", title: "The Conveyor Belt", job: "A belt of broken gadgets arrives; the helper must handle each one.",
  color: "#ff6fae", scene: "shop", cast: ["gridlock"], toy: "loopbelt",
  sticker: { title: "Belt Boss", glyph: "for", color: "#ff6fae" },
  goals: ["Repeat a job with for and range", "Keep a running total", "Stop early with break, skip with continue"],
  beats: [
    nar("Wednesday. The repair belt rattles to life, and gadgets start rolling in."),
    say("gridlock", "{{you}}, forty-one gadgets on the belt today. Please do not tell me the plan is to write forty-one lines.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "One line, repeated. A [[loop]] runs the same block for every item. Python's `for` goes through the items of any sequence in order [py-063].") },
    { predict: { program: "a06_belt", q: "Three gadgets, with 15, 40 and 25 minutes of work. What does the belt program print?",
      choices: ["Fixed one: 15 minutes\nFixed one: 40 minutes\nFixed one: 25 minutes\nTotal: 80", "Fixed one: 15 minutes\nTotal: 15", "Total: 80"], answer: 0,
      why: "The two indented lines run once per gadget, three times in all. The last line is not indented, so it runs once, after the belt is empty." } },
    { trace: { program: "a06_belt", note: "Watch `total` grow by one gadget on each iteration." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. `total` starts at zero and collects. I call it my bucket.", "wow") },
    say("nib", "The usual name is an [[accumulator]]. Start the box before the loop, add to it inside the loop, read it after."),
    say("nib", "To loop over numbers, use [[range|range()]]. It never includes its end point: `list(range(5, 10))` is `[5, 6, 7, 8, 9]` [py-064].", "think"),
    { ask: { q: "Which numbers does `range(1, 4)` hand out?", choices: ["1, 2, 3", "1, 2, 3, 4", "0, 1, 2, 3"], answer: 0,
      why: "Start at 1 and stop *before* 4 [py-064]. The book's chapter prints it from real Python." } },
    { predict: { program: "a06_offbyone", q: "This program says it adds 1 through 5. What does it really print?",
      choices: ["1 + 2 + 3 + 4 + 5 = 10", "1 + 2 + 3 + 4 + 5 = 15", "1 + 2 + 3 + 4 + 5 = 14"], answer: 0,
      why: "`range(1, 5)` stops before 5, so only 1 to 4 get added. An off-by-one error: no crash, just a wrong answer." } },
    { show: ["gridlock", "nib"], ...say("gridlock", "And the battery charger? It is supposed to stop at full.") },
    say("nib", "A `while` loop. It keeps going for as long as its [[condition]] is true, and checks again before each pass."),
    { predict: { program: "a06_charge", q: "Start at 20, add 30 each pass, keep going while the charge is under 100. Where does it stop?",
      choices: ["Charging: 50\nCharging: 80\nCharging: 110\nDone at 110", "Charging: 50\nCharging: 80\nDone at 80", "Charging: 50\nCharging: 80\nCharging: 100\nDone at 100"], answer: 0,
      why: "At 80 the condition `charge < 100` is still true, so the loop runs once more and overshoots to 110." } },
    { trace: { program: "a06_charge", note: "The condition is checked at the top, before each pass." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. What if the condition never turns false? Do I charge forever?", "wow") },
    say("nib", "You would, until someone presses Control-C in the terminal. That interrupts the program, and Python raises [[KeyboardInterrupt]] [py-244]. Every programmer presses it eventually.", "think"),
    { ask: { q: "A `while` loop will not stop. What do you press in its terminal?", choices: ["Control-C", "Return", "The up arrow"], answer: 0,
      why: "Control-C interrupts the program, and Python signals it by raising `KeyboardInterrupt` [py-244]." } },
    say("reader", "When I hit `break`, I jump straight out of the loop. When I hit `continue`, I run back to the top for the next item.", "happy"),
    say("nib", "Right: `break` leaves the innermost loop and `continue` moves to the next iteration [py-065]. And a loop's `else` runs only if the loop never hit `break` [py-066]."),
    { predict: { program: "a06_find", q: "The belt holds a toaster, a radio and a kettle. What does the search print?" } },
    { ask: { q: "In `a06_find`, why did `No radio today.` not print?", choices: ["The loop ended with `break`", "The list was empty", "`else` never runs after a `for`"], answer: 0,
      why: "A loop's `else` runs only if the loop finishes without a `break` [py-066]. This one found the radio and broke out." } },
    { toy: "loopbelt", goal: "Pick any belt and step through it to the very end." },
    { book: 0, text: "The book has the full chapter: for, range, off-by-one, while, break, continue and the loop else." },
    { show: ["gridlock", "byte"], ...say("gridlock", "Three belt jobs for your own machine. One of them is a counting game the whole shop plays at lunch.", "think") },
    { machine: ["a06-total", "a06-vowels", "a06-fizz"] },
    say("byte", "Forty-one gadgets. One loop. Zero sore fingers. BEEP BOOP."),
    { sticker: true },
  ],
});
