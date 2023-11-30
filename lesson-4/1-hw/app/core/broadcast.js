import Channel from "#app/core/channel.js";

export default class Broadcast{
	constructor(){
		this.channels = {};
		this.ids = [];
	}

	createChannel(description){
		const id = Symbol(description);
		const channel = new Channel(id, description);
		this.ids.push(id);
		this.channels[id] = channel;
		return channel;
	}

	removeChannel(id){
		//todo
	}
}