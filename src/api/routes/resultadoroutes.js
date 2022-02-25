const Router = require('express-promise-router').default;

const resultadoController = require('../controllers/resultadocontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/', resultadoController.getAll);
router.get('/byencuesta/:id', resultadoController.getByEncuesta);
router.get('/bybase/:id', resultadoController.getByBase);
router.get('/:id', resultadoController.getById);
router.post('/', resultadoController.save);
router.post('/guardarpreguntas', resultadoController.saveByEncuesta);
router.delete('/:id', resultadoController.delete);
router.put('/:id', resultadoController.update);
router.put('/updatebase/:id', resultadoController.updateBase);

module.exports = router;