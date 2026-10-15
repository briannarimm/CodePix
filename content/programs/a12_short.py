# The shortcut: one line builds the same list.
prices = [4, 10, 7, 25]
rush = [p * 2 for p in prices if p > 5]
print(rush)
