const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

const reparacion = sequelize.define('reparacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    comentarios: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 3,
        max: 45
    },
    fecha_desde: {
        type: DataTypes.DATEONLY, 
        allowNull: false
    },
    fecha_hasta: {
        type: DataTypes.DATEONLY, 
        allowNull: false
    },
    patente: {
        type: DataTypes.STRING,
        primaryKey: false,
        allowNull: false,
        min: 6,
        max: 10,
        references: {
            model: Vehiculo,
            key: 'patente'
        }
    },

    }, {
    timestamps: false,
    freezeTableName:true,
    }
);

module.exports = reparacion;