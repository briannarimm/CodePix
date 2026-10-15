# Count every part on the shelf and write a one-line report.
# parts.csv (fictional) has a header row, then one row per part: part,qty,price_each
import csv

total = 0
with open("parts.csv", encoding="utf-8", newline="") as f:
    for row in csv.DictReader(f):
        # 1. Add this row's qty to total. csv hands you text, so int() turns it into a number.
        total = total + int(row["qty"])

# 2. Write the report. "w" makes a fresh file each time.
with open("report.txt", "w", encoding="utf-8") as out:
    out.write("Total parts: " + str(total) + "\n")

print("Total parts:", total)
