# Gadget Gulch quiz night (fictional shop).
# The questions live in questions.json: a list of {"q": question, "a": answer}.
# load_questions and play already work. Finish is_right and score.
import json


def load_questions(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def is_right(reply, answer):
    # True when the reply matches the answer, ignoring capital letters
    # and spaces at either end. "  Gear " matches "gear".
    return False


def score(questions, replies):
    # How many replies are right? replies[0] answers questions[0], and so on.
    return 0


def play(questions):
    replies = []
    for item in questions:
        reply = input(item["q"] + " ")
        replies.append(reply)
        if is_right(reply, item["a"]):
            print("Right!")
        else:
            print("The answer was", item["a"])
    print(f"Score: {score(questions, replies)}/{len(questions)}")


# Start the game only when this file is run directly, so the tests can import it quietly.
if __name__ == "__main__":
    play(load_questions("questions.json"))
