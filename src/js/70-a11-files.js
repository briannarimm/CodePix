/* A11. The Mail Room: files, encodings, split/join, csv, json. Thursday, last job of the day. */

/* Show a file that a recorded program wrote (gen_traces keeps small text files as DATA.programs[id].files). */
function a11Written(pid, name) {
  const p = DATA.programs[pid] || {};
  const text = (p.files || {})[name];
  return `<div class="out" style="text-align:left"><div class="bar">The file ${esc(name)}, as the program left it</div><pre>${esc(text == null ? "(this file was not recorded)" : text)}</pre>` +
    `<div class="note">Recorded from real Python ${esc(p.python || "?")} when the site was built.</div></div>`;
}

PAGES("a11", [
  {
    h: "Letters in, letters out",
    body: [
      "Until now, everything a program knew vanished when it stopped. A [[file]] fixes that. Programs can read what another program wrote yesterday, and leave notes for tomorrow.",
      "`open(filename, mode)` returns a file object. Mode `'r'` reads, `'w'` writes and erases, and `'a'` appends [py-101]. When you loop over a file object, Python reads it line by line [py-103].",
      { code: "a11_read", out: true },
      { analogy: "Picture the shop's mail room. `open` unlocks the mail bag. The `for` loop takes out one letter at a time, in order. When the `with` block ends, the bag is closed and locked again, even if you dropped a letter on the way." },
      "That last part is the job of `with`: it closes the file automatically, even if an exception occurs [py-102]. The program's last line checks, and real Python answers `True`.",
      { trace: "a11_read", label: "🔍 Watch the letters come out one by one" },
      { nerd: "Where did the line breaks go?", body: [
        "Each line read from a file still ends with its new-line mark, written `\\n`. You can see it in the Magnifier: the box called `line` shows it on the end. The program calls `line.strip()` before printing, so the output has no blank lines between letters.",
      ] },
    ],
  },
  {
    h: "Name the encoding, every time",
    body: [
      "A file on disk holds bytes. Text needs a rule that turns characters into bytes and back: an [[encoding]]. In [[UTF-8]], code points below 128 become one byte with the same value, and larger code points become two, three or four bytes [py-042].",
      "Here is the catch. The Python 3.15 tutorial says that if you give no encoding for a text file, the default is UTF-8 [py-104]. The Python 3.9 documentation says the default there is platform dependent [py-154]. The same program could read a file one way on one computer and another way on the next.",
      { honest: "Our house rule: every `open()` in this book says `encoding=\"utf-8\"`. Then the answer never depends on which Python or which computer runs the program." },
      { h3: "Where Python looks for the file" },
      "`open(\"a11_letters.txt\", ...)` gives a bare file name. A path that does not start with `/` is relative to the current working directory [py-005]. So run your programs from the folder that holds their files. In a path, `.` means the current directory and `..` means its parent [py-004].",
      { analogy: "A bare file name is like saying \"the letter on the counter\". It only works if you are standing in the right room." },
      "When Python cannot find the file, it raises `FileNotFoundError`, which means a file or directory was requested but does not exist [py-199]. Here one letter of the name is wrong:",
      { code: "a11_lost", out: true },
      "`Opening the mail bag...` printed, and then the `open` line stopped the program. The last line names the file Python looked for. Compare it, letter by letter, with the name you meant. If the name is right, check where you are: `pwd` prints the working directory and `ls` lists what is in it [py-003].",
    ],
  },
  {
    h: "Writing your own files",
    body: [
      "Writing uses the same `open`, with a different mode. `f.write(string)` puts a string into the file [py-103]. Mode `'w'` starts the file fresh and erases what was there; mode `'a'` adds to the end [py-101].",
      { code: "a11_write", out: true },
      "The program wrote three lines with `'w'`, came back with `'a'` to add a fourth, and then read the whole file back. Here is the file it left behind:",
      { fig: () => a11Written("a11_write", "a11_log.txt"), cap: "The real file, saved when the site was built." },
      "`write` adds no line break of its own. That is why each call ends its text with `\"\\n\"`.",
      { trace: "a11_write", label: "🔍 Watch the log being written" },
    ],
  },
  {
    h: "Splitting and joining",
    body: [
      "Much of the mail is one long line of text with separators in it. `str.split(sep)` returns a list of the pieces, using `sep` as the delimiter. `str.join(iterable)` does the reverse: it glues strings together [py-159].",
      { code: "a11_split", out: true },
      "Notice who does the joining. The glue, `\" + \"`, comes first, and the list of pieces goes inside the parentheses.",
      { analogy: "`split` is a letter opener: one envelope in, a stack of pages out. `join` is the stapler: pages in, one bundle out, with the staple (your separator) between each page." },
    ],
  },
  {
    h: "CSV: a table made of text",
    body: [
      "Ms. Gridlock's parts list is a [[CSV]] file. It is plain text: a header row, then one row per part, with commas between the values. Here is the file exactly as it sits on disk:",
      { out: "a11_peek" },
      "You could split each line at the commas yourself. The `csv` module does it more carefully. `csv.reader` processes the lines of a CSV file, and the file you give it should be opened with `newline=''` [py-161]. `csv.DictReader` works like a regular reader but turns each row into a dictionary whose keys come from the header [py-162].",
      { code: "a11_csv", out: true },
      { trace: "a11_csv", label: "🔍 Watch each row become a dictionary" },
      { nerd: "Why int() and float()?", body: [
        "In the Magnifier, look inside a `row`. Every value is in quotes: `'12'`, `'2.50'`. The csv module hands you text, the same text that was in the file. Text cannot be multiplied as a price, so the program turns `qty` into a whole number with `int()` and `price_each` into a decimal with `float()`.",
      ] },
    ],
  },
  {
    h: "JSON: save a whole structure",
    body: [
      "Some mail is more complicated than a table: an order card with a list of parts inside a dictionary. [[JSON]] saves a whole structure like that. `json.dump(x, f)` writes an object to a text file, and `json.load(f)` reads it back [py-105].",
      { code: "a11_json", out: true },
      "And here is the file `json.dump` wrote:",
      { fig: () => a11Written("a11_json", "a11_order.json"), cap: "The real file. Compare it with the dictionary in the program." },
      "Look closely and the file is not quite Python. It says `false` in lower case, and every string has double quotes. Yet the last line of output says `True`: the dictionary that came back equals the one that went in.",
      { machine: ["a11-report"], label: "Go to your machine: count the shelf, write a report" },
    ],
  },
]);

