# codepix: py=3.12
# codepix: output-only
# codepix: needs=sklearn
# train_test_split with no size given, then with Google's 80-20 example, on 20 fictional ticket ids.
from sklearn.model_selection import train_test_split

tickets = [f"T{n:02}" for n in range(1, 21)]

train, test = train_test_split(tickets, random_state=0)
print("no size given:  ", len(train), "train,", len(test), "test")

train, test = train_test_split(tickets, test_size=0.2, random_state=0)
print("test_size=0.2:  ", len(train), "train,", len(test), "test")
