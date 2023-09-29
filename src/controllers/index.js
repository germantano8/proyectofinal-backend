const tipoVehiculoController = require('./tipoVehiculo');
const vehiculoController = require('./vehiculo');
const conductorController = require('./conductor');
const proyectoController = require('./proyecto');
const reparacionController = require('"./reparacion');

const controllers = {
    tipoVehiculoController,
    vehiculoController,
    conductorController,
    proyectoController,
    reparacionController
}

module.exports = controllers;