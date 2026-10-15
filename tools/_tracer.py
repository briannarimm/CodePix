"""Record a step-by-step trace of one program. Run by tools/gen_traces.py, never imported.

Usage: python3 -I _tracer.py PROGRAM.py OUT.json MAXSTEPS

Runs PROGRAM.py as __main__ in the current directory with sys.settrace and writes JSON:
  {"steps": [...], "heap": {...}, "out": "...", "err": "...", "truncated": bool}
Each step: {"l": line, "ev": "line"|"call"|"return"|"exc", "o": stdout length so far,
            "st": [{"fn": name, "l": line, "v": [[name, value], ...]}, ...] (outermost first),
            "h": {oid: container} only for containers that changed or were first seen}
A value is ["int", "5"] (type, repr) or ["list", None, oid] for a container shown by reference.
Must run on Python 3.9 and newer.
"""
import io, json, sys, types

prog, outpath, maxsteps = sys.argv[1], sys.argv[2], int(sys.argv[3])
src = open(prog, encoding="utf-8").read()
code = compile(src, prog, "exec")

buf = io.StringIO()
real_stdout = sys.stdout
steps, oids, heap_last = [], {}, {}
truncated = False
CONTAINERS = (list, dict, tuple, set)
SKIP_TYPES = (types.ModuleType, types.FunctionType, types.BuiltinFunctionType, type)


def oid(obj):
    k = id(obj)
    if k not in oids:
        oids[k] = (len(oids) + 1, obj)  # keep obj alive so ids are not reused
    return str(oids[k][0])


def short(r, n=60):
    return r if len(r) <= n else r[: n - 3] + "..."


def val(v, heap, depth=0):
    t = type(v).__name__
    if isinstance(v, CONTAINERS) or (hasattr(v, "__dict__") and not isinstance(v, SKIP_TYPES) and type(v).__module__ == "__main__"):
        i = oid(v)
        if i not in heap and depth < 3:
            heap[i] = None  # placeholder against cycles
            if isinstance(v, dict):
                items = [[val(k, heap, depth + 1), val(x, heap, depth + 1)] for k, x in list(v.items())[:12]]
            elif isinstance(v, (list, tuple)):
                items = [val(x, heap, depth + 1) for x in list(v)[:16]]
            elif isinstance(v, set):
                items = [val(x, heap, depth + 1) for x in sorted(v, key=repr)[:16]]
            else:
                items = [[["str", repr(k)], val(x, heap, depth + 1)] for k, x in list(vars(v).items())[:12]]
            heap[i] = {"t": t, "n": len(v) if hasattr(v, "__len__") else len(vars(v)), "items": items}
        return [t, None, i]
    if isinstance(v, SKIP_TYPES):
        return [t, short("<" + t + " " + getattr(v, "__name__", "?") + ">")]
    try:
        return [t, short(repr(v))]
    except Exception:
        return [t, "<" + t + ">"]


def frame_vars(f, heap):
    out = []
    for k, v in f.f_locals.items():
        if k.startswith("__") or isinstance(v, types.ModuleType):
            continue
        if f.f_code.co_name == "<module>" and isinstance(v, (types.FunctionType, type)):
            out.append([k, [type(v).__name__, "<" + ("function " if isinstance(v, types.FunctionType) else "class ") + v.__name__ + ">"]])
            continue
        out.append([k, val(v, heap)])
    return out


def snapshot(frame, ev, arg=None):
    global truncated
    if len(steps) >= maxsteps:
        truncated = True
        sys.settrace(None)
        raise SystemExit(0)
    stack, f = [], frame
    while f is not None:
        if f.f_code.co_filename == prog:
            stack.append(f)
        f = f.f_back
    stack.reverse()
    heap = {}
    st = [{"fn": f.f_code.co_name, "l": f.f_lineno, "v": frame_vars(f, heap)} for f in stack]
    changed = {k: v for k, v in heap.items() if heap_last.get(k) != v}
    heap_last.update(heap)
    s = {"l": frame.f_lineno, "ev": ev, "o": len(buf.getvalue()), "st": st}
    if ev == "return":
        s["rv"] = val(arg, heap)
        changed.update({k: v for k, v in heap.items() if heap_last.get(k) != v})
        heap_last.update(heap)
    if changed:
        s["h"] = changed
    steps.append(s)


def tracer(frame, event, arg):
    if frame.f_code.co_filename != prog:
        return None
    if event == "call":
        snapshot(frame, "call")
    return local


def local(frame, event, arg):
    if event == "line":
        snapshot(frame, "line")
    elif event == "return":
        snapshot(frame, "return", arg)
    elif event == "exception":
        snapshot(frame, "exc")
    return local


class Tee(io.TextIOBase):
    def write(self, s):
        buf.write(s)
        return len(s)


err = ""
g = {"__name__": "__main__", "__file__": prog, "__builtins__": __builtins__}
sys.stdout = Tee()
sys.settrace(tracer)
try:
    exec(code, g)
except SystemExit:
    pass
except BaseException as e:  # the program's own error is part of the lesson
    err = type(e).__name__ + ": " + str(e)
finally:
    sys.settrace(None)
    sys.stdout = real_stdout

json.dump({"steps": steps, "out": buf.getvalue(), "err": err, "truncated": truncated}, open(outpath, "w", encoding="utf-8"))
