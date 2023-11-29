import eventBus from '#app/core/eventbus.js'

// todo: make parent class with lines #1 & #13
export default class BetsAppendEvent{
	static name = Symbol('BetsAppendEvent');

	constructor(bet){
		this.bet = bet;
		
		// hw for/from Nikolai; run other event, which can be async

		// console.log(this.constructor.name, `event run`, bet);
		eventBus.emit(this.constructor.name, this);
	}
}