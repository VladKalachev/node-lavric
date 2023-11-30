import broadcast from "#app/globals/broadcast.js";

export default function(_, response){
	let now = Date.now();

	const channels = broadcast.ids.map(id => {
		let channel = broadcast.channels[id];

		return {
			description: channel.description,
			clients: Array.from(channel.clients).map(([_, client]) => ({
				created: client.created.toLocaleTimeString(),
				agent: client.request.headers['user-agent'],
				long: now - +client.created
			}))
		}
	});

	response.render('monitor/broadcasts', {
		layout: false,
		time: 2,
		channels
	});
}