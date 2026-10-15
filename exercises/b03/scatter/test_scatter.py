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


class TestScatter(unittest.TestCase):
    def test_runs(self):
        m = load("plot_tickets.py")
        self.assertEqual(len(m.hours), len(m.costs))


if __name__ == "__main__":
    unittest.main()
