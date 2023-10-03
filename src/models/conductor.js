const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

const conductor = sequelize.define('conductor', {
    dni: {         
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        min: 8,
        max: 8
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 3,
        max: 45
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 3,
        max: 45
    },
    licencias: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 2,
        max: 10
    },
    }, {
    timestamps: false,
    freezeTableName:true,
    }
);

module.exports = conductor;