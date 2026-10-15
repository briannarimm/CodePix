# The long way: a loop builds the list of rush-job prices.
prices = [4, 10, 7, 25]
rush = []
for p in prices:
    if p > 5:
        rush.append(p * 2)
print(rush)
