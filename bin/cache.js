
import fs from 'fs'
import path from 'path'
import os from 'os'

const version = '1.0'

const pathConfigDir = path.join(os.homedir(), '.clairc')
const pathCache = path.join(pathConfigDir, 'cache.json')

function tryInit () {
  if (!fs.existsSync(pathCache)) {
    fs.mkdirSync(pathConfigDir, { recursive: true })
    fs.closeSync(fs.openSync(pathCache, 'w'))
    fs.writeFileSync(pathCache, JSON.stringify({ version, caches: [] }))
  }
}

function getCaches () {
  try {
    tryInit()

    return JSON.parse(fs.readFileSync(pathCache)).caches
  } catch (e) {
    console.error('Error reading caches file. Try removing the folder HOME/.clairc/')
    process.exit(1)
  }
}

function addCacheEntry (prompt, command) {
  try {
    tryInit()

    if (!fs.existsSync(pathCache)) {
      fs.mkdirSync(pathConfigDir, { recursive: true })
      fs.closeSync(fs.openSync(pathCache, 'w'))
      fs.writeFileSync(pathCache, JSON.stringify({ version, caches: [] }))
    }

    const cacheFile = JSON.parse(fs.readFileSync(pathCache))
    // clear caches on version mismatch
    if (cacheFile.version !== version) {
      cacheFile.caches = []
    }

    // keep only the last 100 entries
    if (cacheFile.caches.length > 100) {
      cacheFile.caches.shift()
    }

    // add new entry if not already present
    if (!cacheFile.caches.find(c => c.prompt === prompt && c.command === command)) {
      cacheFile.caches.push({ prompt, command, timestamp: new Date().getTime() })
    }

    fs.writeFileSync(pathCache, JSON.stringify(cacheFile))
  } catch (e) {
    console.error('Error reading caches file. Try removing the folder HOME/.clairc/')
    process.exit(1)
  }
}

function searchCache (prompt) {
  try {
    tryInit()

    const cacheFile = JSON.parse(fs.readFileSync(pathCache))
    const cache = cacheFile.caches.find(c => c.prompt === prompt)
    if (cache) {
      return [cache.command]
    }
    return null
  } catch (e) {
    console.error('Error reading caches file. Try removing the folder HOME/.clairc/')
    process.exit(1)
  }
}

export default {
  getCaches,
  addCacheEntry,
  searchCache
}
