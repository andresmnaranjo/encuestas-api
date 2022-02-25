const Router = require('express-promise-router').default;

const datospersonalesController = require('../controllers/datospersonalescontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/', datospersonalesController.getAll);
router.get('/:id', datospersonalesController.getById);
router.post('/', datospersonalesController.save);
router.delete('/:id', datospersonalesController.delete);
router.put('/:id', datospersonalesController.update);

module.exports = router;