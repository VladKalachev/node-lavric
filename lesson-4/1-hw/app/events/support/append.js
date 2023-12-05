import Event from '#app/core/event.js'

export default class SupportAppendEvent extends Event{
	static name = Symbol('SupportAppendEvent');

	constructor(support){
		super();
		this.support = support;
	}
}