export default function(_, response){
	response.writeHead(200, {
		'Content-Type': 'text/event-stream; charset=utf-8',
		'Cache-Control': 'no-cache'
	});

	response.write(`event: init\ndata: null\n\n`);

	function sendEvent(){
		let rand = Math.random();
		response.write(`event: random\ndata: ${rand}\n\n`);
		setTimeout(sendEvent, 5000);
	}

	sendEvent();
}

/*
data: {}\n\n
event: init\ndata: {}\n\n
id: 1\nevent: init\ndata: {}\n\n

id: 1
event: append
data: { id: 1, value: 100 }


id: 2
event: append
data: { id: 2, value: 200 }



*/