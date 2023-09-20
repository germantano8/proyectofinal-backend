const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

const tipoVehiculo = sequelize.define('tipo_vehiculo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 3,
        max: 45
    },
    tipo_licencia: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 1,
        max: 10
    }
    }, {
    timestamps: false,
    freezeTableName:true,
    }
);

module.exports = tipoVehiculo;