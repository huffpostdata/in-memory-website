// an in-memory webpage. It doesn't know how to serve itself.
module.exports = class StaticEndpoint {
  constructor(key, headers, body) {
    this.key = key
    this.headers = headers
    this.body = body
  }
}
