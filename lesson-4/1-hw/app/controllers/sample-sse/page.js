export default function(_, response){
	response.render('sse', {
		layout: false
	});
}