/* A15. Find It Fast: linear and binary search, Big O, sorting, timing.
   Toys: racetrack (search race) and sortdance (sorting with counters). Both are JavaScript demos. */

PAGES("a15", [
  {
    h: "Two ways to find a part",
    body: [
      "Saturday morning, a customer asks for part 640. The stockroom has hundreds of drawers. How do you find the right one, and how long will it take?",
      "The plain way is a [[linear search]]. The CS50 notes picture a row of doors: you open them from left to right, and you stop with a yes as soon as the number is behind one, or end with a no when none of them has it [py-131].",
      "The CS50 notes define an [[algorithm]] as a step-by-step set of instructions to solve a problem, and [[pseudocode]] as human-readable instructions that often describe an algorithm's steps [py-226]. The row of doors above is pseudocode in plain English. Python turns it into something a computer can run.",
      "Here is a linear search in Python. It also counts its looks, so we can measure the work.",
      { code: "a15_linear", out: true },
      "Each answer is a pair: where the part was, and how many bins the search opened. The zipper is not on the shelf, so the search had to open every bin before it could say no.",
      { trace: "a15_linear", label: "🔍 Watch the search open each bin" },
      { h3: "The clever way" },
      "A [[binary search]] looks behind the middle door first, then searches only the left half or the right half [py-132]. It sets half the shelf aside with every look. There is a catch: it needs the data to be sorted [py-132].",
      { code: "a15_binary", out: true },
      { analogy: "Find a name in a shuffled pile of invoices and you have to read them one by one. Find it in an alphabetized pile and you can open the middle, see that you went too far, and set half the pile aside. The alphabetizing is what makes the shortcut safe." },
      { trace: "a15_binary", label: "🔍 Watch low, mid and high close in" },
    ],
  },
  {
    h: "How effort grows as the pile grows",
    body: [
      "Computer scientists describe the cost of an [[algorithm]] with [[Big O]] notation. Big O describes how running time grows with the size of the input. Linear search is O(n) and binary search is O(log n) [py-133].",
      "Read O(n) as: double the pile, double the work. O(log n) grows much more slowly. Here is the real count of looks for a part that is not on the shelf, from piles of ten up to one million.",
      { code: "a15_growth", out: true },
      { analogy: "Big O is how effort grows as the pile grows. It ignores small stuff, such as how fast your hands are. It asks one question: when the pile gets ten times bigger, what happens to the work?" },
      { table: { head: ["Pile gets...", "Linear search (O(n))", "Binary search (O(log n))"], rows: [["twice as big", "about twice the looks", "one more look"], ["ten times as big", "about ten times the looks", "a few more looks"]] } },
      { honest: "The table rows are our own reading of the recorded counts above. The counts themselves are real: Python ran both searches on every pile when the site was built." },
      { toy: "racetrack", label: "Open the Race Track" },
    ],
  },
  {
    h: "Putting things in order",
    body: [
      "Binary search needs a sorted shelf, so [[sorting]] matters. There are many ways to sort, and they do very different amounts of work. One honest way to measure the work is a [[comparison count]]: how many times the algorithm asks \"is this one bigger than that one?\"",
      { h3: "Selection sort" },
      "Selection sort finds the smallest item, then the next smallest, and so on. For n items it takes (n-1) + (n-2) + ... + 1 steps, which is n(n-1)/2, so it is O(n^2) [py-134]. Double the pile and the work roughly quadruples.",
      { h3: "Bubble sort" },
      "Bubble sort walks along the shelf and swaps neighbors that are in the wrong order, so the larger items bubble toward the end. It quits when a whole pass makes no swaps [py-135].",
      { code: "a15_bubble", out: true },
      { trace: "a15_bubble", label: "🔍 Watch the prices bubble" },
      { h3: "Insertion sort" },
      "[[Insertion sort]] keeps a sorted part at the low end of the list and inserts each new item into it, so the sorted part grows by one item each time [py-253]. On each pass it checks the current item against the sorted part. Items greater than it shift one place to the right, until it meets a smaller item or the end of the sorted part [py-254].",
      { analogy: "Picture sorting a stack of invoices into a neat pile on your left. Pick up the next invoice, slide it into the pile at the right spot, pick up the next. The pile on the left is always in order. It just keeps getting taller." },
      { code: "a15_insertion", out: true },
      { trace: "a15_insertion", label: "🔍 Watch each price slide into place" },
      "How much work is that? It depends on the shelf. The most comparisons insertion sort can need is the sum of the first n-1 integers, which is O(n^2). The best case is a list that is already sorted: one comparison on each pass [py-255].",
      { code: "a15_insertion_growth", out: true },
      "The *in order* column is the best case: one less than the shelf size, one comparison per pass. The *reverse order* column makes every price slide all the way to the front. For 100 items that is 1 + 2 + ... + 99, which is 4,950. Double the shelf from 1,000 to 2,000 and the reverse count roughly quadruples. That is O(n^2) in action.",
      { honest: "These counts were recorded from real Python when the site was built. A comparison count is the same on every machine, so you will get the same numbers." },
      { h3: "Merge sort" },
      "Merge sort splits the numbers down the middle, sorts each half, and then merges the two sorted halves. It runs in O(n log n) [py-136], which beats O(n^2) by a wide margin on a big pile.",
      "The merge step is the clever part. Two sorted piles become one: look at the top of each pile and take the smaller one, again and again.",
      { code: "a15_merge", out: true },
      { trace: "a15_merge", label: "🔍 Watch two piles merge" },
      { nerd: "How does it sort each half?", body: [
        "With the same method: split the half, sort its halves, merge. That is a function that calls itself. The next chapter, Mirrors Inside Mirrors, is all about that idea.",
      ] },
      { toy: "sortdance", label: "Open the Sort Dance" },
    ],
  },
  {
    h: "Let Python sort for you",
    body: [
      "You will rarely write a sort by hand. Python's `sorted()` returns a new sorted list [py-107]. It takes `key` and `reverse` as keyword arguments, and it is guaranteed to be stable [py-109].",
      { code: "a15_sorted", out: true },
      "Look at the second line of output. `sorted()` left the original list alone. A list also has its own `sort()` method, and methods like `sort` change the list in place and return `None` [py-074].",
      { analogy: "`sorted(parts)` copies your shopping list onto a fresh card in order. `parts.sort()` rearranges the card you already have, and hands you nothing back." },
    ],
  },
  {
    h: "Timing your code",
    body: [
      "Counting looks is one way to measure. The other is a stopwatch. `python -m timeit` times a statement from the command line [py-137]. On a Mac this book types `python3`, the same command VS Code uses there [py-024]:",
      { term: [["python3 -m timeit \"sorted([5, 2, 4, 1])\"", "Times one statement and prints how long it took."]], title: "Terminal" },
      "Any one timing can be thrown off by whatever else your computer is busy with. The `timeit` documentation advises taking the minimum of repeated timings as the best estimate [py-138].",
      { honest: "Code Pix shows no recorded times anywhere. A time depends on the computer and on the moment, so a number from our build machine would mislead you. Counts of looks and comparisons stay the same on every machine, which is why the book uses them." },
      { machine: ["a15-cheap", "a15-race"], label: "Go to your machine: search and time it" },
    ],
  },
]);

