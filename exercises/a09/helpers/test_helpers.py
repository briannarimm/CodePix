import unittest

import helpers


class TestIsEven(unittest.TestCase):
    def test_even(self):
        self.assertEqual(helpers.is_even(4), True)

    def test_odd(self):
        self.assertEqual(helpers.is_even(7), False)

    def test_zero(self):
        self.assertEqual(helpers.is_even(0), True)


class TestAverage(unittest.TestCase):
    def test_three(self):
        self.assertEqual(helpers.average([30, 45, 15]), 30)

    def test_one(self):
        self.assertEqual(helpers.average([8]), 8)


class TestClamp(unittest.TestCase):
    def test_inside(self):
        self.assertEqual(helpers.clamp(5, 0, 10), 5)

    def test_low(self):
        self.assertEqual(helpers.clamp(-3, 0, 10), 0)

    def test_high(self):
        self.assertEqual(helpers.clamp(99, 0, 10), 10)


if __name__ == "__main__":
    unittest.main()
