/* A8. The Filing Cabinet: dictionaries, keys and values, counting with a dict, tuples, sets.
   Toy: "cabinet", a JavaScript demo of looking things up by key. */

PAGES("a08", [
  {
    h: "Look it up by name",
    body: [
      "A list finds things by position. That works for a parts list. It works badly for customers. Nobody calls the shop and says *I am customer number 17*. They give a name.",
      "A [[dictionary]] maps [[key|keys]] to [[value|values]]; the Python glossary calls it an associative array [py-082]. You look a value up by its key, the way you pull a folder out of a cabinet by the name on its tab.",
      { code: "a08_cabinet", out: true },
      { analogy: "A dictionary is a filing cabinet. Each folder has a name on its tab (the key) and papers inside (the value). `phones[\"Dr. Nib\"]` means *pull the folder with this name on the tab and read what is inside*. `phones[\"Byte\"] = \"555-0199\"` files a new folder." },
      "Line 4 asks `\"Byte\" in phones`. With a dictionary, `in` tests whether a key is present [py-079]. Line 5 asks for a name that is not in the cabinet with `.get()`, and gets `None` back.",
      { trace: "a08_cabinet", label: "🔍 Watch the cabinet get a new folder" },
    ],
  },
  {
    h: "The missing folder",
    body: [
      "The Python tutorial's own phone-book example makes the point. Asking for a missing key with square brackets raises a `KeyError`, `get()` returns `None` instead, and `in` tests whether the key is present [py-079].",
      { code: "a08_missing", out: true },
      "The cabinet found Ms. Gridlock's folder and printed the number in it. Then the program asked for a folder that does not exist, and it stopped. The last line names the error and the missing key. The Bug Hunt job is all about reading messages like this one.",
      { h3: "Which keys are allowed?" },
      "Keys can be any [[immutable]] type, such as strings and numbers. Lists cannot be keys, because a list can be changed in place [py-078]. A folder tab that could rewrite itself would be no use in a cabinet.",
      { toy: "cabinet", label: "Open the Filing Cabinet" },
    ],
  },
  {
    h: "Counting with a cabinet",
    body: [
      "Dictionaries are great at tallies. Give each word its own folder, and keep a count inside.",
      { code: "a08_count", out: true },
      "For each word, the program checks `if word in counts`. If the folder already exists, it adds 1 to the count inside. If not, it files a new folder that starts at 1. Without that check, the very first word would cause a `KeyError` [py-079].",
      { trace: "a08_count", label: "🔍 Watch the tally grow" },
      "`note.split()` returns a list of the words in the string [py-159]. The loop then visits each word in turn.",
      { machine: ["a08-wordcount", "a08-phonebook"], label: "Go to your machine: word counter and phone book" },
    ],
  },
  {
    h: "Tuples: a sealed bundle",
    body: [
      "A [[tuple]] is an immutable sequence, written with commas, and it can be unpacked into several names [py-081]. Tuples sit on the glossary's list of immutable objects, next to numbers and strings [py-049].",
      { code: "a08_tuple", out: true },
      { analogy: "A tuple is a sealed parts bag with a fixed number of slots. You can read what is in it, and you can tip it out into separate boxes (`aisle, slot = shelf_spot`). You cannot swap a part inside the sealed bag." },
      "Use a tuple for a small bundle that belongs together and should not change, such as an aisle and a slot. Use a list for a collection that grows and shrinks.",
    ],
  },
  {
    h: "Sets: no repeats allowed",
    body: [
      "A [[set]] is an unordered collection with no duplicates [py-080]. Feed it a list with repeats, and each value is kept once.",
      { code: "a08_sets", out: true },
      "One catch: `{}` makes an empty *dictionary*. An empty set has to be made with `set()` [py-080]. The last two lines of output show the difference.",
      { honest: "We printed a set of small whole numbers on purpose. A set has no order [py-080], so do not rely on the order a set prints in." },
      { table: { head: ["Container", "Find things by", "Can change?", "Shop example"], rows: [
        ["list `[ ]`", "position", "yes", "today's parts order"],
        ["dictionary `{key: value}`", "key", "yes", "phone numbers by name"],
        ["tuple `( , )`", "position", "no [py-081]", "aisle and slot of one bin"],
        ["set `set()`", "membership (`in`)", "yes", "which bins came in today"],
      ] } },
      { honest: "The shop examples in this table are our own." },
    ],
  },
]);

