const Router = require('express-promise-router').default;

const tipopermisoController = require('../controllers/tipopermisocontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/', tipopermisoController.getAll);
router.get('/:id', tipopermisoController.getById);
router.post('/', tipopermisoController.save);
router.delete('/:id', tipopermisoController.delete);
router.put('/:id', tipopermisoController.update);

module.exports = router;