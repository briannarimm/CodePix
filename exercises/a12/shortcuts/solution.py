# Three jobs from the shop's old code. Do each one in a single line.
prices = [3, 12, 8, 30, 5]
names = ["gear", "spring", "bolt"]

# 1. Keep the prices of 8 or more.
big = [p for p in prices if p >= 8]

# 2. Shout every name.
loud = [n.upper() for n in names]

# 3. Shortest name first. "gear" and "bolt" tie, so they keep their old order.
by_length = sorted(names, key=lambda n: len(n))

print(big)
print(loud)
print(by_length)
