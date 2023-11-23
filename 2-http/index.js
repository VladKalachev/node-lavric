const http = require('http');

const server = http.createServer(function(req, res) {
  res.end('Hi')
})

server.listen(4000);