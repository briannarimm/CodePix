/* A0. Open the Shop: the cast, the terminal, folders and paths. Monday morning. */

// The Folder Map toy uses a fictional tree; the book cites the real macOS home folder layout [py-230] [py-231] and ~ [py-229].
// TODO(research): Windows output for pwd and ls (lesson plan asks to record it on a real Windows machine); the book shows commands only.

PAGES("a00", [
  {
    h: "A very literal helper",
    body: [
      "Gadget Gulch Repair & Tinker Shop fixes talking appliances. Its helpers are computers. OpenStax defines a [[computer]] as an electronic device that stores and processes information, and a [[program]] as a sequence of instructions that a computer can run [py-187].",
      "In this book a computer is a very literal helper. It does exactly what it is told, in exactly the order it is told, and it never guesses what you meant. A program is the numbered list of instructions it follows. Here is a three-line program the office computer runs every morning.",
      { code: "a00_sign", out: true },
      { analogy: "Picture the shop's very literal helper with a job sheet. If the sheet says *tighten the bolt*, the helper tightens the bolt. If the sheet says *tighten the blot*, the helper stops and asks what a blot is. Programs work the same way." },
      { trace: "a00_sign", label: "🔍 Watch Reader read it, one line at a time" },
      "You will write programs like this from A1 on. First, you need a way to talk to the computer by typing.",
    ],
  },
  {
    h: "The text window",
    body: [
      "The [[shell]] is a textual interface for giving the computer commands [py-002]. On a Mac, the app that shows you a shell is called Terminal. You can open it from Spotlight by typing Terminal, or from the Utilities folder inside Applications [py-001].",
      "In this book, each command sits in a dark terminal panel like the one below. Type it after the prompt in your own Terminal and press Return. The green `$` in our panels marks where the prompt is; you do not type it.",
      { term: [["pwd", "Print the working directory: the folder the shell is standing in right now."]], title: "Terminal: your first command" },
      { honest: "The exact prompt and the exact folder name differ from computer to computer, so this page does not show a made-up answer. Type `pwd` on your own machine and read yours." },
      { alt: "Windows and Linux", body: [
        "Linux: the commands in this chapter come from a lecture that teaches the bash shell [py-002].",
        "Windows: Microsoft describes Windows PowerShell as a command-line shell that comes preinstalled on all modern versions of Windows [py-166]. On Windows 11, the easiest way to find it is to type PowerShell into the search bar [py-167].",
        "PowerShell on Windows understands the familiar names through aliases: `cd` runs `Set-Location`, `ls` runs `Get-ChildItem`, `pwd` runs `Get-Location`, `cp` runs `Copy-Item` and `mv` runs `Move-Item` [py-168]. Microsoft's table also pairs `mkdir` with `New-Item` [py-169]. So `pwd`, `ls`, `cd`, `mkdir`, `mv` and `cp` all work in PowerShell on Windows. These aliases are Windows-only; PowerShell on macOS or Linux runs the native commands instead [py-170].",
        { term: [["pwd", "Prints where you are. In PowerShell on Windows this runs Get-Location [py-168]."]], title: "PowerShell on Windows" },
      ] },
    ],
  },
  {
    h: "Folders and where you stand",
    body: [
      "A computer keeps files in folders. Folders hold files and other folders, so they nest like rooms inside rooms. Another word for a folder is [[directory]].",
      "The shell is always standing in one folder, the [[working directory]]. Three commands move you around: `pwd` prints the working directory, `cd` changes it, and `ls` lists a directory's contents [py-003].",
      { term: [["pwd", "Where am I?"], ["ls", "What is in here?"], ["cd codepix", "Walk into the folder named codepix."], ["cd ..", "Walk back up to the folder above."]] },
      { analogy: "The computer is a big workshop with labeled rooms. `pwd` reads the sign on the door of the room you are in. `ls` looks around the room. `cd` walks through a door." },
      { h3: "Your home folder, and ~" },
      "Every person who uses a Mac has a room of their own. Apple says the Users folder holds the home folders of everyone set up as a user on the Mac. Your [[home folder]] is named with your user name, and it has folders for desktop files, downloads, pictures, documents, movies, music and public files [py-230].",
      "In Apple's example, a user whose user name is johnappleseed has the home directory `/Users/johnappleseed` [py-231]. Yours has your own user name in place of johnappleseed.",
      "The shell has a nickname for that folder. In a lecture's example prompt, `missing:~$`, the working directory shows as `~`, which is short for home [py-229]. So if your prompt shows a `~`, read it as \"home\".",
      { analogy: "`~` is the shell's way of writing *home sweet home* in one keystroke. It saves typing `/Users/` and your whole name every time." },
      { toy: "foldermap", label: "Open the Folder Map" },
    ],
  },
  {
    h: "Paths: directions to a folder",
    body: [
      "A [[path]] is a written set of directions to a folder or a file. Folder names are joined with `/`. In a path, `.` means the current directory and `..` means its parent [py-004].",
      "A path that starts with `/` is an **absolute path**. Any other path is a **relative path**, read from the current working directory [py-005].",
      { table: { head: ["Path (on the fictional office computer)", "Kind", "Read it as"], rows: [
        ["`/office/gridlock`", "absolute", "Start at the very top. Go into office, then gridlock."],
        ["`codepix`", "relative", "From here, go into codepix."],
        ["`../gridlock`", "relative", "Go up one folder, then into gridlock."],
        ["`.`", "relative", "Right here."],
      ] } },
      { honest: "These folders belong to the fictional shop computer in the Folder Map toy. Your own computer has its own folder names." },
      { alt: "Windows paths", body: [
        "Linux and macOS separate folders with `/`. Windows uses `\\` instead, and it has one root for each disk partition, such as `C:\\` [py-171]. So the office path `/office/gridlock` would be written `C:\\office\\gridlock` on a Windows machine with the same folders.",
      ] },
      { analogy: "An absolute path is a full street address. A relative path is \"two doors down from here\". Both work, and the second one only makes sense if you know where *here* is." },
    ],
  },
  {
    h: "Making, moving and copying",
    body: [
      "`mkdir` makes a directory, `mv` moves or renames, and `cp` copies [py-007]. Your first real job is to make a folder for everything you build in Code Pix.",
      { term: [["pwd", "Check where you are."], ["mkdir codepix", "Make a folder named codepix."], ["cd codepix", "Walk into it."], ["pwd", "Check again. The path now ends in codepix."]], title: "Terminal: make your codepix folder" },
      { alt: "Windows: the same four commands in PowerShell", body: [
        "Type the same four commands into PowerShell. On Windows, `mkdir` runs the cmdlet `New-Item` [py-169], and `pwd` and `cd` run `Get-Location` and `Set-Location` [py-168]. The path `pwd` prints uses `\\` between folders [py-171].",
      ] },
      { nerd: "Two more tricks for later", body: [
        "`>` sends a program's output to a file, `>>` adds to the end of a file, and `|` sends one program's output into another program's input [py-008]. You will not need these for a while. They are here so the symbols look familiar when you meet them.",
        "The shell finds commands by searching a list of folders kept in the [[PATH variable]], and `which echo` shows the file the `echo` command runs [py-006]. A1 uses `which` to check which Python you have.",
      ] },
      { machine: ["a00-where"], label: "Go to your machine: make your codepix folder" },
    ],
  },
]);

