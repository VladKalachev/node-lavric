import { DataTypes } from 'sequelize'
import sequelize from '#app/globals/sequelize.js';

const Support = sequelize.define('Support', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	uid: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [16, 255]
		}
	},
	text: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			len: [ 5, 400 ]
		}
	}
});

export default Support;