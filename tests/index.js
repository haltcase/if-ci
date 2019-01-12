import test from 'ava'
import execa from 'execa'
import { resolve } from 'path'

const ifCI = resolve(__dirname, '..', 'bin', 'if-ci.js')
const ifNotCI = resolve(__dirname, '..', 'bin', 'if-not-ci.js')
const cwd = resolve(__dirname, 'fixtures')
const args = succeed => ['npm', 'run', succeed ? 'hello' : 'fail']

function parseOutput (stdout) {
  const lines = stdout.split(/\r?\n/g).filter(Boolean)
  return lines[lines.length - 1]
}

test('if-ci: runs the given command when in a CI environment', async t => {
  const env = { CI: true }
  const result = await execa(ifCI, args(true), { cwd, env })
  const stdout = parseOutput(result.stdout)
  t.is(stdout, 'it works!')
})

test('if-ci: returns non-zero status code when the given command fails', async t => {
  const env = { CI: true }
  await t.throwsAsync(() => execa(ifCI, args(false), { cwd, env }))
})

test('if-ci: does not run the given command when not in a CI environment', async t => {
  const result = await execa(ifCI, args(true), { cwd, extendEnv: false })
  t.is(result.code, 0)
})

test('if-not-ci: runs the given command when not in a CI environment', async t => {
  const { env } = process
  ;['CI', 'CONTINUOUS_INTEGRATION', 'BUILD_NUMBER', 'TRAVIS']
    .forEach(name => delete env[name])

  const result = await execa(ifNotCI, args(true), { cwd })
  const stdout = parseOutput(result.stdout)
  t.is(stdout, 'it works!')
})

test('if-not-ci: returns non-zero status code when the given command fails', async t => {
  const { env } = process
  ;['CI', 'CONTINUOUS_INTEGRATION', 'BUILD_NUMBER', 'TRAVIS']
    .forEach(name => delete env[name])

  await t.throwsAsync(() => execa(ifNotCI, args(false), { cwd, env }))
})

test('if-not-ci: does not run the given command when in a CI environment', async t => {
  const env = { CI: true }
  const result = await execa(ifNotCI, args(true), { cwd, env })
  t.is(result.code, 0)
})
