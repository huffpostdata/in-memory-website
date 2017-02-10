'use strict'

module.exports = class StubServer {
  constructor(website) {
    this.website = website
    const index = this.index = {}
    for (const endpoint of website.endpoints) {
      index[endpoint.key] = endpoint
    }
  }

  get(key) {
    return this.index[key] || null
  }

  render404HtmlString() {
    const paths = this.website.endpoints.map(e => e.key).sort()
    const items = paths.map((s) => `<li><a href="${s}">${s}</a></li>`)

    return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>404</title></head><body><h1>404</h1><p>This is a friendly 404 error.</p><p>The path you requested does not exist. As this is a development environment, we list all possible paths here.</p><h2>Paths</h2><ul>${items.join('')}</ul></body></html>`
  }
}
