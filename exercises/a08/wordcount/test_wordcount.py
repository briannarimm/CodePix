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


class TestWordCount(unittest.TestCase):
    def test_counts(self):
        namespace, _ = run_program("wordcount.py")
        expected = {}
        for word in namespace["note"].split():
            expected[word] = expected.get(word, 0) + 1
        self.assertEqual(namespace["counts"], expected)

    def test_kettle(self):
        namespace, _ = run_program("wordcount.py")
        self.assertEqual(namespace["counts"]["kettle"], 3)


if __name__ == "__main__":
    unittest.main()
