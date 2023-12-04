function runOn(selector, callback){
	const elem = document.querySelector(selector);

	if(elem !== null){
		callback(elem);
	}
}

runOn('.runner-page-home', function(){
	const betsBox = document.querySelector('.bets');
	const bets = [];
	
	function loadBets(){
		let maxId = bets.length > 0 ? bets[bets.length - 1].id : 0;
		let controller = new AbortController();
		let request = fetch(`/bets?id=${maxId}`, { 
			signal: controller.signal 
		});
		let repeat = true;
	
		let timeout = setTimeout(() => {
			controller.abort();
		}, 30000);
	
		request
			.then(response => response.json())
			.then(applyBets)
			.catch(e => {
				if(e.code !== 20){
					repeat = false;
				}
				else{
					console.warn(e);
					// client, nice error, connection is problem
				}
			})
			.finally(data => {
				clearTimeout(timeout);
	
				if(repeat){
					loadBets();
				}
			})
	}
	
	function applyBets(updBets){
		updBets.forEach(bet => {
			bets.push(bet);
			let p = document.createElement('p');
			p.innerHTML = JSON.stringify(bet);
			betsBox.appendChild(p);
		});
	}
	
	loadBets();
});

runOn('.runner-page-chat', function(root){
	const chatBox = document.querySelector('.chat');
	const stream = new EventSource('/chat/stream');
	let lastRecivedId = null;

	stream.addEventListener('append', e => {
		let currentReciedId = parseInt(e.lastEventId);

		if(lastRecivedId === null || currentReciedId === lastRecivedId + 1){
			lastRecivedId = currentReciedId;
		}
		else{
			alert('We show nice message, you should update page, because some messages lost');
			// or - close this event source instance, remove chatbox inner html, & start new eventsource
		}
		
		applyMessage(JSON.parse(e.data));
	});
	
	function applyMessage(message){
		let p = document.createElement('p');
		p.innerHTML = JSON.stringify(message);
		chatBox.appendChild(p);
	}

	const form = document.querySelector('.chat-message-form');

	form.addEventListener('submit', async e => {
		e.preventDefault();
		let formData = new FormData(form);

		try{
			let response = await fetch(`/chat`, {
				method: 'POST', 
				body: JSON.stringify(Object.fromEntries(formData.entries())),
				headers: {
					'Content-Type': 'application/json'
				}
			});
	
			let data = await response.json();
			
			if(response.status == 422){
				alert(data);
			}
			else{
				form.querySelector('[name=text]').value = '';
			}
		}
		catch(e){
			console.dir(e);
			// look status^ 422, 500
		}
	});
});

// runOn('.runner-page-chat', function(root){
// 	const chatBox = document.querySelector('.chat');
// 	const messages = [];
	
// 	function loadMessages(){
// 		let maxId = messages.length > 0 ? messages[messages.length - 1].id : 0;
// 		let controller = new AbortController();
// 		let request = fetch(`/chat/stream?id=${maxId}`, { 
// 			signal: controller.signal 
// 		});
// 		let repeat = true;
	
// 		let timeout = setTimeout(() => {
// 			controller.abort();
// 		}, 30000);
	
// 		request
// 			.then(response => response.json())
// 			.then(applyMessages)
// 			.catch(e => {
// 				if(e.code !== 20){
// 					repeat = false;
// 				}
// 				else{
// 					console.warn(e);
// 					// hard how do this repeat system, useragent.isOnline etc
// 					// client, nice error, connection is problem
// 				}
// 			})
// 			.finally(data => {
// 				clearTimeout(timeout);
	
// 				if(repeat){
// 					loadMessages();
// 				}
// 			})
// 	}
	
// 	function applyMessages(updMessages){
// 		updMessages.forEach(message => {
// 			messages.push(message);
// 			let p = document.createElement('p');
// 			p.innerHTML = JSON.stringify(message);
// 			chatBox.appendChild(p);
// 		});
// 	}
	
// 	loadMessages();

// 	const form = document.querySelector('.chat-message-form');

// 	form.addEventListener('submit', async e => {
// 		e.preventDefault();
// 		let formData = new FormData(form);

// 		try{
// 			let response = await fetch(`/chat`, {
// 				method: 'POST', 
// 				body: JSON.stringify(Object.fromEntries(formData.entries())),
// 				headers: {
// 					'Content-Type': 'application/json'
// 				}
// 			});
	
// 			let data = await response.json();
			
// 			if(response.status == 422){
// 				alert(data);
// 			}
// 			else{
// 				form.querySelector('[name=text]').value = '';
// 			}
// 		}
// 		catch(e){
// 			console.dir(e);
// 			// look status^ 422, 500
// 		}
// 	});
// });