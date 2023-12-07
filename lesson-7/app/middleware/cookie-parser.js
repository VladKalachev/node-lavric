import cookieParser from 'cookie-parser'

export default server => {
	server.use(cookieParser());
}