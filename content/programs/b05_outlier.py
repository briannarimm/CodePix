# codepix: py=3.12
# codepix: output-only
# Five fictional tickets. The line misses four of them a little and one of them a lot.
misses = [2, -3, 1, -2, 30]  # real cost minus predicted cost, in dollars

for miss in misses:
    print(f"miss {miss:>4}   absolute {abs(miss):>3}   squared {miss ** 2:>4}")

mae = sum(abs(m) for m in misses) / len(misses)
mse = sum(m ** 2 for m in misses) / len(misses)
print(f"mean absolute error: {mae}")
print(f"mean squared error:  {mse}")
print(f"share of the squared total from the $30 miss: {30 ** 2 / sum(m ** 2 for m in misses):.0%}")
