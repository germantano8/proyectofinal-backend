const router = require('express').Router();
const tipoVehiculoController = require('../controllers/tipoVehiculo');

router.get('/', tipoVehiculoController.getAll);
router.get('/:id', tipoVehiculoController.getOne);
router.post('/', tipoVehiculoController.create);
router.put('/:id', tipoVehiculoController.update);
router.delete('/:id', tipoVehiculoController.delete);

module.exports = router;