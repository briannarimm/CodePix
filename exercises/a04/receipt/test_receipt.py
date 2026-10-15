import io
import pathlib
import re
import unittest
from contextlib import redirect_stdout

FILE = "receipt.py"


def run_program(**values):
    """Run receipt.py, first changing the lines that set the given names (for example n = 10)."""
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


class TestReceipt(unittest.TestCase):
    def test_washers(self):
        ns, out = run_program()
        self.assertEqual(out.strip(), "washer: 4 x 0.35 = 1.40")

    def test_gears(self):
        ns, out = run_program(item="gear", qty=3, each=1.5)
        self.assertEqual(out.strip(), "gear: 3 x 1.50 = 4.50")

    def test_springs(self):
        ns, out = run_program(item="spring", qty=10, each=0.2)
        self.assertEqual(out.strip(), "spring: 10 x 0.20 = 2.00")


if __name__ == "__main__":
    unittest.main()
