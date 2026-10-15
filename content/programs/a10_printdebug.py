# The average is wrong, and there is no error message. Print clues.
times = [30, 45, 15]
total = 0
for t in times:
    total = t
    print("after", t, "total is", total)
print("Average:", total / len(times))
