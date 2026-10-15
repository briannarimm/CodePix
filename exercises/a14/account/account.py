# A store-credit account for the shop's (fictional) regular customers.
class Account:
    def __init__(self, owner, balance):
        # 1. Store owner and balance on self, so each account remembers its own.
        pass

    def deposit(self, amount):
        # 2. Add amount to this account's balance.
        pass

    def withdraw(self, amount):
        # 3. If there is enough money, take amount out and return True.
        #    If there is not enough, change nothing and return False.
        pass


acct = Account("Toaster T-9", 20)
acct.deposit(5)
print(acct.withdraw(30))
print(acct.withdraw(10))
print(acct.owner, acct.balance)
