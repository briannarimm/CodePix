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


class TestDescent(unittest.TestCase):
    def setUp(self):
        self.m = load("descent.py")

    def test_mse_perfect(self):
        self.assertAlmostEqual(self.m.mse(1, 2, [1, 2, 3], [3, 5, 7]), 0)

    def test_mse_value(self):
        # guesses 3, 5 against 4, 7: mistakes 1 and 2, squares 1 and 4, average 2.5
        self.assertAlmostEqual(self.m.mse(1, 2, [1, 2], [4, 7]), 2.5)

    def test_step_goes_downhill(self):
        xs, ys = self.m.hours, self.m.costs
        before = self.m.mse(0, 0, xs, ys)
        b, w = self.m.step(0, 0, xs, ys, 0.05)
        self.assertLess(self.m.mse(b, w, xs, ys), before)

    def test_reaches_bottom(self):
        b, w = 0.0, 0.0
        for i in range(200):
            b, w = self.m.step(b, w, self.m.hours, self.m.costs, 0.05)
        self.assertAlmostEqual(b, 14.87, places=1)
        self.assertAlmostEqual(w, 38.47, places=1)


if __name__ == "__main__":
    unittest.main()
