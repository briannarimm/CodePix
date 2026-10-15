# codepix: stdin=gear\n4\n
# A two-question shop quiz. Each answer is typed at the keyboard.
questions = [
    {"q": "What turns a clock's hands?", "a": "gear"},
    {"q": "How many legs does the shop stool have?", "a": "3"},
]

score = 0
for item in questions:
    answer = input(item["q"] + " ")
    if answer.strip().lower() == item["a"]:
        print("Right!")
        score = score + 1
    else:
        print("The answer was", item["a"])
print(f"Score: {score}/{len(questions)}")
