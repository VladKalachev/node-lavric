import { DataTypes } from 'sequelize'
import sequelize from '#app/globals/sequelize.js';

const Message = sequelize.define('Message', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	// if user same in db, without name
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	text: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			len: [ 2, 256 ]
		}
	}
});

export default Message;