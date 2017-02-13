'use strict'

const StaticWebsite = require('./StaticWebsite')
const StubServer = require('./StubServer')

const child_process = require('child_process')
const fs = require('fs')
const http = require('http')
const url = require('url')
const ws = require('ws')

// The DevServer cycles through four states:
// 1. building (=> built, => error)
//    stubServer = error = null; dateStarted is set
// 2. built (=> building, => buildQueued)
//    stubServer = <StubServer>, error = null, dateStarted and dateCompleted are set
// 3. error (=> building, => buildQueued)
//    stubServer = null, error = <Buffer>, dateStarted and dateCompleted are set
// 4. buildQueued (=> building)
//    stubServer = null, error = null, buildStartTimeout is set
module.exports = class DevServer {
  constructor(buildCommand) {
    this.buildCommand = buildCommand

    this.queuedRequests = [] // Array of {request, response} Objects
    this.httpServer = http.createServer((req, res) => this.handle(req, res))
  }

  handle(request, response) {
    if (this.error) {
      response.statusCode = 500
      response.setHeader('Content-Type', 'text/plain; charset=utf-8')
      response.setHeader('X-Build-Took', String(this.dateCompleted - this.dateStarted))
      response.write('Build failed. Error message follows:\n\n')
      response.end(this.error)
    } else if (this.stubServer) {
      const pathname = url.parse(request.url).pathname
      const { statusCode, headers, body } = this.stubServer.getOr404(pathname)
      response.statusCode = statusCode
      for (const key of Object.keys(headers)) {
        response.setHeader(key, headers[key])
      }
      response.setHeader('X-Build-Took', String(this.dateCompleted - this.dateStarted))
      response.end(body)
    } else {
      this.queuedRequests.push({ request: request, response: response })
    }
  }

  _flushQueuedRequests() {
    if (!this.error && !this.stubServer) {
      throw new Error('Tried flushing queued requests, but not in "built" state')
    }

    while (this.queuedRequests.length > 0 && (this.error || this.stubServer)) {
      const { request, response } = this.queuedRequests.shift()
      this.handle(request, response)
    }
  }

  listen(port, callback) {
    this._toBuildQueued(0)
    this.httpServer.listen(port, callback)
  }

  queueBuild(debounceTimeout) {
    this._toBuildQueued(debounceTimeout || 100)
  }

  _toBuildQueued(timeout) {
    if (this.buildStartTimeout) clearTimeout(this.buildStartTimeout)
    this.stubServer = null
    this.error = null
    this.dateStarted = null
    this.dateCompleted = null
    this.child = null
    this.buildStartTimeout = setTimeout(() => this._toBuilding(), timeout)
    this.notifyLiveReload()
  }

  _toBuilding() {
    if (this.buildStartTimeout) clearTimeout(this.buildStartTimeout)
    if (this.child) this.child.kill('SIGKILL')
    this.stubServer = null
    this.error = null
    this.buildStartTimeout = null
    this.dateStarted = new Date()
    this.dateCompleted = null
    const child = this.child = child_process.execFile(this.buildCommand, { encoding: 'buffer' }, (err, stdout, stderr) => {
      if (child !== this.child) return // we were killed and restarted; be silent
      this.child = null
      if (err) return this._toError(stderr)
      if (stderr) process.stderr.write(stderr)
      return this._toBuilt(stdout)
    })
  }

  _toError(buf) {
    if (this.buildStartTimeout) clearTimeout(this.buildStartTimeout)
    if (this.child) this.child.kill('SIGKILL')
    this.stubServer = null
    this.error = buf
    this.buildStartTimeout = null
    this.dateCompleted = new Date()
    this.child = null
    this._flushQueuedRequests()
  }

  _toBuilt(buf) {
    if (this.buildStartTimeout) clearTimeout(this.buildStartTimeout)
    if (this.child) this.child.kill('SIGKILL')
    const website = StaticWebsite.fromBuffer(buf)
    this.stubServer = new StubServer(website)
    this.error = null
    this.buildStartTimeout = null
    this.dateCompleted = new Date()
    this.child = null
    this._flushQueuedRequests()
  }

  listenForLiveReload(callback) {
    const js = fs.readFileSync(`${__dirname}/../files/livereload.js`)
    const server = http.createServer((req, res) => {
      if (url.parse(req.url).pathname === '/livereload.js') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/javascript')
        res.setHeader('Content-Length', js.length)
        res.end(js)
      }
    })
    this.liveReloadServer = new ws.Server({
      server: server,
      path: '/livereload'
    })
    this.liveReloadServer.on('connection', client => {
      client.on('message', messageJson => {
        try {
          const message = JSON.parse(messageJson)
          console.log('<', message)
          if (message.url) {
            client.pathToReload = url.parse(message.url || '').pathname
          }
        } catch (err) {
          console.log(err)
          return
        }
      })

      client.send(JSON.stringify({
        command: 'hello',
        protocols: [ 'http://livereload.com/protocols/official-7' ],
        serverName: 'in-memory-website/DevServer'
      }))
    })
    server.listen(35729, callback)
  }

  notifyLiveReload() {
    if (!this.liveReloadServer) return

    for (const client of this.liveReloadServer.clients) {
      if (client.readyState === ws.OPEN && client.pathToReload) {
        const command = { command: 'reload', path: client.pathToReload }
        console.log('>', command)
        client.send(JSON.stringify(command))
      }
    }
  }
}
