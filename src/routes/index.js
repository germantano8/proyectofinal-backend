const router = require('express').Router();
const tipoVehiculo = require('./tipoVehiculo');
const conductor = require('./conductor');
const vehiculo = require('./vehiculo');
const cliente = require('./cliente');
const service = require('./service');
const proyecto = require('./proyecto');
const reparacion = require('./reparacion');
const trabajo = require('./trabajo');
const usuario = require('./usuario');

router.use('/tipovehiculo', tipoVehiculo);
router.use('/vehiculo', vehiculo);
router.use('/conductor', conductor);
router.use('/cliente', cliente);
router.use('/service', service);
router.use('/proyecto', proyecto);
router.use('/reparacion', reparacion)
router.use('/trabajo', trabajo);
router.use('/usuario', usuario);

module.exports = router;