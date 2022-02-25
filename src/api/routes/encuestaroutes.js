const Router = require('express-promise-router').default;

const encuestaController = require('../controllers/encuestacontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/:id', encuestaController.getAll);
router.get('/:id/:usuario', encuestaController.getById);
router.get('/by/campana/:id', encuestaController.getByCampana);
router.get('/by/encuestadores/:id', encuestaController.getByEncuestadores);
router.post('/', encuestaController.save);
router.delete('/:id', encuestaController.delete);
router.put('/:id', encuestaController.update);
router.put('/state/:id', encuestaController.updateState);
router.put('/encuestadores/:id', encuestaController.updateEncuestadores);

module.exports = router;