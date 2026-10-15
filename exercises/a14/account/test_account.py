import io
import pathlib
import unittest
from contextlib import redirect_stdout


def load():
    source = pathlib.Path("account.py").read_text(encoding="utf-8")
    ns = {"__name__": "__main__"}
    with redirect_stdout(io.StringIO()):
        exec(compile(source, "account.py", "exec"), ns)
    return ns


class TestAccount(unittest.TestCase):
    def setUp(self):
        self.Account = load()["Account"]

    def test_remembers_owner_and_balance(self):
        a = self.Account("Kettle K-2", 12)
        self.assertEqual(a.owner, "Kettle K-2")
        self.assertEqual(a.balance, 12)

    def test_deposit(self):
        a = self.Account("Kettle K-2", 12)
        a.deposit(8)
        self.assertEqual(a.balance, 20)

    def test_withdraw_enough(self):
        a = self.Account("Kettle K-2", 12)
        self.assertIs(a.withdraw(12), True)
        self.assertEqual(a.balance, 0)

    def test_withdraw_too_much(self):
        a = self.Account("Kettle K-2", 12)
        self.assertIs(a.withdraw(13), False)
        self.assertEqual(a.balance, 12)

    def test_accounts_are_separate(self):
        a, b = self.Account("Radio R-1", 5), self.Account("Lamp L-4", 5)
        a.deposit(10)
        self.assertEqual(b.balance, 5)


if __name__ == "__main__":
    unittest.main()
