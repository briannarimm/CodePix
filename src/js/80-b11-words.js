/* B11. Words as Numbers: tokens, word counts, n-grams, a text classifier. */

PAGES("b11", [
  {
    h: "Models only read numbers",
    body: [
      "The shop inbox is full of words: *my kettle leaks*, *toaster sparks*, *WIN A FREE CRUISE*. Every model in this module so far has eaten numbers. To learn from text, we first have to turn words into numbers.",
      "scikit-learn spells out the problem. Most machine learning algorithms expect numerical feature vectors of a fixed size, so raw text of variable length cannot be fed to them directly [ml-157]. One note has four words, the next has forty.",
      "Words make good clues. In Jurafsky and Martin's sentiment example, words such as *awesome* and *love* are informative features for a classifier [ml-080]. The simplest way to use them is to count them.",
      "scikit-learn's recipe has three moves. Tokenize the strings and give each possible token an integer id, for instance by splitting at white space and punctuation. Count how often each token occurs in each document. Then, if you like, normalize and weight the counts [ml-158].",
      "Our program does the first two moves in plain Python. First, [[tokenization]]: cut the note into words, make them lowercase, and strip the punctuation off the ends. Then count each word with a dictionary.",
      { code: "b11_tokens", out: true },
      { trace: "b11_tokens", label: "🔍 Watch the counts climb" },
      "The second line is a [[bag of words]]. scikit-learn calls the whole recipe (tokenizing, counting, normalizing) the Bag of Words representation. A collection of documents becomes a table with one row per document and one column per token, and the relative position of the words is ignored completely [ml-159]. *Toaster sings off key* and *key off sings toaster* give the same bag.",
      { analogy: "Tipping a note's words into a bag and shaking it. You can still count how many times *toast* fell in. You can no longer read the sentence." },
      { honest: "Our tokenizer is a simple one of our own: it splits at spaces and strips four punctuation marks. It keeps *don't* as one word, and a semicolon stays stuck to its word." },
    ],
  },
  {
    h: "Pairs of words: n-grams",
    body: [
      "A bag forgets order, and order carries meaning. A middle path is to count short runs of neighboring words. A run of two is a *bigram*, a run of three a *trigram*; in general an [[n-gram]].",
      "n-gram language models rest on one simplifying idea: instead of using a word's whole history, approximate the chance of the next word from only the last few words. This is called the Markov assumption [ml-088].",
      "Here is that idea with a history of one word. Which word tends to follow *the* in three fictional repair notes?",
      { code: "b11_bigrams", out: true },
      { trace: "b11_bigrams", label: "🔍 Watch the pairs being counted" },
      "*The* appears five times with a word after it, and two of those times the next word is *kettle*. So in these notes, after *the*, our program estimates *kettle* at 0.4. A next-word machine built this way would guess *kettle*.",
      "n-grams can overfit like any model. Jurafsky and Martin show that higher-order n-gram models copy their training text more closely; a 4-gram model trained on Shakespeare reproduces a line from *King John* [ml-053].",
      { toy: "wordcounts", label: "Open the Word Counter" },
    ],
  },
  {
    h: "The trouble with zero",
    body: [
      "Our three notes never say *the toaster*. That is a perfectly sensible pair. It just has not happened yet.",
      "Jurafsky and Martin say any finite training corpus will be missing some perfectly acceptable word sequences. So an n-gram can show up in the test text without ever occurring in training. Their example is the phrase *ruby slippers* [ml-161].",
      "They call these unseen sequences *zeros*, and they explain why zeros hurt. If the probability of any word in the test set is 0, the probability of the whole test set is 0 [ml-162]. One unseen pair sinks the whole sentence.",
      "The plainest fix is [[add-one smoothing]]. Laplace smoothing adds one to each count, which is why it is also called add-one smoothing [ml-163]. Our program adds one to every pair's count. Then it divides by a bigger total (the old total plus one for each word in the vocabulary) so the chances still add up to 1.",
      { code: "b11_smoothing", out: true },
      "Before smoothing, *the toaster* gets 0.00, and so does the whole note *the toaster sparks*. After smoothing, both get a small chance. *the kettle* drops from 0.40 to 0.18 to pay for it: the extra counts have to come from somewhere.",
      { analogy: "Before sorting a delivery of bolts, drop one spare bolt in every bin on the wall. No bin is ever empty, and the bins that were already full barely notice." },
      "The same trick hides in the inbox sorter on the next page: its `alpha = 1` setting is Laplace smoothing [ml-079].",
      "Add-one is simple, and it is blunt. Zhang and colleagues, in their open deep learning textbook, say many plausible three-word combinations will never appear in a dataset, and unless they get a nonzero count a language model cannot use them [ml-164]. They also say Laplace smoothing suits language modeling poorly, because many n-grams occur very rarely [ml-165].",
      { honest: "Our notes and counts are fictional and tiny. This book stops at add-one smoothing." },
    ],
  },
  {
    h: "Sorting the inbox",
    body: [
      "Now put word counts to work. scikit-learn's `MultinomialNB` is a classic naive Bayes text classifier, its inputs are word-count vectors, and its smoothing setting `alpha = 1` is called Laplace smoothing [ml-079]. scikit-learn also says naive Bayes has worked well for spam filtering [ml-068].",
      "Our program builds the word counts with scikit-learn's `CountVectorizer`, then trains on eight fictional messages: four real repair jobs and four junk.",
      { code: "b11_spam", out: true },
      "The vocabulary line is the number of different words across all eight messages. The long row of numbers is the first message as counts, one slot per vocabulary word: mostly zeros, because one short message uses only a few of the words.",
      "That gets more extreme with real text. Because each document uses only a small subset of the corpus's words, a bag-of-words table is mostly zeros, typically more than 99% of its values [ml-160]. In Code Pix we call a table like that [[sparse]].",
      "Then the two new messages. *my lamp flickers please fix* is judged a job: *my*, *please* and *fix* all appeared in jobs. *free clock repair click now* is judged junk even though it mentions a clock repair, because *free*, *click* and *now* only ever appeared in junk. A classifier is only as wise as its examples.",
      { honest: "Eight messages is a toy data set. A real filter learns from far more, and it still makes mistakes, which is why the Scorekeeping job matters." },
      { machine: ["b11-wordcount"], label: "Go to your machine: count words and pairs" },
    ],
  },
]);

