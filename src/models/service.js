const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

const service = sequelize.define('service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
   // fecha: {
   //     type: DataTypes.DATE,
   // },
    patente: {
        type: DataTypes.STRING,
        min: 6,
        max: 10
    },
    kilometraje: {
        type: DataTypes.INTEGER,
    },
    comentarios_ingreso: {
        type: DataTypes.STRING,
        max: 100
    },
    comentarios_salida: {
        type: DataTypes.STRING,
        max: 100
    }
    }, {
    timestamps: false,
    freezeTableName:true,
    }
);

module.exports = service;