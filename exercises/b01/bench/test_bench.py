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


class TestBench(unittest.TestCase):
    def setUp(self):
        self.m = load("bench.py")

    def test_numpy(self):
        self.assertEqual(self.m.np.__name__, "numpy")

    def test_pandas(self):
        self.assertTrue(hasattr(self.m, "pd"), "import pandas as pd")
        self.assertEqual(self.m.pd.__name__, "pandas")

    def test_matplotlib(self):
        self.assertTrue(hasattr(self.m, "plt"), "import matplotlib.pyplot as plt")
        self.assertEqual(self.m.plt.__name__, "matplotlib.pyplot")
        self.assertTrue(hasattr(self.m, "matplotlib"), "import matplotlib")

    def test_sklearn(self):
        self.assertTrue(hasattr(self.m, "sklearn"), "import sklearn")
        self.assertEqual(self.m.sklearn.__name__, "sklearn")


if __name__ == "__main__":
    unittest.main()
