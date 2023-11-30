import eventBus from '#app/globals/eventbus.js'
import ChatAppendEvent from '#app/events/chat/append.js'
import { Op } from 'sequelize'
import Message from '#app/models/message.js'
import broadcast from '#app/globals/broadcast.js'

const channel = broadcast.createChannel('Chat long polling');
eventBus.on(ChatAppendEvent.name, e => channel.forClients(client => client.response.json([ e.message ])));

export default async (request, response) => {
	const fromId = parseInt(request.query.id ?? '0');
	let immediatelyMessages = await Message.findAll({
		where: { id: { [ Op.gt ]: fromId } }
	});

	if(immediatelyMessages.length > 0){
		response.json(immediatelyMessages);
	}
	else{
		channel.addClient(request, response);
	}
}