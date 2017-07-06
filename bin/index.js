#!/usr/bin/env node

const isCI = require('is-ci')
const execa = require('execa')

if (isCI) {
  const argv = process.argv.slice(2)
  const command = argv[0]
  const args = argv.slice(1)

  execa(command, args, { stdio: 'inherit' }).then(process.exit)
} else {
  process.exit(1)
}
