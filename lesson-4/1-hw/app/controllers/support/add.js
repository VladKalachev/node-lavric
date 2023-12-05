import Support from '#app/models/support.js';
import SupportAppendEvent from '#app/events/support/append.js'
import { ValidationError } from 'sequelize'

export default async (request, response) => {
	try{
		let support = await Support.create({
			uid: request.cookies.uid,
			text: request.body?.text
		});
	
		SupportAppendEvent.run(support);
		emulationBot(support);
		response.json(true); 
	}
	catch(e){
		if(e instanceof ValidationError){
			response.status(422).json(e.errors.map(error => error.message));
		}
		else{
			// 500
			response.status(500).end('anyone call to admin!'); 
		}
	}
}

function emulationBot(baseMessage){
	setTimeout(async () => {
		let support = await Support.create({
			uid: baseMessage.dataValues.uid,
			text: 'Open Chat AI: please, repeat slowly and clean!'
		});
	
		SupportAppendEvent.run(support);
	}, Math.random() * 3000 + 2000)
	
}