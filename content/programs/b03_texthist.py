# codepix: py=3.10
# A histogram drawn with text: how many tickets cost $0-39, $40-79, and so on (fictional).
costs = [42, 48, 78, 86, 30, 118, 55, 172, 120, 74, 136, 65]
width = 40

counts = {}
for cost in costs:
    start = cost // width * width
    counts[start] = counts.get(start, 0) + 1

for start in sorted(counts):
    label = f"${start}-{start + width - 1}"
    print(f"{label:>9}", "#" * counts[start])
