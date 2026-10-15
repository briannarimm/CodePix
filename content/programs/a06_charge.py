# Charge a battery in steps until it is full.
charge = 20
while charge < 100:
    charge = charge + 30
    print("Charging:", charge)
print("Done at", charge)
