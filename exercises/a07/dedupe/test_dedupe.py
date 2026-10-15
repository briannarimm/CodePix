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


class TestDedupe(unittest.TestCase):
    def test_unique(self):
        namespace, _ = run_program("dedupe.py")
        self.assertEqual(namespace["unique"], ["gear", "fuse", "spring", "bolt"])

    def test_orders_unchanged(self):
        namespace, _ = run_program("dedupe.py")
        self.assertEqual(len(namespace["orders"]), 7)


if __name__ == "__main__":
    unittest.main()
