# Find the first part that costs less than the budget.
# Check the prices one at a time, from left to right, and count your looks.
# first_under(prices, budget) gives back a pair: (index, looks).
#   index is the position of the first price below budget, or -1 if there is none.
#   looks is how many prices you checked.


def first_under(prices, budget):
    looks = 0
    for i in range(len(prices)):
        looks = looks + 1
        if prices[i] < budget:
            return i, looks
    return -1, looks


prices = [12.5, 9.0, 30.0, 4.75, 3.5]
print(first_under(prices, 5))
print(first_under(prices, 1))
