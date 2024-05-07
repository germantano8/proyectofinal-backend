const router = require('express').Router();
const trabajoController = require('../controllers/trabajo');
const verifyTrabajo = require('../middlewares/verifyTrabajo');

router.get('/filtrar', trabajoController.getPorFechas);
router.get('/', trabajoController.getAll);
router.get('/:id', trabajoController.getOne);
router.post('/', verifyTrabajo, trabajoController.create);
router.put('/:id', verifyTrabajo, trabajoController.update);
router.delete('/:id', verifyTrabajo, trabajoController.delete);

module.exports = router;