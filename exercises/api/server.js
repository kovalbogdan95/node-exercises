const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
var mime = require('mime-types')


/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */

const hostname = '127.0.0.1'
const port = 3000
const index_file = 'index.html'
const file_not_found = '404.html'

const getMimetype = (file_name) => {
  return {'Content-Type': mime.lookup(file_name)}
}

const returnFile = (res, file_name, status) => {
  res.writeHead(status, getMimetype(file_name))
  res.write(fs.readFileSync(file_name, {encoding: 'utf-8'}).toString())
  res.end()
}

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer((req, res) => {
  const method = req.method
  const route = url.parse(req.url).pathname
  let file_name = route
  // this is sloppy, especially with more assets, create a "router"
  if (route === '/') {
    file_name = index_file
  }
  let assetPath = path.join(__dirname, 'assets', file_name)
  if (fs.existsSync(assetPath)) {
    returnFile(res, assetPath, 200)
    logRequest(method, route, 200)
  }
  else {
    returnFile(res, path.join(__dirname, 'assets', file_not_found), 404)
    logRequest(method, route, 404)
  }
  // most important part, send down the asset
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
