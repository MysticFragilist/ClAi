#!node
import yargs from 'yargs/yargs'
import chalk from 'chalk'
import boxen from 'boxen'
import prompts from 'prompts'

import childProcess from 'child_process'
import readline from 'readline'

import gpt3 from './GPT3.js'
import shell from './shell.js'
import config from './config.js'
import cache from './cache.js'

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
  .describe('s', 'Choose a shell to execute the command against (it needs to exist in the system). If none, is provided default to the current one.')
  .choices('s', ['bash', 'powershell', 'cmd', 'zsh'])
  .option('f', { alias: 'force', describe: 'Force to parse the text using OpenAI (bypass cache)', type: 'boolean' })
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

async function parseCommand (options) {
  let shellName = shell.getShellName()
  if (options.s) {
    shellName = options.s
  }
  try {
    let res = cache.searchCache(options._[0])
    if (!res || options.f) {
      res = await gpt3.translateTextToCommand(shellName, options._[0], 2)
    }

    let commandChosen = res[0]

    if (res.length > 1) {
      const prompt = await prompts({ type: 'select', name: 'value', message: 'Choose a command: ', choices: res })
      commandChosen = res[prompt.value]
    }

    // cache command executed
    cache.addCacheEntry(options._[0], commandChosen)
    console.log(`$ ${commandChosen}`)
    const command = childProcess.spawn(shellName, [shell.getLaunchCommandForShell(shellName), commandChosen])

    process.stdin.pipe(command.stdin)

    command.stdout.on('data', (data) => {
      process.stdout.write(data.toString())
    })

    command.stderr.on('data', (data) => {
      process.stderr.write(data.toString())
    })
  } catch (e) {
    console.error(e.request.res.statusMessage)
    if (e.request.res.statusCode === 401) {
      console.error('Try doing `clairc config` to set your API key and organization ID.')
    }
  }
}

if (options._.length > 0) {
  parseCommand(options)
}