GLOSS({
  dictionary: "An associative array that maps keys to values [py-082]. Our picture: a filing cabinet where each folder's tab is a key.",
  key: "The name you look a value up by in a dictionary. Keys can be any immutable type; lists cannot be keys [py-078].",
  value: "What a dictionary holds under a key: the papers inside the folder.",
  tuple: "An immutable sequence written with commas, such as `(\"aisle 3\", 2)`, that can be unpacked into several names [py-081].",
  set: "An unordered collection with no duplicates. `set()` makes an empty one, because `{}` is an empty dictionary [py-080].",
}, "a08");

TOY("cabinet", {
  title: "Filing Cabinet", level: "a08", color: "var(--tang)",
  short: "Pull folders out by key. See what happens when a folder is missing.",
  goal: "Ask for a name that is not in the cabinet, once with square brackets and once with get().",
  label: "A JavaScript demo of the idea, not Python code.",
  html: () => `
    <div class="cab-wrap">
      <div class="cab" aria-label="The cabinet's folders"></div>
      <div class="cab-ctl panel">
        <label class="cab-lab" for="cab-key">Name (the key)</label>
        <input id="cab-key" class="cab-in" type="text" maxlength="24" autocomplete="off" value="Mx. Sprocket" data-hint="Type a name to look up. Try one that is not in the cabinet.">
        <div class="cab-chips" aria-label="Names to try"></div>
        <div class="row">
          <button type="button" class="btn small sky" data-op="get" data-hint="Square brackets: open the folder, or stop with a KeyError if it is missing">phones[key]</button>
          <button type="button" class="btn small lime" data-op="safe" data-hint="get(): open the folder, or hand back None if it is missing">phones.get(key)</button>
          <button type="button" class="btn small plain" data-op="in" data-hint="in: is there a folder with this name? True or False">key in phones</button>
        </div>
        <label class="cab-lab" for="cab-val">Number (the value)</label>
        <input id="cab-val" class="cab-in" type="text" maxlength="16" autocomplete="off" value="555-0123" data-hint="A value to file under the name above">
        <div class="row">
          <button type="button" class="btn small tang" data-op="set" data-hint="File a new folder, or replace what is inside an existing one">phones[key] = value</button>
          <button type="button" class="btn small plain" data-op="reset" data-hint="Put the cabinet back the way it started">Reset</button>
        </div>
      </div>
    </div>
    <div class="cab-out" role="status" aria-live="polite"></div>`,
  init(root, ctx) {
    const START = [["Ms. Gridlock", "555-0100"], ["Dr. Nib", "555-0142"], ["Byte", "555-0199"]];
    let book = new Map(START);
    const tried = { get: false, safe: false };
    const cab = $(".cab", root), out = $(".cab-out", root), keyIn = $("#cab-key", root), valIn = $("#cab-val", root), chips = $(".cab-chips", root);
    const q = s => "'" + String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
    const draw = open => {
      cab.innerHTML = "";
      book.forEach((v, k) => cab.append(el("div.drawer" + (k === open ? ".open" : ""), {}, el("span.tab", {}, k), el("span.paper", {}, v))));
      chips.innerHTML = "";
      [...book.keys(), "Mx. Sprocket"].filter((k, i, a) => a.indexOf(k) === i).forEach(k =>
        chips.append(el("button.btn.small.plain", { type: "button", "data-hint": "Put this name in the key box", onclick: () => { keyIn.value = k; keyIn.focus(); } }, k)));
    };
    const say = (code, result, cls, note) => {
      out.innerHTML = "";
      out.append(el("div.cab-line", {}, el("code", {}, code)), el("div.cab-res" + (cls ? "." + cls : ""), {}, result));
      if (note) out.append(el("p.cab-note", { html: rich(note) }));
    };
    const check = () => { if (tried.get && tried.safe) ctx.goalDone("You saw both ways a missing key is handled."); };
    $$("button[data-op]", root).forEach(b => b.addEventListener("click", () => {
      const key = keyIn.value.trim(), op = b.dataset.op;
      if (op === "reset") { book = new Map(START); draw(); say("phones = {...}", "The cabinet is back to three folders.", ""); return; }
      if (!key) { say("", "Type a name in the key box first.", "bad"); return; }
      const has = book.has(key), code = `phones[${q(key)}]`;
      if (op === "get") {
        if (has) { draw(key); say(code, q(book.get(key)), "good"); }
        else { draw(); tried.get = true; say(code, `KeyError: ${q(key)}`, "bad", "No folder has that name, so square brackets stop the program with a `KeyError` [py-079]."); check(); }
      } else if (op === "safe") {
        draw(has ? key : null);
        say(`phones.get(${q(key)})`, has ? q(book.get(key)) : "None", has ? "good" : "", has ? "" : "No folder, so `get()` hands back `None` and the program carries on [py-079].");
        if (!has) { tried.safe = true; check(); }
      } else if (op === "in") {
        draw(has ? key : null);
        say(`${q(key)} in phones`, has ? "True" : "False", has ? "good" : "", "`in` checks the tabs for a key [py-079].");
      } else if (op === "set") {
        const val = valIn.value.trim();
        if (!val) { say("", "Type a number in the value box first.", "bad"); return; }
        const note = has ? "That key was already filed, so its value was replaced. Each key appears once." : "A new folder, filed under that key.";
        book.set(key, val); draw(key);
        say(`phones[${q(key)}] = ${q(val)}`, `${book.size} folders`, "good", note);
      }
    }));
    draw();
    say("phones = {...}", "Three folders. Look one up, or ask for one that is missing.", "");
  },
});

