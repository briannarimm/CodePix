import unittest

from nextword import NOTES, count_pairs, most_likely


class TestNextWord(unittest.TestCase):
    def test_small_example(self):
        got = count_pairs(["the fan hums", "the fan rattles"])
        self.assertEqual(got, {"the": {"fan": 2}, "fan": {"hums": 1, "rattles": 1}})

    def test_shop_notes(self):
        counts = count_pairs(NOTES)
        self.assertEqual(counts["the"], {"fan": 3, "lamp": 1})
        self.assertEqual(counts["rattles"], {"loudly": 1})

    def test_most_likely(self):
        counts = count_pairs(NOTES)
        self.assertEqual(most_likely(counts, "the"), "fan")
        self.assertEqual(most_likely(counts, "fan"), "rattles")

    def test_dead_end(self):
        counts = count_pairs(NOTES)
        self.assertIsNone(most_likely(counts, "loudly"))
        self.assertIsNone(most_likely(counts, "toaster"))


if __name__ == "__main__":
    unittest.main()
