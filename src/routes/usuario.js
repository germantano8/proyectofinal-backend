const router = require('express').Router();
const usuarioController = require('../controllers/usuario');
const verifyUsuario = require('../middlewares/verifyUsuario');

router.get('/', usuarioController.getAll);
router.get('/:nombre', usuarioController.getOne);
router.post('/logout', usuarioController.logout);
router.post('/login', usuarioController.login);
router.post('/register', verifyUsuario, usuarioController.createUsuario);
router.put('/:nombre', verifyUsuario, usuarioController.update);
router.delete('/:nombre', verifyUsuario, usuarioController.delete);

module.exports = router;