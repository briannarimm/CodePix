# codepix: py=3.10
# codepix: output-only
# codepix: needs=matplotlib
# The same costs as a Matplotlib histogram, with the same $40-wide bins.
import matplotlib.pyplot as plt

costs = [42, 48, 78, 86, 30, 118, 55, 172, 120, 74, 136, 65]

fig, ax = plt.subplots()
counts, edges, bars = ax.hist(costs, bins=[0, 40, 80, 120, 160, 200])

print("bin edges:", [int(e) for e in edges])
print("tickets per bin:", [int(c) for c in counts])
# On your own machine, add plt.show() here to open the picture in a window.
