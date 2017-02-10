'use strict'

const StaticWebsite = require('../index').StaticWebsite

describe('StaticWebsite', () => {
  it('should convert strings to utf-8 Buffers', () => {
    const website = new StaticWebsite([
      { key: '/utf8', headers: {}, body: 'ᚠᛇᚻ' }
    ])
    expect(website.endpoints).to.deep.eq([
      { key: '/utf8', headers: {}, body: Buffer.from([ 225, 154, 160, 225, 155, 135, 225, 154, 187 ]) }
    ])
  })

  it('should apply defaultHeaders', () => {
    const headers1 = { 'foo': 'bar', 'Content-Type': 'text/html' }
    const headers2 = { 'foo': 'bar' }

    const website = new StaticWebsite([
      { key: '/hasHeader', headers: headers1, body: 'hi' },
      { key: '/noHeader', headers: headers2, body: 'hi again' }
    ], {
      defaultHeaders: { 'Content-Type': 'text/plain' }
    })
    expect(website.endpoints).to.deep.eq([
      { key: '/hasHeader', headers: { 'foo': 'bar', 'Content-Type': 'text/html' }, body: Buffer.from('hi') },
      { key: '/noHeader', headers: { 'foo': 'bar', 'Content-Type': 'text/plain' }, body: Buffer.from('hi again') }
    ])

    // make sure the input isn't modified
    expect(headers1).to.deep.eq({ 'foo': 'bar', 'Content-Type': 'text/html' })
    expect(headers2).to.deep.eq({ 'foo': 'bar' })
  })

  it('should encode and decode', () => {
    const website1 = new StaticWebsite([
      { key: '/foo', headers: { 'foo': 'bar' }, body: Buffer.from('bar') },
      { key: '/bar', headers: { 'foo': 'bar' }, body: Buffer.from('text in a buffer') }
    ])

    const website2 = StaticWebsite.fromBuffer(website1.toBuffer())
    expect(website2.endpoints).to.deep.eq([
      { key: '/foo', headers: { 'foo': 'bar' }, body: Buffer.from('bar') },
      { key: '/bar', headers: { 'foo': 'bar' }, body: Buffer.from('text in a buffer') }
    ])
  })

  describe('merging two websites', () => {
    const site1 = new StaticWebsite([
      { key: '/foo', headers: {}, body: '1' },
      { key: '/bar', headers: {}, body: '2' }
    ])

    const site2 = new StaticWebsite([
      { key: '/bar', headers: {}, body: '10' },
      { key: '/baz', headers: {}, body: '3' }
    ])

    const result = StaticWebsite.merge(site1, site2)

    it('should overwrite the first website with the second', () => {
      expect(result.endpoints).to.deep.eq([
        { key: '/foo', headers: {}, body: Buffer.from('1') },
        { key: '/bar', headers: {}, body: Buffer.from('10') },
        { key: '/baz', headers: {}, body: Buffer.from('3') }
      ])
    })
  })
})