GLOSS({
  algorithm: "A step-by-step set of instructions to solve a problem [py-226]. Written exactly enough, a very literal helper can follow it.",
  pseudocode: "Human-readable instructions that often describe an algorithm's steps [py-226].",
  "insertion sort": "A sort that keeps a sorted part at the low end of the list and inserts each new item into it [py-253]. At most O(n^2) comparisons; one per pass on a list that is already sorted [py-255].",
  "linear search": "Checking items one at a time from the start until you find the one you want or run out [py-131]. It is O(n) [py-133].",
  "binary search": "Looking at the middle item and then searching only the left or right half. It needs sorted data [py-132] and is O(log n) [py-133].",
  sorting: "Putting items in order, such as smallest to largest. Python's `sorted()` returns a new sorted list [py-107].",
  "big o": "A way to describe how running time grows with the size of the input, such as O(n) or O(log n) [py-133]. Our picture: how effort grows as the pile grows.",
  "comparison count": "How many times an algorithm compares two items. Code Pix uses it to measure work, because it does not depend on how fast your computer is.",
}, "a15");

/* ---------- Toy: Race Track (linear vs binary search, counting real looks) ---------- */
TOY("racetrack", {
  title: "Race Track", level: "a15", color: "var(--tang)", wide: true,
  short: "Linear search and binary search race to find a part. Every look is counted.",
  goal: "On the 256-drawer shelf, race both searches for the same part.",
  label: "A JavaScript demo of the idea, not Python code. The look counts come from this demo's own code.",
  html: () => `
    <div class="row rt-sizes" role="group" aria-label="Shelf size">
      <span class="rt-lab">Shelf:</span>
      <button type="button" class="btn small plain" data-n="16" data-hint="Use a shelf of 16 drawers">16</button>
      <button type="button" class="btn small plain" data-n="64" data-hint="Use a shelf of 64 drawers">64</button>
      <button type="button" class="btn small plain" data-n="256" data-hint="Use a shelf of 256 drawers">256</button>
      <label class="rt-shuf" data-hint="Mix up the shelf to see what happens to binary search on unsorted data"><input type="checkbox" class="rt-mix" data-hint="Mix up the shelf"> Unsorted shelf</label>
    </div>
    <div class="row">
      <button type="button" class="btn small lemon rt-pick" data-hint="Pick a part that is on the shelf">🎯 Random part</button>
      <button type="button" class="btn small plain rt-miss" data-hint="Pick a part number that is not on the shelf">🚫 Missing part</button>
      <span class="rt-target" role="status"></span>
    </div>
    <div class="rt-shelf" aria-label="The shelf of drawers. Tap a drawer to look for its part."></div>
    <div class="row">
      <button type="button" class="btn tang rt-lin" data-hint="Run a linear search: open drawers from left to right">Linear search ▶</button>
      <button type="button" class="btn sky rt-bin" data-hint="Run a binary search: open the middle drawer, then set half aside">Binary search ▶</button>
    </div>
    <p class="rt-say" role="status"></p>
    <table class="rt-board"><thead><tr><th>Shelf</th><th>Part</th><th>Linear looks</th><th>Binary looks</th></tr></thead><tbody></tbody></table>`,
  init(root, ctx) {
    const shelfBox = $(".rt-shelf", root), say = $(".rt-say", root), tgt = $(".rt-target", root), tbody = $(".rt-board tbody", root), mix = $(".rt-mix", root);
    let n = 16, shelf = [], target = null, busy = 0, results = {};
    const build = () => {
      shelf = []; let v = 100;
      for (let k = 0; k < n; k++) { v += 2 + Math.floor(Math.random() * 6); shelf.push(v); }
      if (mix.checked) for (let k = n - 1; k > 0; k--) { const r = Math.floor(Math.random() * (k + 1)); [shelf[k], shelf[r]] = [shelf[r], shelf[k]]; }
      shelfBox.className = "rt-shelf n" + n;
      shelfBox.innerHTML = shelf.map((x, k) => `<button type="button" class="rt-d" data-k="${k}" data-hint="Look for part ${x}">${n <= 64 ? x : ""}</button>`).join("");
      $$(".rt-sizes [data-n]", root).forEach(b => { b.classList.toggle("sky", +b.dataset.n === n); b.classList.toggle("plain", +b.dataset.n !== n); });
      setTarget(shelf[Math.floor(Math.random() * n)]);
    };
    const setTarget = t => { busy++; target = t; tgt.innerHTML = rich(`Looking for part **${t}**`); clear(); say.textContent = "Pick a search to start the race."; };
    const clear = () => $$(".rt-d", shelfBox).forEach(d => d.classList.remove("rt-look", "rt-out", "rt-hit"));
    const cell = k => shelfBox.children[k];
    const pause = ms => reducedMotion() ? Promise.resolve() : new Promise(r => setTimeout(r, ms));
    const record = (kind, looks) => {
      const key = n + ":" + target + (mix.checked ? ":mixed" : "");
      const row = results[key] = results[key] || { n, target, mixed: mix.checked };
      row[kind] = looks;
      tbody.innerHTML = Object.values(results).slice(-6).reverse().map(r => `<tr><td>${r.n}${r.mixed ? " (mixed)" : ""}</td><td>${r.target}</td><td>${r.lin == null ? "" : r.lin}</td><td>${r.bin == null ? "" : r.bin}</td></tr>`).join("");
      if (r256(row)) ctx.goalDone("Same part, same shelf: compare the two look counts in the table.");
    };
    const r256 = row => row.n === 256 && !row.mixed && row.lin != null && row.bin != null;
    const run = async kind => {
      const my = ++busy; clear();
      const delay = kind === "lin" ? (n <= 16 ? 160 : n <= 64 ? 45 : 12) : 380;
      let looks = 0, found = -1;
      if (kind === "lin") {
        for (let k = 0; k < n; k++) {
          looks++; cell(k).classList.add("rt-look");
          say.textContent = `Linear search: look ${looks}, drawer ${k + 1} holds ${shelf[k]}.`;
          if (shelf[k] === target) { found = k; break; }
          await pause(delay); if (my !== busy) return;
        }
      } else {
        let lo = 0, hi = n - 1;
        while (lo <= hi) {
          const mid = Math.floor((lo + hi) / 2);
          looks++; cell(mid).classList.add("rt-look");
          say.textContent = `Binary search: look ${looks}, the middle drawer holds ${shelf[mid]}.`;
          if (shelf[mid] === target) { found = mid; break; }
          if (shelf[mid] < target) { for (let k = lo; k <= mid; k++) cell(k).classList.add("rt-out"); lo = mid + 1; }
          else { for (let k = mid; k <= hi; k++) cell(k).classList.add("rt-out"); hi = mid - 1; }
          await pause(delay); if (my !== busy) return;
        }
      }
      if (found >= 0) cell(found).classList.add("rt-hit");
      const name = kind === "lin" ? "Linear search" : "Binary search";
      say.innerHTML = rich(found >= 0 ? `${name} found part ${target} after **${looks}** look${looks === 1 ? "" : "s"}.` : `${name} gave up after **${looks}** look${looks === 1 ? "" : "s"}: part ${target} is not on the shelf.`) +
        (kind === "bin" && mix.checked ? " " + rich("The shelf is mixed up, so binary search can set aside the half that holds the part. It needs sorted data [py-132].") : "");
      record(kind, looks);
    };
    $$(".rt-sizes [data-n]", root).forEach(b => b.addEventListener("click", () => { n = +b.dataset.n; build(); }));
    mix.addEventListener("change", build);
    $(".rt-pick", root).addEventListener("click", () => setTarget(shelf[Math.floor(Math.random() * n)]));
    $(".rt-miss", root).addEventListener("click", () => { let t; do { t = 101 + Math.floor(Math.random() * (shelf.length * 8)); } while (shelf.includes(t)); setTarget(t); });
    shelfBox.addEventListener("click", e => { const d = e.target.closest(".rt-d"); if (d) setTarget(shelf[+d.dataset.k]); });
    $(".rt-lin", root).addEventListener("click", () => run("lin"));
    $(".rt-bin", root).addEventListener("click", () => run("bin"));
    ctx.onClose(() => { busy++; });
    build();
  },
});

