/* A-Bonus. Save Your Work: Git basics (snapshots, the three states, status, add, commit, .gitignore).
   Pro Git is cited and paraphrased only. Toy: logbook (commits as pages in a logbook, JS demo). */

// TODO(research): reading history (git log), with a source.
// TODO(research): how a push authenticates to GitHub (HTTPS token or SSH key), and the default branch name
//   that git init gives, so the push command can name a real branch instead of <branch>.
// TODO(research): a fact that git add also stages changes to tracked files (Pro Git, "Staging Modified Files").

PAGES("abonus", [
  {
    h: "Why keep a logbook",
    body: [
      "By Saturday evening your showcase project works. Then you change one line, and it does not. What did it look like an hour ago? [[Version control]] answers that question: it keeps a history of your project, so you can look back at any saved version.",
      "[[Git]] is the version control tool this chapter covers. The Pro Git book explains how it keeps that history: Git stores a stream of snapshots of the project, rather than a list of file changes [py-143]. Each snapshot is a [[commit]].",
      { analogy: "Think of a logbook on the workbench. Each time you finish a step, you write a new page that records how every part of the project looks right now. You never erase a page. To see last Tuesday's version, you flip back to last Tuesday's page." },
      "Here is that idea as a small Python model: a list of pages, where each page is a full copy of every file's version.",
      { code: "abonus_snapshots", out: true },
      { honest: "This program is a Python model of the idea, and Git does not work this way inside. The output was recorded from real Python." },
      { trace: "abonus_snapshots", label: "🔍 Watch the logbook get a second page" },
      "Notice that page 1 still says `v1` after the edit. `dict(files)` made a copy, so later edits do not reach back into old pages. Remember the two labels on one box from Labeled Boxes? Without the copy, both pages would be two names for one dictionary [py-051].",
    ],
  },
  {
    h: "Three states, three places",
    body: [
      "Pro Git describes three main states a file can be in: **modified**, **staged** and **committed** [py-144]. It also names three sections of a Git project: the **working tree**, the **staging area** and the **Git directory** [py-145].",
      { table: { head: ["Pro Git's word", "Our shop picture"], rows: [["Working tree", "Your workbench, where you edit the files"], ["Staging area", "The tray of pages you have picked for the next logbook entry"], ["Git directory", "The logbook itself, the [[repository]]"]] } },
      { analogy: "Editing a file makes it modified: it changed on the bench. Staging it puts it in the tray: this goes in the next entry. Committing writes the entry into the logbook, and the tray empties." },
      { toy: "logbook", label: "Open the Logbook" },
      { honest: "The Logbook toy is a JavaScript demo of the idea, not Git. Its words are our own, and it prints nothing that Git prints." },
    ],
  },
  {
    h: "Set up Git on your machine",
    body: [
      "Before the first commit, three things need doing once: install Git, tell it who you are, and turn your project folder into a [[repository]].",
      { os: {
        mac: [
          { term: [["git --version", "Pro Git says the easiest way to get Git on macOS is probably the Xcode Command Line Tools. Run this in Terminal. If Git is missing, you will be prompted to install it [py-208]."]], title: "Terminal" },
          "You installed the Command Line Tools with `xcode-select --install` in the Set Up Your Bench job [py-016], so this may simply print a version number.",
        ],
        linux: [{ term: [
          ["sudo apt install git-all", "On Debian-based systems such as Ubuntu [py-209]."],
          ["sudo dnf install git-all", "On Fedora [py-209]."],
        ], title: "Terminal" }],
        win: [
          "Pro Git says the most official Windows build is downloaded from [git-scm.com/download/win](https://git-scm.com/download/win). That Git for Windows project is separate from Git itself [py-210].",
        ],
      } },
      { h3: "Tell Git who you are" },
      "Pro Git says the first thing to do after installing Git is to set your user name and email address, because every commit uses this information [py-211]. Put your own name and email in the quotes.",
      { term: [
        ["git config --global user.name \"Your Name\"", "Your name, as it will appear on every logbook page [py-211]."],
        ["git config --global user.email \"you@example.com\"", "Your email address, for the same reason [py-211]."],
      ], title: "Terminal (once per computer)" },
      { h3: "Start a logbook" },
      "In the terminal, go into your project folder and run `git init`. It creates a `.git` subdirectory that holds the repository files. At that point nothing in the project is tracked yet [py-212]. Tracking starts with `git add`, on the next page.",
      { term: [
        ["cd showcase", "Go into your project folder (yours may have another name) [py-003]."],
        ["git init", "Create the logbook for this folder [py-212]."],
      ], title: "Terminal" },
      { analogy: "`git init` puts an empty logbook on the bench. The `.git` folder is the logbook itself. Leave it alone, and let Git write in it." },
    ],
  },
  {
    h: "The everyday commands",
    body: [
      "Three commands do most of the daily work. They run in the terminal, inside your project folder.",
      { term: [
        ["git status", "Shows which files are untracked, modified or staged [py-147]."],
        ["git add tracker.py", "Begins tracking a new file [py-148]."],
        ["git commit -m \"Add the low stock report\"", "Records a commit, with the message written right there on the command line [py-148]."],
      ], title: "Terminal" },
      "Write the message for the person who reads the logbook later. That person is usually you. \"Add the low stock report\" will help you more than \"stuff\".",
      { h3: "Things to leave out" },
      "Some files do not belong in the logbook. A `.gitignore` file lists patterns for files Git should ignore. Blank lines and lines starting with `#` are ignored [py-149]. Here is a short one for the showcase project:",
      { snippet: "# Leave the virtual environment out of the logbook\n.venv\n\n# Scratch notes nobody else needs\nscratch.txt", lang: "text", file: ".gitignore" },
      "The Python Packaging User Guide makes its virtual environment in a folder named `.venv` [py-116]. A virtual environment is created on top of a base Python [py-112], so you can make a fresh one on any machine. It does not need a page in the logbook.",
      { machine: ["abonus-ignore"], label: "Go to your machine: read a .gitignore" },
    ],
  },
  {
    h: "Working offline, sharing on GitHub",
    body: [
      "Most Git operations need only files on your own computer, so you can work offline and push your commits to a shared copy later [py-146]. The logbook lives in your project folder, and it works on a train with no Wi-Fi.",
      "GitHub is one place to keep that shared copy. It is optional. Everything on the earlier pages works without it.",
      { h3: "A GitHub account" },
      "GitHub asks you to verify your email address during sign up. Without a verified email you can't do some basic tasks, such as creating a repository. GitHub strongly recommends turning on two-factor authentication (2FA) [py-215]. Sign-up screens change, so follow [GitHub's own page on creating an account](https://docs.github.com/en/account-and-profile/how-tos/account-management/creating-an-account-on-github).",
      { h3: "A repository on GitHub" },
      "GitHub's quickstart creates a repository by typing a short, memorable name, such as hello-world [py-216]. For the showcase, `showcase` will do. The same quickstart describes a commit as like a snapshot of all the files in a project at a point in time [py-216]: our logbook page again. The steps are in [GitHub's quickstart for repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories).",
      { h3: "Connect and push" },
      { term: [
        ["git remote add origin <url>", "Adds a [[remote]] repository under a short name [py-213]. Here the short name is `origin`, and `<url>` is the address of your new GitHub repository."],
        ["git push origin <branch>", "Sends your commits to the remote [py-214]. Replace `<branch>` with your branch's name."],
      ], title: "Terminal, inside your project folder" },
      "A push works only if you have write access to the remote and nobody has pushed in the meantime. Otherwise, you fetch their work first [py-214]. On your own new repository, you are the only one pushing.",
      { honest: "Code Pix does not cover branches, or how GitHub checks that a push really comes from you, yet. If a push asks you to sign in, follow the steps GitHub shows." },
    ],
  },
]);

