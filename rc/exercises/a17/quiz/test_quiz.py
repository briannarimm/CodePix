import subprocess
import sys
import unittest

from quiz import is_right, load_questions, score

QUESTIONS = [{"q": "Q1?", "a": "gear"}, {"q": "Q2?", "a": "8"}, {"q": "Q3?", "a": "spring"}]


class TestQuiz(unittest.TestCase):
    def test_exact_reply(self):
        self.assertTrue(is_right("gear", "gear"))

    def test_capitals_and_spaces_are_ignored(self):
        self.assertTrue(is_right("  Gear ", "gear"))

    def test_wrong_reply(self):
        self.assertFalse(is_right("cog", "gear"))

    def test_score_counts_right_replies(self):
        self.assertEqual(score(QUESTIONS, ["gear", "7", "SPRING"]), 2)

    def test_score_of_nothing_right(self):
        self.assertEqual(score(QUESTIONS, ["x", "y", "z"]), 0)

    def test_question_bank_loads(self):
        bank = load_questions("questions.json")
        self.assertEqual(len(bank), 3)
        self.assertIn("q", bank[0])

    def test_whole_game(self):
        run = subprocess.run([sys.executable, "quiz.py"], input="gear\ncoil\n8\n",
                             capture_output=True, text=True, encoding="utf-8")
        self.assertEqual(run.stdout.strip().splitlines()[-1], "Score: 2/3")


if __name__ == "__main__":
    unittest.main()
