# Count the vowels in a part name (the name is all lowercase).
word = "screwdriver"
count = 0

# Look at each letter. When it is a, e, i, o or u, add 1 to count.
for letter in word:
    if letter in "aeiou":
        count = count + 1

print("Vowels:", count)
