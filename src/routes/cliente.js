const router = require('express').Router();
const clienteController = require('../controllers/cliente');
const verifyCliente = require('../middlewares/verifyCliente');

router.get('/', clienteController.getAll);
router.get('/:id', clienteController.getOne);
router.post('/', verifyCliente, clienteController.create);
router.put('/:id', verifyCliente, clienteController.update);
router.delete('/:id', verifyCliente, clienteController.delete);

module.exports = router;