import { Server } from "socket.io";
import { CLIENT_HOST } from '#app/config/client.js'
import Message from '#app/models/message.js'
import { Op } from 'sequelize';

let usersAi = 0;
const USERS = new Map();

export function enter(request, response){
	let { name } = request.body;

	if(name.length < 2 || name.length > 32){
		return response.status(422).json(false);
	}

	let token;

	do{
		token = Date.now() + '-' + Math.random();
	}while(USERS.has(token));

	let user = {
		// in real, id is simple ai integer
		id: ++usersAi,
		token,
		name,
		connections: 0
	};

	USERS.set(token, user);
	return response.json(user);
}

export function autoEnter(request, response){
	let { authorization } = request.headers;

	if(authorization && USERS.has(authorization)){
		return response.json({ res: true, user: USERS.get(authorization) });
	}

	return response.json({ res: false });
}

export function socket(httpServer){
	const io = new Server(httpServer, {
		cors: {
			origin: CLIENT_HOST
		}
	});

	io.on("connection", (socket) => {
		let user = getUser(socket);
		
		if(user === null){
			socket.emit('user.declined');
			socket.disconnect();
			return;
		}
		else{
			socket.emit('user.confirmed');
		}

		user.connections++;
		emitUserList(io);
		emitHistory(socket);

		socket.on('disconnect', () => onDisconnet(user, io));
		socket.on('message.send', form => onSend(io, socket, form));
		socket.on('message.history', data => emitHistory(socket, data.fromId));
		socket.on('message.typing', () => onTyping(socket));

		console.log(socket.id);
	});
}

function getUser(socket){
	let token = socket.request.headers.authorization;

	if(!USERS.has(token)){
		return null;
	}

	return USERS.get(token);
}

function onDisconnet(user, io){
	user.connections--;
	emitUserList(io);
}

async function onSend(io, socket, form){
	let user = getUser(socket);
	// in real, mn jwt token is expired...

	try{
		let { text } = form;
		let message = await Message.create({ userId: user.id, name: user.name, text });
		socket.emit('message.confirmed');
		io.emit('message.append', message);
	}
	catch(e){
		socket.emit('message.send.error', 'cant create with reason');
	}
}

function onTyping(socket){
	let user = getUser(socket);
	socket.broadcast.emit('user.typing', user.id);
}

function emitUserList(io){
	let users = {};

	[ ...USERS.values() ].filter(u => u.connections > 0).forEach(u => {
		users[u.id] = {
			name: u.name
		}
	});

	io.emit('users.list', users)
}

// in future - fromId
async function emitHistory(socket, fromId = null){
	let query = {
		order: [['createdAt', 'DESC']],
		limit: 10
	};

	if(fromId !== null){
		query.where = { id: { [Op.lt]: fromId } };
	}

	let messages = await Message.findAll(query);
	socket.emit('message.history', messages.reverse());
}