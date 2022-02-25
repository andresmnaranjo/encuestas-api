const Router = require('express-promise-router').default;

const contactoController = require('../controllers/contactocontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/', contactoController.getAll);
router.get('/:id', contactoController.getById);
router.post('/', contactoController.save);
router.delete('/:id', contactoController.delete);
router.put('/:id', contactoController.update);

module.exports = router;