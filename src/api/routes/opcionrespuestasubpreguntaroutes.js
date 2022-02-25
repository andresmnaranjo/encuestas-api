const Router = require('express-promise-router').default;

const opcionrespuestasubpreguntacontroller = require('../controllers/opcionrespuestasubpreguntacontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/:subpregunta', opcionrespuestasubpreguntacontroller.getAll);
router.get('/getbyid/:id', opcionrespuestasubpreguntacontroller.getById);
router.get('/by/subpregunta/:id', opcionrespuestasubpreguntacontroller.getBySubPregunta);
router.post('/', opcionrespuestasubpreguntacontroller.save);
router.delete('/:id', opcionrespuestasubpreguntacontroller.delete);

module.exports = router;