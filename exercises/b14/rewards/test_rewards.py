import unittest

from rewards import best_shelf, new_average


class TestRewards(unittest.TestCase):
    def test_first_reward(self):
        self.assertAlmostEqual(new_average(0.0, 0, 1), 1.0)

    def test_example(self):
        self.assertAlmostEqual(new_average(0.5, 2, 1), 2 / 3)

    def test_zero_reward_pulls_down(self):
        self.assertAlmostEqual(new_average(1.0, 3, 0), 0.75)

    def test_best_shelf(self):
        self.assertEqual(best_shelf({"top": 0.2, "middle": 0.7, "bottom": 0.4}), "middle")
        self.assertEqual(best_shelf({"top": 0.9, "middle": 0.1}), "top")


if __name__ == "__main__":
    unittest.main()
