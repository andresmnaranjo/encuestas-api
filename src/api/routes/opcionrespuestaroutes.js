const Router = require('express-promise-router').default;

const opcionrespuestaController = require('../controllers/opcionrespuestacontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/:pregunta', opcionrespuestaController.getAll);
router.get('/getbyid/:id', opcionrespuestaController.getById);
router.get('/by/pregunta/:id', opcionrespuestaController.getByPregunta);
router.post('/', opcionrespuestaController.save);
router.delete('/:id', opcionrespuestaController.delete);
router.put('/:id', opcionrespuestaController.update);

module.exports = router;