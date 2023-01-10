import fs from 'fs'
import os from 'os'

const path = os.homedir() + '\\.clairc'

function getConfig () {
  if (!fs.existsSync(path)) {
    fs.closeSync(fs.openSync(path, 'w'))
    fs.writeFileSync(path, JSON.stringify({ apiKey: '', orgId: '' }))
  }
  return JSON.parse(fs.readFileSync(path))
}

function setConfig (apiKey, orgId) {
  fs.closeSync(fs.openSync(path, 'w'))
  fs.writeFileSync(path, JSON.stringify({ apiKey, orgId }))
}

export default {
  getConfig,
  setConfig
}
