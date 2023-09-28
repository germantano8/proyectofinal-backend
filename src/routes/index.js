const router = require('express').Router();
const tipoVehiculo = require('./tipoVehiculo');
const vehiculo = require('./vehiculo');
const cliente = require('./cliente');

router.use('/tipovehiculo', tipoVehiculo);
router.use('/vehiculo', vehiculo);
router.use('/conductor', conductor);
router.use('/cliente', cliente);

module.exports = router;