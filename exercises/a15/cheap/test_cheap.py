import io
import unittest
from contextlib import redirect_stdout

with redirect_stdout(io.StringIO()):
    from cheap import first_under


class TestFirstUnder(unittest.TestCase):
    def test_finds_first_cheap_part(self):
        self.assertEqual(first_under([12.5, 9.0, 30.0, 4.75, 3.5], 5), (3, 4))

    def test_first_bin_is_one_look(self):
        self.assertEqual(first_under([2.0, 50.0], 5), (0, 1))

    def test_nothing_cheap_enough_looks_everywhere(self):
        self.assertEqual(first_under([12.5, 9.0, 30.0], 1), (-1, 3))

    def test_empty_shelf(self):
        self.assertEqual(first_under([], 5), (-1, 0))

    def test_equal_price_is_not_under(self):
        self.assertEqual(first_under([5, 4], 5), (1, 2))


if __name__ == "__main__":
    unittest.main()
