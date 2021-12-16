process = require('process')
const os = require("os")
const path = require('path')

let TDP_HOME = process.env.TDP_HOME || os.homedir() + path.sep + 'tdp' + path.sep + 'yarn_repository'

console.log(TDP_HOME)
