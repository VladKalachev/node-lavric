import 'dotenv/config'
 
import { PORT, HOST } from './app/config/app.js'
import { VIEW_DIR, VIEW_ENGINE, VIEW_ENGINE_NAME } from './app/config/view.js'
import express from 'express'
import registerRoutes from '#app/routes/index.js'
import registerMiddleware from '#app/middleware/index.js'

const server = express();

server.engine(VIEW_ENGINE_NAME, VIEW_ENGINE);
server.set('views', VIEW_DIR)
server.set('view engine', VIEW_ENGINE_NAME)

registerMiddleware(server);
registerRoutes(server);

server.listen(PORT, () => {
	console.log(`Started on ${HOST}`);
});

import '#app/globals/sequelize.js'