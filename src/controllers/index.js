const tipoVehiculoController = require('./tipoVehiculo');
const vehiculoController = require('./vehiculo');
const conductorController = require('./conductor');
const clienteController = require('./cliente');
const serviceController = require('./service');
const proyectoController = require('./proyecto');
const reparacionController = require('./reparacion');
const proyectoController = require('./proyecto');
const trabajoController = require('./trabajo');
const usuarioController = require('./usuario');

const controllers = {
    tipoVehiculoController,
    vehiculoController,
    conductorController,
    clienteController,
    serviceController,
    proyectoController,
    reparacionController,
    proyectoController,
    trabajoController,
    usuarioController
}

module.exports = controllers;