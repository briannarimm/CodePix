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


class TestTable(unittest.TestCase):
    def setUp(self):
        try:
            self.m = load("table.py")
        except AttributeError as e:
            self.fail("load() should return X and y, not None: " + str(e))
        self.X, self.y = self.m.load("b02_tickets.csv")

    def test_X_columns(self):
        self.assertEqual(list(self.X.columns), ["hours", "parts"])
        self.assertEqual(self.X.shape, (12, 2))

    def test_y_is_cost(self):
        self.assertEqual(type(self.y).__name__, "Series")
        self.assertEqual(self.y.name, "cost")
        self.assertEqual(int(self.y.sum()), 1024)


if __name__ == "__main__":
    unittest.main()
