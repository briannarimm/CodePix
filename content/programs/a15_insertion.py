# Insertion sort a short shelf of prices, counting comparisons.
prices = [5, 2, 4, 1]
comparisons = 0
for index in range(1, len(prices)):
    current = prices[index]
    position = index
    while position > 0:
        comparisons = comparisons + 1
        if prices[position - 1] <= current:
            break
        prices[position] = prices[position - 1]  # shift the bigger price right
        position = position - 1
    prices[position] = current
print(prices, "comparisons:", comparisons)
