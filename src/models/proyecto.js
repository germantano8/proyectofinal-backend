const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

const proyecto = sequelize.define('proyecto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 3,
        max: 45
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 1,
        max: 30
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY, //"YYYY-MM-DD"
        allowNull: false
    },
    fecha_fin_estimada: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fecha_fin_real: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: true,
        min: 1,
        max: 45
    }
    }, {
    timestamps: false,
    freezeTableName:true,
    }
);

module.exports = proyecto;