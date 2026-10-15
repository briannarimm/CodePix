import importlib.util
import unittest


def load():
    spec = importlib.util.spec_from_file_location("sigmoid", "sigmoid.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class TestSigmoid(unittest.TestCase):
    def test_zero_gives_one_half(self):
        self.assertAlmostEqual(load().sigmoid(0), 0.5)

    def test_matches_known_values(self):
        s = load().sigmoid
        self.assertAlmostEqual(s(2), 0.881, places=3)
        self.assertAlmostEqual(s(-2), 0.119, places=3)

    def test_always_between_zero_and_one(self):
        s = load().sigmoid
        for z in [-30, -5, -0.1, 0.1, 5, 30]:
            self.assertTrue(0 < s(z) < 1, z)

    def test_decide(self):
        decide = load().decide
        self.assertEqual(decide(0.9), "yes")
        self.assertEqual(decide(0.5), "yes")
        self.assertEqual(decide(0.2), "no")
        self.assertEqual(decide(0.6, threshold=0.8), "no")


if __name__ == "__main__":
    unittest.main()
