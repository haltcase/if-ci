'use strict'

const isCI = require('is-ci')
const execa = require('execa')

module.exports = (shouldBeCI, command, args) => {
  if (isCI !== shouldBeCI) {
    return Promise.resolve({ code: 0 })
  }

  return execa(command, args, { stdio: 'inherit' })
}
