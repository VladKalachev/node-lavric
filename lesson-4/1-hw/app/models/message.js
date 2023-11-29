import { DataTypes } from 'sequelize'
import sequelize from '#app/globals/sequelize.js';

const Message = sequelize.define('Message', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [2, 20]
		}
	},
	text: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			len: [ 8, 400 ]
		}
	}
});

export default Message;