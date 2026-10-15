import importlib.util
import unittest


def load():
    spec = importlib.util.spec_from_file_location("knn", "knn.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.vote


PAST = [(1, 2, "fix"), (2, 3, "fix"), (3, 2, "fix"), (4, 4, "fix"),
        (7, 8, "replace"), (8, 6, "replace"), (9, 9, "replace"), (6, 9, "replace")]


class TestVote(unittest.TestCase):
    def test_close_to_the_fix_corner(self):
        self.assertEqual(load()(PAST, (2, 2), 3), "fix")

    def test_close_to_the_replace_corner(self):
        self.assertEqual(load()(PAST, (8, 8), 3), "replace")

    def test_k_changes_the_answer(self):
        vote = load()
        self.assertEqual(vote(PAST, (5, 6), 1), "fix")
        self.assertEqual(vote(PAST, (5, 6), 3), "replace")

    def test_order_of_rows_does_not_matter(self):
        self.assertEqual(load()(list(reversed(PAST)), (2, 2), 3), "fix")


if __name__ == "__main__":
    unittest.main()
