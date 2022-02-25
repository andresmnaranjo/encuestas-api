const Router = require('express-promise-router').default;

const tipousuarioController = require('../controllers/tipousuariocontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/', tipousuarioController.getAll);
router.get('/:id', tipousuarioController.getById);
router.post('/', tipousuarioController.save);
router.delete('/:id', tipousuarioController.delete);
router.put('/:id', tipousuarioController.update);

module.exports = router;