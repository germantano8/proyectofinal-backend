const tipoVehiculoController = require('./tipoVehiculo');
const vehiculoController = require('./vehiculo');
const conductorController = require('./conductor');
const serviceController = require('./service');

const controllers = {
    tipoVehiculoController,
    vehiculoController,
    conductorController,
    serviceController
}

module.exports = controllers;