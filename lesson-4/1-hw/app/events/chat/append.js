
import Event from '#app/core/event.js'

export default class ChatAppendEvent extends Event{
	static name = Symbol('ChatAppendEvent');

	constructor(message){
		super();
		this.message = message;
	}
}