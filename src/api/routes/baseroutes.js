const Router = require('express-promise-router').default;

const baseController = require('../controllers/basecontroller');

const router = Router();

const auth = require('../middlewares/auth');

router.get('/', baseController.getAll);
router.get('/:id', baseController.getById);
router.get('/by/encuesta/:id', baseController.getByEncuesta);
router.post('/', baseController.save);
router.post('/many', baseController.saveMany);
router.delete('/:id', baseController.delete);
router.put('/:id', baseController.update);
router.put('/update/tipification/:id', baseController.updateTipification);
router.put('/state/:id', baseController.updatestate);
router.put('/contador/:id', baseController.updateCont);

module.exports = router;