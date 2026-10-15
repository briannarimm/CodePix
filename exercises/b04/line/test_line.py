import importlib.util
import io
import pathlib
import unittest
from contextlib import redirect_stdout


def load(name):
    """Run the learner's file quietly and hand back its module."""
    spec = importlib.util.spec_from_file_location(name[:-3], pathlib.Path(name))
    module = importlib.util.module_from_spec(spec)
    with redirect_stdout(io.StringIO()):
        spec.loader.exec_module(module)
    return module


class TestLine(unittest.TestCase):
    def setUp(self):
        self.m = load("line.py")

    def test_predict(self):
        self.assertEqual(self.m.predict(10, 40, 2.0), 90.0)
        self.assertEqual(self.m.predict(34, -4.6, 0), 34)

    def test_perfect_line_scores_zero(self):
        self.assertEqual(self.m.squared_error(1, 2, [1, 2, 3], [3, 5, 7]), 0)

    def test_shop_guesses(self):
        self.assertAlmostEqual(self.m.squared_error(20, 30, self.m.hours, self.m.costs), 1113.0)
        self.assertAlmostEqual(self.m.squared_error(10, 40, self.m.hours, self.m.costs), 168.0)


if __name__ == "__main__":
    unittest.main()
