import io
import unittest
from contextlib import redirect_stdout

with redirect_stdout(io.StringIO()):
    from ignore import is_ignored, read_patterns


class TestReadPatterns(unittest.TestCase):
    def test_skips_comments_and_blank_lines(self):
        text = "# a comment\n\n.venv\n*.bak\n"
        self.assertEqual(read_patterns(text), [".venv", "*.bak"])

    def test_example_file(self):
        with open("gitignore_example.txt", encoding="utf-8") as f:
            self.assertEqual(read_patterns(f.read()), [".venv", "scratch.txt", "*.bak"])


class TestIsIgnored(unittest.TestCase):
    PATTERNS = [".venv", "scratch.txt", "*.bak"]

    def test_exact_name(self):
        self.assertTrue(is_ignored(".venv", self.PATTERNS))

    def test_star_pattern(self):
        self.assertTrue(is_ignored("prices.bak", self.PATTERNS))

    def test_kept_file(self):
        self.assertFalse(is_ignored("tracker.py", self.PATTERNS))

    def test_no_patterns_ignores_nothing(self):
        self.assertFalse(is_ignored("scratch.txt", []))


if __name__ == "__main__":
    unittest.main()
