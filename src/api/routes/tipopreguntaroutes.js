const Router = require('express-promise-router').default;

const tipopreguntaController = require('../controllers/tipopreguntacontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/', tipopreguntaController.getAll);
router.get('/:id', tipopreguntaController.getById);
router.post('/', tipopreguntaController.save);
router.delete('/:id', tipopreguntaController.delete);
router.put('/:id', tipopreguntaController.update);

module.exports = router;