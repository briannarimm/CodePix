import unittest

from unit import relu, weighted_sum


class TestUnit(unittest.TestCase):
    def test_book_example(self):
        z = weighted_sum([0.2, 0.3, 0.9], [0.5, 0.6, 0.1], 0.5)
        self.assertAlmostEqual(z, 0.87)

    def test_bias_alone(self):
        self.assertAlmostEqual(weighted_sum([1, 1], [0, 0], -1.5), -1.5)

    def test_two_inputs(self):
        self.assertAlmostEqual(weighted_sum([2, -1], [3, 4], 0.5), 2.5)

    def test_relu_positive(self):
        self.assertEqual(relu(3), 3)

    def test_relu_negative(self):
        self.assertEqual(relu(-2), 0)


if __name__ == "__main__":
    unittest.main()
