# Look in the middle of a sorted shelf, then set half aside.
def binary_search(numbers, target):
    low = 0
    high = len(numbers) - 1
    looks = 0
    while low <= high:
        mid = (low + high) // 2
        looks = looks + 1
        if numbers[mid] == target:
            return mid, looks
        if numbers[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1, looks


part_numbers = [104, 117, 230, 245, 312, 388, 401, 470, 512, 640, 777, 901]
print(binary_search(part_numbers, 640))
print(binary_search(part_numbers, 300))
