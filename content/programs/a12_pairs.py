# Number the jobs, then pair each job with its hours.
jobs = ["toaster", "kettle", "radio"]
hours = [2, 4, 3]
for i, job in enumerate(jobs):
    print(i, job)
for job, h in zip(jobs, hours):
    print(job, "takes", h, "hours")
print("Total hours:", sum(hours))
