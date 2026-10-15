# The customer cabinet: look up a phone number by name.
phones = {"Ms. Gridlock": "555-0100", "Dr. Nib": "555-0142"}
print(phones["Dr. Nib"])
phones["Byte"] = "555-0199"
print("Byte" in phones)
print(phones.get("Mx. Sprocket"))
print(len(phones))
