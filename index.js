'use strict'

const isCI = require('is-ci')
const execa = require('execa')

module.exports = (requireCI, command, args) => {
  if ((!isCI && requireCI) || (isCI && !requireCI)) {
    return Promise.resolve({ code: 0 })
  }

  return execa(command, args, { stdio: 'inherit' })
}
