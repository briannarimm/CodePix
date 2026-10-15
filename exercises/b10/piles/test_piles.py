import importlib.util
import unittest


def load():
    spec = importlib.util.spec_from_file_location("piles", "piles.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class TestPiles(unittest.TestCase):
    def test_assign_picks_the_nearest(self):
        m = load()
        self.assertEqual(m.assign([(0, 0), (9, 9), (1, 0)], [(0, 0), (10, 10)]), [0, 1, 0])

    def test_assign_one_label_per_point(self):
        m = load()
        self.assertEqual(len(m.assign([(1, 1)] * 5, [(0, 0), (5, 5)])), 5)

    def test_move_takes_the_average(self):
        m = load()
        new = m.move([(0, 0), (2, 2), (10, 10), (12, 14)], [0, 0, 1, 1], 2)
        self.assertEqual([tuple(c) for c in new], [(1.0, 1.0), (11.0, 12.0)])

    def test_settles_on_the_screws(self):
        m = load()
        screws = [(10, 2), (12, 3), (11, 2), (30, 6), (32, 5), (29, 6)]
        c = [(10, 2), (12, 3)]
        for _ in range(3):
            labels = m.assign(screws, c)
            c = m.move(screws, labels, 2)
        self.assertEqual(labels, [0, 0, 0, 1, 1, 1])


if __name__ == "__main__":
    unittest.main()
