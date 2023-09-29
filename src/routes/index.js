const router = require('express').Router();
const tipoVehiculo = require('./tipoVehiculo');
const proyecto = require('./proyecto');
const reparacion = require('./reparacion');

router.use('/tipovehiculo', tipoVehiculo);
router.use('/proyecto', proyecto);
router.use('/reparacion', reparacion);

module.exports = router;