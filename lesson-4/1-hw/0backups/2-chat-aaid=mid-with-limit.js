import eventBus from '#app/globals/eventbus.js'
import ChatAppendEvent from '#app/events/chat/append.js'
import Message from '#app/models/message.js'
import broadcast from '#app/globals/broadcast.js'
import { Op } from 'sequelize'

const channel = broadcast.createChannel('Chat SSE');
eventBus.on(ChatAppendEvent.name, e => channel.forClients(client => sendMessage(client, e.message)));

export default async (request, response) => {
	let lastEventId = parseInt(request.headers['last-event-id'] ?? '0');

	let immediatelyMessages = await Message.findAll({
		where: { id: { [ Op.gt ]: lastEventId }},
		order: [
			['createdAt', 'DESC']
		],
		limit: 10
	});

	let client = channel.addClient(request, response);

	response.writeHead(200, {
		'Content-Type': 'text/event-stream; charset=utf-8',
		'Cache-Control': 'no-cache'
	});

	immediatelyMessages.reverse().forEach(message => sendMessage(client, message));
}

function sendMessage(client, message){
	client.response.write(`event: append\ndata: ${JSON.stringify(message)}\nid:${message.id}\n\n`);
}