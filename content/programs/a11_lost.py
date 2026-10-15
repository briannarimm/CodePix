# codepix: expect-error
# One letter of the file name is wrong: the real mail bag is a11_letters.txt.
print("Opening the mail bag...")
with open("a11_letterz.txt", encoding="utf-8") as bag:
    for line in bag:
        print(line.strip())
