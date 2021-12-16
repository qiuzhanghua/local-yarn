'use strict'

const VERSION = '0.5.0'

const arg = require('arg')
const os = require('os')
const path = require('path')
const adm_zip = require('adm-zip')
const fs = require('fs')
const lockfile = require('@yarnpkg/lockfile')
const mkdirp = require('mkdirp')

let local_yarn_repository = (process.env.TDP_HOME || os.homedir() + path.sep + 'tdp') + path.sep + 'yarn_repository'

if (!fs.existsSync(local_yarn_repository)) {
    mkdirp.sync(local_yarn_repository)
}

const args = arg({
    '--help': Boolean,
    '--version': Boolean,
    '-v': '--version',
    '-h': '--help'
});

if (args['--help']) {
    console.log('local yarn repository tool, v' + VERSION)
} else if (args['--version']) {
    console.log('version ' + VERSION)
} else if (args._[0] === 'get' && args._[1] === 'meta') {
    merge('yarn.lock', local_yarn_repository + path.sep + 'all.lock')
} else if (args._[0] === 'install') {
    let filename = args._[1]
    if (filename.endsWith('.yarn.lock.zip')) {
        let unzip = new adm_zip(filename, {})
        unzip.extractAllTo(local_yarn_repository, true, true, "")
        merge(local_yarn_repository + path.sep + 'all.lock', local_yarn_repository + path.sep + 'yarn.lock')
        fs.rmSync(local_yarn_repository + path.sep + 'yarn.lock')
    }
}

function merge(f1, f2) {
    let obj = {}
    if (fs.existsSync(f1)) {
        let file = fs.readFileSync(f1, 'utf8')
        let json = lockfile.parse(file)
        if (json.type !== 'success') {
             return false
        }
        obj = json.object
    }

    let obj2 = {}
    if (fs.existsSync(f2)) {
        let file = fs.readFileSync(f2, 'utf8')
        let json = lockfile.parse(file)
        if (json.type !== 'success') {
            return false
        }
        obj2 = json.object
    }

    Object.assign(obj, obj2)

    const fd = fs.openSync(f1, "w+")
    let text = lockfile.stringify(obj)
    const position = 0
    const numberOfBytesWritten =
        fs.writeSync(fd, text, position, 'utf8')
    return numberOfBytesWritten > 0
}