import ast
import io
import pathlib
import unittest
from contextlib import redirect_stdout

with redirect_stdout(io.StringIO()):
    from total import total


def total_function():
    tree = ast.parse(pathlib.Path("total.py").read_text(encoding="utf-8"))
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef) and node.name == "total":
            return node
    raise AssertionError("total.py has no function named total")


class TestTotal(unittest.TestCase):
    def test_three_prices(self):
        self.assertEqual(total([2.5, 4.0, 1.5]), 8.0)

    def test_empty_list_is_zero(self):
        self.assertEqual(total([]), 0)

    def test_one_price(self):
        self.assertEqual(total([7]), 7)

    def test_whole_numbers(self):
        self.assertEqual(total([1, 2, 3, 4, 5]), 15)

    def test_calls_itself(self):
        calls = [n for n in ast.walk(total_function()) if isinstance(n, ast.Call) and getattr(n.func, "id", "") == "total"]
        self.assertTrue(calls, "total() should call total() on the rest of the list")

    def test_no_loops_or_sum(self):
        fn = total_function()
        loops = [n for n in ast.walk(fn) if isinstance(n, (ast.For, ast.While))]
        sums = [n for n in ast.walk(fn) if isinstance(n, ast.Call) and getattr(n.func, "id", "") == "sum"]
        self.assertFalse(loops, "use recursion instead of a loop")
        self.assertFalse(sums, "use recursion instead of sum()")


if __name__ == "__main__":
    unittest.main()
