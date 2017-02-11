#!/usr/bin/env node
'use strict'

const StaticWebsite = require('../../index').StaticWebsite
const validate = require('../../index').validate

// Normally our website generator would be more complex. Potentially it will
// be asynchronous. It may throw an error. Make this script exit with a
// non-zero error code if there's a problem.
const website = new StaticWebsite([
  { path: '/hello-world', headers: { 'Content-Type': 'text/plain; charset=utf-8' }, body: Buffer.from('Hello, World!') }
])

// We have utilities to avoid common mistakes. Choose the mistakes you want
// to avoid; make this script exit with a non-zero error code if there's a
// problem.
const validationError = validate.headersAreUseful(website)
if (validationError) throw validationError

// No problem? Write the website to stdout and exit with a zero error code
// (the default).
process.stdout.write(website.toBuffer())
