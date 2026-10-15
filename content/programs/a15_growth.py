# codepix: output-only
# Count the looks for a part that is not there, as the pile grows.
def linear_looks(numbers, target):
    looks = 0
    for n in numbers:
        looks = looks + 1
        if n == target:
            break
    return looks


def binary_looks(numbers, target):
    low, high, looks = 0, len(numbers) - 1, 0
    while low <= high:
        mid = (low + high) // 2
        looks = looks + 1
        if numbers[mid] == target:
            break
        if numbers[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return looks


print("pile size   linear looks   binary looks")
for size in [10, 100, 1000, 10000, 100000, 1000000]:
    pile = list(range(0, size * 2, 2))  # even numbers only
    missing = size * 2 + 1              # odd, so it is never found
    print(f"{size:>9}   {linear_looks(pile, missing):>12}   {binary_looks(pile, missing):>12}")
