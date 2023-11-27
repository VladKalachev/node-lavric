const http = require('http');
const wt = require('worker_threads');

let cachedResult = 0;
let isCalculations = false;

const server = http.createServer(function(request, response){
	switch(request.url){
		case '/':
			mainPage(request, response);
			break;
		case '/calc':
			calcPage(request, response);
			break;
		default:
			response.writeHead(404);
			response.end('Page not found');
	}
});

server.listen(3000);

function mainPage(request, response){
	response.end(`main, result = ${cachedResult}`);
}

function calcPage(request, response){
	if(isCalculations){
		response.end('already run!');
	}
	else{
		isCalculations = true;
		let worker = new wt.Worker('./calc.js');

		// in real, error event
		worker.on('message', value => {
			console.log('here');
			cachedResult = value;
			isCalculations = false;
			response.end('calculated!');
		});

	}
}