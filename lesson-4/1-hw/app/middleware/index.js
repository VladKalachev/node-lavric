import servePublic from '#app/middleware/serve-public.js'
import bodyParser from '#app/middleware/body-parser.js'
import convertEmptyStringToNull from '#app/middleware/convert-empty-string-to-null.js'

export default server => {
	servePublic(server);
	bodyParser(server);
	convertEmptyStringToNull(server);
}