# codepix: output-only
# Work out shop expressions one step at a time and print each step as JSON.
# The Expression Tree toy draws these steps. Python works out every value.
import ast
import json

EXPRESSIONS = [
    "2 + 3 * 4",
    "(2 + 3) * 4",
    "17 // 5 + 17 % 5",
    "-3 ** 2",
    "20 - 4.25 * 2",
    "round(7 / 2)",
    "'=' * 3 + ' TOTAL ' + '=' * 3",
    "len('sprocket') * 2 - 1",
]

SYMBOLS = {
    ast.Add: "+", ast.Sub: "-", ast.Mult: "*", ast.Div: "/", ast.FloorDiv: "//",
    ast.Mod: "%", ast.Pow: "**", ast.USub: "-", ast.Not: "not",
}


def is_literal(node):
    if isinstance(node, ast.Constant):
        return True
    return isinstance(node, ast.UnaryOp) and isinstance(node.op, ast.USub) and isinstance(node.operand, ast.Constant)


def children(node):
    if is_literal(node):
        return []
    if isinstance(node, ast.BinOp):
        return [node.left, node.right]
    if isinstance(node, ast.UnaryOp):
        return [node.operand]
    if isinstance(node, ast.Call):
        return list(node.args)
    raise ValueError("unsupported: " + ast.dump(node))


def label(node):
    if is_literal(node):
        return ast.unparse(node)
    if isinstance(node, ast.Call):
        return node.func.id + "()"
    return SYMBOLS[type(node.op)]


def find_ready(node):
    # Python works out the left side before the right side.
    for child in children(node):
        found = find_ready(child)
        if found is not None:
            return found
    if not is_literal(node) and all(is_literal(c) for c in children(node)):
        return node
    return None


def tree(node, hot):
    return [label(node), 1 if node is hot else 0] + [tree(c, hot) for c in children(node)]


class Swap(ast.NodeTransformer):
    def __init__(self, target, value):
        self.target, self.value = target, value

    def visit(self, node):
        if node is self.target:
            return ast.Constant(self.value)
        return self.generic_visit(node)


for start in EXPRESSIONS:
    text, steps = start, []
    while True:
        root = ast.parse(text, mode="eval")
        hot = find_ready(root.body)
        step = {"text": text, "tree": tree(root.body, hot)}
        if hot is None:
            steps.append(step)
            break
        value = eval(compile(ast.Expression(hot), "<step>", "eval"))
        step["span"] = [hot.col_offset, hot.end_col_offset]
        step["value"] = repr(value)
        steps.append(step)
        text = ast.unparse(Swap(hot, value).visit(root))
    print(json.dumps({"expr": start, "value": repr(eval(start)), "steps": steps}))
