const router = require('express').Router();
const tipoVehiculo = require('./tipoVehiculo');

router.use('/tipovehiculo', tipoVehiculo);

module.exports = router;