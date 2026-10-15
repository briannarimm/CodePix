import io
import pathlib
import unittest
from contextlib import redirect_stdout


def load():
    source = pathlib.Path("counter.py").read_text(encoding="utf-8")
    ns = {"__name__": "__main__"}
    with redirect_stdout(io.StringIO()):
        exec(compile(source, "counter.py", "exec"), ns)
    return ns


class TestCounter(unittest.TestCase):
    def setUp(self):
        self.Counter = load()["Counter"]

    def test_starts_at_zero(self):
        self.assertEqual(self.Counter().count, 0)

    def test_click_adds_one(self):
        c = self.Counter()
        c.click()
        c.click()
        c.click()
        self.assertEqual(c.count, 3)

    def test_reset(self):
        c = self.Counter()
        c.click()
        c.reset()
        self.assertEqual(c.count, 0)

    def test_counters_are_separate(self):
        front, back = self.Counter(), self.Counter()
        front.click()
        self.assertEqual(front.count, 1)
        self.assertEqual(back.count, 0)


if __name__ == "__main__":
    unittest.main()
