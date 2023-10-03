const router = require('express').Router();
const serviceController = require('../controllers/service');
const verifyService = require('../middlewares/verifyService');

router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getOne);
router.post('/', verifyService, serviceController.create);
router.put('/:id', verifyService, serviceController.update);
router.delete('/:id', verifyService, serviceController.delete);

module.exports = router;