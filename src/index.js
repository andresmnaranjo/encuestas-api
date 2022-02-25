const bodyParser = require('body-parser');
const express = require('express');
const expressErrorHandler = require('@kazaar/express-error-handler');
const helmet = require('helmet');
const mongoose = require('mongoose');

const api = require('./api');
const { host, port, env, db } = require('./config');
const { verifySMTPConnection } = require('./utils/mail');
const logger = require('./config/logger');

var cors = require('cors');

const { httpErrorHandler, handleServerError, celebrateErrorParser } = expressErrorHandler(logger);

/**
 * Express server initialization
 */
const app = express();
app.use(cors());

/**
 * Application configuration
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());

/**
 * API routes
 */
app.use('/api', api);

/**
 * Base route
 */
app.get('/', (req, res) => res.sendStatus(200));

/**
 * Error handling
 */
Error.stackTraceLimit = 10;

app.use(celebrateErrorParser);
app.use(httpErrorHandler);

/**
 * Server start
 */
mongoose.set('useCreateIndex', true);
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        return //console.log(`Error al conectar a la base de datos: ${err}`);
    }
    //console.log('Conexión a la base de datos establecida...');

    app
        .listen(port, host, () => {
            logger.info(`App is running at ${host}:${port} in ${env} mode`);
        })
        .on('error', handleServerError);
});

module.exports = app;