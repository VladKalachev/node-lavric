import Message from '#app/models/message.js';
import ChatAppendEvent from '#app/events/chat/append.js'
import { ValidationError } from 'sequelize'

export default async (request, response) => {
	try{
		let message = await Message.create({
			username: request.body?.username,
			text: request.body?.text
		});
	
		new ChatAppendEvent(message);
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