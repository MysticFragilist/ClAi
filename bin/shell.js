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
  if (shellName === 'bash') {
    launchCommand = 'bash -c'
  } else if (shellName === 'powershell') {
    launchCommand = 'powershell -Command'
  } else if (shellName === 'cmd') {
    launchCommand = 'cmd /c'
  } else if (shellName === 'zsh') {
    launchCommand = 'zsh -c'
  }
  return launchCommand
}

export default {
  getShellName,
  getLaunchCommandForShell
}
