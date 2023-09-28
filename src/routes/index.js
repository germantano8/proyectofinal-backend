const router = require('express').Router();
const tipoVehiculo = require('./tipoVehiculo');
const proyecto = require('./proyecto');

router.use('/tipovehiculo', tipoVehiculo);
router.use('/proyecto', proyecto);

module.exports = router;