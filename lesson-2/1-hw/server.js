import http from 'http';
import { readFile } from 'fs'

// todo: 1. config/app.js 2. dot env
const DOMAIN = 'localhost';
const PROTOCOL = 'http';
const PORT = 3000;
const HOST = `${PROTOCOL}://${DOMAIN}:${PORT}`; // mb variant without :port

const clients = [];
const bets = [];

const server = http.createServer(function(request, response){
	const parsedUrl = new URL(request.url, HOST);

	switch(parsedUrl.pathname){
		case '/':
			mainPage(request, response, parsedUrl);
			break;
		case '/bets':
			betsStream(request, response, parsedUrl);
			break;
		default:
			response.writeHead(404);
			response.end('Page not found');
	}
});

server.listen(3000);

function mainPage(request, response, parsedUrl){
	readFile('./index.html', (err, buffer) => {
		if(err !== null){
			response.writeHead(500);
			response.end('error');
			// logs
		}
		else{
			response.end(buffer.toString());
		}
	});
}

function betsStream(request, response, parsedUrl){
	const fromId = parseInt(parsedUrl.searchParams.get('id') ?? '0');
	let immediatelyBets = bets.filter(bet => bet.id > fromId);
	const client = { request, response };

	if(immediatelyBets.length > 0){
		sendBetsToClient(client, bets);
	}
	else{
		clients.push(client);
		response.on('close', () => cleanClient(response));
	}
}

function sendBetsToClient(client, bets){
	client.response.end(JSON.stringify(bets));
}

function cleanClient(response){
	let ind = clients.findIndex(client => client.response === response);

	if(ind !== -1){
		clients.splice(ind, 1);
	}
}

function randomBet(){
	setTimeout(() => {
		let id = bets.length > 0 ? bets[bets.length - 1].id : 0;
		++id;
		let bet = { id, value: id * 1000, time: Date.now() };
		bets.push(bet);
		clients.forEach(client => sendBetsToClient(client, [ bet ]));
		randomBet();
	}, 1000 * ( Math.floor(Math.random() * 20) + 20 ));
}

randomBet();