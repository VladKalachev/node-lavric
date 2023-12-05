import 'dotenv/config'
import Support from '#app/models/support.js'

Support.sync({ alter: true });