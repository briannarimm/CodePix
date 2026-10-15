/* "Go to your machine": the exercise panel. The app never runs code. It gives files, steps and commands,
   records the learner's own "I ran it" tick, and can compare pasted output as plain text. */

const normOut = s => String(s || "").replace(/\r\n/g, "\n").split("\n").map(l => l.replace(/\s+$/, "")).join("\n").replace(/^\n+|\n+$/g, "");

const MACHINE = {
  open(ids) {
    ids = (Array.isArray(ids) ? ids : [ids]).filter(id => DATA.exercises[id]);
    if (!ids.length) { toast("No exercise files for this step yet."); return null; }
    const body = el("div.machine");
    const tabs = el("div.tabs", { role: "tablist" });
    const pane = el("div");
    const show = id => {
      $$("button", tabs).forEach(b => b.setAttribute("aria-selected", b.dataset.id === id ? "true" : "false"));
      pane.innerHTML = ""; pane.append(this.panel(DATA.exercises[id]));
    };
    if (ids.length > 1) ids.forEach(id => tabs.append(el("button", { type: "button", role: "tab", "data-id": id, "data-hint": "Show this exercise", onclick: () => show(id) }, (S.ran[id] ? "✔︎ " : "") + DATA.exercises[id].title)));
    body.append(tabs, pane);
    show(ids[0]);
    return UI.win({ title: "Go to your machine", body, color: "var(--lime-d)", color2: "#2f5a08" });
  },

  panel(ex) {
    const box = el("div.page");
    const L = LV[ex.level];
    const dir = `~/codepix/${ex.level}/${ex.path.split("/").filter(Boolean).pop()}`;
    box.append(el("p.kicker", {}, (L ? `${UI.label(L)} · ${L.title}` : ex.level) + (ex.kind === "test" ? " · make the tests pass" : ex.kind === "predict" ? " · predict, then run" : " · explore")));
    box.append(el("h2", {}, ex.title));
    box.append(el("div", { html: ex.prompt.split(/\n\n+/).map(p => `<p>${rich(p)}</p>`).join("") }));
    const ol = el("ol.steps");
    // 1. files
    const files = el("div.files");
    ex.files.forEach(f => files.append(el("a.btn.small.sky", { href: ex.path + f, download: f, "data-hint": "Download " + f + " (fictional data only)" }, "⬇ " + f)));
    files.append(el("a.btn.small.plain", { href: `exercises/${ex.level}.zip`, download: `codepix-${ex.level}.zip`, "data-hint": "Download every file for this job as one zip" }, `⬇ All ${ex.level} files (.zip)`));
    const starter = el("details.alt", {}, el("summary", { "data-hint": "Show the starter code to copy instead of downloading" }, `Or copy the starter code for ${ex.file}`));
    const sd = el("div"); sd.append(codeBlock(ex.starter_src, { file: ex.file })); starter.append(sd);
    ol.append(el("li", {}, el("b", {}, "Get the files. "), "Download them, or copy the starter code into a new file with the same name.", files, starter));
    // 2. folder
    const name = ex.files.join(" ");
    ol.append(el("li", {}, el("b", {}, "Put them in a folder and open it. "), "In Terminal, make a folder for this exercise, move the downloads into it, and open it in VS Code.",
      osTabs({
        mac: [{ term: [[`mkdir -p ${dir}`, "Make the folder (and any missing folders above it)."], [`cd ${dir}`, "Move into it."], [`mv ${ex.files.map(f => "~/Downloads/" + f).join(" ")} .`, "Move the downloaded files here. The dot means this folder."], ["code .", "Open this folder in VS Code."]] }],
        linux: [{ term: [[`mkdir -p ${dir}`, "Make the folder."], [`cd ${dir}`, "Move into it."], [`mv ${ex.files.map(f => "~/Downloads/" + f).join(" ")} .`, "Move the downloaded files here."], ["code .", "Open this folder in VS Code."]] }],
        win: [{ honest: "Windows terminal steps are still being checked against sources for the next beta. For now, make a folder named " + dir.replace("~/", "codepix\\").replace(/\//g, "\\") + " in your user folder with File Explorer, move " + name + " into it, and open the folder in VS Code with File, Open Folder. Then use VS Code's own terminal (Terminal, New Terminal) for the next step, and type python where this page says python3." }],
      })));
    // 3. edit
    ol.append(el("li", {}, el("b", {}, "Edit. "), el("span", { html: rich(`Open \`${ex.file}\` in VS Code and follow the comments in it. Save the file.`) })));
    // 4. run
    const cmds = [[ex.run_command, ex.kind === "test" ? "Run the tests. When every test passes, you are done." : "Run your program."]];
    if (ex.kind === "test" && ex.expected_output != null) cmds.push([`python3 ${ex.file}`, "Run the program itself to see what it prints."]);
    ol.append(el("li", {}, el("b", {}, "Run it. "), "In the terminal, inside the folder:", termBlock(cmds)));
    box.append(ol);

    // I ran it
    const after = el("div", { hidden: S.ran[ex.id] ? null : true, html: ex.explain_after ? `<h3>What just happened</h3>${ex.explain_after.split(/\n\n+/).map(p => `<p>${rich(p)}</p>`).join("")}` : "" });
    const cb = el("input", { type: "checkbox", checked: S.ran[ex.id] ? true : null, "data-hint": "Tick this when you have run it on your machine. Code Pix cannot see your computer, so this is on your honor." });
    cb.onchange = () => {
      if (cb.checked) { S.ran[ex.id] = new Date().toISOString().slice(0, 10); SND.play("ok"); UI.award("ran-first"); if (Object.keys(S.ran).length >= 10) UI.award("ran-ten"); }
      else delete S.ran[ex.id];
      save(); after.hidden = !cb.checked;
    };
    box.append(el("label.ran", {}, cb, ex.kind === "test" ? "I ran it and every test passed." : "I ran it on my machine."), after);

    // compare
    if (ex.expected_output != null) {
      const ta = el("textarea", { "aria-label": "Paste your program's output here", "data-hint": "Paste what your program printed. Code Pix compares the text only; it never runs anything." , placeholder: "Paste what " + ex.file + " printed here" });
      const verdict = el("div", { role: "status" });
      const cmp = el("button.btn.small.sky", { type: "button", "data-hint": "Compare your pasted output with the expected output" }, "Compare");
      cmp.onclick = () => {
        const a = normOut(ta.value), b = normOut(ex.expected_output);
        verdict.innerHTML = "";
        if (!a) { verdict.append(el("div.verdict.bad", {}, "Paste your output first.")); return; }
        if (a === b) { verdict.append(el("div.verdict.good", { html: "<span class='ok-mark'></span>It matches the expected output exactly (ignoring spaces at line ends)." })); SND.play("ok"); return; }
        const al = a.split("\n"), bl = b.split("\n");
        const k = al.findIndex((l, i) => l !== bl[i]);
        const at = k < 0 ? Math.min(al.length, bl.length) : k;
        verdict.append(el("div.verdict.bad", { html: `<span class='no-mark'></span>Not the same yet. The first difference is on line ${at + 1}.` }),
          el("div.diff", {}, `Yours:    ${al[at] == null ? "(nothing)" : al[at]}\nExpected: ${bl[at] == null ? "(nothing)" : bl[at]}`));
      };
      box.append(el("h3", {}, "Compare your output (optional)"), ta, el("p", {}, cmp), verdict);
    }

    // hints and solution
    const hints = el("div.hints");
    const shown = () => S.hints[ex.id] || 0;
    const drawHints = () => {
      hints.innerHTML = "";
      ex.hints.slice(0, shown()).forEach((h, i) => hints.append(el("div.h", { html: `<b>Hint ${i + 1}.</b> ${rich(h)}` })));
      if (shown() < ex.hints.length) hints.append(el("button.btn.small.lemon", { type: "button", "data-hint": "Show the next hint. Each one gives a little more away.", onclick: () => { S.hints[ex.id] = shown() + 1; save(); drawHints(); } }, `Show hint ${shown() + 1} of ${ex.hints.length}`));
      else {
        const sol = el("div");
        const sb = el("button.btn.small.pink", { type: "button", "data-hint": "Show a reference solution. There is no penalty; many answers are right." }, "Show a solution");
        sb.onclick = async () => {
          S.sol[ex.id] = true; save();
          sol.innerHTML = "";
          try {
            const r = await fetch(ex.path + ex.solution);
            if (!r.ok) throw new Error(r.status);
            sol.append(codeBlock(await r.text(), { file: ex.solution }));
          } catch (e) { sol.append(el("p", {}, el("a", { href: ex.path + ex.solution, download: ex.solution }, "Download the solution file"))); }
          sol.append(el("p.honest", {}, "This is one working answer. Yours can look different and still pass the tests."));
        };
        hints.append(sb, sol);
      }
    };
    drawHints();
    box.append(el("h3", {}, "Stuck?"), hints, el("p", { html: rich("Seeing an error? The **Help!** tool in the toolbox lists fixes for common problems.") }));
    return box;
  },
};
