# Add up a list of prices with recursion: no for loop, no while loop, no sum().
# The total of an empty list is 0.
# The total of any other list is its first price plus the total of the rest.


def total(prices):
    if prices == []:
        return 0
    return prices[0] + total(prices[1:])


print(total([2.5, 4.0, 1.5]))
print(total([]))
