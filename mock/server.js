var jsonServer = require('json-server')
var server = jsonServer.create()
var mock = jsonServer.router('mock.json')
var routes = require('./routes.json')
var rewriter = jsonServer.rewriter(routes)
var middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(rewriter)
server.use(mock)
server.listen(3456, function () {
  console.log('JSON Server is running')
})