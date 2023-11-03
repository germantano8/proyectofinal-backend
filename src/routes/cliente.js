const router = require('express').Router();
const clienteController = require('../controllers/cliente');
const verifyCliente = require('../middlewares/verifyCliente');
const auth = require('../middlewares/auth');

router.get('/', clienteController.getAll);
router.get('/:cuit', clienteController.getOne);
router.post('/', verifyCliente, clienteController.create);
router.put('/:cuit', verifyCliente, clienteController.update);
router.delete('/:cuit', verifyCliente, clienteController.delete);

module.exports = router;