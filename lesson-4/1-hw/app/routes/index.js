import homePage from '#app/controllers/home.js'

import betsStreamPage from '#app/controllers/bets/stream.js'
import betsAddPage from '#app/controllers/bets/add.js'

import chatPage from '#app/controllers/chat/page.js'
import chatStream from '#app/controllers/chat/stream.js'
import chatAdd from '#app/controllers/chat/add.js'

import monitorBroadcasts from '#app/controllers/monitor/broadcasts.js'

import ssePage from '#app/controllers/sample-sse/page.js'
import sseStream from '#app/controllers/sample-sse/stream.js'

export default server => {
	server.get('/', homePage);
	server.get('/bets', betsStreamPage);
	server.get('/bets/add', betsAddPage);
	/* server.get('/bets/clients-debug', betsStreamPageDebug); */
	server.get('/chat', chatPage);
	server.post('/chat', chatAdd);
	server.get('/chat/stream', chatStream);

	server.get('/monitor/broadcasts', monitorBroadcasts);
	
	server.get('/sse', ssePage);
	server.get('/sse/stream', sseStream);
}