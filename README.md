A static website. In memory. You can save your website to a file, serve it, or
upload it to S3.

What's a "static" website? "Static" means this:

* Only GET and HEAD requests are valid.
* The response for a given endpoint never changes.
* There are no errors. (A _server_ may return 404 errors, and a _server_ may
  receive erroneous HTTP requests; but those aren't _website_ errors.)

Why "in memory"? Because it's crazy-fast for small websites. And it's better
than storing the website as a bunch of files:

* A website doesn't have "folders": it has "paths". `/foo` can be an HTML file,
  and `/foo/bar` can also be an HTML file. See? `/foo` is not a folder.
* A website doesn't just return file contents: it also returns HTTP headers.
  Those headers aren't derived from the file contents.
* A website can have redirects.

How do you take advantage? Use a framework that outputs a "static website" in
this format. This package provides the tools to develop and deploy within
milliseconds.

Usage
=====

First, `npm install --save in-memory-website`

Now, build your in-memory website. It can be as simple as this, `my-website.js`:

```javascript
'use strict'

const StaticWebsite = require('in-memory-website').StaticWebsite
const website = new StaticWebsite([
  { path: '/hello-world', headers: { 'Content-Type': 'text/plain; charset=utf-8' }, body: Buffer.from('Hello, World!') }
])

// ... now let's see what we can do with this website.
```

### Local website

Now you can serve the website locally. The 404 error page is a directory
listing, and any response with a `Location` header becomes a
`301 Moved Permanently`.

```javascript
// ... continuing above program
const DevServer = require('in-memory-website').HttpServer
const server = new HttpServer(website)
server.listen(3000) // and browse to http://localhost:3000
```

### Saving a website as a file

You can dump the website to a file, and then reload it later:

```javascript
// ... continuing above program
const fs = require('fs')
fs.writeFileSync('my-website.bin', website.toBuffer())

// ... and in a later program
const website2 = StaticWebsite.fromBuffer(fs.readFileSync('my-website.bin'))
```

### Lightning-fast development server

Want to code a website? Good. Here's the pattern for you. It involves three
scripts:

**1. build.js: builds a website; outputs to stdout**

```javascript
#!/usr/bin/env node
'use strict'

const StaticWebsite = require('in-memory-server').StaticWebsite
const validate = require('in-memory-server').validate

// Normally our website generator would be more complex. Potentially it will
// be asynchronous. It may throw an error. Make this script exit with a
// non-zero error code if there's a problem.
const website = new StaticWebsite([
  {
    path: '/hello-world',
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    body: Buffer.from('Hello, World!')
  }
])

// We have utilities to avoid common mistakes. Choose the mistakes you want
// to avoid; make this script exit with a non-zero error code if there's a
// problem.
const validationError = validate.headersAreUseful(website)
if (validationError) throw validationError

// No problem? Write the website to stdout and exit with a zero error code
// (the default).
process.stdout.write(website.toBuffer())
```

This is your framework: the program that builds your entire website. It outputs
the website to `process.stdout` and exits with status code `0`. If it fails
(for instance, your framework has a syntax error), the error is output to
`process.stderr`.

**2. dev.js: serves a website; rebuilds automatically**

```javascript
#!/usr/bin/env node
'use strict'

const DevServer = require('in-memory-server').DevServer

const server = new DevServer(`${__dirname}/build.js`)

// In this dev environment, let's rebuild the website every time a file changes
const chokidar = require('chokidar') // https://github.com/paulmillr/chokidar
chokidar.watch([ 'src' ])
  .on('change', () => server.queueBuild())
  .on('add', () => server.queueBuild())
  .on('unlink', () => server.queueBuild())
  // queueBuild() is "debounced": if 10 files change very quickly, we only
  // rebuild once.

server.listen(3000, err => {
  if (err) throw err
  console.log('Listening at http://localhost:3000')
})

server.listenForLiveReload() // and use http://livereload.com/extensions/
```

This is your development environment: the program you run in the background
while you work. It's a web server, at
[http://localhost:3000](http://localhost:3000). It has some nifty features:

* Its "404 Not Found" page links to all the valid endpoints
* When `build.js` returns a status code that isn't `0`, every endpoint is a
  `500 Internal Server Error` with debugging information.
* It queues HTTP requests while rebuilding; those HTTP requests will complete
  when the build finishes.
* If you use a [LiveReload browser extension](http://livereload.com/extensions/)
  the page will refresh whenever you change a file. That means you'll see the
  results of your code changes immediately -- be they error messages or
  bugfixes.

**3. deploy.js: sends a website to a production server**

```javascript
#!/usr/bin/env node
'use strict'

const child_process = require('child_process')
const StaticWebsite = require('in-memory-website').StaticWebsite
const S3Uploader = require('in-memory-website').S3Uploader

// Throws error if build.js fails
const websiteData = child_process.execFileSync(`${__dirname}/build.js`)
const website = StaticWebsite.fromBuffer(websiteData)

S3Uploader.uploadWebsiteToBucket(website, 'my-bucket', {}, err => {
  if (err) throw err
})
```

### Lightning-fast production server

[Hosting on S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)
is cheap and fast. TODO add tutorial.

Alternatively, if you use Docker, you can easily build a standalone web
server based on `./tools/http-server`.

### Backup production server

We supply [Express](https://expressjs.com) middleware to help you build your
own web server. For instance:

```javascript
#!/usr/bin/env node
'use strict'

const express = require('express')
const StaticWebsite = require('in-memory-website').StaticWebsite
const ExpressApp = require('in-memory-website').ExpressApp

const websiteData = require('fs').readFileSync('websiteDumpedSomewhere.data')
const website = StaticWebsite.fromBuffer(websiteData)

const app = express()
app.use(ExpressApp(website))

app.listen(3000, () => { console.log('Listening at http://localhost:3000') })
```

License
=======

Copyright (c) 2017 The Huffington Post, released under the MIT license.
See LICENSE.
