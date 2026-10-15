import io
import pathlib
import unittest
from contextlib import redirect_stdout


def load():
    source = pathlib.Path("drawer.py").read_text(encoding="utf-8")
    ns = {"__name__": "__main__"}
    with redirect_stdout(io.StringIO()):
        exec(compile(source, "drawer.py", "exec"), ns)
    return ns


class TestDrawer(unittest.TestCase):
    def setUp(self):
        self.ns = load()

    def test_boxes_with_leftovers(self):
        self.assertEqual(self.ns["boxes_needed"](50, 12), 5)

    def test_boxes_exact(self):
        self.assertEqual(self.ns["boxes_needed"](48, 12), 4)

    def test_boxes_one_part(self):
        self.assertEqual(self.ns["boxes_needed"](1, 12), 1)

    def test_tile_side(self):
        self.assertEqual(self.ns["tile_side"](49), 7)
        self.assertAlmostEqual(self.ns["tile_side"](2), 1.41421356, places=6)


if __name__ == "__main__":
    unittest.main()
