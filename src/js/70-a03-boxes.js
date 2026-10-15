/* A3. Labeled Boxes: variables, types, aliasing. (Exemplar level: copy its shape.) */

PAGES("a03", [
  {
    h: "Names for things",
    body: [
      "The shop's inventory is a mess of loose parts. Before the helper can count anything, every part needs a name the helper can look up later.",
      "In Python, a [[variable]] is a name that refers to a value, and an **assignment statement** with `=` creates it [py-043]. The name goes on the left, the value on the right.",
      { code: "a03_boxes", out: true },
      { analogy: "Think of a shelf of boxes. Each box has a label stuck on the front. `gears = 12` sticks the label *gears* on a box and puts 12 inside. Later, `gears = gears + 3` reads what is in the box, adds 3, and puts the new number back under the same label." },
      "Read line 5 of that program from right to left. Python works out `gears + 3` first, using the value the name refers to right now, and only then points the name at the result. That is why `=` is an instruction, and why it is a different thing from the equals sign in math.",
      { trace: "a03_boxes", label: "🔍 Watch the boxes fill up" },
    ],
  },
  {
    h: "Good names and bad names",
    body: [
      "Python is strict about names. A name with punctuation in it, such as `million!`, is illegal and gives a `SyntaxError`, and a keyword such as `class` cannot be a variable name [py-044].",
      "Using a name that has never been given a value is also an error: it raises a `NameError` [py-045]. Here is a program with a typo in the last line. Python stops there and says which name it could not find.",
      { code: "a03_typo", out: true },
      { nerd: "How it really works", body: [
        "The last line of the error is the important one. It names the kind of error and the name Python could not find. Everything printed before the error still happened: the program printed 40 first.",
      ] },
      { h3: "Habits that help" },
      { ul: [
        "Use lowercase words joined by underscores, like `price_each`. (This is our house style.)",
        "Pick names that say what the box holds. `n` is fine for a counter; `springs_in_bin` is better for inventory.",
      ] },
    ],
  },
  {
    h: "What kind of thing is in the box?",
    body: [
      "Every value has a [[type]]: whole numbers, decimal numbers, text and so on. You can ask for any object's type with `type(obj)` [py-050].",
      { code: "a03_types", out: true },
      "Numbers come in two kinds. In the Python tutorial, whole numbers such as 2, 4 and 20 have type `int`, and numbers with a fractional part such as 5.0 and 1.6 have type `float` [py-192]. OpenStax calls these the two basic number formats, integer and floating-point, and calls the format used to represent data its **data type** [py-193].",
      { table: { head: ["Type", "What it holds (shop example)"], rows: [["`int`", "a whole number: 7 springs"], ["`float`", "a number with a decimal point: 1.25 kilograms"], ["`str`", "text in quotes: `\"spring\"`"], ["`bool`", "`True` or `False`: is it in stock?"], ["`NoneType`", "`None`, meaning no value yet"]] } },
      { honest: "The table's examples are our own shop examples. The output above is what real Python printed." },
    ],
  },
  {
    h: "Two labels, one box",
    body: [
      "Here is the surprise of this chapter. Several names can be bound to the same object; other languages call this aliasing, and it matters for objects that can change, such as lists and dictionaries [py-051].",
      "Assigning a list to a second name does not copy the list: both names refer to the same list, while a slice makes a shallow copy [py-048].",
      { code: "a03_alias", out: true },
      { analogy: "`shelf = bins` sticks a second label on the box that is already labeled *bins*. There is still one box. Put a washer in through either label, and both labels show it. `bins[:]` builds a new box with the same parts inside." },
      { trace: "a03_alias", label: "🔍 Watch the two labels share one list" },
      "Numbers and strings behave more calmly, because they are [[immutable]]: the glossary lists numbers, strings and tuples as objects that cannot be altered [py-049]. Trying to change one letter of a string, as in `word[0] = 'J'`, raises a `TypeError` [py-047].",
      { machine: ["a03-swap"], label: "Go to your machine: swap two boxes" },
    ],
  },
]);

GLOSS({
  variable: "A name that refers to a value. An assignment statement such as `gears = 12` creates it. [py-043]",
  type: "The kind of value an object is, such as `int` or `str`. `type(obj)` tells you. [py-050] OpenStax calls the format used to represent data a data type. [py-193]",
  immutable: "Cannot be changed after it is made. Numbers, strings and tuples are immutable. [py-049]",
  aliasing: "Two or more names bound to the same object. [py-051]",
}, "a03");

TRACETOY("memshelf", {
  title: "Memory Shelf", level: "a03",
  short: "Labeled boxes fill up as a real program runs.",
  goal: "Step through a recording to the very end.",
  programs: [["a03_boxes", "Three boxes"], ["a03_alias", "Two labels, one list"], ["a03_types", "Five types"]],
  notes: { a03_alias: "Watch the colors. When two names show the same color tag, they point at the same list." },
});

LEVEL({
  id: "a03", title: "Labeled Boxes", job: "The inventory needs names for things.",
  color: "#ffe45c", scene: "shop", cast: ["gridlock"], toy: "memshelf",
  sticker: { title: "Box Labeler", glyph: "x=", color: "#ffe45c" },
  goals: ["Make variables with =", "Ask for a value's type", "See two names share one list"],
  beats: [
    say("gridlock", "{{you}}, the parts counter is broken again. I need the helper to keep track of springs, gears and bolts. Can you teach it some names?", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Names are exactly the place to start. A [[variable]] is a name that refers to a value [py-043]. Picture a box with a label on it.") },
    say("nib", "The `=` sign is an instruction: work out the right side, then stick the label on the result. Let me show you three boxes."),
    { predict: { program: "a03_boxes", q: "Here is the shop's first inventory program. What will it print?", choices: ["sprocket 12 2.5", "sprocket 15 2.5", "name gears price"], answer: 1,
      why: "Line 5 reads the 12 that is in `gears`, adds 3, and stores 15 under the same label." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. I can show my boxes while I work. Want to watch?", "wow") },
    { trace: { program: "a03_boxes", note: "Watch the box named `gears` change on the last assignment." } },
    say("nib", "Every value also has a [[type]]. `type(obj)` tells you which [py-050]. Numbers, text and true-or-false values are different kinds of thing.", "think"),
    { ask: { q: "What does `type(1.25)` report?", choices: ["`<class 'int'>`", "`<class 'float'>`", "`<class 'str'>`"], answer: 1,
      why: "1.25 has a fractional part, so its type is `float`; whole numbers such as 20 are `int` [py-192]. The Memory Shelf's *Five types* recording shows all five." } },
    say("nib", "Now the surprise. Two names can point at the same object [py-051]. With a list, that matters a great deal.", "wow"),
    { predict: { program: "a03_alias", q: "`shelf = bins`, then a washer goes onto `shelf`. What is in `bins`?" } },
    { trace: { program: "a03_alias", note: "Watch the color tags. Same color means same list." } },
    { ask: { q: "Which line makes a separate copy of the list `bins`?", choices: ["`copy = bins`", "`copy = bins[:]`", "`copy == bins`"], answer: 1,
      why: "A slice makes a new list, a shallow copy [py-048]. Plain assignment only adds a second name." } },
    { book: 0, text: "The book has the whole chapter, with sources you can click." },
    say("gridlock", "Good. Now prove it on the real computer. The springs and gears are in the wrong bins. Swap them.", "think"),
    { machine: ["a03-swap"] },
    { toy: "memshelf", goal: "Replay any recording to its last step." },
    say("byte", "Boxes labeled. Inventory happy. BEEP BOOP."),
    { sticker: true },
  ],
});
