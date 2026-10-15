import io
import pathlib
import unittest
from contextlib import redirect_stdout


class TestSwap(unittest.TestCase):
    def run_program(self):
        buf = io.StringIO()
        with redirect_stdout(buf):
            namespace = {"__name__": "__main__"}
            source = pathlib.Path("swap.py").read_text(encoding="utf-8")
            exec(compile(source, "swap.py", "exec"), namespace)
        return namespace, buf.getvalue()

    def test_left_holds_gears(self):
        namespace, _ = self.run_program()
        self.assertEqual(namespace["left"], "gears")

    def test_right_holds_springs(self):
        namespace, _ = self.run_program()
        self.assertEqual(namespace["right"], "springs")

    def test_words_typed_once(self):
        source = pathlib.Path("swap.py").read_text(encoding="utf-8")
        after = source.split('right = "gears"', 1)[1]
        self.assertNotIn('"gears"', after)
        self.assertNotIn('"springs"', after)


if __name__ == "__main__":
    unittest.main()
