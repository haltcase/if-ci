import test from 'ava'
import execa from 'execa'
import { resolve } from 'path'

const bin = resolve(__dirname, '..', 'bin', 'index.js')
const cwd = resolve(__dirname, 'fixtures')
const args = ['npm', 'run', 'hello']

test('runs the given command when in a CI environment', async t => {
  const env = { CI: true }
  const result = await execa(bin, args, { cwd, env })
  const lines = result.stdout.split(/\r?\n/g)

  t.is(lines[lines.length - 1], 'yo what up')
})

test('does not run the given command when not in a CI environment', async t => {
  const error = await t.throws(execa(bin, args, { cwd, extendEnv: false }))
  t.is(error.code, 1)
})
