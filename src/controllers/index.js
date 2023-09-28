const tipoVehiculoController = require('./tipoVehiculo');
const vehiculoController = require('./vehiculo');
const conductorController = require('./conductor');
const clienteController = require('./cliente');

const controllers = {
    tipoVehiculoController,
    vehiculoController,
    conductorController,
    clienteController
}

module.exports = controllers;