const Router = require('express-promise-router').default;

const permisoController = require('../controllers/permisocontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/', permisoController.getAll);
router.get('/:id', permisoController.getById);
router.post('/', permisoController.save);
router.delete('/:id', permisoController.delete);
router.put('/:id', permisoController.update);

module.exports = router;