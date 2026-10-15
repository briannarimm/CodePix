/* A2. Bits and Bytes: bits, bytes, binary, ASCII and Unicode, bin/int/ord/chr. Monday afternoon. */

/* A row of eight switches with their place values, for the book. */
function a02SwitchesFig(bits) {
  let s = "";
  const vals = [128, 64, 32, 16, 8, 4, 2, 1];
  vals.forEach((v, i) => {
    const on = bits[i] === "1", x = 10 + i * 58;
    s += `<rect x="${x}" y="10" width="46" height="70" rx="8" fill="${on ? "#ffe45c" : "#d9dde2"}" stroke="#141414" stroke-width="3"/>`;
    s += `<rect x="${x + 12}" y="${on ? 18 : 46}" width="22" height="26" rx="4" fill="${on ? "#ff8a1f" : "#9aa3ad"}" stroke="#141414" stroke-width="2.5"/>`;
    s += `<text x="${x + 23}" y="104" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="20" font-weight="700" fill="#141414">${bits[i]}</text>`;
    s += `<text x="${x + 23}" y="128" text-anchor="middle" font-family="Comic Neue, sans-serif" font-size="15" fill="#3b3b3b">${v}</text>`;
  });
  return `<svg viewBox="0 0 476 140" role="img" aria-label="Eight switches showing ${bits}: place values 128 down to 1">${s}</svg>`;
}

PAGES("a02", [
  {
    h: "Light switches",
    body: [
      "Deep down, the shop's computers only know two things: off and on. A [[bit]] is a zero or a one, meaning off or on, and computers store bits using transistors that act as switches [py-034].",
      { analogy: "Picture a row of light switches on the workshop wall. Each switch is one bit. One switch can only say two things. A row of them can say a lot more." },
      "Computers generally use eight bits, called a [[byte]], to represent a number [py-036]. Three switches can count as high as seven, and eight can count as high as 255, which is `11111111` [py-035].",
      { fig: () => a02SwitchesFig("11111111"), cap: "All eight switches on: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255." },
      { toy: "bitboard", label: "Open the Bit Board and flip some switches" },
    ],
  },
  {
    h: "Counting in binary",
    body: [
      "Writing numbers with only 0 and 1 is called [[binary]], or base 2. Each switch has a place value, and each one is worth double the one to its right: 1, 2, 4, 8 and so on up to 128 [py-035]. To read a pattern, add up the place values of the switches that are on.",
      { fig: () => a02SwitchesFig("01000001"), cap: "01000001: the 64 switch and the 1 switch are on, so the number is 64 + 1 = 65." },
      "Python can do the conversions for you. `bin(3)` returns the string `'0b11'` [py-038]. Going the other way, `int('01110011', base=2)` reads a base-2 string and gives 115 [py-039].",
      { code: "a02_bits", out: true },
      { trace: "a02_bits", label: "🔍 Watch each conversion" },
      { analogy: "Base 10 is how you count money: ones, tens, hundreds. Base 2 is the same idea with switches: ones, twos, fours, eights. Same trick, fewer fingers." },
    ],
  },
  {
    h: "Letters are numbers",
    body: [
      "If everything is switches, how does a computer store the letter A? By agreeing on a number for it. In [[ASCII]], people decided that capital A maps to 65, which is `01000001` in binary [py-037].",
      "Python has two tools for this. `ord()` gives the code number of a one-character string, and `chr()` goes the other way [py-040].",
      { code: "a02_letters", out: true },
      { trace: "a02_letters", label: "🔍 Watch letters turn into numbers" },
      { nerd: "Look closely at the output", body: [
        "Capital A is 65 and small a is 97. They are different characters, so they get different numbers.",
      ] },
      { machine: ["a02-decode", "a02-toaster"], label: "Go to your machine: decode some switches" },
    ],
  },
  {
    h: "Beyond ASCII: Unicode",
    body: [
      "English letters are only a few of the characters people write. [[Unicode]] gives every character an integer [[code point]], from 0 up to `0x10FFFF` [py-041]. Python's `ord()` returns that Unicode code point [py-040].",
      "Storing a code point takes one or more bytes, and the rule for turning code points into bytes is called an encoding. In UTF-8, code points below 128 become one byte with the same value, and larger code points become two, three or four bytes [py-042]. This program counts the bytes for four characters, from a plain A to a wrench emoji.",
      { code: "a02_utf8", out: true },
      { h3: "Why Code Pix always says encoding=\"utf-8\"" },
      "When you read or write a text file, Python has to pick an encoding. The Python 3.15 tutorial says that if you give none, the default is UTF-8 [py-104]. In the Python 3.9 documentation, the default depends on the platform [py-154]. So every program in this book that opens a file names its encoding, so the answer never depends on which computer runs it.",
      { honest: "The emoji and accented letters above are only examples. The output is what real Python printed when the site was built." },
    ],
  },
]);

