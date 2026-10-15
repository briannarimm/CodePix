import io
import pathlib
import unittest
from contextlib import redirect_stdout


def run_program(name):
    buf = io.StringIO()
    with redirect_stdout(buf):
        namespace = {"__name__": "__main__"}
        source = pathlib.Path(name).read_text(encoding="utf-8")
        exec(compile(source, name, "exec"), namespace)
    return namespace, buf.getvalue()


class TestBiggest(unittest.TestCase):
    def test_value(self):
        namespace, _ = run_program("biggest.py")
        self.assertEqual(namespace["biggest"], 30)

    def test_works_for_other_prices(self):
        source = pathlib.Path("biggest.py").read_text(encoding="utf-8")
        source = source.replace("[12, 4, 30, 7, 19]", "[-5, -2, -9]")
        namespace = {"__name__": "__main__"}
        with redirect_stdout(io.StringIO()):
            exec(compile(source, "biggest.py", "exec"), namespace)
        self.assertEqual(namespace["biggest"], -2)

    def test_no_max(self):
        source = pathlib.Path("biggest.py").read_text(encoding="utf-8")
        code = "\n".join(line.split("#")[0] for line in source.splitlines())
        self.assertNotIn("max(", code)


if __name__ == "__main__":
    unittest.main()
