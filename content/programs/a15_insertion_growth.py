# codepix: output-only
# Count insertion sort's comparisons on a shelf already in order, and on one in reverse order.
def insertion_comparisons(items):
    items = list(items)
    comparisons = 0
    for index in range(1, len(items)):
        current = items[index]
        position = index
        while position > 0:
            comparisons = comparisons + 1
            if items[position - 1] <= current:
                break
            items[position] = items[position - 1]
            position = position - 1
        items[position] = current
    return comparisons


print("shelf size   in order   reverse order")
for size in [10, 100, 1000, 2000]:
    in_order = list(range(size))
    backwards = list(range(size, 0, -1))
    print(f"{size:>10}   {insertion_comparisons(in_order):>8}   {insertion_comparisons(backwards):>13}")
