#!/usr/bin/env node
'use strict'

const ifCI = require('..')

const argv = process.argv.slice(2)
const command = argv[0]
const args = argv.slice(1)

ifCI(false, command, args)
  .then(
    result => process.exit(result.code),
    error => {
      process.stderr.write((error.message || error) + '\n' + (error.stack ? error.stack + '\n' : ''))
      process.exit(error.code || 1)
    }
  )
