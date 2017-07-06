'use strict'

const isCI = require('is-ci')
const execa = require('execa')

module.exports = (requireCI) => {
  if ((!isCI && requireCI) || (isCI && !requireCI)) process.exit(1)

  const argv = process.argv.slice(2)
  const command = argv[0]
  const args = argv.slice(1)

  execa(command, args, { stdio: 'inherit' })
    .then(result => process.exit(result.code))
}
