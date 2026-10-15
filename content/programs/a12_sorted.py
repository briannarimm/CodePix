# Sort the parts by price with a key.
parts = [("gear", 3.75), ("spring", 0.25), ("sprocket", 2.5)]
by_price = sorted(parts, key=lambda p: p[1])
print(by_price)
print(parts)
print(max(parts, key=lambda p: p[1]))
print(min(parts, key=lambda p: p[1]))
