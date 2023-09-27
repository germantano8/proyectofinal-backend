const router = require('express').Router();
const tipoVehiculo = require('./tipoVehiculo');
const vehiculo = require('./vehiculo');

router.use('/tipovehiculo', tipoVehiculo);
router.use('/vehiculo', vehiculo);

module.exports = router;