GLOSS({
  "version control": "Keeping a history of a project's saved versions so you can look back at any of them.",
  git: "A version control tool that stores a stream of snapshots of a project [py-143].",
  commit: "One snapshot in Git's history. `git commit -m` records one with a message [py-148].",
  repository: "A project that Git keeps a history for. Pro Git calls the place that history lives the Git directory [py-145]. `git init` creates one in a `.git` subdirectory [py-212].",
  remote: "A copy of your repository somewhere else, such as GitHub. `git remote add` adds one under a short name [py-213].",
}, "abonus");

/* ---------- Toy: Logbook (commits as pages) ---------- */
TOY("logbook", {
  title: "Logbook", level: "abonus", color: "var(--teal)", wide: true,
  short: "Edit, stage and commit files, and watch each commit become a page in a logbook.",
  goal: "Write two logbook pages, and keep .venv out of every page.",
  label: "A JavaScript demo of the idea, not Git. Its words are our own, and it prints nothing that Git prints.",
  html: () => `
    <div class="lb-top row">
      <label class="lb-ign" data-hint="Add .venv to the .gitignore file, so the demo leaves it out"><input type="checkbox" class="lb-ignore" data-hint="Ignore the .venv folder"> Put <code>.venv</code> in <code>.gitignore</code></label>
      <button type="button" class="btn small plain lb-reset" data-hint="Clear the logbook and start over">Start over</button>
    </div>
    <div class="lb-grid">
      <section class="lb-col lb-bench"><h4>Working tree <small>(the bench)</small></h4><div class="lb-files"></div></section>
      <section class="lb-col lb-tray"><h4>Staging area <small>(the tray)</small></h4><div class="lb-staged"></div>
        <div class="lb-commit">
          <select class="lb-msg" aria-label="Commit message" data-hint="Pick a message for this logbook page">
            <option>Start the stock tracker</option><option>Add the low stock report</option><option>Fix remove() for unknown parts</option><option>Add more parts to stock.json</option>
          </select>
          <button type="button" class="btn small tang lb-go" data-hint="Commit: write the staged files into a new logbook page">Commit ✍</button>
        </div></section>
      <section class="lb-col lb-book"><h4>Git directory <small>(the logbook)</small></h4><div class="lb-pages"></div><div class="lb-snap" role="status"></div></section>
    </div>
    <div class="lb-status" role="status"></div>
    <p class="lb-say" role="status"></p>`,
  init(root, ctx) {
    const filesBox = $(".lb-files", root), stagedBox = $(".lb-staged", root), pagesBox = $(".lb-pages", root), snap = $(".lb-snap", root),
      statusBox = $(".lb-status", root), sayBox = $(".lb-say", root), ignore = $(".lb-ignore", root), msg = $(".lb-msg", root), go = $(".lb-go", root);
    let files, pages;
    const reset = () => {
      files = ["tracker.py", "test_tracker.py", "stock.json", ".venv"].map(name => ({ name, ver: 1, saved: 0, staged: 0 }));
      pages = []; ignore.checked = false;
      sayBox.textContent = "Stage a file, then commit it.";
      draw();
    };
    const ignored = f => f.name === ".venv" && ignore.checked;
    const state = f => ignored(f) && !f.saved ? "ignored" : f.staged ? (f.staged !== f.ver ? "staged, then changed again" : "staged") : !f.saved ? "untracked" : f.ver !== f.saved ? "modified" : "saved";
    const draw = () => {
      filesBox.innerHTML = ""; stagedBox.innerHTML = ""; pagesBox.innerHTML = "";
      files.forEach(f => {
        const s = state(f);
        if (s === "ignored") return;
        const edit = el("button.btn.small.plain", { type: "button", "data-hint": f.name === ".venv" ? "Install another package into the environment" : "Edit this file on the bench", onclick: () => { f.ver++; sayBox.textContent = `${f.name} changed on the bench.`; draw(); } }, f.name === ".venv" ? "📦 Add package" : "✏️ Edit");
        const stage = el("button.btn.small.sky", { type: "button", "data-hint": "Stage: put this version in the tray for the next page", disabled: (s === "saved" || s === "staged") ? true : null,
          onclick: () => { f.staged = f.ver; sayBox.textContent = `${f.name} (version ${f.ver}) is in the tray.`; draw(); } }, "Stage ➜");
        filesBox.append(el("div.lb-file.lb-s-" + s.split(",")[0], {}, el("div.lb-name", {}, el("b", {}, f.name), el("span.lb-tag", {}, `v${f.ver} · ${s}`)), el("div.lb-acts", {}, edit, stage)));
        if (f.staged) stagedBox.append(el("div.lb-chip", {}, `${f.name} v${f.staged}`));
      });
      if (!stagedBox.children.length) stagedBox.append(el("p.lb-empty", {}, "The tray is empty."));
      go.disabled = !files.some(f => f.staged);
      pages.forEach((p, i) => pagesBox.append(el("button.lb-page", { type: "button", "data-hint": "Open this page to see its snapshot", onclick: () => showPage(i) }, el("b", {}, `Page ${i + 1}`), el("span", {}, p.msg))));
      if (!pages.length) pagesBox.append(el("p.lb-empty", {}, "No pages yet."));
      const group = s => files.filter(f => state(f) === s || (s === "staged" && state(f).startsWith("staged"))).map(f => f.name).join(", ") || "none";
      statusBox.innerHTML = `<b>Status, in this demo's words:</b> untracked: ${esc(group("untracked"))} · modified: ${esc(group("modified"))} · staged: ${esc(group("staged"))}` + (ignore.checked ? " · ignored: .venv" : "");
    };
    const showPage = i => {
      const p = pages[i];
      snap.innerHTML = `<b>Page ${i + 1}: ${esc(p.msg)}</b><br>` + Object.keys(p.snap).map(n => `${esc(n)} v${p.snap[n]}`).join("<br>");
    };
    go.addEventListener("click", () => {
      const snapshot = {};
      files.forEach(f => {
        if (f.staged) { f.saved = f.staged; f.staged = 0; }
        if (f.saved) snapshot[f.name] = f.saved;
      });
      pages.push({ msg: msg.value, snap: snapshot });
      showPage(pages.length - 1);
      const venvIn = pages.some(p => p.snap[".venv"]);
      sayBox.textContent = venvIn ? "A page now holds .venv, the virtual environment folder. Press Start over and put .venv in .gitignore first." : `Page ${pages.length} written. It holds a full snapshot of every tracked file.`;
      if (msg.selectedIndex < msg.options.length - 1) msg.selectedIndex++;
      draw();
      if (pages.length >= 2 && !venvIn && ignore.checked) ctx.goalDone("Two pages, and .venv stayed out. Open page 1 to see that it never changed.");
    });
    ignore.addEventListener("change", () => {
      const v = files.find(f => f.name === ".venv");
      if (ignore.checked && !v.saved) v.staged = 0;
      sayBox.textContent = ignore.checked ? (v.saved ? "A page already holds .venv. In this demo, ignoring it now does not take it out of old pages. Press Start over." : ".venv is ignored. It no longer shows up as untracked.") : ".venv is back in the list.";
      draw();
    });
    $(".lb-reset", root).addEventListener("click", () => { snap.innerHTML = ""; reset(); });
    reset();
  },
});

