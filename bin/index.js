#!node
import yargs from 'yargs/yargs'
import chalk from 'chalk'
import boxen from 'boxen'

import childProcess from 'child_process'
import readline from 'readline'

import gpt3 from './GPT3.js'
import config from './config.js'
import shell from './shell.js'

const logo = chalk.red(
  '│  ___  __      __    ____ \n' +
  '│ / __)(  )    /__\\  (_  _) \n' +
  '│( (__  )(__  /(__)\\  _)(_  \n' +
  '│ \\___)(____)(__)(__)(____) \n│\n│')

const usage = logo + chalk.red('Usage: clai -s <shell> -p <prompt> \n') +
  boxen(chalk.green('Translates a prompt to a specific shell command to execute.'),
    { padding: 1, borderColor: 'green', dimBorder: true })

const options = yargs(process.argv.slice(2))
  .usage(usage)
  .alias('c', 'config')
  .describe('c', 'Configure your API key and organization ID for OpenAI')
  .positional('p', { alias: 'prompt', describe: 'Text prompt to translate the command', type: 'string' })
  .alias('s', 'shell')
  .describe('s', 'Choose a default shell to execute the command against (it needs to exist in the system)')
  .choices('s', ['bash', 'powershell', 'cmd', 'zsh'])
  .help(true)
  .argv

if (options.c) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('OpenAI API key: ', (apiKey) => {
    rl.question('OpenAI Organization ID: ', (orgId) => {
      config.setConfig(apiKey, orgId)
      rl.close()
    })
  })
}
console.log(options)

if (options._) {
  let shellName = shell.getShellName()
  if (options.s) {
    shellName = options.s
  }

  gpt3.translateTextToCommand(shellName, options._).then(res => {
    console.log(`$ ${res}`)
    const command = childProcess.spawn('bash', [shell.getLaunchCommandForShell(shellName), res])

    process.stdin.pipe(command.stdin)

    command.stdout.on('data', (data) => {
      process.stdout.write(data.toString())
    })

    command.stderr.on('data', (data) => {
      process.stderr.write(data.toString())
    })
  }).catch(err => {
    console.error(err.request.res.statusMessage)
  })
}
