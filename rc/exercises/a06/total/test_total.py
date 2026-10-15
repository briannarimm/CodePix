import io
import pathlib
import re
import unittest
from contextlib import redirect_stdout

FILE = "total.py"


def run_program(**values):
    """Run total.py, first changing the lines that set the given names (for example n = 10)."""
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


class TestTotal(unittest.TestCase):
    def test_ten(self):
        self.assertEqual(run_program()[1].strip(), "Sum: 55")

    def test_one(self):
        self.assertEqual(run_program(n=1)[0]["total"], 1)

    def test_hundred(self):
        self.assertEqual(run_program(n=100)[0]["total"], 5050)

    def test_uses_a_loop(self):
        source = pathlib.Path(FILE).read_text(encoding="utf-8")
        self.assertTrue("for " in source or "while " in source, "use a for or while loop")
        self.assertNotIn("sum(", source, "write the loop yourself this time")


if __name__ == "__main__":
    unittest.main()