LEVEL({
  id: "abonus", title: "Save Your Work", job: "Keep a logbook of every working version.",
  color: "#1a8a8a", scene: "office", cast: ["nib"], toy: "logbook",
  sticker: { title: "Logbook Keeper", glyph: "git", color: "#1a8a8a" },
  goals: ["Say what a commit is", "Name the three states of a file", "Start a repository and write a .gitignore", "Know the steps to share on GitHub"],
  beats: [
    nar("Saturday evening. The showcase table is cleared, and the back-office computer hums."),
    say("nib", "{{you}}, a confession. Years ago I changed one line in a working gadget, broke it, and could not remember what the line used to say. Never again.", "think"),
    say("nib", "The cure is [[version control]]: a history of every version you saved. This chapter uses a tool called [[Git]]."),
    say("nib", "Git stores a stream of snapshots of your project [py-143]. Each snapshot is a [[commit]]. Think of a logbook where every page records how the whole project looked.", "wow"),
    { predict: { program: "abonus_snapshots", q: "A Python model of a logbook. The program writes page 1, edits tracker.py, then writes page 2. What will it print?",
      choices: ["2 pages\npage 1: {'tracker.py': 'v1', 'stock.json': 'v1'}\npage 2: {'tracker.py': 'v2', 'stock.json': 'v1'}", "2 pages\npage 1: {'tracker.py': 'v2', 'stock.json': 'v1'}\npage 2: {'tracker.py': 'v2', 'stock.json': 'v1'}", "1 pages\npage 1: {'tracker.py': 'v2', 'stock.json': 'v1'}"], answer: 0,
      why: "`dict(files)` copies the dictionary, so page 1 keeps `v1` after the edit. A snapshot that changed later would be no use as history." } },
    { trace: { program: "abonus_snapshots", note: "Two pages, two separate dictionaries. Watch their colors." } },
    { show: ["nib", "byte"], ...say("byte", "BEEP. Where does a file wait before it goes into the logbook?", "think") },
    say("nib", "Pro Git names three states: modified, staged and committed [py-144]. And three places: the working tree, the staging area and the Git directory [py-145]."),
    say("nib", "Our picture: you edit on the bench, put the finished pages in a tray, then commit the tray into the logbook."),
    { ask: { q: "Which list holds the three states a file can be in, according to Pro Git?", choices: ["modified, staged, committed", "saved, unsaved, deleted", "working tree, staging area, Git directory"], answer: 0,
      why: "Those are the three states [py-144]. The working tree, staging area and Git directory are the three sections where files live [py-145]." } },
    { toy: "logbook", goal: "Write two logbook pages, and keep .venv out of every page." },
    say("nib", "On a real machine, start with `git --version`. On a Mac, if Git is missing, you will be prompted to install it [py-208]. Then tell Git your name and email, because every commit uses them [py-211]."),
    say("nib", "Then `git init` inside your project folder. It creates a `.git` subdirectory for the repository files [py-212]. The logbook exists, and it is still empty.", "think"),
    { ask: { q: "You just ran `git init` in a folder with three files. How many of them does Git track?", choices: ["none yet", "all three", "only the Python files"], answer: 0,
      why: "`git init` creates the `.git` subdirectory, and at that point nothing in the project is tracked yet [py-212]. `git add` starts tracking a file [py-148]." } },
    say("nib", "`git status` tells you what is untracked, modified or staged [py-147]. `git add` begins tracking a new file, and `git commit -m` records a commit with a message [py-148]."),
    { ask: { q: "You made a virtual environment in `.venv`. How do you keep it out of the logbook?", choices: ["Delete it before each commit", "List it in a `.gitignore` file", "Name it with capital letters"], answer: 1,
      why: "A `.gitignore` file lists patterns for files Git should ignore [py-149]." } },
    say("nib", "Most of this works with no network at all. You commit on your own machine and push to a shared copy later [py-146]. GitHub can hold that copy: `git remote add` names it, and `git push` sends your commits there [py-213] [py-214]."),
    { show: ["nib", "byte"], ...say("byte", "BEEP. GitHub wants me to verify my email. Do robots have email?", "think") },
    say("nib", "Yours does now. GitHub asks every new account to verify its email, and you can't create a repository without that. It also strongly recommends two-factor authentication [py-215]."),
    { book: 2, text: "The book has the install steps for macOS, Windows and Linux, then the everyday commands, a sample `.gitignore`, and GitHub on the last page." },
    { machine: ["abonus-ignore"] },
    say("byte", "Page saved. Nothing lost. Dr. Nib's line is safe forever. BEEP BOOP."),
    { sticker: true },
  ],
});
