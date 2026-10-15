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


class TestFit(unittest.TestCase):
    def setUp(self):
        self.m = load("fit.py")

    def test_shop_line(self):
        b, w = self.m.fit_line(self.m.hours, self.m.costs)
        self.assertAlmostEqual(b, 14.893, places=2)
        self.assertAlmostEqual(w, 36.751, places=2)

    def test_exact_line(self):
        b, w = self.m.fit_line([1, 2, 3], [5, 7, 9])
        self.assertAlmostEqual(b, 3.0)
        self.assertAlmostEqual(w, 2.0)


if __name__ == "__main__":
    unittest.main()
