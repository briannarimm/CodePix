# codepix: output-only
# Print the parts file exactly as it sits on the disk.
with open("a11_parts.csv", encoding="utf-8") as f:
    for line in f:
        print(line, end="")
