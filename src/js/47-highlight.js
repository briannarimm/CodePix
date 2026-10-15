/* A small Python colorizer for display only (no library). Code blocks are never editable. */
const PY_KW = new Set("False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(" "));
const PY_BI = new Set("print len range int float str bool list dict set tuple type input open sum min max sorted enumerate zip abs round isinstance ord chr bin hex any all map filter reversed repr self".split(" "));

function highlightPy(src) {
  const out = [];
  const rx = /(#[^\n]*)|([rbfuRBFU]{0,2}(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'))|(\b\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?\b)|([A-Za-z_]\w*)|([-+*/%=<>!&|^~@:]+)|(\s+|.)/g;
  let m, prevDef = false;
  while ((m = rx.exec(src))) {
    const [t, com, str, num, word, op] = m;
    if (com) out.push(`<span class="tk-com">${esc(com)}</span>`);
    else if (str) out.push(`<span class="tk-str">${esc(str)}</span>`);
    else if (num) out.push(`<span class="tk-num">${esc(num)}</span>`);
    else if (word) {
      if (prevDef) { out.push(`<span class="tk-def">${esc(word)}</span>`); prevDef = false; continue; }
      if (PY_KW.has(word)) { out.push(`<span class="tk-kw">${word}</span>`); prevDef = word === "def" || word === "class"; continue; }
      out.push(PY_BI.has(word) ? `<span class="tk-bi">${word}</span>` : esc(word));
    } else if (op) out.push(`<span class="tk-op">${esc(op)}</span>`);
    else out.push(esc(t));
  }
  return out.join("");
}

/** Split highlighted HTML into lines, keeping spans balanced across line breaks. */
function highlightLines(src, lang) {
  const html = lang === "py" ? highlightPy(src.replace(/\n$/, "")) : esc(src.replace(/\n$/, ""));
  const lines = [], open = [];
  let cur = "";
  html.split(/(<span[^>]*>|<\/span>|\n)/).forEach(part => {
    if (part === "\n") { cur += "</span>".repeat(open.length); lines.push(cur); cur = open.join(""); }
    else if (part.startsWith("<span")) { open.push(part); cur += part; }
    else if (part === "</span>") { open.pop(); cur += part; }
    else cur += part;
  });
  lines.push(cur);
  return lines;
}
