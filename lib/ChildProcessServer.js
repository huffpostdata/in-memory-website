'use strict'

const StubServer = require('./StubServer')
const url = require('url')

module.exports = class ChildProcessServer {
  constructor(website, options) {
    this.stubServer = new StubServer(website)
  }

  lookup(requestUrl) {
    const path = url.parse(requestUrl).pathname

    return this.stubServer.get(path) || this.stubServer.render404()
  }

  listen() {
    this.httpServer = http.createServer()

    this.httpServer.on('request', (req, res) => {
      if (message.method === 'GET') {
        { headers, body } = this.lookup(req.url)
      }
    })

    process.on('message', (m, socket) => {
      if (m === 'socket') {
        socket.resume()
        server.emit('connection', socket)
      }
    })

    process.send('ready')
  }
}
