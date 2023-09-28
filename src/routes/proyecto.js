const router = require('express').Router();
const proyectoController = require('../controllers/proyecto');
const verifyProyecto = require('../middlewares/verifyProyecto');

router.get('/', proyectoController.getAll);
router.get('/:id', verifyProyecto, proyectoController.getOne);
router.post('/', verifyProyecto, proyectoController.create);
router.put('/:id', verifyProyecto, proyectoController.update);
router.delete('/:id', verifyProyecto, proyectoController.delete);

module.exports = router;