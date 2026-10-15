/* A16. Mirrors Inside Mirrors: recursion, base case, recursive case, the call stack again.
   Toy: dollstack (TRACETOY, recursion in the call stack). */

PAGES("a16", [
  {
    h: "A function that calls itself",
    body: [
      "Ms. Gridlock's rocket kettle (a fictional gadget, and a very loud one) needs a launch clock. You could write a loop. This chapter does it a stranger way.",
      "A function that calls itself is [[recursion|recursive]]. In Think Python's countdown example, the function prints `n` and then calls itself with `n - 1`, and it prints `Blastoff!` once `n` is 0 or less [py-139]. Here is our shop version.",
      { code: "a16_countdown", out: true },
      "Read line 7 slowly. Inside `countdown`, there is a call to `countdown`. Python handles it like any other call: it pauses the current call, starts a fresh one with the new argument, and comes back when that one is done.",
      { analogy: "Think of nested dolls. Each doll holds a slightly smaller doll. You open one, find a smaller one, open that, and so on, until you reach the smallest doll, which holds nothing. Then you close them up again from the inside out." },
      { trace: "a16_countdown", label: "🔍 Watch the calls stack up" },
    ],
  },
  {
    h: "Base case and recursive case",
    body: [
      "Every recursive function has two parts. The CS50 notes name the first one: the [[base case]] is the condition that stops the recursion from going on forever [py-142]. In the countdown, the call with `n` equal to 0 is the base case [py-140].",
      "The second part is the [[recursive case]]: the branch that calls the function again on a smaller problem. Each call has to move closer to the base case, or the dolls never get smaller.",
      { h3: "Factorial" },
      "A classic example is factorial: 4 factorial is 4 × 3 × 2 × 1. It answers a shop question too: how many different ways can four gadgets stand in a row on the display shelf?",
      { code: "a16_factorial", out: true },
      { table: { head: ["Part", "In factorial", "In the dolls picture"], rows: [["Base case", "`if n == 1: return 1`", "the smallest doll, nothing inside"], ["Recursive case", "`return n * factorial(n - 1)`", "open this doll and hand the smaller one on"]] } },
      { nerd: "Where does the multiplying happen?", body: [
        "On the way back. `factorial(4)` cannot finish until `factorial(3)` returns, which waits for `factorial(2)`, which waits for `factorial(1)`. The base case returns 1, and then each waiting call multiplies and returns in turn: 2, then 6, then 24.",
      ] },
      { trace: "a16_factorial", label: "🔍 Watch the answers come back down" },
    ],
  },
  {
    h: "The tower of recipe cards, again",
    body: [
      "You met the call stack in Recipe Cards: every running call gets a frame with its own names, piled on top of the call that started it. Recursion makes the pile tall. In Think Python's stack diagram for the countdown there is one frame for each call [py-140].",
      { analogy: "The call stack is a tower of recipe cards in progress. `countdown(3)` puts a card on the tower. Its call to `countdown(2)` puts another card on top, and so on. Only the top card is being worked on. When it finishes, it comes off, and the card underneath carries on." },
      "That means four frames named `countdown` can exist at once, each with its own `n`. They do not get mixed up, because each frame keeps its own box labeled `n`.",
      { toy: "dollstack", label: "Open the Doll Stack" },
      { h3: "When the dolls never get smaller" },
      "If a recursion never reaches its base case, Python stops it with a `RecursionError` whose message says the maximum recursion depth was exceeded [py-141]. This countdown forgot its base case:",
      { code: "a16_forever", out: true },
      "The traceback is long but it repeats itself. Python summarized the repeats in one line, then printed the important part last: the kind of error and its message.",
    ],
  },
  {
    h: "Fibonacci and the cost of asking twice",
    body: [
      "In the Fibonacci numbers, each number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8 and on. The Python tutorial prints the ones below 10 with a `while` loop [py-067]. Recursion can write the rule almost word for word.",
      { code: "a16_fib", out: true },
      { trace: "a16_fib", label: "🔍 Watch fib() split into two calls" },
      "Pretty, but wasteful. `fib(4)` asks for `fib(3)` and `fib(2)`, and `fib(3)` asks for `fib(2)` all over again. Each call asks two more questions, and the same questions get asked many times. Here is a real count of the calls:",
      { code: "a16_fibcount", out: true },
      "Remember the last chapter: how does the effort grow as the pile grows? Here, adding 5 to `n` multiplies the calls by more than ten. A loop that walks from the bottom up does one step per number instead.",
      { honest: "The call counts are real: Python counted them when the site was built. The comparison with a loop is our own reasoning from those counts." },
      { machine: ["a16-total", "a16-kettle"], label: "Go to your machine: write two recursive functions" },
    ],
  },
]);

GLOSS({
  recursion: "A function calling itself [py-142]. Each call works on a smaller version of the problem until it reaches a base case.",
  "base case": "The condition that stops a recursion from going on forever [py-142]. In the countdown, the call with n equal to 0 [py-140].",
  "recursive case": "The branch of a recursive function that calls the function again on a smaller problem.",
}, "a16");

