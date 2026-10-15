import io
import pathlib
import re
import unittest
from contextlib import redirect_stdout

FILE = "change.py"


def run_program(**values):
    """Run change.py, first changing the lines that set the given names (for example n = 10)."""
    source = pathlib.Path(FILE).read_text(encoding="utf-8")
    for name, value in values.items():
        source, count = re.subn(r"^" + name + r"\s*=.*$", name + " = " + repr(value), source, count=1, flags=re.M)
        if count != 1:
            raise AssertionError(FILE + " needs a line that starts with " + name + " =")
    buf = io.StringIO()
    namespace = {"__name__": "__main__"}
    with redirect_stdout(buf):
        exec(compile(source, FILE, "exec"), namespace)
    return namespace, buf.getvalue()


class TestChange(unittest.TestCase):
    def test_shop_example(self):
        ns, out = run_program()
        self.assertEqual(ns["dollars"], 6)
        self.assertEqual(ns["cents"], 25)
        self.assertEqual(out.strip(), "Change: 6 dollars and 25 cents")

    def test_one_cent(self):
        ns, out = run_program(price=999, paid=1000)
        self.assertEqual((ns["dollars"], ns["cents"]), (0, 1))

    def test_whole_dollars(self):
        ns, out = run_program(price=500, paid=2000)
        self.assertEqual((ns["dollars"], ns["cents"]), (15, 0))


if __name__ == "__main__":
    unittest.main()
