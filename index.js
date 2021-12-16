const VERSION = '0.4.0'

const arg = require('arg')
const process = require('process')
const os = require("os")
const path = require('path')

let TDP_HOME = process.env.TDP_HOME || os.homedir() + path.sep + 'tdp' + path.sep + 'yarn_repository'

console.log(TDP_HOME)

// TODO add functions
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
} else if (args._[0] == 'get' && args._[1] == 'meta') {
    console.log('TODO Merge meta file to current dir"s yarn.lock')
} else if (args._[0] == 'install') {
    // console.log('TODO install Zip of tag to repository, and merge yarn.lock to repository')
    let filename = args._[1]
    if (filename) {
        // TODO unzip files ends with .tgz to TDP_HOME/yarn_repository
        console.log("merge yarn.lock @ TDP_HOME/yarn_repository")
    }
}
