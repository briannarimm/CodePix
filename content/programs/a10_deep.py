# codepix: expect-error
def price_each(total, count):
    return total / count

def quote(order):
    return price_each(order["total"], order["count"])

print(quote({"total": 20, "count": 4}))
print(quote({"total": 20, "count": 0}))