/* ---------- Toy: Sort Dance (bubble, insertion, merge with counters) ---------- */
TOY("sortdance", {
  title: "Sort Dance", level: "a15", color: "var(--pink)",
  short: "Watch three sorting methods put a shelf of prices in order, counting comparisons and moves.",
  goal: "Sort the shelf with two different dances and compare their counts.",
  label: "A JavaScript demo of the idea, not Python code. The counts come from this demo's own code.",
  html: () => `
    <div class="row sd-algos" role="group" aria-label="Sorting method">
      <button type="button" class="btn small sky" data-a="bubble" data-hint="Bubble sort: swap neighbors that are out of order, pass after pass">Bubble</button>
      <button type="button" class="btn small plain" data-a="insertion" data-hint="Insertion: take the next price and slide it left into place">Insertion</button>
      <button type="button" class="btn small plain" data-a="merge" data-hint="Merge sort: sort each half, then merge the halves">Merge</button>
    </div>
    <p class="sd-about"></p>
    <div class="sd-bars" aria-label="Prices on the shelf, as bars"></div>
    <div class="row">
      <button type="button" class="btn small lemon sd-shuffle" data-hint="Put a fresh, mixed-up shelf of prices out">🔀 New shelf</button>
      <button type="button" class="btn small plain sd-step" data-hint="Do one step of the sort">Step ▶</button>
      <button type="button" class="btn small tang sd-play" data-hint="Play the whole sort">▶ Play</button>
    </div>
    <div class="row sd-counts" role="status">
      <span class="sd-c">Comparisons: <b class="sd-cmp">0</b></span>
      <span class="sd-c"><span class="sd-mvlab">Swaps</span>: <b class="sd-mv">0</b></span>
    </div>
    <p class="sd-log"></p>`,
  init(root, ctx) {
    const bars = $(".sd-bars", root), about = $(".sd-about", root), log = $(".sd-log", root), cmpB = $(".sd-cmp", root), mvB = $(".sd-mv", root), play = $(".sd-play", root);
    const ABOUT = {
      bubble: "Bubble sort walks along the shelf, swapping neighbors that are in the wrong order, and stops after a pass with no swaps [py-135].",
      insertion: "Insertion sort keeps a sorted part at the left end and inserts each new price into it, so the sorted part grows by one each time [py-253]. This demo slides the price left with swaps, one bigger neighbor at a time.",
      merge: "Merge sort splits the shelf down the middle, sorts each half the same way, and merges the sorted halves [py-136]. It copies prices into place, so it counts moves instead of swaps.",
    };
    let algo = "bubble", start = [], arr = [], ev = [], at = 0, cmp = 0, mv = 0, timer = null, done = {};
    const fresh = () => { start = []; for (let k = 0; k < 8; k++) start.push(1 + Math.floor(Math.random() * 9)); prepare(); };
    const prepare = () => {
      stop(); arr = start.slice(); at = 0; cmp = 0; mv = 0;
      ev = record(algo, start.slice());
      about.innerHTML = rich(ABOUT[algo]);
      $(".sd-mvlab", root).textContent = algo === "merge" ? "Moves" : "Swaps";
      log.textContent = "Press Step or Play.";
      draw();
    };
    // Run the algorithm once and record every comparison and every swap or move.
    const record = (name, a) => {
      const out = [];
      if (name === "bubble") {
        let swapped = true, end = a.length - 1;
        while (swapped) {
          swapped = false;
          for (let i = 0; i < end; i++) {
            out.push({ t: "cmp", i, j: i + 1 });
            if (a[i] > a[i + 1]) { [a[i], a[i + 1]] = [a[i + 1], a[i]]; out.push({ t: "swap", i, j: i + 1 }); swapped = true; }
          }
          end--;
        }
      } else if (name === "insertion") {
        for (let i = 1; i < a.length; i++) {
          let j = i;
          while (j > 0) {
            out.push({ t: "cmp", i: j - 1, j });
            if (a[j - 1] > a[j]) { [a[j - 1], a[j]] = [a[j], a[j - 1]]; out.push({ t: "swap", i: j - 1, j }); j--; }
            else break;
          }
        }
      } else {
        const sort = (lo, hi) => {
          if (hi - lo < 1) return;
          const mid = Math.floor((lo + hi) / 2);
          sort(lo, mid); sort(mid + 1, hi);
          const left = a.slice(lo, mid + 1), right = a.slice(mid + 1, hi + 1);
          out.push({ t: "range", lo, hi });
          let i = 0, j = 0, k = lo;
          while (i < left.length && j < right.length) {
            out.push({ t: "cmp", lo, hi });
            if (left[i] <= right[j]) a[k++] = left[i++]; else a[k++] = right[j++];
            out.push({ t: "set", k: k - 1, v: a[k - 1], lo, hi });
          }
          while (i < left.length) { a[k++] = left[i++]; out.push({ t: "set", k: k - 1, v: a[k - 1], lo, hi }); }
          while (j < right.length) { a[k++] = right[j++]; out.push({ t: "set", k: k - 1, v: a[k - 1], lo, hi }); }
        };
        sort(0, a.length - 1);
      }
      return out;
    };
    const draw = (e) => {
      const hot = new Set(), warm = new Set();
      if (e && (e.t === "cmp" || e.t === "swap") && e.j != null) { hot.add(e.i); hot.add(e.j); }
      if (e && e.lo != null) for (let k = e.lo; k <= e.hi; k++) warm.add(k);
      if (e && e.t === "set") hot.add(e.k);
      const fin = at >= ev.length;
      bars.innerHTML = arr.map((v, k) => `<div class="sd-bar${hot.has(k) ? (e.t === "cmp" ? " sd-cmpd" : " sd-mvd") : warm.has(k) ? " sd-warm" : ""}${fin ? " sd-fin" : ""}" style="height:${18 + v * 9}%"><span>${v}</span></div>`).join("");
      cmpB.textContent = cmp; mvB.textContent = mv;
    };
    const step = () => {
      if (at >= ev.length) return false;
      const e = ev[at++];
      if (e.t === "cmp") { cmp++; log.textContent = e.j != null ? `Compare ${arr[e.i]} and ${arr[e.j]}.` : "Compare the fronts of the two halves."; }
      if (e.t === "swap") { [arr[e.i], arr[e.j]] = [arr[e.j], arr[e.i]]; mv++; log.textContent = `Swap them: ${arr[e.i]} goes left.`; }
      if (e.t === "set") { arr[e.k] = e.v; mv++; log.textContent = `Move ${e.v} into place.`; }
      if (e.t === "range") log.textContent = `Merge positions ${e.lo + 1} to ${e.hi + 1}.`;
      draw(e);
      if (at >= ev.length) {
        log.textContent = `Sorted: ${cmp} comparisons and ${mv} ${algo === "merge" ? "moves" : "swaps"}.`;
        done[algo] = true; draw();
        if (Object.keys(done).length >= 2) ctx.goalDone("Two dances done. Try all three on the same shelf: New shelf makes a new one, the method buttons keep it.");
        stop();
      }
      return true;
    };
    const stop = () => { if (timer) clearInterval(timer); timer = null; play.textContent = "▶ Play"; };
    play.addEventListener("click", () => {
      if (timer) { stop(); return; }
      if (at >= ev.length) prepare();
      if (reducedMotion()) { while (step()); return; }
      play.textContent = "⏸ Pause";
      timer = setInterval(() => { if (!step()) stop(); }, 260);
    });
    $(".sd-step", root).addEventListener("click", () => { stop(); if (at >= ev.length) prepare(); step(); });
    $(".sd-shuffle", root).addEventListener("click", fresh);
    $$(".sd-algos [data-a]", root).forEach(b => b.addEventListener("click", () => {
      algo = b.dataset.a;
      $$(".sd-algos [data-a]", root).forEach(x => { x.classList.toggle("sky", x === b); x.classList.toggle("plain", x !== b); });
      prepare();
    }));
    ctx.onClose(stop);
    fresh();
  },
});

