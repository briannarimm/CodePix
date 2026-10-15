# Bubble sort a short shelf of prices, counting comparisons and swaps.
prices = [5, 2, 4, 1]
comparisons = 0
swaps = 0
swapped = True
while swapped:
    swapped = False
    for i in range(len(prices) - 1):
        comparisons = comparisons + 1
        if prices[i] > prices[i + 1]:
            prices[i], prices[i + 1] = prices[i + 1], prices[i]
            swaps = swaps + 1
            swapped = True
print(prices, "comparisons:", comparisons, "swaps:", swaps)
