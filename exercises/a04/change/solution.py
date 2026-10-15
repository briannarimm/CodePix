# Work out a customer's change, in cents.
# Prices are in cents so the numbers stay whole: 1375 cents is 13 dollars and 75 cents.
price = 1375
paid = 2000

change = paid - price

# Split change into whole dollars and leftover cents.
# There are 100 cents in a dollar.
dollars = change // 100
cents = change % 100

print(f"Change: {dollars} dollars and {cents} cents")
