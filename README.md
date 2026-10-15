# Code Pix

Code Pix is a free website that teaches Python and machine learning. It is a visual novel and a textbook in one. Each level has a story scene, a book page and an exercise.

Play it here: https://briannarimm.github.io/CodePix/

This README uses ASD-STE100 Simplified Technical English.

## This app is vibe coded

Claude, an AI model by Anthropic, wrote the code, the art, the lessons and this README. Brianna gave the instructions. Brianna also examined and tested each release. Brianna did not write the code line by line.

AI can make errors. For this reason, the build process does these checks:

- A script compares each cited fact with the text of its source.
- Each Python output in the app comes from real Python, not from the AI.
- A script runs each exercise and its tests.

Read the sources in the book. Do not think that a sentence is correct only because it is in the app.

## The two modules

- **Module A, Intro to CS and Python.** Start with this module. It shows how a computer runs a program.
- **Module B, Intro to Machine Learning.** Module A unlocks this module.

## How to use the app

1. Open the website in a browser.
2. Install Python on your computer. Use the steps in the first level.
3. Install VS Code as your code editor.
4. Read the story and the book page for each level.
5. Do the exercises on your computer. The website does not run Python.

The website keeps your progress in your browser. It does not send data to a server. It has no tracking.

## Python versions

- Module A examples also run on Python 3.9.
- Module B needs Python 3.12 or a newer version.

The app tells you to install the current Python release.

## Sources

Each fact in the book has a citation in APA 7 style. Each citation has a link to an open source. You can read the sources free of charge.

## How to build the site

You must have Python 3 to build the site. Module B also needs NumPy, pandas, scikit-learn and Matplotlib.

1. Run `python3 tools/build.py`. The output must show `JS syntax: OK`.
2. Run `python3 tools/check.py`. The output must show `ALL GOOD`.
3. Run `python3 tools/preview.py --open` to see the site on your computer.

The build writes the site to `dist/`. Do not change `dist/` manually.

## How to publish

- A push to `main` builds, checks and publishes the site to GitHub Pages.
- A pull request publishes a release candidate to https://briannarimm.github.io/CodePix/rc/.
- Merge the pull request to publish the release candidate to the live site.

For more data, read these files:

- `docs/handoff.md`: the full specification.
- `docs/decisions.md`: the decisions and the reasons for them.
- `docs/deploy.md`: the steps to publish the site.
- `CLAUDE.md`: the rules for the AI that writes the code.

## License

- Text: CC BY 4.0.
- Code: MIT.
