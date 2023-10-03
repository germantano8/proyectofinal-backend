const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

const cliente = sequelize.define('cliente', {
    cuit:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        min: 11,
        max: 11
    },
    razon_social: {
        type: DataTypes.STRING,
        min: 1,
        max: 45
    }
    }, {
    timestamps: false,
    freezeTableName:true,
    }
);

module.exports = cliente;