# codepix: py=3.10
# codepix: output-only
# codepix: needs=matplotlib
# Draw the scatter plot and save it as a picture file.
import os

import matplotlib.pyplot as plt

hours = [0.5, 1.0, 1.5, 2.0, 0.5, 2.5, 1.0, 4.0, 3.0, 2.0, 3.5, 1.5]
costs = [42, 48, 78, 86, 30, 118, 55, 172, 120, 74, 136, 65]

fig, ax = plt.subplots()
ax.scatter(hours, costs)

fig.savefig("tickets.png", dpi=100)
print("Saved tickets.png:", os.path.exists("tickets.png"))
fig.savefig("tickets.svg")
print("Saved tickets.svg:", os.path.exists("tickets.svg"))
