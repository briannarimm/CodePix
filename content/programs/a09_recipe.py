def labor_cost(hours, rate=30):
    """Return the labor charge for a repair."""
    return hours * rate

print(labor_cost(2))
print(labor_cost(2, 45))
print(labor_cost(hours=3, rate=20))
print(labor_cost.__doc__)
