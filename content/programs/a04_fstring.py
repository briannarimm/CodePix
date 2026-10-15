# Print a tidy receipt line.
item = "gear"
qty = 3
each = 1.5
total = qty * each
print(f"{qty} x {item} @ {each:.2f} = {total:.2f}")
print(round(0.5), round(1.5), round(2.5))
print("bolt", "nut", "washer", sep=" | ")
print("Total", end=": ")
print(total)
