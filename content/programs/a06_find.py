# Look for the radio on the belt.
belt = ["toaster", "radio", "kettle"]
for gadget in belt:
    if gadget == "radio":
        print("Found the radio. Stop the belt!")
        break
    print("Checked", gadget)
else:
    print("No radio today.")
