import fs from 'fs'
import os from 'os'
import process from 'process'
import path from 'path'

const pathConfigDir = path.join(os.homedir(), '.clairc')
const pathConfig = path.join(pathConfigDir, 'clai.conf')

function getConfig () {
  if (!fs.existsSync(pathConfig)) {
    // Init empty
    fs.mkdirSync(pathConfigDir, { recursive: true })
    fs.closeSync(fs.openSync(pathConfig, 'w'))
    fs.writeFileSync(pathConfig, JSON.stringify({ apiKey: '', orgId: '' }))
    console.error('Error reading config file. Try doing `clai --config` to set your API key and organization ID.')
    process.exit(1)
  }
  try {
    return JSON.parse(fs.readFileSync(pathConfig))
  } catch (e) {
    console.error('Error reading config file. Try doing `clai --config` to set your API key and organization ID.')
    process.exit(1)
  }
}

function setConfig (apiKey, orgId) {
  fs.closeSync(fs.openSync(pathConfig, 'w'))
  fs.writeFileSync(pathConfig, JSON.stringify({ apiKey, orgId }))
}

export default {
  getConfig,
  setConfig
}
