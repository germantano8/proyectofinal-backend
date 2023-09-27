const router = require('express').Router();
const tipoVehiculoController = require('../controllers/tipoVehiculo');
const verifyTipoVehiculo = require('../middlewares/verifyTipoVehiculo');

router.get('/', tipoVehiculoController.getAll);
router.get('/:id', tipoVehiculoController.getOne);
router.post('/', verifyTipoVehiculo, tipoVehiculoController.create);
router.put('/:id', verifyTipoVehiculo, tipoVehiculoController.update);
router.delete('/:id', verifyTipoVehiculo, tipoVehiculoController.delete);

module.exports = router;