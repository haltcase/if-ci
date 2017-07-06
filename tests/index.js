import test from 'ava'
import execa from 'execa'
import { resolve } from 'path'

const ifCI = resolve(__dirname, '..', 'bin', 'if-ci.js')
const ifNotCI = resolve(__dirname, '..', 'bin', 'if-not-ci.js')
const cwd = resolve(__dirname, 'fixtures')
const args = ['npm', 'run', 'hello']

test('if-ci: runs the given command when in a CI environment', async t => {
  const env = { CI: true }
  const result = await execa(ifCI, args, { cwd, env })
  const lines = result.stdout.split(/\r?\n/g)

  t.is(lines[lines.length - 1], 'yo what up')
})

test('if-ci: does not run the given command when not in a CI environment', async t => {
  const result = await execa(ifCI, args, { cwd, extendEnv: false })
  t.is(result.code, 0)
})

test('if-not-ci: runs the given command when not in a CI environment', async t => {
  const result = await execa(ifNotCI, args, { cwd, extendEnv: false })
  const lines = result.stdout.split(/\r?\n/g)

  t.is(lines[lines.length - 1], 'yo what up')
})

test('if-not-ci: does not run the given command when in a CI environment', async t => {
  const env = { CI: true }
  const result = await execa(ifNotCI, args, { cwd, env })
  t.is(result.code, 0)
})
