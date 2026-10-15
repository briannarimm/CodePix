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


class TestBins(unittest.TestCase):
    def setUp(self):
        self.m = load("bins.py")

    def test_shop_costs(self):
        self.assertEqual(self.m.count_bins(self.m.costs, 40), {0: 1, 40: 6, 80: 2, 120: 2, 160: 1})

    def test_wider_bins(self):
        self.assertEqual(self.m.count_bins(self.m.costs, 100), {0: 8, 100: 4})

    def test_edges_go_up(self):
        self.assertEqual(self.m.count_bins([39, 40], 40), {0: 1, 40: 1})

    def test_sorted(self):
        self.assertEqual(list(self.m.count_bins([150, 10, 90], 50)), [0, 50, 150])


if __name__ == "__main__":
    unittest.main()
