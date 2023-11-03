const {DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

const usuario = sequelize.define('usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 3,
        max: 10,
        unique: true,
        primaryKey:true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        min: 8,
        max: 20
    },
    },{
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = usuario;