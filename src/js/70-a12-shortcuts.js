/* A12. Shortcuts: comprehensions, enumerate, zip, sorted with key, lambda, min/max, any/all. Friday morning. */

PAGES("a12", [
  {
    h: "One line instead of four",
    body: [
      "By now you can build any list with a loop: start with an empty list, walk through the old one, and `append` what you want to keep. Python has a shorter way to say exactly that.",
      "A [[comprehension|list comprehension]] builds a list from an expression followed by `for` and `if` clauses. The tutorial's example is `[x**2 for x in range(10)]` [py-106].",
      { h3: "The long way" },
      { code: "a12_loop", out: true },
      { h3: "The shortcut" },
      { code: "a12_short", out: true },
      "Same list, same order. Read the shortcut from the middle: *for each p in prices, if p is more than 5, keep p times 2.* The part you keep comes first, then the loop, then the test.",
      { analogy: "A comprehension is a conveyor belt folded into one line. Items ride in from `prices`. A gate (`if p > 5`) lets some through. A stamp (`p * 2`) changes each one. A new shopping list fills up at the far end." },
      { trace: "a12_short", label: "🔍 Watch the shortcut build the list" },
      { honest: "A shortcut is only worth it while it stays easy to read. If a comprehension needs two lines of explaining, the loop was clearer. (That is our house style.)" },
    ],
  },
  {
    h: "Counting and pairing",
    body: [
      "Two small helpers save a lot of bookkeeping. `enumerate()` gives you each item's position along with its value, and `zip()` walks through two sequences side by side [py-107].",
      { code: "a12_pairs", out: true },
      "`enumerate` starts counting at 0, the same numbering as list positions. `zip` paired `toaster` with `2`, `kettle` with `4` and `radio` with `3`. The last line used `sum()` to add up the hours.",
      { trace: "a12_pairs", label: "🔍 Watch enumerate and zip hand out pairs" },
      { analogy: "`zip` is the shop's tag gun. Two belts run side by side: jobs on one, hours on the other. Each click staples one job to its hours." },
    ],
  },
  {
    h: "Sorting with a key",
    body: [
      "`sorted()` returns a new sorted list from any iterable. It takes `key` and `reverse` as keyword arguments, and it is guaranteed to be stable [py-109], so items that tie keep the order they came in.",
      "The `key` is a function that says *what to compare*. To sort parts by price, the key picks out the price. The quickest way to write a tiny function like that is a [[lambda]]: lambda expressions are restricted to a single expression, and `list.sort()` can take one as its key [py-108].",
      { code: "a12_sorted", out: true },
      "Look at the second line of output. `parts` itself did not change: `sorted()` made a new list. `max()` and `min()` take a key too [py-111], so the last two lines found the dearest and cheapest part with the same lambda.",
      { analogy: "`lambda p: p[1]` is a sticky note that says \"look at the price\". It is a recipe card so small it fits on one line, and it has no name." },
      { trace: "a12_sorted", label: "🔍 Watch the lambda get called" },
    ],
  },
  {
    h: "Any and all",
    body: [
      "Two more questions come up all the time: is *anything* true here, and is *everything* true? `any()` is true if any element is true, and false for an empty iterable. `all()` is true if every element is true, or if the iterable is empty [py-110].",
      { code: "a12_anyall", out: true },
      "The middle bin is empty, so `any` says yes and `all` says no. The last line is the odd one. With nothing to check, `any([])` is `False`, and `all([])` is `True`.",
      { nerd: "Why is all([]) true?", body: [
        "Think of `all` as asking \"is there a counterexample?\". An empty list has no item that fails, so there is nothing to object to. `any` asks \"is there a single example?\", and an empty list has none.",
      ] },
      { machine: ["a12-shortcuts"], label: "Go to your machine: three loops, three lines" },
    ],
  },
]);

GLOSS({
  comprehension: "A one-line way to build a list from an expression plus `for` and `if` clauses, such as `[x**2 for x in range(10)]`. [py-106]",
  lambda: "A small function with no name, written in one expression, such as `lambda p: p[1]`. Handy as a `key` for sorting. [py-108]",
}, "a12");

