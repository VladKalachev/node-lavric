export default class Channel{
	constructor(id, description, lifetime = null){
		this.id = id;
		this.description = description;
		this.clients = new Map();
	}

	addClient(request, response){
		let client = { request, response, created: new Date() };
		this.clients.set(response, client);
		response.on('close', () => this.removeClient(response));
		return client;
	}

	removeClient(response){
		this.clients.delete(response);
	}

	forClients(callback){
		this.clients.forEach(callback);
	}
}