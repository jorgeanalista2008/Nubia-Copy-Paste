const { DataTypes } = require('sequelize');
const db24 = require('../../config/dbPY24');
const MetodosPagos = require('./MetodosPago');
// DEPOSITOS

const depositosaeros = db24.define('depositosaeros', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	dni: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	transaction_type: {
		type: DataTypes.STRING(255),
		allowNull: false,
		defaultValue: 'BTC'
	},
	amountAero: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	price: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING(100),
		allowNull: false,
		defaultValue: 'No verificado'
	},
	activatedAt: {
		type: DataTypes.STRING(100),
		allowNull: true,
		defaultValue: null
	},
});

depositosaeros.MetodosPagos = depositosaeros.belongsTo(MetodosPagos);
module.exports = depositosaeros;