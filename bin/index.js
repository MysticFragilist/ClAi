#!node
import yargs from 'yargs/yargs';
import child_process from 'child_process';
import gpt3 from './GPT3.js';
import config from './config.js';
import prompt from 'prompt-sync';

const usage = "\nUsage: clai -s <shell> -p <prompt> \n"
 + "Translates a prompt for terminal to a specific command to execute\n"

const options = yargs(process.argv.slice(2))
  .usage(usage)
  .alias("c", "config")
  .describe("c", "Configure your API key and organization ID for OpenAI")
  .alias("s", "shell")
  .describe("s", "Choose a default shell to execute the command against (it needs to exist in the system)")
  .choices("s", ['bash', 'powershell', 'cmd (windows)', 'zsh'])
  .option("p", {alias:"prompt", describe: "Prompt to translate the command for", type: "string"})
  .help(true)
  .argv

if (options.c) {
  console.log("OpenAI API key: ")
  const apiKey = prompt();
  console.log("OpenAI Organization ID: ")
  const orgId = prompt();
  config.setConfig(apiKey, orgId)
}

if (options.s && options.p) {
  gpt3.translateTextToCommand(options.s, options.p).then(res => {
    console.log(`$ ${res}`)
    child_process.exec(res, { encoding: 'utf-8' }, (err, stdout, stderr) => {
      //if (err) {
      //  console.error(err);
      //  return;
      //}
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.error(stderr);
      }
    });
  }).catch(err => {
    console.error(err);
  })
}