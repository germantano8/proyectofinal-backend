const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');
const tipoVehiculo = require('./tipoVehiculo');

const vehiculo = sequelize.define('vehiculo', {
    patente:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        min: 6,
        max: 10
    },
    estado:{
        type: DataTypes.ENUM('disponible', 'en-obra', 'alquilada', 'mantenimiento'),
        allowNull: false,
        defaultValue: 'disponible',
    },
    anio:{
        type: DataTypes.INTEGER,
        allowNull: true,
        min: 1900,
        max: 2025
    },
    kilometraje:{
        type: DataTypes.INTEGER,
        allowNull: true,
        min: 0,
        max: 999999
    },
    id_tipo_vehiculo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: tipoVehiculo,
            key: 'id'
        }
    }
    }, {
    timestamps: false,
    freezeTableName:true,
    },
);

vehiculo.belongsTo(tipoVehiculo, {foreignKey: 'id_tipo_vehiculo'});
tipoVehiculo.hasMany(vehiculo, {foreignKey: 'id_tipo_vehiculo'});

module.exports = vehiculo;