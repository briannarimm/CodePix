/* A9. Recipe Cards: def, parameters and arguments, return, defaults, keyword arguments, scope,
   docstrings and the call stack. Toy: "callstack", the Call Stack Tower (recorded traces). */

PAGES("a09", [
  {
    h: "Write the steps once",
    body: [
      "Every repair at Gadget Gulch ends with the same sum: hours times the hourly rate. Typing that sum again in every program is how mistakes creep in. A [[function]] lets you write the steps once, give them a name, and use them whenever you like.",
      "The keyword `def` introduces a function definition, and the first statement of the body can be a [[docstring]] [py-083].",
      { code: "a09_recipe", out: true },
      { analogy: "A function is a recipe card. The `def` line is the title and the list of ingredients. The indented lines are the steps. Writing the card cooks nothing. Calling `labor_cost(2)` takes the card down and follows it with 2 as the ingredient." },
      { h3: "Parameters and arguments" },
      "Two words that people mix up. A [[parameter]] is a named entity in a function definition that says which argument the function can accept. An [[argument]] is the value passed to a function when you call it [py-090]. In `def labor_cost(hours, rate=30)`, `hours` and `rate` are parameters. In `labor_cost(2, 45)`, the 2 and the 45 are arguments.",
      "Arguments can also be passed by keyword, by naming the parameter in the call, as in the tutorial's `parrot(voltage=1000000, action='VOOOOOM')` [py-088]. Line 7 of the program does that with `hours=3, rate=20`.",
      "`rate=30` gives the parameter a default value. The output shows the result: when the call leaves `rate` out, the function uses 30.",
      { trace: "a09_recipe", label: "🔍 Watch the card get followed three times" },
    ],
  },
  {
    h: "Handing back a result",
    body: [
      "The line `return hours * rate` works out a value and hands it back to whoever called the function. That value is the call's [[return value]]. `print(labor_cost(2))` prints it, and `cost = labor_cost(2)` would store it in a box.",
      "What if a function has no `return` line at all? The tutorial says that functions without a `return` statement still return a value, a rather boring one called `None` [py-084].",
      { code: "a09_noreturn", out: true },
      "`greet` printed its welcome. Printing is something the function *does*; it is not something it *hands back*. So `answer` holds `None`. When a test says a function returned `None`, a missing `return` is the first thing to check.",
      { h3: "Docstrings" },
      "A docstring's first line should be a short, concise summary, and Python keeps the docstring in the function's `__doc__` attribute [py-089]. The last line of the first program printed it. A one-line summary on every card also helps the next person who reads your code, and that person is often you.",
    ],
  },
  {
    h: "The tower of recipe cards",
    body: [
      "Functions can call other functions. `paint_cost` below calls `area` partway through its own steps. Python has to remember where it was in `paint_cost` while it follows `area`.",
      { code: "a09_stack", out: true },
      { analogy: "Picture a tower of recipe cards in progress. Calling `paint_cost` puts its card on the table. Partway down, it says *now follow the area card*, so the area card goes on top. When `area` returns, its card comes off, and you carry on with `paint_cost` exactly where you left off." },
      "That tower is the [[call stack]]. Each card in it is a [[frame]]: one call in progress, with its own boxes for its parameters and other names. The Magnifier draws one frame per call, stacked from the main program at the top of the list to the newest call at the bottom.",
      { trace: "a09_stack", label: "🔍 Watch the frames stack up and clear" },
      { honest: "The steps were recorded from real Python. The tower picture is our simplified model of what Python keeps track of." },
      { toy: "callstack", label: "Open the Call Stack Tower" },
    ],
  },
  {
    h: "Whose box is it?",
    body: [
      "Names made inside a function live in that function's frame. That region of the program where a name can be seen is its [[scope]].",
      "When Python looks up a name, it checks the local scope first, then any enclosing functions, then the global names, and then the built-in names. A function can read a global variable, but it cannot assign to one without a `global` declaration [py-085].",
      { code: "a09_scope", out: true },
      "`quote` found `extra` in its own frame and `rate` among the global names. When the call ended, its frame went away, and `extra` with it. `rate` was still 30 at the end.",
      { trace: "a09_scope", label: "🔍 Watch which frame each name lives in" },
      { nerd: "Why reading globals is fine and changing them is rare", body: [
        "A function that only uses its parameters and returns a result is easy to test: the same arguments always give the same answer. A function that quietly changes global names is harder to reason about. That is house advice, and the tests in the exercises follow it.",
      ] },
    ],
  },
  {
    h: "The shared tray",
    body: [
      "Here is a famous trap. A default value is evaluated only once, so a [[mutable]] default such as a list is shared between calls. The tutorial's own example prints `[1]`, then `[1, 2]`, then `[1, 2, 3]` [py-086]. Our shop version does the same.",
      { code: "a09_default", out: true },
      { analogy: "The default `tray=[]` is one physical tray, made when Python read the `def` line. Every call that leaves `tray` out grabs that same tray, which still has the last customer's parts on it." },
      "The tutorial's fix is to default to `None` and make the new list inside the function [py-087].",
      { code: "a09_fixed", out: true },
      { trace: "a09_default", label: "🔍 Watch three calls share one tray" },
      { machine: ["a09-helpers", "a09-tray"], label: "Go to your machine: write three functions and fix the tray" },
    ],
  },
]);