LEVEL({
  id: "a15", title: "Find It Fast", job: "A customer wants part 640, and the stockroom is huge.",
  color: "#ff8a1f", scene: "shop", cast: ["gridlock"], toy: "racetrack",
  sticker: { title: "Speed Finder", glyph: "O(n)", color: "#ff8a1f" },
  goals: ["Search a list two ways and count the looks", "Say what Big O measures", "Sort a list and count the work"],
  beats: [
    nar("Saturday. The shop opens early for the weekend rush, and the bell over the door has not stopped ringing."),
    say("gridlock", "{{you}}! A customer wants part 640, another wants a zipper pull, and the stockroom has a few hundred drawers. Can the helper find things faster than I can?", "think"),
    { show: ["gridlock", "nib"], ...say("nib", "Today's question is how much work a search takes. Every method for a job like this is an [[algorithm]]: a step-by-step set of instructions to solve a problem [py-226].") },
    say("nib", "The plain way is a [[linear search]]: open the drawers from left to right and stop when you find it, or say no when none has it [py-131]."),
    { predict: { program: "a15_linear", q: "This search counts its looks. Each line prints a pair: (where it was, how many looks). What will it print?",
      choices: ["(4, 5)\n(-1, 6)", "(5, 5)\n(-1, 0)", "(4, 4)\n(-1, 6)"], answer: 0,
      why: "The gear sits at position 4, the fifth bin, so finding it takes five looks. The zipper is missing, so the search opens all six bins before it gives up." } },
    { show: ["nib", "reader"], ...say("reader", "I ran that one. Look at my clipboard: one look per bin, every time, until the gear turned up.") },
    { trace: { program: "a15_linear", note: "Watch `looks` go up by one for every bin the loop opens." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. Six bins is easy. What about six hundred?", "think") },
    say("nib", "Then we cheat, legally. A [[binary search]] opens the middle drawer, then searches only the half that can hold the part [py-132]. The catch: the drawers must be sorted.", "wow"),
    { predict: { program: "a15_binary", q: "Twelve sorted part numbers. The search looks for 640, then for 300 (missing). What will it print?",
      choices: ["(9, 4)\n(-1, 4)", "(9, 10)\n(-1, 12)", "(10, 4)\n(-1, 3)"], answer: 0,
      why: "Each look sets about half of what is left aside, so twelve drawers never take more than four looks. Part 640 is at position 9." } },
    { trace: { program: "a15_binary", note: "Watch `low` and `high` close in. Everything outside them has been set aside." } },
    { ask: { q: "What does binary search need before it can work?", choices: ["Sorted data", "A list of at most 100 items", "Text instead of numbers"], answer: 0,
      why: "It throws away half the shelf on each look, which is only safe when the shelf is in order [py-132]." } },
    say("nib", "Now the big idea. [[Big O]] describes how running time grows with the size of the input. Linear search is O(n). Binary search is O(log n) [py-133]."),
    say("gridlock", "In shop words, please.", "think"),
    say("nib", "How effort grows as the pile grows. Watch what happens when we search ever bigger piles for a part that is not there."),
    { predict: { program: "a15_growth", q: "Both searches look for a missing part in piles from 10 to 1,000,000. Guess the binary search count for one million, then reveal." } },
    { ask: { q: "A linear search on a pile ten times bigger needs about how many looks, in the worst case?", choices: ["About the same", "About ten times as many", "About one more"], answer: 1,
      why: "Linear search is O(n) [py-133]: the looks grow in step with the pile. Binary search is the one that adds only a few looks." } },
    { toy: "racetrack", goal: "On the 256-drawer shelf, race both searches for the same part." },
    { show: ["nib", "byte"], ...say("byte", "Binary search needs a sorted shelf. Who sorts the shelf? BEEP. Me?", "wow") },
    say("nib", "[[Sorting]] has its own costs. Bubble sort swaps neighbors that are out of order and quits after a pass with no swaps [py-135]. Count the work it does here."),
    { predict: { program: "a15_bubble", q: "Bubble sort on [5, 2, 4, 1], counting comparisons and swaps. What will it print?",
      choices: ["[1, 2, 4, 5] comparisons: 12 swaps: 5", "[1, 2, 4, 5] comparisons: 6 swaps: 5", "[5, 4, 2, 1] comparisons: 12 swaps: 5"], answer: 0,
      why: "Each pass makes three comparisons, and it takes four passes: three that swap and one final pass that checks and finds nothing to swap." } },
    { trace: { program: "a15_bubble", note: "Watch `swapped`. The loop only stops after a whole pass leaves it `False`." } },
    say("nib", "[[Insertion sort]] works like tidying a pile of invoices: keep a sorted part at the low end, and insert each new item into it [py-253]. Bigger items shift right to make room [py-254]."),
    { predict: { program: "a15_insertion", q: "Insertion sort on the same shelf, [5, 2, 4, 1], counting comparisons. What will it print?",
      choices: ["[1, 2, 4, 5] comparisons: 6", "[1, 2, 4, 5] comparisons: 12", "[1, 2, 4, 5] comparisons: 3"], answer: 0,
      why: "The 2 needs one comparison, the 4 needs two (it passes 5 and stops at 2), and the 1 needs three, sliding all the way to the front. That is 6, half of bubble sort's 12 on this shelf." } },
    { ask: { q: "When does insertion sort do the least work?", choices: ["When the list is already sorted", "When the list is in reverse order", "It always does the same amount"], answer: 0,
      why: "On a list that is already sorted it needs only one comparison on each pass. Its worst case is O(n^2) [py-255]." } },
    say("nib", "Merge sort splits the pile, sorts each half and merges them, in O(n log n) [py-136]. Try all three in the Sort Dance and compare the counts."),
    { toy: "sortdance", goal: "Sort the shelf with two different dances and compare their counts." },
    { ask: { q: "`tidy = sorted(parts)`. What is in `parts` afterwards?", choices: ["The same items, in the same order as before", "The items in sorted order", "Nothing; sorted() empties it"], answer: 0,
      why: "`sorted()` returns a new sorted list [py-107] and leaves the original alone. The book's page *Let Python sort for you* shows it." } },
    { book: 1, text: "The book has the full chapter, including how to time code with a stopwatch." },
    say("gridlock", "Good. The weekend crowd is waiting. Write a search on the real computer, then race two of them.", "think"),
    { machine: ["a15-cheap", "a15-race"] },
    say("byte", "Part 640: found in four looks. Customer happy. BEEP BOOP."),
    { sticker: true },
  ],
});
