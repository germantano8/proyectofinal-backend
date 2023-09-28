const router = require('express').Router();
const tipoVehiculo = require('./tipoVehiculo');
const vehiculo = require('./vehiculo');
const service = require('./service');

router.use('/tipovehiculo', tipoVehiculo);
router.use('/vehiculo', vehiculo);
router.use('/conductor', conductor);
router.use('/service', service);

module.exports = router;