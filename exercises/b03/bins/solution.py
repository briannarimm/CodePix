# Count fictional ticket costs into bins of equal width.
costs = [42, 48, 78, 86, 30, 118, 55, 172, 120, 74, 136, 65]


def count_bins(costs, width):
    """Return {bin start: how many costs fall in that bin}, sorted by bin start."""
    counts = {}
    for cost in costs:
        start = cost // width * width
        counts[start] = counts.get(start, 0) + 1
    return dict(sorted(counts.items()))


print(count_bins(costs, 40))
