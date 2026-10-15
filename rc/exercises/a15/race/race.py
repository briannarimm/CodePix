# Race a linear search against a binary search on a big sorted shelf.
# Run it, read the times, then change SIZE and run it again.
import timeit

SIZE = 100000


def linear_search(numbers, target):
    for i in range(len(numbers)):
        if numbers[i] == target:
            return i
    return -1


def binary_search(numbers, target):
    low = 0
    high = len(numbers) - 1
    while low <= high:
        mid = (low + high) // 2
        if numbers[mid] == target:
            return mid
        if numbers[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1


shelf = list(range(0, SIZE * 2, 2))  # even part numbers, already sorted
target = SIZE * 2 - 2                # the very last part on the shelf

# Both searches must agree before the race means anything.
assert linear_search(shelf, target) == binary_search(shelf, target)

# Time each search 5 times (10 searches per timing) and keep the fastest timing.
slow = min(timeit.repeat(lambda: linear_search(shelf, target), number=10, repeat=5))
fast = min(timeit.repeat(lambda: binary_search(shelf, target), number=10, repeat=5))
print(f"Shelf of {SIZE} parts, 10 searches each")
print(f"linear: {slow:.6f} seconds")
print(f"binary: {fast:.6f} seconds")
