import io
import pathlib
import re
import unittest
from contextlib import redirect_stdout

FILE = "shipping.py"


def run_program(**values):
    """Run shipping.py, first changing the lines that set the given names (for example n = 10)."""
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


class TestShipping(unittest.TestCase):
    def fee(self, weight, member):
        return run_program(weight=weight, member=member)[0]["fee"]

    def test_light(self):
        self.assertEqual(self.fee(0.5, False), 3)

    def test_middle(self):
        self.assertEqual(self.fee(2.5, False), 7)

    def test_heavy(self):
        self.assertEqual(self.fee(8, False), 12)

    def test_edges(self):
        self.assertEqual(self.fee(1, False), 7)
        self.assertEqual(self.fee(5, False), 12)

    def test_member_free(self):
        self.assertEqual(self.fee(2.5, True), 0)

    def test_member_heavy_pays(self):
        self.assertEqual(self.fee(9, True), 12)


if __name__ == "__main__":
    unittest.main()
