const Router = require('express-promise-router').default;

const subpreguntaController = require('../controllers/subpreguntacontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/:opcionrespuesta', subpreguntaController.getAll);
router.get('/getbyid/:id', subpreguntaController.getById);
router.get('/by/opcionrespuesta/:id', subpreguntaController.getByOpcionRespuesta);
router.post('/', subpreguntaController.save);
router.delete('/:id', subpreguntaController.delete);

module.exports = router;