GLOSS({
  tokenization: "Cutting text into tokens and giving each possible token an integer id, for instance by splitting at white space and punctuation. [ml-158]",
  "bag of words": "Tokenize, count and normalize: a collection of documents becomes a table with one row per document and one column per token, and word positions are ignored completely. [ml-159]",
  sparse: "Mostly zeros. (Our own plain-words definition.) A bag-of-words table is typically more than 99% zeros. [ml-160]",
  "add-one smoothing": "Adding one to each count, so no pair has a count of zero. Also called Laplace smoothing. [ml-163]",
  "n-gram": "A run of n neighboring words. n-gram models guess the next word from only the last few words. [ml-088]",
}, "b11");

TOY("wordcounts", {
  title: "Word Counter", level: "b11", color: "var(--grape)",
  short: "Count the words, or the word pairs, in a repair note.",
  goal: "Show the word pairs for a note where some pair appears twice.",
  label: "A JavaScript demo of the idea, not Python code. The notes are fictional.",
  html: () => `<div class="row notes">${["Kettle hums. The kettle lid sticks and the kettle leaks.", "Radio crackles, radio hisses, radio sings off key.", "Win a free toaster! Click now! Free toaster for you!"].map((n, i) => `<button type="button" class="btn small plain" data-note="${i}" data-hint="Load fictional note ${i + 1}">Note ${i + 1}</button>`).join("")}</div>
    <textarea rows="3" aria-label="Your note" data-hint="Type or paste your own note here" spellcheck="false"></textarea>
    <div class="row modes"><button type="button" class="btn small sky" data-mode="1" data-hint="Count single words (a bag of words)">Words</button><button type="button" class="btn small plain" data-mode="2" data-hint="Count pairs of neighboring words (bigrams)">Pairs</button></div>
    <ol class="bars" aria-live="polite"></ol>`,
  init(root, ctx) {
    const NOTES = ["Kettle hums. The kettle lid sticks and the kettle leaks.", "Radio crackles, radio hisses, radio sings off key.", "Win a free toaster! Click now! Free toaster for you!"];
    const ta = $("textarea", root), bars = $(".bars", root);
    let mode = 1;
    ta.value = NOTES[0];
    const draw = () => {
      const words = ta.value.toLowerCase().split(/\s+/).map(w => w.replace(/^[.,!?;:"'()]+|[.,!?;:"'()]+$/g, "")).filter(Boolean);
      const counts = new Map();
      const items = mode === 1 ? words : words.slice(1).map((w, i) => words[i] + " " + w);
      items.forEach(w => counts.set(w, (counts.get(w) || 0) + 1));
      const rows = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 12);
      const top = rows.length ? rows[0][1] : 1;
      bars.innerHTML = rows.length ? rows.map(([w, n]) => `<li><span class="w">${esc(w)}</span><span class="bar" style="width:${Math.max(8, n / top * 100)}%"><b>${n}</b></span></li>`).join("") : "<li>Type a note to count its words.</li>";
      if (mode === 2 && rows.length && rows[0][1] >= 2) ctx.goalDone();
    };
    $$(".notes button", root).forEach(b => b.addEventListener("click", () => { ta.value = NOTES[+b.dataset.note]; draw(); }));
    $$(".modes button", root).forEach(b => b.addEventListener("click", () => {
      mode = +b.dataset.mode;
      $$(".modes button", root).forEach(x => { x.classList.toggle("sky", x === b); x.classList.toggle("plain", x !== b); });
      draw();
    }));
    ta.addEventListener("input", draw);
    draw();
  },
});

LEVEL({
  id: "b11", title: "Words as Numbers", job: "Sort the shop inbox into repair jobs and junk.",
  color: "#ffe45c", scene: "bench", cast: ["gridlock"], toy: "wordcounts",
  sticker: { title: "Word Counter", glyph: "abc", color: "#ffe45c" },
  goals: ["Turn a note into word counts", "Count word pairs and smooth away a zero", "Train a tiny junk filter"],
  beats: [
    say("gridlock", "{{you}}, the shop inbox has two hundred messages. Half are repair jobs. Half are people offering me free cruises. I want the bench to sort them.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Words! Lovely. One problem: every model we have built eats numbers. So first we turn words into numbers. The simplest way is to count them.") },
    say("nib", "Words make good clues. In Jurafsky and Martin's sentiment example, words like *awesome* and *love* are informative features [ml-080]. In our inbox, I suspect *free* and *click* will be."),
    { show: ["nib", "byte"], ...say("byte", "BEEP. Step one, I chop the note into words. Lowercase, no punctuation. I call it chopping. Dr. Nib calls it [[tokenization]].", "wow") },
    { predict: { program: "b11_tokens", q: "Byte chops and counts: *Toaster sings off key. Toaster smells of toast, and the toast is burnt.* How many times does `toaster` appear in the counts?" } },
    { trace: { program: "b11_tokens", note: "Watch `counts` gain a new key for each new word, and a bigger number for a repeat." } },
    say("nib", "That dictionary of counts is a [[bag of words]]: the counts survive, the order does not. *Toaster sings* and *sings toaster* go into the same bag.", "think"),
    { ask: { q: "Which two notes give exactly the same bag of words?", choices: ["*lid sticks* and *sticks lid*", "*lid sticks* and *lid stuck*", "*the lid* and *a lid*"], answer: 0,
      why: "A bag keeps each word and its count and throws the order away, so the same words in a different order make the same bag." } },
    say("byte", "But order matters! *The toaster burnt the bread* and *the bread burnt the toaster* are very different tickets. BEEP!"),
    say("nib", "Then count pairs of neighbors as well. A run of n words is an [[n-gram]]. n-gram models guess the next word from just the last few words, which is called the Markov assumption [ml-088]."),
    { predict: { program: "b11_bigrams", q: "In three fictional notes, which word most often follows *the*?", choices: ["the dial 1 of 5 = 0.2\nthe kettle 2 of 5 = 0.4\nthe lid 1 of 5 = 0.2\nthe radio 1 of 5 = 0.2", "the kettle 3 of 3 = 1.0", "the dial 1 of 4 = 0.25\nthe kettle 1 of 4 = 0.25\nthe lid 1 of 4 = 0.25\nthe radio 1 of 4 = 0.25"], answer: 0,
      why: "*the kettle* appears in the first and third notes, so it wins two of the five pairs that start with *the*." } },
    { show: ["nib", "byte"], ...say("byte", "Problem. Nobody ever wrote *the toaster* in these notes. So my chance for it is zero. A toaster is a real thing! BEEP!", "think") },
    say("nib", "Jurafsky and Martin call those unseen pairs *zeros*. If any word in the test text gets probability 0, the whole test text gets 0 [ml-162]. The plain fix: add one to every count [ml-163]."),
    { predict: { program: "b11_smoothing", q: "Before smoothing, *the toaster* has a count of 0. After adding one to every count, what happens to *the kettle*, which had 0.40?", choices: ["different words: 12\nthe kettle: plain 0.40, add-one 0.18\nthe toaster: plain 0.00, add-one 0.06\n'the toaster sparks': plain 0.000, add-one 0.009", "different words: 12\nthe kettle: plain 0.40, add-one 0.40\nthe toaster: plain 0.00, add-one 0.06\n'the toaster sparks': plain 0.000, add-one 0.009", "different words: 12\nthe kettle: plain 0.40, add-one 0.60\nthe toaster: plain 0.00, add-one 0.06\n'the toaster sparks': plain 0.000, add-one 0.009"], answer: 0,
      why: "Every pair got one extra count, so the total grew from 5 to 17. *the kettle* goes from 2 of 5 to 3 of 17, about 0.18. The unseen pairs' small share comes out of the seen ones." } },
    { toy: "wordcounts", goal: "Show the word pairs for a note where some pair appears twice." },
    { show: ["nib", "gridlock"], ...say("gridlock", "Counting is very nice. When does my inbox get sorted?", "think") },
    say("nib", "Now. scikit-learn's `MultinomialNB` is a classic text classifier that takes word counts as input [ml-079]. It is naive Bayes again, and scikit-learn says naive Bayes has worked well for spam filtering [ml-068]."),
    { predict: { program: "b11_spam", q: "Byte learns from four repair jobs and four junk messages. Then two new ones arrive: *free clock repair click now* and *my lamp flickers please fix*. How will they be sorted?" } },
    { ask: { q: "Why was *free clock repair click now* sorted as junk?", choices: ["*free*, *click* and *now* only appeared in junk messages", "Messages that mention a clock are always junk", "The model reads the words in order"], answer: 0,
      why: "The model only sees counts. Three of the five words were junk words in the training messages, and *repair* alone could not outvote them." } },
    { ask: { q: "In `MultinomialNB(alpha=1.0)`, what is `alpha = 1`?", choices: ["Laplace smoothing", "The number of classes", "The learning rate"], answer: 0,
      why: "scikit-learn says alpha is the smoothing parameter, and alpha = 1 is Laplace smoothing [ml-079]." } },
    { ask: { q: "A bag-of-words table for a thousand shop emails would be mostly what?", choices: ["Zeros", "Ones", "Negative numbers"], answer: 0,
      why: "Each email uses only a few of all the words, so most slots are 0. scikit-learn says typically more than 99% [ml-160]." } },
    { book: 3, text: "The book's last page explains every line of the inbox sorter's output." },
    say("gridlock", "A free cruise offer just got sorted into junk. I have never been happier. {{you}}: write the counter yourself on your own machine.", "wow"),
    { machine: ["b11-wordcount"] },
    say("byte", "Bag of words: sticker 1, earned 1, BEEP 2. BOOP 1."),
    { sticker: true },
  ],
});
