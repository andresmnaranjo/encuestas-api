const Router = require('express-promise-router').default;

const tipificacionController = require('../controllers/tipificacioncontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/', tipificacionController.getAll);
router.get('/:id', tipificacionController.getById);
router.post('/', tipificacionController.save);
router.delete('/:id', tipificacionController.delete);
router.put('/:id', tipificacionController.update);
router.put('/state/:id', tipificacionController.updatestate);

module.exports = router;