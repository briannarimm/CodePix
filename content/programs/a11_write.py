# Write a work log, add one more line, then read it back.
jobs = ["toaster", "kettle", "radio"]
with open("a11_log.txt", "w", encoding="utf-8") as log:
    for job in jobs:
        log.write("fixed the " + job + "\n")
with open("a11_log.txt", "a", encoding="utf-8") as log:
    log.write("lunch break\n")
with open("a11_log.txt", encoding="utf-8") as log:
    for line in log:
        print(line, end="")
