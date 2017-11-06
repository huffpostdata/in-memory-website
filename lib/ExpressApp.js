'use strict'

module.exports = function expressApp(staticWebsite) {
  const endpoints = {}
  for (const endpoint of staticWebsite.endpoints) {
    const headers = []
    for (const name of Object.keys(endpoint.headers)) {
      headers.push({ name: name, value: endpoint.headers[name] })
    }

    endpoints[endpoint.path] = {
      headers: headers,    // Array of {name, value} pairs
      body: endpoint.body, // Buffer
    }
  }

  return function(req, res, next) {
    const endpoint = endpoints[req.path]
    if (!endpoint) {
      res
        .status(404)
        .header('Content-Type', 'text/plain; charset=utf-8')
        .send('Could not find page at path ' + req.path)
    } else {
      for (const header of endpoint.headers) {
        res.header(header.name, header.value)
      }
      res.send(endpoint.body)
    }
  }
}
