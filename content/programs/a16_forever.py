# codepix: output-only
# codepix: expect-error
# A countdown with no base case. It never stops by itself.
def countdown(n):
    countdown(n - 1)


print("Starting the kettle clock...")
countdown(3)
