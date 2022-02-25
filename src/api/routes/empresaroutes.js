const Router = require('express-promise-router').default;

const empresaController = require('../controllers/empresacontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/', empresaController.getAll);
router.get('/:id', empresaController.getById);
router.post('/', empresaController.save);
router.delete('/:id', empresaController.delete);
router.put('/:id', empresaController.update);
router.put('/state/:id', empresaController.updatestate);

module.exports = router;