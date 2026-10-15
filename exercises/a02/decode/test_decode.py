import io
import pathlib
import unittest
from contextlib import redirect_stdout


class TestDecode(unittest.TestCase):
    def test_four_lines(self):
        buf = io.StringIO()
        with redirect_stdout(buf):
            source = pathlib.Path("decode.py").read_text(encoding="utf-8")
            exec(compile(source, "decode.py", "exec"), {"__name__": "__main__"})
        self.assertEqual(buf.getvalue().split(), ["0b1000001", "65", "65", "B"])


if __name__ == "__main__":
    unittest.main()
