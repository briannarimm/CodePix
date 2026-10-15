# The launch clock for Ms. Gridlock's rocket kettle.
def countdown(n):
    if n <= 0:
        print("Blastoff!")
    else:
        print(n)
        countdown(n - 1)


countdown(3)