GLOSS({
  function: "A named set of steps you define once with `def` and run by calling it. Our picture: a recipe card. [py-083]",
  parameter: "A named entity in a function definition that specifies an argument the function can accept [py-090]. In `def area(width, height)`, `width` and `height` are parameters.",
  argument: "A value passed to a function when calling it [py-090]. In `area(3, 4)`, 3 and 4 are arguments.",
  "return value": "The value a function call hands back with `return`. A function with no `return` statement returns `None` [py-084].",
  scope: "The part of a program where a name can be seen. Python looks a name up in the local scope, then enclosing functions, then globals, then built-ins [py-085].",
  "call stack": "The tower of function calls that are in progress. The newest call sits on top and finishes first; then Python carries on with the call underneath.",
  frame: "One function call in progress, with its own names and values. Each call gets a new frame on the call stack.",
  docstring: "A string written as the first statement of a function's body [py-083]. Its first line is a short summary, and Python keeps it in `__doc__` [py-089].",
}, "a09");

TRACETOY("callstack", {
  title: "Call Stack Tower", level: "a09",
  short: "Recipe cards stack up as functions call functions, then clear as they return.",
  goal: "Step through a recording to the very end.",
  programs: [["a09_stack", "A card calls a card"], ["a09_recipe", "One card, three calls"], ["a09_scope", "Local and global names"], ["a09_default", "The shared tray"]],
  notes: {
    a09_stack: "Watch the Names panel. A new frame appears for each call and disappears when it returns.",
    a09_recipe: "Each call gets a fresh frame. Look at `rate` in each one.",
    a09_scope: "`extra` lives in the `quote` frame. `rate` lives in the main program.",
    a09_default: "Watch the color tag on `tray`. All three calls point at the same list.",
  },
});

LEVEL({
  id: "a09", title: "Recipe Cards", job: "Repair steps repeat. Write each one once.",
  color: "#9be34a", scene: "shop", cast: ["gridlock"], toy: "callstack",
  sticker: { title: "Recipe Writer", glyph: "def", color: "#9be34a" },
  goals: ["Define and call a function", "Return a value", "Watch the call stack"],
  beats: [
    nar("Thursday morning. Ms. Gridlock is holding three invoices and a calculator with a dent in it."),
    say("gridlock", "{{you}}, every invoice has the same sum: hours times thirty. The helper has that sum copied into nine programs, and two of the copies are wrong.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Then write it once and give it a name. That is a [[function]]. `def` starts the definition, and the first line of the body can be a [[docstring]] that says what it does [py-083].") },
    say("nib", "Think of a recipe card. Writing the card cooks nothing. Calling the function follows the card."),
    { predict: { program: "a09_recipe", q: "`labor_cost` has a default rate of 30. What do the four `print` lines show?" } },
    say("nib", "Vocabulary check. `hours` in the `def` line is a [[parameter]]. The 2 you pass in a call is an [[argument]] [py-090]. You can also name them in the call, as in `rate=20` [py-088].", "think"),
    { ask: { q: "In `labor_cost(2, 45)`, what is 45?", choices: ["a parameter", "an argument", "a docstring"], answer: 1,
      why: "An argument is a value passed to a function when calling it. The parameter is the name in the definition, `rate` [py-090]." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. What if my function just prints and never says `return`?", "think") },
    say("nib", "Then it still hands something back: `None`. The tutorial calls it a rather boring value [py-084]."),
    { predict: { program: "a09_noreturn", q: "`greet` prints a welcome but has no `return` line. What prints?",
      choices: ["Welcome to the shop, Byte\nWelcome to the shop, Byte", "Welcome to the shop, Byte\nNone", "None"], answer: 1,
      why: "The function printed its line, then handed back `None`, which went into `answer` [py-084]." } },
    { show: ["nib", "byte", "reader"], ...say("reader", "When one card calls another, I put the new card on top of the pile and keep my place on the old one. That pile is the [[call stack]]. Each card is a [[frame]].") },
    { trace: { program: "a09_stack", note: "Watch the Names panel grow a frame for `paint_cost`, then one for `area`, then shrink again." } },
    { ask: { q: "`paint_cost` calls `area`. Which call finishes first?", choices: ["`paint_cost`, because it started first", "`area`, because it is on top of the stack", "They finish at the same time"], answer: 1,
      why: "The newest card on the tower finishes first. Then `paint_cost` carries on from where it paused." } },
    say("nib", "Names made inside a function live in its frame. Python looks a name up locally first, then in enclosing functions, then globals, then built-ins [py-085]. That is [[scope]].", "think"),
    { trace: { program: "a09_scope", note: "`extra` appears only in the `quote` frame and vanishes when the call returns." } },
    say("gridlock", "Byte wrote a function that puts parts on a tray. Every customer is getting everybody's parts.", "wow"),
    say("nib", "Ah. The famous one. A default value is made only once, so a list default is shared between calls [py-086]."),
    { predict: { program: "a09_default", q: "Three calls, each without a tray. What prints?",
      choices: ["['gear']\n['fuse']\n['bolt']", "['gear']\n['gear', 'fuse']\n['gear', 'fuse', 'bolt']", "['bolt']\n['bolt']\n['bolt']"], answer: 1,
      why: "All three calls used the one list made when `def` ran [py-086]. The fix: default to `None` and make the list inside [py-087]." } },
    { book: 2, text: "The book has the whole chapter. This page shows the tower of recipe cards; the last page shows the shared-tray fix." },
    say("gridlock", "On your machine, then. Three small helpers, and fix that tray before another customer gets a stranger's gears.", "think"),
    { machine: ["a09-helpers", "a09-tray"] },
    { toy: "callstack", goal: "Replay any recording to its last step." },
    say("byte", "One recipe card, nine programs, zero wrong copies. BEEP BOOP.", "wow"),
    { sticker: true },
  ],
});
