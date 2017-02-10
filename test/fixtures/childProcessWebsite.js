'use strict'

const StaticWebsite = require('../../lib/StaticWebsite')
const ChildProcessServer = require('../../lib/ChildProcessServer')

const website = new StaticWebsite([
  { key: '/text', headers: { 'Content-Type': 'text/plain; charset=utf-8' }, body: 'text' },
  { key: '/buffer', headers: { 'Content-Type': 'text/plain; charset=utf-8' }, body: Buffer.from('buffer') },
  { key: '/redirect', headers: { 'Location': '/text' }, body: '' },
])

if (!process.channel) throw new Error('This script must be invoked using child_process.fork().')

const server = new ChildProcessServer(website)
server.listen() // sends 'ready' to parent
