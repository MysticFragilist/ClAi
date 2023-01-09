import fs from 'fs'

function getConfig () {
  return JSON.parse(fs.readFileSync('./keys.json'))
}

function setConfig (apiKey, orgId) {
  fs.writeFileSync('./keys.json', JSON.stringify({ apiKey, orgId }))
}

export default {
  getConfig,
  setConfig
}
