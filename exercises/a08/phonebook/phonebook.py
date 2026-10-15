# Look up each wanted name in the phone book.
phones = {"Ms. Gridlock": "555-0100", "Dr. Nib": "555-0142", "Byte": "555-0199"}
wanted = ["Dr. Nib", "Mx. Sprocket", "Byte"]

for name in wanted:
    print(name + ": " + phones[name])