GLOSS({
  bit: "A zero or a one, meaning off or on. Computers store bits with transistors that act as switches. [py-034]",
  byte: "Eight bits. Computers generally use a byte to represent a number. [py-036]",
  binary: "Writing numbers with only 0 and 1 (base 2). Eight binary digits can count as high as 255. [py-035]",
  ASCII: "An agreed list that gives characters numbers. In ASCII, capital A is 65, or 01000001 in binary. [py-037]",
  Unicode: "The standard that gives every character an integer code point, from 0 to 0x10FFFF. [py-041]",
  "code point": "The number Unicode gives a character. `ord()` returns it and `chr()` turns it back into a character. [py-040] [py-041]",
}, "a02");

/* Bit Board toy: eight switches, the number they make and the character with that code point. */
TOY("bitboard", {
  title: "Bit Board", level: "a02", color: "var(--tang)",
  short: "Flip eight light switches and see the number and the letter they make.",
  goal: "Make the number 65, the letter A.",
  label: "A JavaScript demo of the idea, not Python code.",
  html: () => `<div class="bb-wrap">
      <div class="bb-row" role="group" aria-label="Eight switches"></div>
      <div class="bb-read panel" aria-live="polite">
        <div><span class="bb-k">Binary</span><b class="bb-bin"></b></div>
        <div><span class="bb-k">Number</span><b class="bb-num"></b></div>
        <div><span class="bb-k">Code point as a character</span><b class="bb-chr"></b></div>
      </div>
      <p class="bb-sum"></p>
      <div class="row bb-tools">
        <label class="bb-type">Type a letter <input type="text" maxlength="1" class="bb-in" aria-label="Type one character" data-hint="Type one character to see its switches (code points up to 255 fit in eight switches)"></label>
        <button type="button" class="btn small plain bb-clear" data-hint="Turn every switch off">All off</button>
        <button type="button" class="btn small plain bb-all" data-hint="Turn every switch on">All on</button>
      </div>
      <p class="bb-msg" aria-live="polite"></p>
    </div>`,
  init(root, ctx) {
    const vals = [128, 64, 32, 16, 8, 4, 2, 1];
    let n = 0;
    const row = $(".bb-row", root), msg = $(".bb-msg", root);
    const btns = vals.map(v => {
      const b = el("button.bb-sw", { type: "button", "aria-pressed": "false", "data-hint": `The ${v} switch: tap to flip it`, "aria-label": `Switch worth ${v}` },
        el("span.bb-bulb", { "aria-hidden": "true" }), el("span.bb-lever", { "aria-hidden": "true" }), el("span.bb-v", {}, String(v)));
      b.onclick = () => { n ^= v; draw(); };
      row.append(b);
      return b;
    });
    const name = c => {
      if (c === 32) return "(a space)";
      if (c < 32 || (c >= 127 && c < 160)) return "(a control character, no picture)";
      if (c === 160) return "(a no-break space)";
      return "'" + String.fromCharCode(c) + "'";
    };
    const draw = () => {
      btns.forEach((b, i) => { const on = !!(n & vals[i]); b.classList.toggle("on", on); b.setAttribute("aria-pressed", on ? "true" : "false"); });
      const bits = n.toString(2).padStart(8, "0");
      $(".bb-bin", root).textContent = bits;
      $(".bb-num", root).textContent = String(n);
      $(".bb-chr", root).textContent = name(n);
      const parts = vals.filter(v => n & v);
      $(".bb-sum", root).textContent = parts.length ? parts.join(" + ") + " = " + n : "Every switch is off: 0.";
      if (n === 65) ctx.goalDone("65 is capital A in ASCII. Now try 97, or type a letter in the box.");
    };
    const inp = $(".bb-in", root);
    inp.addEventListener("input", () => {
      const ch = inp.value;
      if (!ch) return;
      const c = ch.codePointAt(0);
      if (c > 255) { msg.textContent = `That character's code point is ${c}, too big for eight switches. It needs more than one byte.`; return; }
      msg.textContent = "";
      n = c; draw();
    });
    $(".bb-clear", root).onclick = () => { n = 0; msg.textContent = ""; draw(); };
    $(".bb-all", root).onclick = () => { n = 255; msg.textContent = "All eight on: 255, the most one byte can count to."; draw(); };
    draw();
  },
});

