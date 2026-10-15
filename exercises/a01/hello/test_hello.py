import io
import pathlib
import unittest
from contextlib import redirect_stdout


class TestHello(unittest.TestCase):
    def output(self):
        buf = io.StringIO()
        with redirect_stdout(buf):
            source = pathlib.Path("hello.py").read_text(encoding="utf-8")
            exec(compile(source, "hello.py", "exec"), {"__name__": "__main__"})
        return buf.getvalue()

    def test_prints_something(self):
        self.assertNotEqual(self.output().strip(), "", "hello.py printed nothing. Did you save it?")

    def test_prints_the_greeting(self):
        self.assertEqual(self.output().strip(), "Hello from Gadget Gulch!")


if __name__ == "__main__":
    unittest.main()
