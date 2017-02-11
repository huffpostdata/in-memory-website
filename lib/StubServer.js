'use strict'

const htmlEscape = require('escape-html')

module.exports = class StubServer {
  constructor(website) {
    this.website = website
    const index = this.index = {}
    for (const endpoint of website.endpoints) {
      index[endpoint.path] = endpoint
    }
  }

  get(path) {
    return this.index[path] || null
  }

  render404HtmlString() {
    const paths = this.website.endpoints.map(e => e.path).sort()
    const items = paths.map(s => `<li><a href="${htmlEscape(s)}">${htmlEscape(s)}</a></li>`)

    return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>404</title></head><body><h1>404</h1><p>This is a friendly 404 error.</p><p>The path you requested does not exist. As this is a development environment, we list all possible paths here.</p><h2>Paths</h2><ul>${items.join('')}</ul></body></html>`
  }

  // Returns { statusCode, headers, body }
  getOr404(path) {
    const found = this.get(path)
    if (found) return { statusCode: 200, headers: found.headers, body: found.body }

    return {
      statusCode: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: Buffer.from(this.render404HtmlString())
    }
  }
}
