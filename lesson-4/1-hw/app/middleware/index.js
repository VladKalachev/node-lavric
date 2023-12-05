import servePublic from '#app/middleware/serve-public.js'
import bodyParser from '#app/middleware/body-parser.js'
import cookieParser from '#app/middleware/cookie-parser.js'
import convertEmptyStringToNull from '#app/middleware/convert-empty-string-to-null.js'

export default server => {
	servePublic(server);
	bodyParser(server);
	cookieParser(server);
	convertEmptyStringToNull(server);
}