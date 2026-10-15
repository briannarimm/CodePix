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


class TestReverse(unittest.TestCase):
    def test_backwards(self):
        namespace, _ = run_program("backwards.py")
        self.assertEqual(namespace["backwards"], ["fuse", "bolt", "spring", "gear"])

    def test_parts_unchanged(self):
        namespace, _ = run_program("backwards.py")
        self.assertEqual(namespace["parts"], ["gear", "spring", "bolt", "fuse"])

    def test_prints_list(self):
        _, out = run_program("backwards.py")
        self.assertEqual(out.strip(), "['fuse', 'bolt', 'spring', 'gear']")


if __name__ == "__main__":
    unittest.main()
