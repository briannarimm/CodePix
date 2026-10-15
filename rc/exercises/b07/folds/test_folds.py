import importlib.util
import unittest


def load():
    spec = importlib.util.spec_from_file_location("folds", "folds.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.folds


ITEMS = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10"]


class TestFolds(unittest.TestCase):
    def test_one_round_per_part(self):
        self.assertEqual(len(load()(ITEMS, 5)), 5)

    def test_every_item_validated_exactly_once(self):
        seen = []
        for validate, train in load()(ITEMS, 5):
            seen.extend(validate)
        self.assertEqual(sorted(seen), sorted(ITEMS))

    def test_train_never_contains_the_validation_part(self):
        for validate, train in load()(ITEMS, 5):
            self.assertEqual(len(validate) + len(train), len(ITEMS))
            for item in validate:
                self.assertNotIn(item, train)

    def test_first_round_in_order(self):
        validate, train = load()(ITEMS, 5)[0]
        self.assertEqual(validate, ["T1", "T2"])
        self.assertEqual(train, ITEMS[2:])


if __name__ == "__main__":
    unittest.main()
