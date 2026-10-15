# A store-credit account for the shop's (fictional) regular customers.
class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance = self.balance + amount

    def withdraw(self, amount):
        if amount > self.balance:
            return False
        self.balance = self.balance - amount
        return True


acct = Account("Toaster T-9", 20)
acct.deposit(5)
print(acct.withdraw(30))
print(acct.withdraw(10))
print(acct.owner, acct.balance)
