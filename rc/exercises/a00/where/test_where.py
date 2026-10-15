import io
import os
import pathlib
import unittest
from contextlib import redirect_stdout


class TestWhere(unittest.TestCase):
    def test_prints_the_working_directory(self):
        buf = io.StringIO()
        with redirect_stdout(buf):
            source = pathlib.Path("where.py").read_text(encoding="utf-8")
            exec(compile(source, "where.py", "exec"), {"__name__": "__main__"})
        self.assertEqual(buf.getvalue().strip(), os.getcwd())

    def test_lives_next_to_this_test(self):
        self.assertTrue(pathlib.Path("where.py").exists(), "Run this from the folder that holds where.py")


if __name__ == "__main__":
    unittest.main()
