<p align="center">
  <img src="https://github.com/MysticFragilist/ClAi/blob/master/logo.png" width="200" height="200" align="middle" />
</p>

[![Downloads](https://img.shields.io/npm/dt/@mysticfragilist/clai)](https://img.shields.io/npm/dt/@mysticfragilist/clai)


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
```

It will parse the prompt into a command and execute it.

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
- [] Find some logic to discard cache based on time and number of time it's red.
- [ ] Add testing solution for unit and e2e to make sure everything is right on track.
- [ ] Make a shell (or a zsh plugin) to support handling wrongly entered command.

## Distribution

The image used as a logo was generated through Dalle-2. This project is licenced under [MIT](./LICENCE.md).

## Contribution

To contribute, you can create an issue on this repository or making a pull request you can follow these guidelines.

