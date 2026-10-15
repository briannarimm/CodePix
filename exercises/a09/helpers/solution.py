"""Small helper functions for the shop."""


def is_even(n):
    """Return True if n is even."""
    return n % 2 == 0


def average(numbers):
    """Return the average of a list of numbers."""
    return sum(numbers) / len(numbers)


def clamp(value, low, high):
    """Return value, kept between low and high."""
    if value < low:
        return low
    if value > high:
        return high
    return value
