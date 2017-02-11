'use strict'

const UsefulHeaders = [
  // Basically, http://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPUT.html
  // (but we use Location: instead of x-amz-website-redirect-location)
  'Location',
  'Content-Type',
  'Content-Length',
  'Cache-Control',
  'Content-Disposition',
  'Content-Encoding'
]

// endpoint => either null or "path (header1, header2, header3, ...)"
function endpointInvalidHeaders(endpoint) {
  const invalid = []

  for (const path of Object.keys(endpoint.headers)) {
    let pathIsUseful = false
    for (const useful of UsefulHeaders) {
      if (path === useful) {
        pathIsUseful = true
        break
      }
    }
    if (!pathIsUseful) invalid.push(path)
  }

  return invalid.length === 0 ? null : `${endpoint.path} (${invalid.join(', ')})`
}

module.exports = {
  headersAreUseful(website) {
    const errorStrings = website.endpoints.map(endpointInvalidHeaders).filter(s => s !== null)
    if (errorStrings.length > 0) {
      return new Error(`Found invalid headers in the following paths. The only valid headers are ${UsefulHeaders.join(', ')}, and we match case-sensitively. Please correct the headers.\n\n${errorStrings.map(s => `* ${s}`).join('\n')}`)
    }
    return null
  }
}
