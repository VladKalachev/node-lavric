import { enter, autoEnter, socket } from '#app/controllers/chat.js'

export default (app, server) => {
	app.get('/', (_, r) => r.end('go away'));
	app.post('/enter', enter);
	app.get('/enter-auto', autoEnter);

	socket(server);
}