# codepix: py=3.10
# codepix: output-only
# codepix: needs=matplotlib
# Hours against cost for twelve fictional tickets, as a scatter plot.
import matplotlib.pyplot as plt

hours = [0.5, 1.0, 1.5, 2.0, 0.5, 2.5, 1.0, 4.0, 3.0, 2.0, 3.5, 1.5]
costs = [42, 48, 78, 86, 30, 118, 55, 172, 120, 74, 136, 65]

fig, ax = plt.subplots()
dots = ax.scatter(hours, costs)

print("Axes on the figure:", len(fig.axes))
print("Dots drawn:", len(dots.get_offsets()))
# On your own machine, add plt.show() here to open the picture in a window.
