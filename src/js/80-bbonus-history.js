/* B-Bonus. Time Machine: a history of learning machines, from sourced facts only.
   The Module B time-machine events live in 91-time-b.js. */
// TODO(research): Turing (1950) has no open full text yet, so it is left out. Only the dated facts below appear.

PAGES("bbonus", [
  {
    h: "Machines that learn: 1958 and 1959",
    body: [
      "The Learning Bench has a long family tree. This chapter only tells the parts our sources back up, with a date on each.",
      "In 1958, Rosenblatt published an article in *Psychological Review* titled *The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain* [ml-098]. You met the [[perceptron]]'s famous limit in Little Brains: one unit cannot compute XOR [ml-084].",
      "In 1959, Samuel reported that a computer can be programmed to learn to play checkers better than the person who wrote the program, in about 8 or 10 hours of machine-playing time [ml-097].",
      { analogy: "Samuel's claim is the Quote Machine's whole idea in one sentence: the program's maker did not write the winning moves down. The program got better by playing." },
      { level: "b12", label: "Replay: Little Brains" },
    ],
  },
  {
    h: "Counting words, training networks",
    body: [
      "Between 1975 and 1985, Fred Jelinek and colleagues at IBM invented the term *language model* and developed n-gram language models [ml-089]. Your next-word machine in Maps and Next-Word Machines is a small n-gram model.",
      "Neural network training based on error backpropagation became widespread with Rumelhart et al. (1986) [ml-093].",
      "Jurafsky and Martin date the transformer architecture to 2017 (Vaswani et al.) and the rise of prompting to 2019 [ml-092].",
      "Here are those dates as a Python list of pairs, sorted by year.",
      { code: "bbonus_timeline", out: true },
      { trace: "bbonus_timeline", label: "🔍 Watch the list sort itself" },
      { honest: "The time machine in the toolbox holds these same events. Every one carries its source." },
      { machine: ["bbonus-timeline"], label: "Go to your machine: order the time machine" },
    ],
  },
]);

LEVEL({
  id: "bbonus", title: "Time Machine", job: "Byte found a box of old catalogs in the back office.",
  color: "#4f8a12", scene: "office", cast: ["byte"],
  sticker: { title: "Time Traveler", glyph: "1958", color: "#9be34a" },
  goals: ["Place five moments in the history of learning machines", "Say which source backs each one", "Sort events by year in Python"],
  beats: [
    say("byte", "BEEP. I found a box of old papers in the back office. Some are older than the shop. Some are older than the building. One is older than my grandparent toaster.", "wow"),
    { show: ["byte", "nib"], ...say("nib", "Ah, the family tree of the Learning Bench. Let's read only what we can cite. History is where confident nonsense loves to hide.") },
    say("nib", "1958: Rosenblatt's article *The Perceptron* appears in *Psychological Review* [ml-098]. That is the single unit you wired in Little Brains.", "think"),
    say("nib", "1959: Samuel reports that a computer can learn to play checkers better than the person who programmed it, in about 8 or 10 hours of play [ml-097].", "wow"),
    { ask: { q: "What made Samuel's checkers program a *learning* machine?", choices: ["It knew every winning move in advance", "It got better than its own programmer by playing", "It ran on a very fast computer"], answer: 1,
      why: "Samuel's paper reports the program learned to play better than the person who wrote it [ml-097]." } },
    { show: ["byte", "nib", "gridlock"], ...say("gridlock", "1958, 1959. Ancient. Did anyone predict the next word back then?") },
    say("nib", "Fred Jelinek's group at IBM did, between 1975 and 1985. They invented the term *language model* and built n-gram models [ml-089]. Your counting cabinet is their idea.", "think"),
    say("nib", "Training networks by error backpropagation became widespread with Rumelhart et al. in 1986 [ml-093]. Then the transformer in 2017, and the rise of prompting in 2019 [ml-092]."),
    { predict: { program: "bbonus_timeline", q: "The events start out of order. After `events.sort()`, which year comes first, and what is the span?", choices: ["1958 Rosenblatt's perceptron article\n1959 Samuel's checkers player\n1986 backpropagation becomes widespread\n2017 transformer architecture\n2019 the rise of prompting\nspan: 61 years", "2019 the rise of prompting\n2017 transformer architecture\n1986 backpropagation becomes widespread\n1959 Samuel's checkers player\n1958 Rosenblatt's perceptron article\nspan: 61 years", "1958 Rosenblatt's perceptron article\n1959 Samuel's checkers player\n1986 backpropagation becomes widespread\n2017 transformer architecture\n2019 the rise of prompting\nspan: 59 years"], answer: 0,
      why: "Tuples sort by their first item, the year, smallest first. 2019 minus 1958 is 61." } },
    { trace: { program: "bbonus_timeline", note: "Watch `events` before and after the sort." } },
    { ask: { q: "Which of these could go on the time machine?", choices: ["A date we remember from a podcast", "A date with a verified source", "A date that sounds about right"], answer: 1,
      why: "Every event on the time machine carries its source, or it stays off." } },
    { book: 1, text: "The book has both history pages and the sorted list." },
    say("gridlock", "Sort my catalogs too, while you are at it. On your own machine.", "think"),
    { machine: ["bbonus-timeline"] },
    say("byte", "History sorted. Toaster grandparent honored. BEEP BOOP."),
    { sticker: true },
  ],
});
