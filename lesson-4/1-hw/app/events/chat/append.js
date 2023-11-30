import eventBus from '#app/globals/eventbus.js'

export default class ChatAppendEvent{
	static name = Symbol('ChatAppendEvent');

	constructor(message){
		this.message = message;
		eventBus.emit(this.constructor.name, this);
	}
}