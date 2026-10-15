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


class TestFixit(unittest.TestCase):
    def test_runs_and_prints(self):
        _, out = run_program("fixit.py")
        self.assertEqual(out.strip().splitlines(), ["Springs: 12", "Gears: 8", "Total: 20"])

    def test_total(self):
        namespace, _ = run_program("fixit.py")
        self.assertEqual(namespace["total"], 20)


if __name__ == "__main__":
    unittest.main()
