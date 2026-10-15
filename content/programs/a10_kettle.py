# codepix: expect-error
# The talking kettle's morning report, with a bug three recipe cards deep.
def average(readings):
    return sum(readings) / len(readings)

def to_celsius(fahrenheit):
    return round((fahrenheit - 32) * 5 / 9)

def announce(readings):
    temp = to_celsius(average(readings))
    return "The water is " + str(temp) + " degrees"

def morning_report(log):
    for name in log:
        print(name + ":", announce(log[name]))

morning_report({"Kettle A": [200, 204, 208], "Kettle B": []})