GLOSS({
  file: "A named store of data on a disk. `open(filename, mode)` gives you a file object to read or write it with. [py-101]",
  encoding: "The rule that turns text into bytes and back. Python 3.9 picks a platform-dependent default [py-154], so this book names `encoding=\"utf-8\"` in every `open()`.",
  "UTF-8": "An encoding. Code points below 128 become one byte with the same value; larger ones become two, three or four bytes. [py-042]",
  CSV: "A text file of rows, with commas between the values. `csv.reader` processes its lines; open the file with `newline=''`. [py-161]",
  JSON: "A text format for whole structures such as dictionaries and lists. `json.dump(x, f)` writes one to a file and `json.load(f)` reads it back. [py-105]",
}, "a11");

TRACETOY("mailroom", {
  title: "Mail Room", level: "a11",
  short: "Files read and written line by line, recorded from real Python.",
  goal: "Step through one recording to the very end.",
  programs: [["a11_read", "Read the mail bag"], ["a11_write", "Write a work log"], ["a11_csv", "Rows from a CSV"], ["a11_json", "Save an order card"]],
  notes: {
    a11_read: "Watch the box called `line`. Each pass of the loop takes the next letter out of the bag.",
    a11_write: "The file itself is not drawn here. Watch the steps that call `log.write`, then the lines coming back out.",
    a11_csv: "Each `row` is a new dictionary. Its values are text, in quotes, until `int()` and `float()` convert them.",
    a11_json: "`order` and `back` are two different dictionaries (different colors) that hold the same things.",
  },
});

