# How many days until the pickup? Fixed dates, so the output never changes.
from datetime import date

dropped_off = date(2026, 10, 16)
pickup = date(2026, 10, 23)
gap = pickup - dropped_off
print(gap)
print(gap.days, "days")
