import ast
import inspect
import unittest

import xor as program


class TestXor(unittest.TestCase):
    def test_truth_table(self):
        table = {(0, 0): 0, (0, 1): 1, (1, 0): 1, (1, 1): 0}
        for (x1, x2), want in table.items():
            with self.subTest(x1=x1, x2=x2):
                self.assertEqual(program.xor(x1, x2), want)

    def test_units_only(self):
        tree = ast.parse(inspect.getsource(program.xor))
        for node in ast.walk(tree):
            self.assertNotIsInstance(node, (ast.If, ast.IfExp), "use units, not if")
            self.assertNotIsInstance(node, ast.BitXor, "use units, not ^")
            self.assertNotIsInstance(node, ast.NotEq, "use units, not !=")


if __name__ == "__main__":
    unittest.main()
