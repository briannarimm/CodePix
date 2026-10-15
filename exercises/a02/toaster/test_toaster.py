import io
import pathlib
import unittest
from contextlib import redirect_stdout


class TestToaster(unittest.TestCase):
    def lines(self):
        buf = io.StringIO()
        with redirect_stdout(buf):
            source = pathlib.Path("toaster.py").read_text(encoding="utf-8")
            exec(compile(source, "toaster.py", "exec"), {"__name__": "__main__"})
        return buf.getvalue().split()

    def test_first_letter(self):
        self.assertEqual(self.lines()[:1], ["H"])

    def test_three_letters(self):
        self.assertEqual(len(self.lines()), 3, "Print one letter per line, three lines in all")

    def test_the_message(self):
        self.assertEqual("".join(self.lines()), "HOT")

    def test_decoded_with_python(self):
        source = pathlib.Path("toaster.py").read_text(encoding="utf-8")
        self.assertGreaterEqual(source.count("chr("), 3, "Let chr() do the decoding for every letter")


if __name__ == "__main__":
    unittest.main()
