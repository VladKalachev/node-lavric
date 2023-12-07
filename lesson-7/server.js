import 'dotenv/config'

import { HOST, PORT } from './app/config/app.js'
import { CLIENT_HOST } from './app/config/client.js'
import express from 'express'
import cors from 'cors'
import registerRoutes from '#app/routes/index.js'
import registerMiddleware from '#app/middleware/index.js'

const app = express();

app.use(cors({
	origin: [ CLIENT_HOST ]
}));

const server = app.listen(PORT, () => {
	console.log(`Started on ${HOST}`);
});

registerMiddleware(app);
registerRoutes(app, server);

import '#app/globals/sequelize.js'