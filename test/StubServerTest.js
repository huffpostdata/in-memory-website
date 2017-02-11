'use strict'

const StaticWebsite = require('../index').StaticWebsite
const StubServer = require('../index').StubServer

function stubServer(endpoints, options) {
  const site = new StaticWebsite(endpoints, options)
  return new StubServer(site)
}

describe('StubServer', () => {
  it('should get() a valid path', () => {
    const endpoint = { path: '/foo', headers: {}, body: Buffer.from('bar') }
    const server = stubServer([
      { path: '/not-foo', headers: {}, body: 'no' },
      endpoint,
      { path: '/also-not-foo', headers: {}, body: 'no' }
    ])
    expect(server.get('/foo')).to.deep.eq(endpoint)
  })

  it('should return null on invalid path', () => {
    const server = stubServer([
      { path: '/foo', headers: {}, body: 'no' }
    ])
    expect(server.get('bar')).to.eq(null)
  })

  it('should render404()', () => {
    const server = stubServer([
      { path: '/foo', headers: {}, body: 'hi' },
      { path: '/bar', headers: {}, body: 'bye' }
    ])
    const html = server.render404HtmlString()
    expect(html).to.contain('<a href="/foo"')
  })
})
