const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

const service = sequelize.define('service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    patente: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 1,
        max: 10
    },
    kilometraje: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    comentarios_ingreso: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 1,
        max: 100
    },
    comentarios_salida: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 1,
        max: 100
    }
    }, {
    timestamps: false,
    freezeTableName:true,
    }
);

module.exports = service;