import ast
import io
import pathlib
import unittest
from contextlib import redirect_stdout

with redirect_stdout(io.StringIO()):
    from kettle import kettle


def printed(n):
    buf = io.StringIO()
    with redirect_stdout(buf):
        kettle(n)
    return buf.getvalue()


class TestKettle(unittest.TestCase):
    def test_three(self):
        self.assertEqual(printed(3), "3...\n2...\n1...\nTea!\n")

    def test_one(self):
        self.assertEqual(printed(1), "1...\nTea!\n")

    def test_zero_is_the_base_case(self):
        self.assertEqual(printed(0), "Tea!\n")

    def test_negative_stops_too(self):
        self.assertEqual(printed(-2), "Tea!\n")

    def test_recursive_and_no_loops(self):
        tree = ast.parse(pathlib.Path("kettle.py").read_text(encoding="utf-8"))
        fn = next(n for n in ast.walk(tree) if isinstance(n, ast.FunctionDef) and n.name == "kettle")
        calls = [n for n in ast.walk(fn) if isinstance(n, ast.Call) and getattr(n.func, "id", "") == "kettle"]
        loops = [n for n in ast.walk(fn) if isinstance(n, (ast.For, ast.While))]
        self.assertTrue(calls, "kettle() should call kettle()")
        self.assertFalse(loops, "use recursion instead of a loop")


if __name__ == "__main__":
    unittest.main()
