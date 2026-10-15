import io
import pathlib
import re
import unittest
from contextlib import redirect_stdout

FILE = "vowels.py"


def run_program(**values):
    """Run vowels.py, first changing the lines that set the given names (for example n = 10)."""
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


class TestVowels(unittest.TestCase):
    def count(self, word):
        return run_program(word=word)[0]["count"]

    def test_screwdriver(self):
        self.assertEqual(run_program()[1].strip(), "Vowels: 3")

    def test_toaster(self):
        self.assertEqual(self.count("toaster"), 3)

    def test_no_vowels(self):
        self.assertEqual(self.count("rhythm"), 0)

    def test_all_vowels(self):
        self.assertEqual(self.count("aeiou"), 5)

    def test_empty(self):
        self.assertEqual(self.count(""), 0)


if __name__ == "__main__":
    unittest.main()