TRACETOY("shortcut", {
  title: "Loop vs Shortcut", level: "a12",
  short: "The same list built two ways, both recorded from real Python.",
  goal: "Step through one recording to the very end.",
  programs: [["a12_loop", "Long way: a loop"], ["a12_short", "Shortcut: a comprehension"], ["a12_sorted", "Sorting with a key"], ["a12_pairs", "enumerate and zip"]],
  notes: {
    a12_loop: "Replay this one, then the shortcut. Both end with the same list in `rush`.",
    a12_short: "Same job as the loop, in one line. Compare the final `rush` with the loop's.",
    a12_sorted: "Each time `sorted` needs a price, it calls the lambda. Watch the frames appear and vanish.",
  },
});

LEVEL({
  id: "a12", title: "Shortcuts", job: "Do the same job in one line.",
  color: "#ff6fae", scene: "shop", cast: ["nib"], toy: "shortcut",
  sticker: { title: "Shortcut Taker", glyph: "[ ]", color: "#ff6fae" },
  goals: ["Turn a loop into a list comprehension", "Use enumerate, zip and sorted with a key", "Ask any() and all()"],
  beats: [
    nar("Friday morning. The coffee is hot and the shop's old code is very, very long."),
    say("nib", "{{you}}, look at this. Four lines to make one list. It works, and it is the long way round. Today you learn the shortcuts.", "think"),
    { trace: { program: "a12_loop", note: "The long way: an empty list, a loop, a test, and an `append` for each keeper." } },
    say("nib", "A [[comprehension|list comprehension]] says the same thing in one line: what to keep, then the `for`, then the `if` [py-106]."),
    { predict: { program: "a12_short", q: "This shortcut uses the same prices as the loop. What will it print?",
      choices: ["[8, 20, 14, 50]", "[20, 14, 50]", "[10, 7, 25]"], answer: 1,
      why: "The `if p > 5` drops the 4. Each price that passes is doubled, in the original order." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. Same list. Fewer steps for my arms.", "wow") },
    say("nib", "Next, bookkeeping. `enumerate()` hands you each position with its item. `zip()` walks two lists side by side [py-107]."),
    { trace: { program: "a12_pairs", note: "Watch `i` count 0, 1, 2. Then watch `job` and `h` arrive in pairs." } },
    { ask: { q: "`jobs` has three jobs and `hours` has three numbers. What does `zip(jobs, hours)` give the loop each time round?", choices: ["One job and its position", "One job paired with the matching hours", "All the jobs, then all the hours"], answer: 1,
      why: "`zip()` loops over sequences in parallel [py-107], so each pass gets one item from each list." } },
    { show: ["gridlock", "nib"], ...say("gridlock", "And can it sort my parts by price? Cheapest first. I have a sale to plan.", "think") },
    say("nib", "`sorted()` returns a new sorted list and takes a `key` [py-109]. The key says what to compare. A [[lambda]] writes that tiny function in one expression [py-108]."),
    { predict: { program: "a12_sorted", q: "Read it carefully, especially the second `print`. What will it print?" } },
    { ask: { q: "After `by_price = sorted(parts, key=...)`, what is in `parts`?", choices: ["The parts, now sorted by price", "The parts in their original order", "Nothing; sorted empties it"], answer: 1,
      why: "`sorted()` returns a *new* sorted list [py-109]. The second line of output shows `parts` unchanged." } },
    say("nib", "`max()` and `min()` take a key as well [py-111]. Same lambda, dearest and cheapest part.", "think"),
    { show: ["nib", "byte"], ...say("byte", "Question! Is any bin empty? Are all bins stocked? I check every morning. BEEP.", "wow") },
    say("nib", "`any()` is true if any item is true. `all()` is true if every item is true. Careful with empty lists: `any` says False, `all` says True [py-110]."),
    { predict: { program: "a12_anyall", q: "One bin holds 0. What will this print? Mind the last line.",
      choices: ["True\nFalse\nFalse True", "False\nTrue\nFalse False", "True\nFalse\nTrue True"], answer: 0,
      why: "The 0 makes `any` true and `all` false. With an empty list, `any` is false and `all` is true [py-110]." } },
    { ask: { q: "Which line is a list comprehension?", choices: ["`big = [p for p in prices if p >= 8]`", "`big = sorted(prices)`", "`big = prices[:]`"], answer: 0,
      why: "It has the expression, then `for`, then `if`, all inside square brackets [py-106]." } },
    { book: 0, text: "The book has every shortcut side by side with its long way." },
    say("nib", "Your turn. Three loops from the old code. Fold each into one line.", "think"),
    { machine: ["a12-shortcuts"] },
    { toy: "shortcut", goal: "Replay any recording to its last step." },
    say("byte", "Shortcuts taken. Corners not cut. BEEP BOOP."),
    { sticker: true },
  ],
});
