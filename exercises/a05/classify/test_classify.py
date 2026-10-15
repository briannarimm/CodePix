import io
import pathlib
import re
import unittest
from contextlib import redirect_stdout

FILE = "classify.py"


def run_program(**values):
    """Run classify.py, first changing the lines that set the given names (for example n = 10)."""
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


class TestClassify(unittest.TestCase):
    def test_negative(self):
        self.assertEqual(run_program(number=-4)[1].strip(), "negative")

    def test_zero(self):
        self.assertEqual(run_program(number=0)[1].strip(), "zero")

    def test_positive(self):
        self.assertEqual(run_program(number=12)[1].strip(), "positive")

    def test_small_decimal(self):
        self.assertEqual(run_program(number=0.5)[1].strip(), "positive")


if __name__ == "__main__":
    unittest.main()