GLOSS({
  terminal: "The app that shows you a shell, where you type commands. On a Mac you open Terminal from Spotlight or from Applications, Utilities. [py-001]",
  directory: "Another word for a folder. Directories hold files and other directories.",
  "working directory": "The folder the shell is standing in right now. `pwd` prints it and `cd` changes it. [py-003]",
  computer: "An electronic device that stores and processes information (OpenStax's definition). In this book, a very literal helper. [py-187]",
  program: "A sequence of instructions that a computer can run (OpenStax's definition). [py-187]",
  path: "Directions to a file or folder. A path that starts with `/` is absolute; any other path is relative to the working directory. [py-005]",
  "home folder": "Your own folder on the computer, named with your user name. On a Mac it sits inside the Users folder, as in Apple's example `/Users/johnappleseed`. The shell can show it as `~`. [py-230] [py-231] [py-229]",
  "PATH variable": "The list of folders the shell searches when you type a command. `which` shows the file a command runs. [py-006]",
}, "a00");

/* The Folder Map toy: a fictional folder tree with the matching shell commands. */
TOY("foldermap", {
  title: "Folder Map", level: "a00", color: "var(--teal)",
  short: "Walk around a fictional folder tree and see the matching pwd, ls and cd commands.",
  goal: "Make a folder named `codepix` inside `apprentice`, then walk into it.",
  label: "A JavaScript demo of the idea, not Python code. The folders belong to the fictional shop computer.",
  html: () => `<div class="fm-wrap">
      <div class="panel fm-treebox"><p class="fm-h">Folders <span>(tap one to walk there)</span></p><div class="fm-tree" role="tree" aria-label="Fictional folder tree"></div></div>
      <div class="fm-side">
        <div class="fm-where" aria-live="polite"></div>
        <div class="row fm-btns">
          <button type="button" class="btn small sky" data-cmd="pwd" data-hint="Print the working directory">pwd</button>
          <button type="button" class="btn small sky" data-cmd="ls" data-hint="List what is in the working directory">ls</button>
          <button type="button" class="btn small tang fm-up" data-cmd="up" data-hint="Go up to the parent folder">cd ..</button>
          <button type="button" class="btn small lime" data-cmd="mkdir" data-hint="Make a folder named codepix here">mkdir codepix</button>
          <button type="button" class="btn small plain" data-cmd="clear" data-hint="Clear the pretend terminal">clear</button>
        </div>
        <div class="fm-term" role="log" aria-label="Pretend terminal" tabindex="0"></div>
      </div>
    </div>`,
  init(root, ctx) {
    const tree = { name: "", kids: [
      { name: "office", kids: [
        { name: "apprentice", kids: [{ name: "drawings", kids: [] }, { name: "notes.txt" }] },
        { name: "gridlock", kids: [{ name: "jobs.txt" }, { name: "receipts", kids: [] }] },
      ] },
      { name: "tools", kids: [{ name: "toaster-manual.txt" }] },
    ] };
    let cwd = ["office", "apprentice"];
    const term = $(".fm-term", root), treeBox = $(".fm-tree", root), where = $(".fm-where", root);
    const str = p => "/" + p.join("/");
    const node = p => p.reduce((n, name) => n && n.kids && n.kids.find(k => k.name === name && k.kids), tree);
    const log = (cmd, out) => {
      term.append(el("div.fm-cmd", {}, cmd));
      if (out) term.append(el("div.fm-out", {}, out));
      term.scrollTop = term.scrollHeight;
    };
    const rel = target => {
      const a = str(cwd), b = str(target);
      if (target.length === cwd.length + 1 && b.startsWith(a === "/" ? "/" : a + "/")) return target[target.length - 1];
      if (target.length === cwd.length - 1 && a.startsWith(b === "/" ? "/" : b + "/")) return "..";
      return b;
    };
    const check = () => { if (cwd.join("/") === "office/apprentice/codepix") ctx.goalDone("You made `codepix` and walked into it. That is exactly what you will type on your own machine."); };
    const go = target => {
      if (str(target) === str(cwd)) { log("cd .", ""); return; }
      const how = rel(target);
      cwd = target.slice();
      log("cd " + how, how.startsWith("/") ? "(an absolute path: it starts with /)" : how === ".." ? "(.. means the folder above)" : "(a relative path: read from where you were)");
      draw(); check();
    };
    const draw = () => {
      treeBox.innerHTML = "";
      const walk = (n, path, depth) => {
        (n.kids || []).forEach(k => {
          const p = path.concat(k.name);
          if (k.kids) {
            const here = str(p) === str(cwd);
            const b = el("button.fm-node" + (here ? ".here" : ""), { type: "button", role: "treeitem", style: { "--d": depth }, "aria-current": here ? "true" : null,
              "data-hint": here ? "You are here" : "Walk to " + str(p), onclick: () => go(p) }, el("span.fm-ico", { "aria-hidden": "true" }), k.name + "/");
            treeBox.append(b);
            walk(k, p, depth + 1);
          } else {
            treeBox.append(el("div.fm-file", { style: { "--d": depth }, role: "treeitem" }, k.name));
          }
        });
      };
      treeBox.append(el("button.fm-node" + (cwd.length ? "" : ".here"), { type: "button", role: "treeitem", style: { "--d": 0 }, "data-hint": "Walk to the very top folder, /", onclick: () => go([]) }, el("span.fm-ico", { "aria-hidden": "true" }), "/ (the top)"));
      walk(tree, [], 1);
      where.innerHTML = rich(`Working directory: \`${str(cwd)}\``);
      $(".fm-up", root).disabled = !cwd.length;
    };
    $$(".fm-btns button", root).forEach(b => b.addEventListener("click", () => {
      const c = b.dataset.cmd, n = node(cwd);
      if (c === "pwd") log("pwd", str(cwd));
      else if (c === "ls") log("ls", (n.kids || []).map(k => k.name).join("   ") || "(nothing here yet)");
      else if (c === "up" && cwd.length) go(cwd.slice(0, -1));
      else if (c === "mkdir") {
        if (n.kids.find(k => k.name === "codepix")) log("mkdir codepix", "mkdir: codepix: that folder is already here (pretend message)");
        else { n.kids.push({ name: "codepix", kids: [] }); log("mkdir codepix", ""); draw(); }
      } else if (c === "clear") term.innerHTML = "";
    }));
    log("pwd", str(cwd));
    draw();
  },
});

