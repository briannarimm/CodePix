# codepix: py=3.10
# codepix: output-only
# The best straight line through all twelve fictional tickets, worked out with plain Python.
hours = [0.5, 1.0, 1.5, 2.0, 0.5, 2.5, 1.0, 4.0, 3.0, 2.0, 3.5, 1.5]
costs = [42, 48, 78, 86, 30, 118, 55, 172, 120, 74, 136, 65]

n = len(hours)
mean_x = sum(hours) / n
mean_y = sum(costs) / n

top = 0
bottom = 0
for x, y in zip(hours, costs):
    top = top + (x - mean_x) * (y - mean_y)
    bottom = bottom + (x - mean_x) ** 2

w = top / bottom
b = mean_y - w * mean_x
print(f"w = {w:.2f}   b = {b:.2f}")
print(f"a 2.5-hour job: ${b + w * 2.5:.2f}")
