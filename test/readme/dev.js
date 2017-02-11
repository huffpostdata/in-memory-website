#!/usr/bin/env node
'use strict'

const DevServer = require('../../index').DevServer

const server = new DevServer(`${__dirname}/build.js`)
server.listen(3000, err => {
  if (err) throw err
  console.log('Listening at http://localhost:3000')
})

// In this dev environment, let's rebuild the website every time a file changes
const chokidar = require('chokidar') // https://github.com/paulmillr/chokidar
chokidar.watch([ 'test/readme/build.js' ])
  .on('change', () => server.queueBuild())
  .on('add', () => server.queueBuild())
  .on('unlink', () => server.queueBuild())
  // queueBuild() is "debounced": if 10 files change very quickly, we only
  // rebuild once.

server.listenForLiveReload() // and use http://livereload.com/extensions/
