import { DataTypes } from 'sequelize'
import sequelize from '#app/globals/sequelize.js';

const Bet = sequelize.define('Bet', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	value: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
});

export default Bet;