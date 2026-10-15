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


class TestPhoneBook(unittest.TestCase):
    def test_output(self):
        _, out = run_program("phonebook.py")
        self.assertEqual(out.strip().splitlines(), [
            "Dr. Nib: 555-0142",
            "Mx. Sprocket: no number on file",
            "Byte: 555-0199",
        ])


if __name__ == "__main__":
    unittest.main()
