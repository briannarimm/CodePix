# Add every whole number from 1 to n.
n = 10
total = 0

# Use a loop to add 1, 2, 3 and so on up to n into total.
for k in range(1, n + 1):
    total = total + k

print("Sum:", total)
