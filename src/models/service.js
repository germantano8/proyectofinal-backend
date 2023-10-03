const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');
const vehiculo = require('./vehiculo');

const service = sequelize.define('service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
   fecha: {
        type: DataTypes.DATEONLY,
    },
    patente: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 6,
        max: 10,
        references: {
            model: vehiculo,
            key: 'patente'
        }
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