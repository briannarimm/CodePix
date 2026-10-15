import csv
import io
import os
import pathlib
import unittest
from contextlib import redirect_stdout


def expected_total():
    with open("parts.csv", encoding="utf-8", newline="") as f:
        return sum(int(row["qty"]) for row in csv.DictReader(f))


class TestReport(unittest.TestCase):
    def setUp(self):
        if os.path.exists("report.txt"):
            os.remove("report.txt")
        buf = io.StringIO()
        with redirect_stdout(buf):
            self.ns = {"__name__": "__main__"}
            source = pathlib.Path("report.py").read_text(encoding="utf-8")
            exec(compile(source, "report.py", "exec"), self.ns)
        self.printed = buf.getvalue()

    def test_total_is_a_number(self):
        self.assertIsInstance(self.ns["total"], int, "total should be a whole number, not text")

    def test_total_adds_every_row(self):
        self.assertEqual(self.ns["total"], expected_total())

    def test_report_file_written(self):
        self.assertTrue(os.path.exists("report.txt"), "report.py should create report.txt")
        text = pathlib.Path("report.txt").read_text(encoding="utf-8")
        self.assertEqual(text, "Total parts: " + str(expected_total()) + "\n")


if __name__ == "__main__":
    unittest.main()
