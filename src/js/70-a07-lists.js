/* A7. The Shopping List: lists, indexing, slicing, changing a list, methods, lists of lists, stacks. */

PAGES("a07", [
  {
    h: "A numbered shopping list",
    body: [
      "The parts list for today's repairs keeps growing. Four separate boxes named `part1`, `part2`, `part3` and `part4` would get silly fast. A [[list]] keeps many values under one name, in order.",
      { code: "a07_shelf", out: true },
      { analogy: "A list is a numbered shopping list. The numbers start at 0, so the first line is line 0. `parts[0]` means *read me line 0*. Negative numbers count from the bottom of the list: `parts[-1]` is the last line." },
      "The Python tutorial shows indexing and slicing on text first. `word[0:2]` gives the characters from position 0 up to, and leaving out, position 2, and negative indexes such as `word[-1]` count from the right [py-053]. Lists take the same square brackets, as the recorded output above shows.",
      "So `parts[1:3]` starts at position 1 and stops before position 3. That is two items: `'spring'` and `'bolt'`. Slicing a list returns a new list [py-077]. The original list keeps all four parts.",
      "The last line printed 4. That is `len(parts)`, the number of items on the list.",
      { trace: "a07_shelf", label: "🔍 Watch the list fill its cubbies" },
    ],
  },
  {
    h: "Crossing things out and writing things in",
    body: [
      "A shopping list on paper changes all day. You cross out, you add to the bottom, you squeeze something in at the top. Python lists can do all of that.",
      { code: "a07_change", out: true },
      "Line 3 replaces the item at position 1. The other lines call list [[method|methods]]: functions that belong to the list and are called with a dot, like `parts.append(\"fuse\")`. List methods include `append`, `extend`, `insert`, `remove`, `pop`, `index`, `count`, `sort` and `reverse` [py-073].",
      { table: { head: ["Line", "What it did to the list"], rows: [
        ["`parts[1] = \"coil\"`", "replaced position 1 (*spring*) with *coil*"],
        ["`parts.append(\"fuse\")`", "added *fuse* at the end"],
        ["`parts.insert(0, \"dial\")`", "squeezed *dial* in at position 0; everything else moved down one"],
        ["`parts.remove(\"bolt\")`", "crossed out the first *bolt*"],
      ] } },
      { honest: "The right-hand column is our own reading of the recorded output above." },
      { trace: "a07_change", label: "🔍 Watch the same list change four times" },
      "Because a list can change after it is made, Python calls it [[mutable]]. The tutorial lists lists and dictionaries as mutable objects [py-051]. Remember the surprise from Labeled Boxes: assigning a list to a second name does not copy it, and both names share one list [py-048].",
    ],
  },
  {
    h: "The method that hands back nothing",
    body: [
      "Here is a trap almost everyone falls into once. Methods like `insert`, `remove` and `sort` only change the list, and they return `None` [py-074].",
      { code: "a07_none", out: true },
      "`prices.sort()` put the numbers in order *inside* `prices`. What it handed back to `result` was `None`, the value that means *nothing here*. So never write `prices = prices.sort()`. That line sorts the list and then throws it away.",
      { nerd: "Where to find a sorted copy", body: [
        "If you want a new sorted list and want to keep the old one as it was, the built-in `sorted()` returns a new sorted list [py-109]. The Shortcuts job uses it a lot.",
      ] },
    ],
  },
  {
    h: "Walking the list",
    body: [
      "Python's `for` statement goes through the items of any sequence, in order [py-063]. A list is a sequence, so a `for` loop is the natural way to visit every item.",
      { code: "a07_loop", out: true },
      { analogy: "The `for` loop is the conveyor belt from the last job. This time the belt carries the items of the list, one at a time, and `price` is the name stuck on whichever item is in front of you." },
      "An empty list counts as false in an `if`, because any sequence with a length of zero is false [py-062]. So `if parts:` reads as *if the list has anything on it*.",
      "Python has built-ins that do common list jobs for you. `max()` and `min()`, for example, take an iterable such as a list [py-111]. Doing the job by hand once is the best way to see what they do inside.",
      { machine: ["a07-reverse", "a07-biggest", "a07-dedupe"], label: "Go to your machine: three list jobs" },
    ],
  },
  {
    h: "Lists of lists, and a stack of tickets",
    body: [
      "A list can hold other lists. A bin rack has rows, and each row has bins. That is a list of rows, where each row is a list.",
      { code: "a07_grid", out: true },
      "`rack[1]` is the whole second row. `rack[1][0]` reads that row, then takes position 0 of it. Read the brackets from left to right: first pick the row, then pick the bin in that row.",
      { trace: "a07_grid", label: "🔍 Watch a list that holds lists" },
      { h3: "Stacks and queues" },
      "`append()` and `pop()` with no index make a list behave as a last-in, first-out stack [py-075]. The newest ticket on the spike is the first one done.",
      { code: "a07_stack", out: true },
      "A queue works the other way round: first in, first out, like customers at the counter. The tutorial says lists are slow as queues and points to `collections.deque`, which is fast at both ends [py-076]. You will meet modules like `collections` in the Toolbox Drawer job.",
      { toy: "listshelf", label: "Open the List Shelf" },
    ],
  },
]);

GLOSS({
  list: "A value that holds other values in order, like a numbered shopping list. Positions start at 0. A list can change after it is made [py-078].",
  method: "A function that belongs to an object and is called with a dot, such as `parts.append(\"fuse\")`. List methods include `append`, `pop` and `sort` [py-073].",
  mutable: "Can be changed after it is made. Lists and dictionaries are mutable objects [py-051]. The opposite is immutable.",
}, "a07");

