const router = require('express').Router();
const vehiculoController = require('../controllers/vehiculo');
const verifyVehiculo = require('../middlewares/verifyVehiculo');

router.get('/', vehiculoController.getAll);
router.get('/:id', vehiculoController.getOne);
router.get('/tipoVehiculo/:id', vehiculoController.getByTipoVehiculo);
router.post('/', verifyVehiculo, vehiculoController.create);
router.put('/:id', verifyVehiculo, vehiculoController.update);
router.delete('/:id', verifyVehiculo, vehiculoController.delete);

module.exports = router;