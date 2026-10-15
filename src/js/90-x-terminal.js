/* Reference: the terminal cheat sheet. */
PAGES("x-terminal", [
  {
    h: "Your terminal cheat sheet",
    body: [
      "The [[shell]] is a text window for giving the computer commands [py-002]. These are the commands Code Pix uses. Each one is typed after the prompt and run with Return.",
      { table: { head: ["Command", "What it does"], rows: [
        ["`pwd`", "Prints the folder you are in (the working directory) [py-003]"],
        ["`ls`", "Lists what is in a folder [py-003]"],
        ["`cd codepix`", "Changes into the folder `codepix` [py-003]"],
        ["`cd ..`", "Goes up to the parent folder; `.` means the folder you are in [py-004]"],
        ["`mkdir codepix`", "Makes a new folder [py-007]"],
        ["`mv old new`", "Moves or renames [py-007]"],
        ["`cp a b`", "Copies [py-007]"],
        ["`which python3`", "Shows the file a command runs [py-006]"],
        ["`python3 --version`", "Shows which Python you have [py-165]"],
        ["`python3 hello.py`", "Runs the program in `hello.py` [py-024]"],
        ["`code .`", "Opens this folder in VS Code [py-025]"],
      ] } },
      { h3: "Paths" },
      "A path that starts with `/` is an absolute path. Any other path is relative to the folder you are in [py-005].",
      { h3: "Permissions" },
      "`ls -l` shows three groups of three characters, `rwx`: the read, write and execute permissions for the file's owner, its group and everyone else. A `-` means that permission is missing [py-202]. `chmod` changes them [py-204].",
      { h3: "On Windows: PowerShell" },
      "Windows PowerShell is a command-line shell that comes preinstalled on all modern versions of Windows [py-166]. On Windows 11, type PowerShell into the search bar to find it [py-167]. Its aliases let the familiar names work, so most of the table above carries over [py-168] [py-169].",
      { table: { head: ["You type", "PowerShell on Windows runs"], rows: [
        ["`pwd`", "`Get-Location` [py-168]"],
        ["`ls` or `dir`", "`Get-ChildItem` [py-168]"],
        ["`cd`", "`Set-Location` [py-168]"],
        ["`mkdir` or `md`", "`New-Item` [py-169]"],
        ["`mv`", "`Move-Item` [py-168]"],
        ["`cp`", "`Copy-Item` [py-168]"],
        ["`python hello.py`", "Python. On Windows, type `python` where this book says `python3` [py-026]."],
      ] } },
      "These aliases exist only on Windows. PowerShell on macOS or Linux runs the native commands instead [py-170]. Windows paths separate folders with `\\` instead of `/`, and each disk partition has its own root, such as `C:\\` [py-171].",
      { h3: "Sending output somewhere else" },
      "`>` sends a program's output to a file, `>>` adds to the end of a file, and `|` sends one program's output into another program [py-008].",
    ],
  },
]);
GLOSS({ shell: "A text window where you type commands for the computer. [py-002]" });
