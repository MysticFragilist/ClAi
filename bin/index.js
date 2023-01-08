#!node
import yargs from 'yargs/yargs';
import child_process from 'child_process';
import gpt3 from './GPT3.js';

const usage = "\nUsage: clai -s <shell> -p <prompt> \n"
 + "Translates a prompt for terminal to a specific command to execute\n"

const options = yargs(process.argv.slice(2))
  .usage(usage)
  .alias("s", "shell")
  .describe("s", "Choose a default shell to execute the command against (it needs to exist in the system)")
  .choices("s", ['bash', 'powershell', 'cmd (windows)', 'zsh'])
  .option("p", {alias:"prompt", describe: "Prompt to translate the command for", type: "string"})
  .demandOption(['s', 'p'])
  .help(true)
  .argv

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

