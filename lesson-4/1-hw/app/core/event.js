import eventBus from '#app/globals/eventbus.js'

// ideal abstract
export default class Event{
	// this -> class
	static run(...args){
		let event = new this(...args);
		eventBus.emit(this.name, event);
	}
}