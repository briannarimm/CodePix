import os
import tempfile
import unittest

from tracker import add, load_stock, low_stock, remove, save_stock


class TestTracker(unittest.TestCase):
    def setUp(self):
        self.stock = {"spring": 14, "gear": 3, "bolt": 40, "washer": 2}

    def test_add_existing_part(self):
        add(self.stock, "gear", 10)
        self.assertEqual(self.stock["gear"], 13)

    def test_add_new_part_starts_at_zero(self):
        add(self.stock, "sprocket", 4)
        self.assertEqual(self.stock["sprocket"], 4)

    def test_remove_some(self):
        self.assertTrue(remove(self.stock, "bolt", 5))
        self.assertEqual(self.stock["bolt"], 35)

    def test_remove_too_many_changes_nothing(self):
        self.assertFalse(remove(self.stock, "washer", 3))
        self.assertEqual(self.stock["washer"], 2)

    def test_remove_unknown_part(self):
        self.assertFalse(remove(self.stock, "zipper", 1))
        self.assertNotIn("zipper", self.stock)

    def test_low_stock_is_sorted(self):
        self.assertEqual(low_stock(self.stock), ["gear", "washer"])

    def test_low_stock_with_a_limit(self):
        self.assertEqual(low_stock(self.stock, limit=15), ["gear", "spring", "washer"])

    def test_save_then_load(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = os.path.join(tmp, "stock.json")
            save_stock(self.stock, path)
            self.assertEqual(load_stock(path), self.stock)


if __name__ == "__main__":
    unittest.main()