LEVEL({
  id: "a02", title: "Bits and Bytes", job: "The talking toaster only understands switches.",
  color: "#ff8a1f", scene: "shop", cast: ["gridlock"], toy: "bitboard",
  sticker: { title: "Switch Flipper", glyph: "01", color: "#ff8a1f" },
  goals: ["Read a number in binary", "Know what a bit and a byte are", "Turn letters into numbers and back"],
  beats: [
    say("gridlock", "{{you}}, the talking toaster is blinking at me again. Eight little lights, on and off. The manual says it is talking. I say it is mocking me.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "It is talking. Computers, toasters included, store everything as switches. A [[bit]] is a zero or a one, off or on, stored by transistors acting as switches [py-034].") },
    say("nib", "Eight bits together make a [[byte]]. Computers generally use a byte to represent a number [py-036].", "think"),
    { show: ["nib", "byte"], ...say("byte", "BEEP. Each switch has a value: 1, 2, 4, 8, 16, 32, 64, 128. Add up the ones that are on. That is the number.", "wow") },
    { ask: { q: "Three switches are all on: `111`. What number is that?", choices: ["3", "7", "111"], answer: 1,
      why: "4 + 2 + 1 = 7. Three switches can count as high as seven [py-035]." } },
    { toy: "bitboard", goal: "Make the number 65, the letter A." },
    say("nib", "With all eight switches on you get `11111111`, which is 255, the most eight bits can count to [py-035]."),
    { ask: { q: "What is the largest number one byte (eight bits) can hold?", choices: ["8", "128", "255", "256"], answer: 2,
      why: "128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255 [py-035]. Counting starts at 0, so that is 256 different values in all." } },
    say("nib", "This way of writing numbers is [[binary]]. Python can convert both ways. `bin(3)` gives `'0b11'` [py-038], and `int(..., base=2)` reads a binary string back [py-039]."),
    { predict: { program: "a02_bits", q: "Five conversions. What does Python print?", choices: ["11\n1000001\n7\n255\n65", "0b11\n0b1000001\n7\n255\n65", "0b11\n0b1000001\n3\n8\n2"], answer: 1,
      why: "`bin()` returns a string that starts with `0b` [py-038]. `int(..., base=2)` turns the switch pattern into a number [py-039]." } },
    { trace: { program: "a02_bits", note: "Each line is one conversion. Watch the output grow." } },
    { show: ["nib", "byte", "reader"], ...say("reader", "So how does the toaster say a letter? Somebody agreed on a number for every letter. I just look it up on my clipboard.") },
    say("nib", "That agreement is [[ASCII]]. In ASCII, capital A is 65, which is `01000001` [py-037]. Python's `ord()` and `chr()` convert between a character and its number [py-040]."),
    { predict: { program: "a02_letters", q: "What does this program print?", choices: ["A\n66\na\n0b1000001", "65\nB\n97\n0b1000001", "65\nB\n65\n0b1000001"], answer: 1,
      why: "`ord(\"A\")` is 65 [py-037]. `chr(66)` is the next letter, B. Small a is a different character, with its own number [py-040]." } },
    { ask: { q: "Which function turns `'A'` into its number?", choices: ["`chr('A')`", "`ord('A')`", "`bin('A')`"], answer: 1,
      why: "`ord()` gives the code point of a one-character string, and `chr()` is its inverse [py-040]." } },
    say("nib", "The world writes in far more than English letters. [[Unicode]] gives every character in the world's writing a [[code point]], from 0 up to `0x10FFFF` [py-041]. In UTF-8, big code points take two to four bytes [py-042].", "wow"),
    say("byte", "Which is why my wrench emoji costs four bytes and the letter A costs one. Emoji are expensive. BEEP."),
    { book: 2, text: "The book has the place-value pictures, the Unicode page and why every file this book opens says `encoding=\"utf-8\"`." },
    say("gridlock", "Lovely. Now decode what the toaster is actually saying. If it is rude, I want to know.", "think"),
    { machine: ["a02-decode", "a02-toaster"], text: "Predict four conversions, then decode the toaster's message." },
    { show: ["gridlock", "byte"], ...say("byte", "The toaster says HOT. It was a warning, not an insult. Probably. BEEP BOOP.", "wow") },
    { sticker: true },
  ],
});
