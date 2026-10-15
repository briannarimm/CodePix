# codepix: py=3.12
# codepix: output-only
# codepix: needs=numpy,sklearn
# Sort the shop inbox: real repair jobs or junk? All messages are fictional.
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

messages = [
    "my kettle leaks please fix it",
    "radio dial is stuck can you repair it",
    "toaster sparks when I press the lever",
    "please fix my clock it runs slow",
    "win a free cruise click now",
    "free prize waiting click this link",
    "cheap watches free shipping click",
    "you won a prize claim it now",
]
labels = ["job", "job", "job", "job", "junk", "junk", "junk", "junk"]

counter = CountVectorizer()
counts = counter.fit_transform(messages)
print("words in the vocabulary:", len(counter.get_feature_names_out()))
print("first message as counts:", counts[0].toarray()[0])

model = MultinomialNB(alpha=1.0)
model.fit(counts, labels)
new = ["free clock repair click now", "my lamp flickers please fix"]
print(model.predict(counter.transform(new)))
