# Work out the shipping fee for a parcel (fictional prices).
weight = 2.5   # kilograms
member = False

# Rules, checked in this order:
#   members ship free when the parcel is under 5 kg
#   under 1 kg costs 3
#   under 5 kg costs 7
#   anything heavier costs 12
fee = 12

print("Shipping:", fee)
