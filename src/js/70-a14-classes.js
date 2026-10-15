/* A14. Make Your Own Gadget: classes, __init__, attributes, methods, self. Friday afternoon. */

PAGES("a14", [
  {
    h: "Blueprints and gadgets",
    body: [
      "The shop fixes dozens of gadgets. Each one has a name, a voltage, and a fixed-or-not flag, and each one can be repaired. Writing three loose variables per gadget gets messy fast. A [[class]] bundles the data and the actions together.",
      "When Python finishes reading a `class` block, a class object is created [py-125]. Calling that class like a function builds a new [[instance]], and calling it runs the class's [[__init__]] method with the arguments you passed [py-126].",
      { code: "a14_class", out: true },
      { analogy: "A class is a blueprint. `Gadget` is the drawing pinned to the wall. `toaster` and `kettle` are two real gadgets built from it. They share one design, and each has its own parts: the toaster's `fixed` flag can flip while the kettle's stays put." },
      { trace: "a14_class", label: "🔍 Watch two gadgets come off the blueprint" },
      { honest: "In the Magnifier, each gadget shows up under *Objects* with its [[attribute|attributes]] listed inside: name, volts, fixed. The pictures are a simplified model of memory." },
    ],
  },
  {
    h: "Methods and self",
    body: [
      "We call a function written inside a class a method. `toaster.repair()` is a [[method call]]: when you call `x.f()`, the instance is passed as the first argument, which is conventionally named [[self]] [py-127].",
      "That is how one `repair` method can serve every gadget. When the toaster calls it, `self` is the toaster. When the kettle calls it, `self` is the kettle.",
      { h3: "Read __init__ line by line" },
      { ul: [
        "`def __init__(self, name, volts):` runs once for each new gadget. You never call it by name; `Gadget(\"toaster\", 120)` does that [py-126].",
        "`self.name = name` takes the argument `name` and stores it *on the gadget*. Without `self.`, the value would vanish when `__init__` ends.",
        "`self.fixed = False` gives every new gadget a starting value nobody had to pass in.",
      ] },
      { nerd: "Why is self in the definition but not the call?", body: [
        "You write `def repair(self):` with one parameter, then call `toaster.repair()` with no arguments in the parentheses. The missing argument is the toaster itself, passed in front of the dot [py-127]. The name `self` is a convention [py-127]. Stick with it, and other people can read your classes at a glance.",
      ] },
    ],
  },
  {
    h: "Shared or separate?",
    body: [
      "Where you create an attribute matters. Class variables are shared by all instances; instance variables belong to one instance. The tutorial warns that a mutable class variable, such as a `tricks` list, is shared by every object made from the class [py-128].",
      "Here is that trap in the shop. Two cleaning robots each learn one trick.",
      { code: "a14_shared", out: true },
      "Both robots know both tricks! `tricks = []` sits on the blueprint itself, so there is one list, and both robots reach the same one through `self.tricks`. The last four lines give that list two extra names, `mop_list` and `sweep_list`, so the Magnifier can show where they point.",
      { code: "a14_own", out: true },
      "The fix moves the list into `__init__`. Now each call makes a fresh list for that robot alone.",
      { trace: "a14_shared", label: "🔍 Watch both robots write in one list" },
      { analogy: "A list on the blueprint is a single clipboard nailed to the workshop wall. Every robot built from the blueprint writes on that one clipboard. A list made in `__init__` is a clipboard handed to each robot as it rolls off the line." },
    ],
  },
  {
    h: "Family trees and private names",
    body: [
      "A kettle is a kind of gadget. A derived class names its base class in parentheses, as in `class Kettle(Gadget):`. If an attribute is not found in the class, the search moves on to the base class [py-130].",
      { code: "a14_family", out: true },
      "`Kettle` never defines `__init__` or `label`, yet `k.label()` worked. Python looked in `Kettle`, did not find `label`, and went on to `Gadget`. The same search found `Gadget`'s `__init__`, which printed the first line of output.",
      { trace: "a14_family", label: "🔍 Watch the kettle borrow from Gadget" },
      { h3: "Names with an underscore" },
      "Some names start with an underscore, like `_spam`. That marks a non-public part of the code: other code should treat it as private and leave it alone [py-129]. Think of the underscore as a polite sign on a door: staff only.",
      { machine: ["a14-counter", "a14-account"], label: "Go to your machine: build a counter and an account" },
    ],
  },
]);

GLOSS({
  class: "A blueprint for objects. When Python finishes reading a `class` block, a class object is created. [py-125]",
  object: "Our everyday word for any value a program works with. A gadget built from a class is an object, which this book also calls an instance.",
  instance: "One object built from a class. Calling the class, as in `Gadget(\"toaster\", 120)`, makes one and runs its `__init__`. [py-126]",
  attribute: "A name stored on an object and read with a dot, such as `toaster.volts`. Instance variables belong to one instance; class variables are shared. [py-128]",
  "method call": "Calling a function through an object, as in `x.f()`. The object is passed in as the first argument, named `self` by convention. [py-127]",
  self: "The conventional name for a method's first parameter: the instance the method was called on. [py-127]",
  "__init__": "The method that runs when you call a class to make a new instance. It receives the arguments you passed. [py-126]",
}, "a14");

