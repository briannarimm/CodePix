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


class TestLearn(unittest.TestCase):
    def setUp(self):
        self.m = load("learn.py")

    def test_shop_examples(self):
        self.assertEqual(self.m.learn(self.m.examples), {"grinding": "big", "quiet": "quick", "humming": "big"})

    def test_new_examples(self):
        more = [("rattling", "quick"), ("rattling", "quick"), ("rattling", "big"), ("smoking", "big")]
        self.assertEqual(self.m.learn(more), {"rattling": "quick", "smoking": "big"})

    def test_empty(self):
        self.assertEqual(self.m.learn([]), {})


if __name__ == "__main__":
    unittest.main()
