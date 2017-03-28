'use strict'

const async = require('async')
const debug = require('debug')('S3Uploader')
const S3 = new (require('aws-sdk').S3)()

const DefaultParams = {
  ACL: 'public-read',
  ServerSideEncryption: 'AES256'
}

const DefaultOptions = {
  nConcurrentUploads: 10
}

module.exports = {
  // Uploads a website to S3
  //
  // bucket: something like "s3://example.org"
  // options:
  //   * nConcurrentUploads: Number of files to upload simultaneously. Higher numbers use more
  //     bandwidth, so the website uploads more quickly but failures are more likely if your
  //     Internet connection is too slow. Default: 10
  uploadWebsiteToBucket: function(website, bucket, options, callback) {
    if (!(/^s3:\/\//.test(bucket))) {
      return callback(new Error(`S3 bucket ${bucket} does not start with 's3://'. Please start it with 's3://'.`))
    }
    bucket = bucket.slice(4)

    options = Object.assign({}, DefaultOptions, options || {})

    function uploadEndpoint(endpoint, callback) {
      if (endpoint.path.charAt(0) !== '/') {
        return callback(new Error(`Path '${endpoint.path}' does not begin with '/'. Please start it with '/'.`))
      }

      const params = Object.assign({}, DefaultParams, {
        Bucket: bucket,
        Key: endpoint.path.slice(1),
        Body: endpoint.body,
        ContentType: endpoint.headers['Content-Type'] || 'application/octet-stream',
        ContentEncoding: endpoint.headers['Content-Encoding'] || '',
        ContentDisposition: endpoint.headers['Content-Disposition'] || '',
        CacheControl: endpoint.headers['Cache-Control'] || 'public',
        WebsiteRedirectLocation: endpoint.headers['Location'] || null
      })

      debug(`PUT s3://${params.Bucket}/${params.Key} ${params.ContentType} ${params.CacheControl}`)
      return S3.putObject(params, callback)
    }

    async.mapLimit(website.endpoints, options.nConcurrentUploads, uploadEndpoint, callback)
  }
}