TRACETOY("blueprint", {
  title: "Blueprint Table", level: "a14",
  short: "Objects built from classes, with their attributes in boxes.",
  goal: "Step through one recording to the very end.",
  programs: [["a14_class", "Two gadgets"], ["a14_shared", "The shared-list trap"], ["a14_own", "One list each"], ["a14_family", "A kettle is a gadget"]],
  notes: {
    a14_class: "Each gadget appears under Objects with its own name, volts and fixed. Watch only the toaster's `fixed` change.",
    a14_shared: "At the end, look at `mop_list` and `sweep_list`. Same color, same list.",
    a14_own: "At the end, `mop_list` and `sweep_list` have different colors: one list per robot.",
    a14_family: "Watch the frames: calling `k.label()` runs code written in `Gadget`.",
  },
});

LEVEL({
  id: "a14", title: "Make Your Own Gadget", job: "Design a blueprint and build gadgets from it.",
  color: "#9b6bff", scene: "shop", cast: ["gridlock"], toy: "blueprint",
  sticker: { title: "Blueprint Maker", glyph: "cls", color: "#9b6bff" },
  goals: ["Write a class with __init__", "Call methods and understand self", "Keep each object's data its own"],
  beats: [
    nar("Friday afternoon. The repair queue has grown to forty gadgets, and the whiteboard has run out of room."),
    say("gridlock", "{{you}}, every gadget has a name, a voltage and a fixed-or-not. I want the helper to keep all of that in one place per gadget. Can it?", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "It can, with a [[class]]. A class is a blueprint. Python reads the `class` block and creates a class object [py-125]. Then we build gadgets from it.") },
    say("nib", "Calling the class builds one gadget, an [[instance]], and runs [[__init__]] with your arguments [py-126]. `__init__` sets up the new gadget's parts.", "think"),
    { predict: { program: "a14_class", q: "Two gadgets come off the blueprint. Only the toaster gets repaired. What will this print?",
      choices: ["Built the toaster\nBuilt the kettle\ntoaster is fixed\nTrue True\n230", "Built the toaster\nBuilt the kettle\ntoaster is fixed\nTrue False\n230", "toaster is fixed\nTrue False\n230"], answer: 1,
      why: "Each call to `Gadget(...)` ran `__init__`, which printed a line. Then `repair` changed `self.fixed` on the toaster only. The kettle still has its own `fixed`, set to `False` by `__init__`." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. Show me the gadgets. I like to see their insides.", "wow") },
    { trace: { program: "a14_class", note: "Each gadget appears under Objects with its own attributes. Watch the `repair` frame: there, `self` is the toaster." } },
    say("nib", "When you write `toaster.repair()`, Python passes the toaster in as the first argument, named [[self]] by convention [py-127]. That is how the method knows which gadget to fix."),
    { ask: { q: "`kettle.repair()` runs. Inside `repair`, what is `self`?", choices: ["The Gadget class", "The kettle", "Every gadget at once"], answer: 1,
      why: "The instance in front of the dot is passed as the first argument, `self` [py-127]." } },
    { ask: { q: "In `__init__`, someone wrote `name = name` instead of `self.name = name`. What goes wrong?", choices: ["Nothing; it means the same", "The gadget never stores its name, so `toaster.name` fails later", "Python refuses to run the class"], answer: 1,
      why: "Plain `name` is a local name in `__init__` and disappears when it ends. Only `self.name` is stored on the gadget." } },
    { show: ["gridlock", "byte"], ...say("gridlock", "One more thing. The cleaning robots. I taught one to spin, and now they ALL spin. Explain.", "think") },
    { show: ["nib", "byte"], ...say("nib", "Ah. A classic. Class variables are shared by every instance. A list on the blueprint is one list for all [py-128].") },
    { predict: { program: "a14_shared", q: "Mop-3 learns \"spin\". Sweepy learns \"beep\". What do they each know?" } },
    { trace: { program: "a14_shared", note: "Step to the end and look at `mop_list` and `sweep_list`. Same color means same list." } },
    say("nib", "The fix: make the list inside `__init__`, as `self.tricks = []`. Then each robot gets its own instance variable [py-128]."),
    { ask: { q: "Which line gives each robot its own list of tricks?", choices: ["`tricks = []` directly under `class Robot:`", "`self.tricks = []` inside `__init__`", "`Robot.tricks = []` after the class"], answer: 1,
      why: "Code in `__init__` runs once per robot, so each gets a fresh list. A list on the class is shared [py-128]." } },
    say("byte", "And a kettle is a gadget too? Does it need its own blueprint from scratch?", "wow"),
    say("nib", "No need. `class Kettle(Gadget):` names the base class. Anything Kettle lacks, Python looks up in Gadget [py-130].", "think"),
    { trace: { program: "a14_family", note: "`Kettle` has no `label` method of its own. Watch Python run the one in `Gadget`." } },
    { book: 0, text: "The book has the whole chapter, including names that start with an underscore." },
    { show: ["gridlock", "nib"], ...say("gridlock", "Good. Two jobs for your machine: a door counter, and store credit for my regulars.", "think") },
    { machine: ["a14-counter", "a14-account"] },
    { toy: "blueprint", goal: "Replay any recording to its last step." },
    say("byte", "Blueprints drawn. Gadgets built. Weekend almost here. BEEP BOOP.", "wow"),
    { sticker: true },
  ],
});
