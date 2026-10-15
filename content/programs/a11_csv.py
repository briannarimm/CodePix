# Add up what the parts on the shelf are worth.
import csv

total = 0
with open("a11_parts.csv", encoding="utf-8", newline="") as f:
    for row in csv.DictReader(f):
        value = int(row["qty"]) * float(row["price_each"])
        print(row["part"], value)
        total = total + value
print("Shelf value:", total)
