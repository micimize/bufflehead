import { ArgumentParser } from 'argparse'
import fs from 'fs'

const parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'get settings path'
})

parser.addArgument(['--settings', '-s'], {
    dest: 'settings',
    help: 'pass in environment settings. Objects under the keys "client" and "server" will be unpacked into the parent object or removed from the environment accordingly'
})


module.exports = function deriveSettings(){
    let settingsFile = parser.parseArgs().settings
    return settingsFile ?
        JSON.parse(fs.readFileSync( settingsFile, 'utf8' )) :
        {}
}
