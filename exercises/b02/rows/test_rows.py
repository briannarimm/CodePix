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


class TestRows(unittest.TestCase):
    def setUp(self):
        self.m = load("rows.py")

    def test_shop_tickets(self):
        X, y = self.m.split_tickets(self.m.tickets)
        self.assertEqual(X, [[0.5, 1], [1.0, 0], [1.5, 2]])
        self.assertEqual(y, [42, 48, 78])

    def test_one_row_per_ticket(self):
        X, y = self.m.split_tickets([["T99", 2.0, 3, 101]])
        self.assertEqual(X, [[2.0, 3]])
        self.assertEqual(y, [101])

    def test_no_tickets(self):
        self.assertEqual(self.m.split_tickets([]), ([], []))


if __name__ == "__main__":
    unittest.main()
