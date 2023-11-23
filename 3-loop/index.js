const http = require('http');

const server = http.createServer(function(request, response) {
  switch(request.url) {
    case '/':
      mainPage(request, response);
      break;
    case '/main':
      calcPage(request, response)
      break;
    default:
      response.writeHead(404);
      response.end('404 Not Found');
  }
})

server.listen(4000);

function mainPage(request, response) {
  response.end('main');
}

function calcPage(request, response) {
  response.end('calc');
}

