import eventBus from '#app/globals/eventbus.js'
import BetsAppendEvent from '#app/events/bets/append.js'
import { Op } from 'sequelize'
import Bet from '#app/models/bet.js'
import broadcast from '#app/globals/broadcast.js'

const channel = broadcast.createChannel('Bets long polling');
eventBus.on(BetsAppendEvent.name, e => channel.forClients(client => client.response.json([ e.bet ])));

export default async (request, response) => {
	const fromId = parseInt(request.query.id ?? '0');
	let immediatelyBets = await Bet.findAll({
		where: { id: { [ Op.gt ]: fromId } }
	});

	if(immediatelyBets.length > 0){
		response.json(immediatelyBets);
	}
	else{
		channel.addClient(request, response);
	}
}


// export function debug(request, response){
// 	let now = Date.now();

// 	let debugInfo = clients.map(client => ({
// 		created: client.created.toLocaleTimeString(),
// 		agent: client.request.headers['user-agent'],
// 		long: now - +client.created
// 	}));

// 	response.end(JSON.stringify(debugInfo, undefined, 4));
// }