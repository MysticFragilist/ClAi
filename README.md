<p align="center">
  <img src="https://github.com/MysticFragilist/ClAi/blob/master/logo.png" width="200" height="200" align="middle" />
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@mysticfragilist/clai"><img src="https://img.shields.io/npm/dt/@mysticfragilist/clai" alt="npm version" height="18"></a>
  <a href="https://www.npmjs.com/package/@mysticfragilist/clai"><img src="https://badge.fury.io/js/@mysticfragilist%2Fclai.svg" alt="npm version" height="18"></a>
  <a href="https://eslint.org"><img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" alt="npm version" height="18"></a>
</p>

# ClAi :rocket:
A CLI tool to process input command into shell script and execute it. Every prompt is translated to a command using GPT-3 and executed.

## Installation
Run these commands to get started:
```bash
npm install -g @mysticfragilist/clai
```
You then need to configure ClAi using your OpenAI API Key. To do so create an account on OpenAI API website and [create a new secret key](https://beta.openai.com/account/api-keys). Then copy your organization ID from [this page](https://beta.openai.com/account/org-settings).
```bash
clai -c
```

## Usage
To use ClAi simply call it as such:
```bash
clai "create ten files named 1.txt to 10.txt"
clai "navigate to My Documents and list all files starting with 'a'" -s bash
clai "check my public ip" -f
```

It will parse the prompt into a command and execute it.

| arguments  | description  |
|---|---|
| `-c` or `--config`  | Configure your API key and organization ID for OpenAI.  |
| `<PROMPT>` | Text prompt to translate the command. |
| `-s` or `--shell` | Choose a shell to execute the command against (it needs to exist in the system). If none, is provided default to the current one.  |
| `-f` or `--force`  | Force to parse the text using OpenAI (bypass cache)  |
| `-h` or `--help`  | To see the usage guide of ClAi.  |


## Examples
<p align="center">
  <img src="https://github.com/MysticFragilist/ClAi/blob/master/examples/git-example.png" width="300" />
  <img src="https://github.com/MysticFragilist/ClAi/blob/master/examples/ls-example.png" width="300" />
  <img src="https://github.com/MysticFragilist/ClAi/blob/master/examples/simple-networking-example.png" width="300" />
</p>

## Roadmap
- [x] Parse prompt throught cli and send it to your OpenAI account.
- [x] Support multiple shell format (cmd, bash, fish, zsh, powershell)
- [x] Allow omitting shell argument and default to current shell.
- [x] Allow using bash script instead of child_process to process call (allow for loop and other interesting command for example).
- [x] Continuously redirect output and input to and from the process.
- [x] Allow user to choose which solution if multiple commands can be use.
- [x] Keep an history of commands to allow caching certain commands to reexecute the same way.
- [ ] Find some logic to discard cache based on timestamp and number of time it's read.
- [ ] Add testing solution for unit and e2e to make sure everything is right on track.
- [ ] Make a shell (or a zsh plugin) to support handling wrongly entered command.

## Distribution

The image used as a logo was generated through Dalle-2. This project is licenced under [MIT](./LICENCE.md).

## Contribution

To contribute, you can create an issue on this repository or making a pull request you can follow these guidelines.

