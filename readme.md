# if-ci &middot; [![Version](https://img.shields.io/npm/v/if-ci.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/if-ci) [![License](https://img.shields.io/npm/l/if-ci.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/if-ci) [![Travis CI](https://img.shields.io/travis/citycide/if-ci.svg?style=flat-square&maxAge=3600)](https://travis-ci.org/citycide/if-ci) [![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)

> Easily run npm scripts only when in a CI environment.

## installation

```console
npm i --save-dev if-ci
```

## usage

Just prefix any command in an npm script with `if-ci` like so:

```json
{
  "name": "my-great-package",
  "version": "1.2.34",
  "scripts": {
    "maybeEcho": "if-ci echo \"hello!\""
  }
}
```

If you have multiple commands in a script, just use it again:

```json
{
  "name": "my-great-package",
  "version": "1.2.34",
  "scripts": {
    "maybeEcho": "if-ci echo \"hello\" && if-ci echo \"world!\""
  }
}
```

## contributing

Pull requests and any [issues](https://github.com/citycide/if-ci/issues)
found are always welcome.

1. Fork the project, and preferably create a branch named something like `feat-make-better`
2. Modify as needed
3. Make sure all tests continue to pass, and it never hurts to have more tests
4. Push & pull request! :tada:

## license

MIT © [Bo Lingen / citycide](https://github.com/citycide)
