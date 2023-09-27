const router = require('express').Router();
const tipoVehiculo = require('./tipoVehiculo');
const tipoVehiculo = require('./conductor');

router.use('/tipovehiculo', tipoVehiculo);
router.use('/conductor', conductor);

module.exports = router;