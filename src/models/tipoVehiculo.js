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
        allowNull: false
    },
    tipo_licencia: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
    timestamps: false,
    freezeTableName:true,
    }
);

module.exports = tipoVehiculo;