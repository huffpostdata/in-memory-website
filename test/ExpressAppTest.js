'use strict'

const express = require('express')

const StaticWebsite = require('../index').StaticWebsite
const ExpressApp = require('../index').ExpressApp

describe('ExpressApp', () => {
  const website = new StaticWebsite([
    { path: '/utf8', headers: { 'Content-Type': 'text/plain; charset=utf-8' }, body: 'ᚠᛇᚻ' }
  ])

  it('should serve a web page, including headers', () => {
    const app = express().use(ExpressApp(website))
    return chai.request(app).get('/utf8')
      .then(res => {
        expect(res).to.have.status(200)
        expect(res).to.have.header('Content-Type', 'text/plain; charset=utf-8')
        expect(res.text).to.eq('ᚠᛇᚻ')
      })
  })

  it('should serve a 404', () => {
    const app = express().use(ExpressApp(website))
    return chai.request(app).get('/not-found')
      .catch(err => {
        if (err.response) {
          return err.response
        } else {
          throw err
        }
      })
      .then(res => {
        expect(res).to.have.status(404)
        expect(res).to.be.text
        expect(res.text).to.eq('Could not find page at path /not-found')
      })
  })
})
