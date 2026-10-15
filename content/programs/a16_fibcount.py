# codepix: output-only
# Count how many calls fib() makes as n grows.
calls = 0


def fib(n):
    global calls
    calls = calls + 1
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)


for n in [5, 10, 15, 20, 25]:
    calls = 0
    answer = fib(n)
    print(f"fib({n}) = {answer} after {calls} calls")
