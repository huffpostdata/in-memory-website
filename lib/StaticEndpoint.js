// an in-memory webpage. It doesn't know how to serve itself.
module.exports = class StaticEndpoint {
  constructor(path, headers, body) {
    this.path = path
    this.headers = headers
    this.body = body
  }
}
