const router = require('express').Router();
const tipoVehiculoController = require('../controllers/tipoVehiculo');

router.get('/', tipoVehiculoController.findAll);

module.exports = router;