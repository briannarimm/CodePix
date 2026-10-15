import importlib.util
import unittest


def load():
    spec = importlib.util.spec_from_file_location("wordcount", "wordcount.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class TestWordCount(unittest.TestCase):
    def test_tokens_lowercase_and_clean(self):
        self.assertEqual(load().tokens("Fix THE fan, please!"), ["fix", "the", "fan", "please"])

    def test_bag_counts_words(self):
        self.assertEqual(load().bag("fan hums. Fan rattles"), {"fan": 2, "hums": 1, "rattles": 1})

    def test_pairs_counts_neighbors(self):
        got = load().pairs("the fan hums the fan")
        self.assertEqual(got[("the", "fan")], 2)
        self.assertEqual(got[("fan", "hums")], 1)
        self.assertEqual(len(got), 3)

    def test_one_word_has_no_pairs(self):
        self.assertEqual(load().pairs("Hello"), {})


if __name__ == "__main__":
    unittest.main()
