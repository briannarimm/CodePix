counts = ["12", "7", "ten", "3"]
total = 0
for text in counts:
    try:
        total = total + int(text)
    except ValueError:
        print("Skipping", text)
print("Total:", total)
