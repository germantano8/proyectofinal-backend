const router = require('express').Router();
const conductorController = require('../controllers/conductor');
const verifyconductor = require('../middlewares/verifyConductor');

router.get('/', conductorController.getAll);
router.get('/:dni', conductorController.getOne);
router.post('/', verifyconductor, conductorController.create);
router.put('/:dni', verifyconductor, conductorController.update);
router.delete('/:dni', verifyconductor, conductorController.delete);

module.exports = router;