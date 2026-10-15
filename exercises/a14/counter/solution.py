# A tally counter for the shop door: one click per customer.
class Counter:
    def __init__(self):
        self.count = 0

    def click(self):
        # self is the counter that was clicked, so only its count goes up.
        self.count = self.count + 1

    def reset(self):
        self.count = 0


door = Counter()
door.click()
door.click()
print("Customers so far:", door.count)
