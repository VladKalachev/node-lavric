import Bets from '#app/models/bet.js';
import BetAppendEvent from '#app/events/bets/append.js'

export default async (request, response) => {
	// todo: post  request, validation etc
	
	let bet = await Bets.create({
		value: 1000
	});

	new BetAppendEvent(bet);
	response.end(JSON.stringify(true)); 
}