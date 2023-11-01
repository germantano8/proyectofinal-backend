const router = require('express').Router();
const usuarioController = require('../controllers/usuario');
const verifyUsuario = require('../middlewares/verifyUsuario');

router.get('/', usuarioController.getAll);
router.get('/:nombre', usuarioController.getOne);
router.get('/session', usuarioController.getSession)
router.get('/logout', usuarioController.logout);
router.post('/register', verifyUsuario, usuarioController.createUsuario);
router.post('/login', verifyUsuario, usuarioController.login);
router.put('/:nombre', verifyUsuario, usuarioController.update);
router.delete('/:nombre', verifyUsuario, usuarioController.delete);

module.exports = router;