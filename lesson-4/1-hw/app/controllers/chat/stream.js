import eventBus from '#app/globals/eventbus.js'
import ChatAppendEvent from '#app/events/chat/append.js'
import Message from '#app/models/message.js'
import broadcast from '#app/globals/broadcast.js'

const channel = broadcast.createChannel('Chat SSE');
let eventId = 0;
const events = []; // todo in real, set max length of array
const messagesHistoryVolume = 10;
let emulateIdJumps = false;

let messages = await Message.findAll({
	order: [['createdAt', 'DESC']],
	limit: messagesHistoryVolume
});

messages.reverse().forEach(message => appendEvent(message))

eventBus.on(ChatAppendEvent.name, e => {
	//emulateIdJumps = true;
	let event = appendEvent(e.message);
	channel.forClients(client => sendEvent(client, event));
});

export default async (request, response) => {
	let lastEventId = parseInt(request.headers['last-event-id'] ?? '0');
	let client = channel.addClient(request, response);

	response.writeHead(200, {
		'Content-Type': 'text/event-stream; charset=utf-8',
		'Cache-Control': 'no-cache'
	});

	events.forEach(event => {
		if(event.id > lastEventId){
			sendEvent(client, event);
		}
	});
}

function sendEvent(client, event){
	client.response.write(`event: ${event.name}\ndata: ${JSON.stringify(event.data)}\nid:${event.id}\n\n`);
}

function appendEvent(message){
	eventId++;

	if(emulateIdJumps){
		eventId++;
	}

	let event = {
		id: eventId,
		name: 'append',
		data: message.dataValues
	}

	events.push(event);

	if(events.length > messagesHistoryVolume){
		events.shift();
	}

	return event;
}