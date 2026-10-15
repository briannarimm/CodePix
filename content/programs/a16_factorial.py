# How many ways can four gadgets stand in a row on the display shelf?
def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)


print(factorial(4))
