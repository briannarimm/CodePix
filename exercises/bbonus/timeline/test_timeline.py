import unittest

from timeline import EVENTS, in_order, span


class TestTimeline(unittest.TestCase):
    def test_sorted(self):
        years = [year for year, _ in in_order(EVENTS)]
        self.assertEqual(years, [1958, 1959, 1986, 2017])

    def test_original_untouched(self):
        before = list(EVENTS)
        in_order(EVENTS)
        self.assertEqual(EVENTS, before)

    def test_span(self):
        self.assertEqual(span(EVENTS), 59)
        self.assertEqual(span([(2000, "a"), (2001, "b")]), 1)


if __name__ == "__main__":
    unittest.main()
