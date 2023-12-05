export default (request, response) => {
	if(!request.cookies.uid){
		response.cookie('uid', Math.random() + '.' + Date.now());
	}

	response.render('support', {
		title: 'Support page'
	});
}