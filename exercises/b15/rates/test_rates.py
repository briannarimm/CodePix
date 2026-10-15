import unittest

from rates import TICKETS, error_rate, rates_by_group


class TestRates(unittest.TestCase):
    def test_all_right(self):
        self.assertEqual(error_rate([("a", 1, 1), ("a", 0, 0)]), 0)

    def test_half_wrong(self):
        self.assertAlmostEqual(error_rate([("a", 1, 0), ("a", 0, 0)]), 0.5)

    def test_overall(self):
        self.assertAlmostEqual(error_rate(TICKETS), 4 / 12)

    def test_by_group(self):
        rates = rates_by_group(TICKETS)
        self.assertEqual(set(rates), {"online", "phone"})
        self.assertAlmostEqual(rates["online"], 1 / 8)
        self.assertAlmostEqual(rates["phone"], 3 / 4)


if __name__ == "__main__":
    unittest.main()
