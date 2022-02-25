const Router = require('express-promise-router').default;

const campanaController = require('../controllers/campanacontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/', campanaController.getAll);
router.get('/:id', campanaController.getById);
router.get('/byempresa/:id', campanaController.getByEmpresa);
router.post('/', campanaController.save);
router.delete('/:id', campanaController.delete);
router.put('/:id', campanaController.update);
router.put('/state/:id', campanaController.updatestate);

module.exports = router;