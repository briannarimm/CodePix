# Skip the even bins and stop at 7.
for n in range(1, 10):
    if n % 2 == 0:
        continue
    if n == 7:
        break
    print("Open bin", n)
