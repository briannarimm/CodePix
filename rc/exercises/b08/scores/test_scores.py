import importlib.util
import unittest


def load():
    spec = importlib.util.spec_from_file_location("scores", "scores.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class TestScores(unittest.TestCase):
    def test_count(self):
        m = load()
        self.assertEqual(m.count([1, 0, 1, 0], [1, 1, 0, 0]), (1, 1, 1, 1))
        self.assertEqual(m.count([1, 1, 0], [1, 1, 0]), (2, 0, 0, 1))

    def test_precision_and_recall(self):
        m = load()
        self.assertAlmostEqual(m.precision(3, 1), 0.75)
        self.assertAlmostEqual(m.recall(1, 1), 0.5)

    def test_no_crash_on_zero(self):
        m = load()
        self.assertEqual(m.precision(0, 0), 0.0)
        self.assertEqual(m.recall(0, 0), 0.0)

    def test_baseline(self):
        m = load()
        self.assertAlmostEqual(m.baseline([0, 0, 0, 1]), 0.75)
        self.assertAlmostEqual(m.baseline([1, 1, 0]), 2 / 3)


if __name__ == "__main__":
    unittest.main()
