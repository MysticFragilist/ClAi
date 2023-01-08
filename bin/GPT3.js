import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: 'org-bs020rAogfiMJkt3KLF3wJ2Z',
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

async function translateTextToCommand(shell, text) {
  var promptText = `Can you answer with only the command in ${shell} and nothing more, what is the command to ${text}? Don't show the terminal $ or > prompt. Don't show \`\` quotes.`;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: promptText,
  });
  var answer = completion.data.choices[0].text.replaceAll('\r', '').replaceAll('\n', '').trim()
  console.log(completion.data.choices)
  return answer
}

export default {
  translateTextToCommand,
};