#!/usr/bin/env node
'use strict'

const ifCI = require('..')

const argv = process.argv.slice(2)
const command = argv[0]
const args = argv.slice(1)

ifCI(true, command, args)
  .then(result => process.exit(result.code))
