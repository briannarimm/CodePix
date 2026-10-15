# Price one ticket for the Saturday tinker class (fictional prices).
age = 70
member = False
if age < 12:
    price = 5
elif age >= 65 or member:
    price = 8
else:
    price = 10
print("Ticket price:", price)
