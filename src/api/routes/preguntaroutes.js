const Router = require('express-promise-router').default;

const preguntaController = require('../controllers/preguntacontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/:encuesta', preguntaController.getAll);
router.get('/:id/:encuesta', preguntaController.getById);
router.get('/by/encuesta/:id', preguntaController.getByEncuesta);
router.post('/', preguntaController.save);
router.delete('/:id', preguntaController.delete);
router.put('/:id', preguntaController.update);

module.exports = router;