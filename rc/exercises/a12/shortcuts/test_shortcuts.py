import ast
import io
import pathlib
import unittest
from contextlib import redirect_stdout


def load():
    source = pathlib.Path("shortcuts.py").read_text(encoding="utf-8")
    ns = {"__name__": "__main__"}
    with redirect_stdout(io.StringIO()):
        exec(compile(source, "shortcuts.py", "exec"), ns)
    return source, ns


def assigned_value(source, name):
    """The expression on the right of the last `name = ...` line."""
    found = None
    for node in ast.walk(ast.parse(source)):
        if isinstance(node, ast.Assign) and any(isinstance(t, ast.Name) and t.id == name for t in node.targets):
            found = node.value
    return found


class TestShortcuts(unittest.TestCase):
    def setUp(self):
        self.source, self.ns = load()

    def test_big_values(self):
        self.assertEqual(self.ns["big"], [12, 8, 30])

    def test_big_is_a_comprehension(self):
        self.assertIsInstance(assigned_value(self.source, "big"), ast.ListComp, "write big = [... for ... in ... if ...]")

    def test_loud_values(self):
        self.assertEqual(self.ns["loud"], ["GEAR", "SPRING", "BOLT"])

    def test_loud_is_a_comprehension(self):
        self.assertIsInstance(assigned_value(self.source, "loud"), ast.ListComp, "write loud = [... for ... in ...]")

    def test_by_length(self):
        self.assertEqual(self.ns["by_length"], ["gear", "bolt", "spring"])

    def test_by_length_uses_sorted(self):
        value = assigned_value(self.source, "by_length")
        self.assertTrue(isinstance(value, ast.Call) and getattr(value.func, "id", "") == "sorted", "use sorted(names, key=...)")

    def test_names_left_alone(self):
        self.assertEqual(self.ns["names"], ["gear", "spring", "bolt"])


if __name__ == "__main__":
    unittest.main()
