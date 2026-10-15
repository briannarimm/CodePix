# Work out a customer's change, in cents.
# Prices are in cents so the numbers stay whole: 1375 cents is 13 dollars and 75 cents.
price = 1375
paid = 2000

change = paid - price

# Split change into whole dollars and leftover cents.
# There are 100 cents in a dollar.
dollars = 0
cents = 0

print(f"Change: {dollars} dollars and {cents} cents")
