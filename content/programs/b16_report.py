# codepix: py=3.10
# codepix: output-only
# codepix: needs=pandas,sklearn
# The Quote Machine with pandas and scikit-learn, plus a short model card.
import pandas as pd
import sklearn
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from sklearn.model_selection import train_test_split

tickets = pd.read_csv("b16_tickets.csv")
X = tickets[["age_years", "parts", "hours"]]
y = tickets["big_job"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=0)

for name, model in (("baseline", DummyClassifier(strategy="most_frequent")), ("quote machine", LogisticRegression(max_iter=1000))):
    guess = model.fit(X_train, y_train).predict(X_test)
    print(f"{name:13} accuracy {accuracy_score(y_test, guess):.2f}  "
          f"precision {precision_score(y_test, guess, zero_division=0):.2f}  "
          f"recall {recall_score(y_test, guess):.2f}  f1 {f1_score(y_test, guess):.2f}")

print()
print("MODEL CARD: Quote Machine, version 0.1")
print("Data:", len(tickets), "fictional repair tickets;", len(X_test), "held out for testing")
print("Inputs: age_years, parts, hours. Output: big job (cost of 150 or more) or not")
print("Intended use: flag tickets so a person double-checks the quote")
print("Limits: tiny made-up data set; never tested on real customers")
print("Built with scikit-learn", sklearn.__version__)
