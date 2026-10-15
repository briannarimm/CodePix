# Count from 1 to last. For multiples of 3 print Fizz, for multiples of 5 print Buzz,
# for multiples of both print FizzBuzz, and print the number itself otherwise.
last = 15

for n in range(1, last + 1):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)
