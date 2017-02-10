'use strict'

const StaticWebsite = require('../lib/StaticWebsite')
const validate = require('../lib/validate')

describe('validate', () => {
  describe('headersAreUseful', () => {
    it('should return null for useful headers', () => {
      const website = new StaticWebsite([
        { key: '/foo', headers: { 'Content-Type': 'text/plain; charset=utf-8' }, body: 'foo' },
        { key: '/bar', headers: { 'Location': '/foo' }, body: '' }
      ])

      const maybeError = validate.headersAreUseful(website)
      expect(maybeError).to.eq(null)
    })

    it('should return an error', () => {
      const website = new StaticWebsite([
        { key: '/foo', headers: { 'bad-header': 'bar' }, body: 'foo' }
      ])

      const maybeError = validate.headersAreUseful(website)
      expect(maybeError).not.to.eq(null)
      const message = maybeError.message
      expect(message).to.contain('/foo')
      expect(message).to.contain('bad-header')
    })

    it('should bundle lots of errors together', () => {
      const website = new StaticWebsite([
        { key: '/foo', headers: { 'bad-header': 'bar' }, body: 'foo' },
        { key: '/bar', headers: { 'header1': 'baz', 'header2': 'baz' }, body: 'baz' }
      ])

      const maybeError = validate.headersAreUseful(website)
      expect(maybeError).not.to.eq(null)
      const message = maybeError.message
      expect(message).to.contain('/foo')
      expect(message).to.contain('/bar')
      expect(message).to.contain('bad-header')
      expect(message).to.contain('header1')
      expect(message).to.contain('header2')
    })
  })
})
