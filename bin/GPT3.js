import { Configuration, OpenAIApi } from 'openai'
import config from './config.js'

const configuration = new Configuration({
  organization: config.getConfig().orgId,
  apiKey: config.getConfig().apiKey
})

const openai = new OpenAIApi(configuration)

async function translateTextToCommand (shell, text) {
  const promptText = `Can you answer with only the command in ${shell} and nothing more, what is the command to ${text}? Don't show the terminal $ or > prompt. Don't show \`\` quotes.`

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: promptText,
    max_tokens: 50
  })
  const answer = completion.data.choices[0].text.replaceAll('\r', '').replaceAll('\n', '').trim()
  return answer
}

export default {
  translateTextToCommand
}
