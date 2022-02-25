const { Router } = require('express');
const { NotFound } = require('http-errors');
const morgan = require('morgan');

const logger = require('../config/logger');

const router = Router();

const campanaRouter = require('./routes/campanaroutes');
const contactoRouter = require('./routes/contactoroutes');
const datospersonalesRouter = require('./routes/datospersonalesroutes');
const empresaRouter = require('./routes/empresaroutes');
const baseRouter = require('./routes/baseroutes');
const tipificacionRouter = require('./routes/tipificacionroutes');
const encuestaRouter = require('./routes/encuestaroutes');
const opcionrespuestaRouter = require('./routes/opcionrespuestaroutes');
const opcionrespuestasubpreguntaRouter = require('./routes/opcionrespuestasubpreguntaroutes');
const permisoRouter = require('./routes/permisoroutes');
const preguntaRouter = require('./routes/preguntaroutes');
const subpreguntaRouter = require('./routes/subpreguntaroutes');
const resultadoRouter = require('./routes/resultadoroutes');
const tipopermisoRouter = require('./routes/tipopermisoroutes');
const tipopreguntaRouter = require('./routes/tipopreguntaroutes');
const tipousuarioRouter = require('./routes/tipousuarioroutes');
const usuarioRouter = require('./routes/usuarioroutes');

/**
 * Router configuration
 */
router.use(
    morgan(':status - [:method :url - :remote-addr] :response-time ms', {
        stream: {
            write: message => logger.info(message),
        },
        skip: (req, res) => res.statusCode >= 400,
    })
);

/**
 * API routes
 */
router.get('/', (req, res) => res.sendStatus(200));
router.use('/campana', campanaRouter);
router.use('/contacto', contactoRouter);
router.use('/datospersonales', datospersonalesRouter);
router.use('/empresa', empresaRouter);
router.use('/base', baseRouter);
router.use('/tipificacion', tipificacionRouter);
router.use('/encuesta', encuestaRouter);
router.use('/opcionrespuesta', opcionrespuestaRouter);
router.use('/opcionrespuestasubpregunta', opcionrespuestasubpreguntaRouter);
router.use('/permiso', permisoRouter);
router.use('/pregunta', preguntaRouter);
router.use('/subpregunta', subpreguntaRouter);
router.use('/resultado', resultadoRouter);
router.use('/tipopermiso', tipopermisoRouter);
router.use('/tipopregunta', tipopreguntaRouter);
router.use('/tipousuario', tipousuarioRouter);
router.use('/usuarios', usuarioRouter);

/**
 * 404 error handling
 */
router.use((req, res, next) => {
    const { baseUrl, url, method } = req;

    next(new NotFound(`The route '${method} ${baseUrl}${url}' doesn't exist.`));
});

module.exports = router;