TRACETOY("listshelf", {
  title: "List Shelf", level: "a07",
  short: "Numbered cubbies fill, change and empty as real list programs run.",
  goal: "Step through a recording to the very end.",
  programs: [["a07_shelf", "Index and slice"], ["a07_change", "Change in place"], ["a07_grid", "Lists in a list"], ["a07_stack", "A stack of tickets"]],
  notes: {
    a07_shelf: "Each cubby shows its position number. Count from 0.",
    a07_change: "Watch the color tag on `parts`. It stays the same color the whole time: one list, changed four times.",
    a07_grid: "The rack holds two more lists. Each row gets its own color tag.",
    a07_stack: "`pop()` takes from the end, the newest ticket.",
  },
});

LEVEL({
  id: "a07", title: "The Shopping List", job: "The parts list keeps growing.",
  color: "#5cc8ff", scene: "shop", cast: ["gridlock"], toy: "listshelf",
  sticker: { title: "List Keeper", glyph: "[ ]", color: "#5cc8ff" },
  goals: ["Read items by index and slice", "Change a list with methods", "Loop over a list"],
  beats: [
    nar("Wednesday, late morning. A long paper roll unspools across the counter."),
    say("gridlock", "{{you}}, this is today's parts order. Forty items, and the helper keeps one variable per part. It has run out of names. Fix it before lunch.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "One name, many values. That is a [[list]]. Think of a numbered shopping list, with the numbering starting at zero.") },
    say("nib", "`parts[0]` reads the first line. `parts[-1]` counts from the bottom, so it reads the last one. A slice such as `parts[1:3]` copies a stretch of the list into a new list [py-077].", "think"),
    { predict: { program: "a07_shelf", q: "Read each `print` line. Remember: positions start at 0, and a slice stops *before* its end number." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. My shelf has numbered cubbies now. Want to watch me fill them?", "wow") },
    { trace: { program: "a07_shelf", note: "Each cubby shows its position. The first one is 0." } },
    { ask: { q: "`parts = [\"gear\", \"spring\", \"bolt\", \"fuse\"]`. What is `parts[2]`?", choices: ["`'spring'`", "`'bolt'`", "`'fuse'`"], answer: 1,
      why: "Counting from 0: gear is 0, spring is 1, bolt is 2.", wrong: { 0: "That is position 1. Positions start at 0.", 2: "That is position 3, the last one." } } },
    say("gridlock", "Customers change their minds all day. Can the list change too?"),
    say("nib", "It can. A list is [[mutable]]. You can replace an item, or call list [[method|methods]] such as `append`, `insert` and `remove` [py-073]."),
    { trace: { program: "a07_change", note: "Four changes, one list. The color tag on `parts` never changes." } },
    say("nib", "Now a trap. `sort`, `insert` and `remove` change the list itself, and they hand back `None` [py-074]. Watch.", "wow"),
    { predict: { program: "a07_none", q: "`result = prices.sort()`. What do the two `print` lines show?",
      choices: ["[4, 7, 12, 30]\n[4, 7, 12, 30]", "[4, 7, 12, 30]\nNone", "[12, 4, 30, 7]\nNone"], answer: 1,
      why: "`sort()` reordered `prices` in place and returned `None`, so `result` holds `None` [py-074]." } },
    say("byte", "So `prices = prices.sort()` would sort my list and then replace it with nothing. BEEP. Noted. Never doing that."),
    say("nib", "A `for` loop goes through the items of a sequence in order [py-063]. A list is a sequence, so the conveyor belt works on it too."),
    { ask: { q: "Which line adds `\"washer\"` to the end of the list `parts`?", choices: ["`parts = \"washer\"`", "`parts.append(\"washer\")`", "`parts[4] = \"washer\"`"], answer: 1,
      why: "`append` adds one item at the end [py-073].", wrong: { 0: "That replaces the whole list with a single string.", 2: "Assigning to a position replaces an item that is already there. Position 4 does not exist yet in a list of four." } } },
    { show: ["nib", "byte", "reader"], ...say("reader", "A list can hold lists, too. A rack of bins is a list of rows. I read `rack[1][0]` left to right: row 1 first, then bin 0 of that row.") },
    say("nib", "One more pattern. `append` and `pop` together make a stack: last in, first out [py-075]. For a fair line of customers, first in, first out, the tutorial suggests `collections.deque` [py-076]."),
    { predict: { program: "a07_stack", q: "Three tickets go on the spike, then two come off. What prints?",
      choices: ["toaster\nradio\n['kettle']", "kettle\nradio\n['toaster']", "kettle\ntoaster\n['radio']"], answer: 1,
      why: "`pop()` with no index takes the last item, the newest ticket [py-075]." } },
    { book: 0, text: "The book has the whole chapter: slices, methods, lists of lists and stacks, with sources you can click." },
    say("gridlock", "Good. Now on your own machine: flip a list, find the priciest part by hand, and cross out the repeats on my order sheet.", "think"),
    { machine: ["a07-reverse", "a07-biggest", "a07-dedupe"] },
    { toy: "listshelf", goal: "Replay any recording to its last step." },
    say("byte", "Forty parts, one name. My cubbies have never been tidier. BEEP BOOP.", "wow"),
    { sticker: true },
  ],
});
