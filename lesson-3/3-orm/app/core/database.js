import mariadb from 'mariadb';
import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from '#app/config/db.js'
console.log({ DB_HOST, DB_NAME, DB_PASS, DB_USER })

const connection = mariadb.createConnection({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASS,
	database: DB_NAME
});

connection.then(db => {
	console.log('conneted');
});