TRACETOY("dollstack", {
  title: "Doll Stack", level: "a16",
  short: "Recursion in the call stack: watch a frame pile up for every call, then come off again.",
  goal: "Step through a recording until the last frame comes off the stack.",
  programs: [["a16_countdown", "Countdown"], ["a16_factorial", "Factorial"], ["a16_fib", "Fibonacci"]],
  notes: {
    a16_countdown: "Each call to `countdown` adds a frame with its own `n`. Count the frames when `n` reaches 0: that is the base case.",
    a16_factorial: "Nothing gets multiplied until the base case returns 1. Watch the return values on the way back down.",
    a16_fib: "Every `fib` call above the base case makes two more calls. Watch `fib(2)` turn up more than once.",
  },
});

LEVEL({
  id: "a16", title: "Mirrors Inside Mirrors", job: "The rocket kettle needs a launch clock.",
  color: "#9b6bff", scene: "shop", cast: ["gridlock"], toy: "dollstack",
  sticker: { title: "Doll Opener", glyph: "f(f)", color: "#9b6bff" },
  goals: ["Write a function that calls itself", "Find the base case and the recursive case", "Read a RecursionError"],
  beats: [
    nar("Saturday, midday. The weekend rush slows down, and a strange whistling comes from the back."),
    say("gridlock", "{{you}}, the rocket kettle wants a launch clock: three, two, one, blastoff. The customer insists. Don't ask.", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "A loop would do it. But this is the perfect excuse for my favorite trick: a function that calls itself. That is [[recursion]] [py-139].", "wow") },
    say("nib", "Picture two mirrors facing each other. A picture inside a picture inside a picture. Or nested dolls, which are easier to carry around."),
    { predict: { program: "a16_countdown", q: "`countdown` prints `n`, then calls itself with `n - 1`. What does `countdown(3)` print?",
      choices: ["3\n2\n1\nBlastoff!", "3\n2\n1\n0\nBlastoff!", "Blastoff!\n1\n2\n3"], answer: 0,
      why: "When `n` reaches 0 the function takes the other branch and prints `Blastoff!` instead of the number [py-139]." } },
    { show: ["nib", "reader"], ...say("reader", "I had to start a fresh card on the tower for every call. Four cards named countdown, each with its own n. My clipboard was busy.") },
    { trace: { program: "a16_countdown", note: "Look at the frames on the right. A new `countdown()` frame appears for each call, and each has its own `n`." } },
    say("nib", "The call with `n` equal to 0 is the [[base case]] [py-140]: the smallest doll. It stops the recursion from going on forever [py-142]."),
    say("nib", "The other branch is the [[recursive case]]. It hands a smaller job to a fresh copy of the same function."),
    { ask: { q: "In `countdown`, what makes each call closer to the base case?", choices: ["It prints `n`", "It calls itself with `n - 1`", "It uses `if`"], answer: 1,
      why: "Each call passes a number one smaller, so the calls are bound to reach 0. The recursive case has to shrink the problem." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. Can a recursive function give back an answer too? Or only print things?", "think") },
    say("nib", "It can return answers. Factorial multiplies 4 × 3 × 2 × 1. That also counts the ways four gadgets can line up on the display shelf."),
    { predict: { program: "a16_factorial", q: "What does `factorial(4)` print?", choices: ["24", "10", "4"], answer: 0,
      why: "4 × 3 × 2 × 1 is 24. The multiplying happens on the way back, after the base case returns 1." } },
    { trace: { program: "a16_factorial", note: "Watch the return values: 1, then 2, then 6, then 24, as each frame comes off the stack." } },
    say("gridlock", "What if somebody forgets the base case? Asking for a friend. The friend is the kettle.", "think"),
    { predict: { program: "a16_forever", q: "This countdown has no base case. What happens when it runs?" } },
    { ask: { q: "What does a `RecursionError` tell you?", choices: ["The program ran out of disk space", "A recursion never reached its base case, and the call stack got too deep", "A loop ran forever"], answer: 1,
      why: "Python stops a recursion that never reaches its base case with a `RecursionError` that says the maximum recursion depth was exceeded [py-141]." } },
    say("nib", "One last mirror. Fibonacci: each number is the sum of the two before it. Recursion writes that rule almost word for word."),
    { predict: { program: "a16_fib", q: "`fib(n)` returns `n` for 0 and 1, and `fib(n - 1) + fib(n - 2)` above that. What is `fib(4)`?",
      choices: ["3", "4", "5"], answer: 0,
      why: "fib(0) to fib(4) go 0, 1, 1, 2, 3." } },
    { toy: "dollstack", goal: "Open the Fibonacci recording and step until the last frame comes off the stack." },
    say("nib", "Did you see `fib(2)` turn up twice? Recursion can repeat work. The book shows how fast the number of calls grows."),
    { book: 3, text: "The last page of the chapter counts the calls for you." },
    say("gridlock", "The kettle is whistling. Two jobs on the real computer: add up a bill with recursion, and give that kettle its countdown.", "think"),
    { machine: ["a16-total", "a16-kettle"] },
    say("byte", "Three. Two. One. TEA. BEEP BOOP."),
    { sticker: true },
  ],
});
