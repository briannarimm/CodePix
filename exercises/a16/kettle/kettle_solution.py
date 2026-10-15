# The shop kettle counts down out loud before it whistles.
# kettle(n) prints "n..." for n, n - 1, ... down to 1, then prints "Tea!".
# Use recursion: kettle calls kettle. No loops.
# kettle(0) (or anything smaller) prints only "Tea!".


def kettle(n):
    if n <= 0:
        print("Tea!")
    else:
        print(f"{n}...")
        kettle(n - 1)


kettle(3)
