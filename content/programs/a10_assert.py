# codepix: expect-error
def discount(price, percent):
    assert 0 <= percent <= 100, "percent must be 0 to 100"
    return price - price * percent // 100

print(discount(80, 25))
print(discount(80, 250))