LEVEL({
  id: "a08", title: "The Filing Cabinet", job: "Customers are looked up by name, not by number.",
  color: "#ff8a1f", scene: "office", cast: ["gridlock"], toy: "cabinet",
  sticker: { title: "Cabinet Keeper", glyph: "{:}", color: "#ff8a1f" },
  goals: ["Look values up by key", "Count things with a dictionary", "Meet tuples and sets"],
  beats: [
    nar("Wednesday afternoon. The back-office phone rings. And rings."),
    say("gridlock", "{{you}}, a customer wants their radio. I have the number in a list somewhere. Position 17? 71? I need to find people by name.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Then a list is the wrong drawer. A [[dictionary]] maps [[key|keys]] to [[value|values]] [py-082]. You look things up by key, not by position.") },
    say("nib", "Picture a filing cabinet. The name on the folder's tab is the key. The papers inside are the value."),
    { predict: { program: "a08_cabinet", q: "Two folders, then a third is filed. What do the four `print` lines show?",
      choices: ["555-0142\nTrue\nNone\n3", "555-0142\nTrue\nKeyError\n3", "Dr. Nib\nByte\nNone\n2"], answer: 0,
      why: "`get()` returns `None` for a missing key, and `in` tests for a key [py-079]. Three folders means `len` is 3." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. My cabinet draws each folder as a key and a value. Watch me file Byte. That is me!", "wow") },
    { trace: { program: "a08_cabinet", note: "The dictionary appears under Objects. Each row is a key and its value." } },
    say("nib", "Now the missing folder. Square brackets on a missing key raise a `KeyError`. `get()` returns `None` instead [py-079].", "think"),
    { trace: { program: "a08_missing", note: "Step to the end. The last line shows the error." } },
    { ask: { q: "Which line is safe when `\"Mx. Sprocket\"` might not be in `phones`?", choices: ["`phones[\"Mx. Sprocket\"]`", "`phones.get(\"Mx. Sprocket\")`", "`phones[0]`"], answer: 1,
      why: "`get()` returns `None` for a missing key instead of stopping the program [py-079].",
      wrong: { 0: "Square brackets raise a `KeyError` when the key is missing.", 2: "Dictionaries look things up by key. `0` is just another key here, and it is missing too." } } },
    { toy: "cabinet", goal: "Ask for a name that is not in the cabinet, once with square brackets and once with get()." },
    say("gridlock", "While you are in there. Which part do customers complain about most? I have a pile of notes."),
    say("nib", "Counting is a dictionary's favorite job. One folder per word, and a tally inside. Check `in` first, so a new word gets a fresh folder."),
    { trace: { program: "a08_count", note: "Watch each word get its own key, and the tally go up." } },
    { ask: { q: "Can a list be a dictionary key?", choices: ["Yes, any value can be a key", "No, because a list can be changed in place", "Only if the list is empty"], answer: 1,
      why: "Keys can be any immutable type. Lists can be modified in place, so they cannot be keys [py-078]." } },
    { show: ["nib", "byte", "reader"], ...say("reader", "Two more containers for my clipboard. A [[tuple]] is a sealed bundle written with commas. You can unpack it into names [py-081], but you cannot change it.") },
    say("nib", "And a [[set]] keeps each value once, with no order [py-080]. One warning: `{}` is an empty dictionary. An empty set is `set()`.", "wow"),
    { predict: { program: "a08_sets", q: "Six bin numbers with repeats go into a set. What prints?" } },
    { book: 0, text: "The book has the whole chapter, including a table that compares lists, dictionaries, tuples and sets." },
    say("gridlock", "Right. On your own machine: count the words in a customer note, and build a phone book that does not crash on a stranger.", "think"),
    { machine: ["a08-wordcount", "a08-phonebook"] },
    say("byte", "Every folder filed. No more position 71. BEEP BOOP."),
    { sticker: true },
  ],
});
