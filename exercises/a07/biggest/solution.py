# Find the largest price without using max().
prices = [12, 4, 30, 7, 19]
biggest = prices[0]

for price in prices:
    if price > biggest:
        biggest = price

print("Biggest:", biggest)
