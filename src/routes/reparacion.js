const router = require('express').Router();
const reparacionController = require('../controllers/reparacion');
const verifyReparacion = require('../middlewares/verifyReparacion');

router.get('/', reparacionController.getAll);
router.get('/:id', verifyReparacion, reparacionController.getOne);
router.post('/', verifyReparacion, reparacionController.create);
router.put('/:id', verifyReparacion, reparacionController.update);
router.delete('/:id', verifyReparacion, reparacionController.delete);

module.exports = router;