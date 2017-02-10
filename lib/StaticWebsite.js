'use strict'

const StaticEndpoint = require('./StaticEndpoint')

function applyOptions(endpoint, options) {
  return new StaticEndpoint(
    endpoint.key,
    options && options.defaultHeaders ? Object.assign({}, options.defaultHeaders, endpoint.headers) : endpoint.headers,
    Buffer.isBuffer(endpoint.body) ? endpoint.body : Buffer.from(endpoint.body)
  )
}

// an in-memory website. It doesn't know how to serve itself.
class StaticWebsite {
  constructor(endpoints, options) {
    this.endpoints = endpoints.map(e => applyOptions(e, options))
  }

  toBuffer() {
    const protobuf = require('./protobuf')
    const buf = protobuf.staticwebsite.StaticWebsite.encode(this).finish()
    return buf
  }
}

StaticWebsite.fromBuffer = function(buf) {
  const protobuf = require('./protobuf')

  const raw = protobuf.staticwebsite.StaticWebsite.decode(buf)

  const endpoints = raw.endpoints.map(rawEndpoint => new StaticEndpoint(
    rawEndpoint.key,
    rawEndpoint.headers,
    rawEndpoint.body
  ))

  return new StaticWebsite(endpoints)
}

StaticWebsite.merge = function(site1, site2) {
  const keys2 = {}
  for (const endpoint of site2.endpoints) {
    keys2[endpoint.key] = null
  }

  const endpoints = site1.endpoints
    .filter(e => !keys2.hasOwnProperty(e.key))
    .concat(site2.endpoints)

  return new StaticWebsite(endpoints)
}

module.exports = StaticWebsite
