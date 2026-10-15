# Open the mail bag and read it one line at a time.
with open("a11_letters.txt", encoding="utf-8") as bag:
    for line in bag:
        print("Letter:", line.strip())
print("Is the bag closed now?", bag.closed)
