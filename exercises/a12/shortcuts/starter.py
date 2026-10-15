# Three jobs from the shop's old code. Do each one in a single line.
prices = [3, 12, 8, 30, 5]
names = ["gear", "spring", "bolt"]

# 1. The long way was:
#     big = []
#     for p in prices:
#         if p >= 8:
#             big.append(p)
#    Write it as one list comprehension.
big = []

# 2. The long way was:
#     loud = []
#     for n in names:
#         loud.append(n.upper())
#    Write it as one list comprehension.
loud = []

# 3. Use sorted() with a key to put the names in order of length, shortest first.
by_length = names

print(big)
print(loud)
print(by_length)