LEVEL({
  id: "a00", title: "Open the Shop", job: "Get into the back office and learn to talk to its computer.",
  color: "#5cc8ff", scene: "shop", cast: ["gridlock"], toy: "foldermap",
  sticker: { title: "Key Holder", glyph: "~/", color: "#5cc8ff" },
  goals: ["Open a terminal", "Say where you are with pwd", "Move around with cd and ls", "Make a folder with mkdir"],
  beats: [
    say("gridlock", "Morning, {{you}}! Welcome to Gadget Gulch Repair & Tinker Shop. We fix talking appliances. Most of them talk too much. Your first week starts now.", "wow"),
    { show: ["gridlock", "nib"], ...say("nib", "I am Dr. Nib. I train the apprentices here. Monday is about the computer in the back office, and by Saturday you will be writing programs for it.") },
    { show: ["gridlock", "nib", "byte"], ...say("byte", "BEEP. I am Byte. I run programs. I do exactly what they say. That is my best feature and my worst feature.", "wow") },
    say("gridlock", "Here is the back-office key. Fair warning: that computer has no friendly menus. The only way to talk to it is a text window.", "think"),
    { scene: "office", show: ["nib", "reader"], ...nar("The back office smells like solder and old coffee. One screen glows. A tiny figure with a clipboard waves from beside the keyboard.") },
    say("reader", "Reader, at your service. When you write programs, I read them. One line at a time. Never two. Two is chaos."),
    say("nib", "Reader will matter a lot tomorrow. Today, the text window. It is called the [[terminal]], and inside it runs the [[shell]], a textual interface for giving the computer commands [py-002]."),
    say("nib", "On a Mac, open Terminal from Spotlight by typing Terminal, or from the Utilities folder inside Applications [py-001]. Then it waits for you to type.", "think"),
    say("byte", "Windows folks: type PowerShell into the search bar on Windows 11 [py-167]. It is a command-line shell that comes with Windows [py-166]. BEEP. Same idea, different window."),
    { ask: { q: "What is the shell?", choices: ["A text interface for giving the computer commands", "A folder where programs are kept", "The Python language"], answer: 0,
      why: "The shell is a textual interface for giving the computer commands [py-002]. Terminal is the app that shows it to you." } },
    say("nib", "The computer keeps files in folders, also called [[directory|directories]]. The shell always stands in one of them. That folder is the [[working directory]]."),
    say("byte", "Three magic words. `pwd` prints the working directory. `ls` lists what is in it. `cd` changes it [py-003]. BEEP. I said them in order of how much I like them."),
    say("nib", "Your own Mac has a [[home folder]] with your user name on it. In Apple's example, user johnappleseed lives at `/Users/johnappleseed` [py-231]. The shell often writes that folder as `~`, short for home [py-229]."),
    { ask: { q: "Your prompt ends in `~$`. Where is the shell standing?", choices: ["In your home folder", "At the very top folder, `/`", "Nowhere yet"], answer: 0,
      why: "`~` is short for home [py-229]. On a Mac the home folder sits inside the Users folder and carries your user name [py-230]." } },
    { toy: "foldermap", goal: "Make a folder named `codepix` inside `apprentice`, then walk into it." },
    say("nib", "A [[path]] is directions to a folder. In a path, `.` means the folder you are in and `..` means the folder above it [py-004]."),
    { ask: { q: "You are in `/office/apprentice`. What does `cd ..` do?", choices: ["Moves you up to `/office`", "Moves you into a folder named `..`", "Goes back to the last command"], answer: 0,
      why: "`..` means the parent directory [py-004], so `cd ..` walks up one level." } },
    say("nib", "A path that starts with `/` is absolute. It starts from the very top. Any other path is relative, read from where you stand right now [py-005].", "think"),
    { ask: { q: "Which of these is an absolute path?", choices: ["`office/gridlock`", "`../gridlock`", "`/office/gridlock`"], answer: 2,
      why: "It starts with `/`, so it is absolute [py-005]. The other two are relative to the working directory." } },
    say("byte", "One more. `mkdir` makes a folder, `mv` moves or renames, and `cp` copies [py-007]. I like `mkdir`. It makes rooms."),
    { show: ["nib", "byte", "reader"], ...say("reader", "While you are here, look at the program that greets Ms. Gridlock every morning. Three lines. I read them in order.") },
    { predict: { program: "a00_sign", q: "The office computer runs this when it starts. What does it print?",
      choices: ["GADGET GULCH Repair & Tinker Shop Back office: apprentices welcome", "GADGET GULCH\nRepair & Tinker Shop\nBack office: apprentices welcome", "print(\"GADGET GULCH\")\nprint(\"Repair & Tinker Shop\")\nprint(\"Back office: apprentices welcome\")"], answer: 1,
      why: "Each `print` line prints its text on a line of its own. The quotes and the word `print` are instructions, so they do not appear." } },
    { trace: { program: "a00_sign", note: "Watch Reader's place move down the program, one line per step." } },
    say("nib", "Next job, you install Python on your own machine so it can run programs like that one. First, your work needs a home: a folder named `codepix`."),
    { book: 0, text: "The book has this whole chapter, with sources you can click and a terminal cheat sheet." },
    { machine: ["a00-where"], text: "Open Terminal on your own computer and make your `codepix` folder." },
    { show: ["nib", "byte"], ...say("byte", "Folder made. Home sweet folder. BEEP BOOP.", "wow") },
    { sticker: true },
  ],
});
