const router = require('express').Router();
const tipoVehiculo = require('./tipoVehiculo');
const conductor = require('./conductor');
const vehiculo = require('./vehiculo');
const proyecto = require('./proyecto');
const reparacion = require('./reparacion');

router.use('/tipovehiculo', tipoVehiculo);
router.use('/vehiculo', vehiculo);
router.use('/conductor', conductor);
router.use('/proyecto', proyecto);
router.use('/reparacion', reparacion);

module.exports = router;