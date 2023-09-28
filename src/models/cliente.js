const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

const cliente = sequelize.define('cliente', {
    cuit:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        min: 8,
        max: 15
    },
    razon_social: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 1,
        max: 45
    }
    }, {
    timestamps: false,
    freezeTableName:true,
    }
);

module.exports = cliente;