# A tally counter for the shop door: one click per customer.
class Counter:
    def __init__(self):
        self.count = 0

    def click(self):
        # Add one to this counter's count.
        pass

    def reset(self):
        # Put this counter's count back to zero.
        pass


door = Counter()
door.click()
door.click()
print("Customers so far:", door.count)
