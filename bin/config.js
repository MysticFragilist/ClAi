import fs from 'fs'
import os from 'os'
import path from 'path'

const pathConfig = path.join(os.homedir(), '.clairc')

function getConfig () {
  if (!fs.existsSync(pathConfig)) {
    // Init empty
    fs.closeSync(fs.openSync(pathConfig, 'w'))
    fs.writeFileSync(pathConfig, JSON.stringify({ apiKey: '', orgId: '' }))
  }
  return JSON.parse(fs.readFileSync(pathConfig))
}

function setConfig (apiKey, orgId) {
  fs.closeSync(fs.openSync(pathConfig, 'w'))
  fs.writeFileSync(pathConfig, JSON.stringify({ apiKey, orgId }))
}

export default {
  getConfig,
  setConfig
}
