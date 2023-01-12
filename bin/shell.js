import path from 'path'

function getShellName () {
  let shell = ''
  if (process.platform === 'win32') {
    if (process.env.SHELL) {
      shell = path.basename(process.env.SHELL).toLowerCase().replace('.exe', '')
    } else {
      shell = 'cmd'
    }
  } else if (process.env.SHELL) {
    shell = path.basename(process.env.SHELL)
  } else {
    console.error('Could not determine the current shell')
  }
  return shell
}

function getLaunchCommandForShell (shellName) {
  let launchCommand = ''
  if (shellName === 'bash' || shellName === 'sh' || shellName === 'zsh') {
    launchCommand = '-c'
  } else if (shellName === 'powershell') {
    launchCommand = '-Command'
  } else if (shellName === 'cmd') {
    launchCommand = '/c'
  } else {
    launchCommand = '-c'
  }
  return launchCommand
}

export default {
  getShellName,
  getLaunchCommandForShell
}