LEVEL({
  id: "a11", title: "The Mail Room", job: "Letters, parts lists and order cards need sorting.",
  color: "#5cc8ff", scene: "shop", cast: ["gridlock"], toy: "mailroom",
  sticker: { title: "Mail Sorter", glyph: "f.w", color: "#5cc8ff" },
  goals: ["Read a file line by line with `with open`", "Write and append to a file", "Read a CSV and save JSON"],
  beats: [
    nar("Thursday, late afternoon. A sack of mail thumps onto the counter. Then another."),
    say("gridlock", "{{you}}, the mail room is drowning. Letters, parts lists, order cards. I need the helper to read files and write them. Before closing time, ideally.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Files are the shop's memory. `open(filename, mode)` hands you a [[file]] object, and mode `'r'` reads it [py-101]. Looping over it gives you one line at a time [py-103].") },
    say("nib", "Wrap it in `with`. The file closes itself when the block ends, even if something goes wrong [py-102]. And always name the [[encoding]]. Always.", "think"),
    { predict: { program: "a11_read", q: "The mail bag file holds three letters, one per line. What will this program print?",
      choices: [
        "Letter: Dear shop, my toaster sings at night.\nLetter: Please fix the kettle's whistle.\nLetter: The radio only hums in B flat.\nIs the bag closed now? False",
        "Letter: Dear shop, my toaster sings at night.\nLetter: Please fix the kettle's whistle.\nLetter: The radio only hums in B flat.\nIs the bag closed now? True",
        "Letter: Dear shop, my toaster sings at night.\nIs the bag closed now? True",
      ], answer: 1,
      why: "The loop runs once per line, so all three letters come out. By the last line the `with` block has ended, so the bag is closed [py-102]." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. I will open the bag slowly so you can watch.", "wow") },
    { trace: { program: "a11_read", note: "Watch the box called `line`. It still ends in `\\n`, the new-line mark. The printed letters do not, thanks to `strip()`." } },
    { ask: { q: "What does the `with` block do for you?", choices: ["It reads the whole file at once", "It closes the file when the block ends, even after an error", "It picks the encoding for you"], answer: 1,
      why: "Using `with` closes the file automatically, even if an exception occurs [py-102]. The encoding is still your job." } },
    say("nib", "Writing is the same door, different mode. `'w'` writes and erases what was there. `'a'` adds to the end [py-101]. `f.write(text)` puts the text in [py-103]."),
    { ask: { q: "`log.txt` already holds 50 lines. You open it with mode `'w'` and write one line. How many lines does it hold now?", choices: ["51", "1", "50"], answer: 1,
      why: "Mode `'w'` writes and erases [py-101]. To keep the 50 lines and add one, use `'a'`." } },
    { trace: { program: "a11_write", note: "Three lines go in with `'w'`, one more with `'a'`, then the whole log comes back out." } },
    { show: ["gridlock", "byte"], ...say("gridlock", "Next, the parts list. Someone typed it with commas everywhere. Make sense of it.", "think") },
    { show: ["nib", "byte"], ...say("nib", "Commas are separators. `split` cuts text at a separator and gives you a list. `join` glues pieces back together [py-159].") },
    { predict: { program: "a11_split", q: "A delivery note arrives as one line of text. What will this print?" } },
    say("nib", "For a whole [[CSV]] file, let the csv module do the careful work. `csv.DictReader` turns each row into a dictionary keyed by the header [py-162]. Open the file with `newline=''` [py-161].", "think"),
    { trace: { program: "a11_csv", note: "Each `row` is a dictionary. Its values are text, in quotes, until `int()` and `float()` convert them." } },
    { ask: { q: "In the recording, `row[\"qty\"]` holds `'12'`, in quotes. Why does the program call `int()` on it?", choices: ["To turn the text into a number it can multiply", "To close the CSV file", "To skip the header row"], answer: 0,
      why: "The csv module hands you the text from the file. `int('12')` turns it into the number 12, and `float('2.50')` does the same for prices." } },
    say("byte", "And the order cards? They have lists inside dictionaries. My circuits are worried. BEEP?", "wow"),
    say("nib", "That is a job for [[JSON]]. `json.dump(x, f)` writes a whole structure to a text file. `json.load(f)` reads it back [py-105]."),
    { predict: { program: "a11_json", q: "The order card goes into a file and comes back out. What will this print?" } },
    { book: 0, text: "The book has the whole chapter, including the files the programs wrote." },
    { show: ["gridlock", "nib"], ...say("gridlock", "Lovely. Now the real shelf. Count every part in the list and leave a report file on my desk.", "think") },
    { machine: ["a11-report"] },
    { toy: "mailroom", goal: "Replay any recording to its last step." },
    say("byte", "Mail sorted. Files filed. Thursday done. BEEP BOOP.", "wow"),
    { sticker: true },
  ],
});
