import unittest

from report import MODEL_CARD, f1, precision, recall


class TestReport(unittest.TestCase):
    def test_precision(self):
        self.assertAlmostEqual(precision(4, 1), 0.8)

    def test_recall(self):
        self.assertAlmostEqual(recall(4, 2), 4 / 6)

    def test_f1_from_sklearn_docs_example(self):
        # precision 1.0 and recall 0.5 give an F1 of 2/3
        self.assertAlmostEqual(f1(1.0, 0.5), 2 / 3)

    def test_nothing_flagged(self):
        self.assertEqual(precision(0, 0), 0.0)
        self.assertEqual(recall(0, 0), 0.0)
        self.assertEqual(f1(0.0, 0.0), 0.0)

    def test_model_card_is_filled_in(self):
        for field in ("data", "intended_use", "limits"):
            with self.subTest(field=field):
                self.assertIn(field, MODEL_CARD)
                self.assertGreaterEqual(len(MODEL_CARD[field].split()), 3, "write at least a few words")


if __name__ == "__main__":
    unittest.main()
