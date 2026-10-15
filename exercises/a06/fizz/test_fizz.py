import io
import pathlib
import re
import unittest
from contextlib import redirect_stdout

FILE = "fizz.py"


def run_program(**values):
    """Run fizz.py, first changing the lines that set the given names (for example n = 10)."""
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


def expected(last):
    words = []
    for n in range(1, last + 1):
        words.append("FizzBuzz" if n % 15 == 0 else "Fizz" if n % 3 == 0 else "Buzz" if n % 5 == 0 else str(n))
    return words


class TestFizz(unittest.TestCase):
    def test_fifteen(self):
        self.assertEqual(run_program()[1].split(), expected(15))

    def test_thirty(self):
        self.assertEqual(run_program(last=30)[1].split(), expected(30))

    def test_first_lines(self):
        self.assertEqual(run_program(last=5)[1].split(), ["1", "2", "Fizz", "4", "Buzz"])


if __name__ == "__main__":
    unittest.main()
