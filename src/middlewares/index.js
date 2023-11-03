const verifiers = {
    auth: require('./auth'),
    verifyTipoVehiculo: require('./verifyTipoVehiculo'),
    verifyVehiculo: require('./verifyVehiculo'),
    verifyConductor: require('./verifyConductor'),
    verifyCliente: require('./verifyCliente'),
    verifyService: require('./verifyService'),
    verifyProyecto: require('./verifyProyecto'),
    verifyReparacion: require('./verifyReparacion'),
    verifyTrabajo: require('./verifyTrabajo')
}

module.exports = verifiers;
