# Split a delivery note into parts, then join them back up.
note = "gear,spring,washer,bolt"
parts = note.split(",")
print(parts)
print(len(parts), "parts")
print(" + ".join(parts))
