# Count every part on the shelf and write a one-line report.
# parts.csv (fictional) has a header row, then one row per part: part,qty,price_each
import csv

total = 0
with open("parts.csv", encoding="utf-8", newline="") as f:
    for row in csv.DictReader(f):
        # 1. Add this row's qty to total. Careful: csv hands you text.
        pass

# 2. Write the line "Total parts: " plus the total into report.txt,
#    ending with a new line. Name the encoding when you open it.


print("Total parts:", total)
