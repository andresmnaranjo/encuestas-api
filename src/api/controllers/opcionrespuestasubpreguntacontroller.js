require('dotenv').config();

const Opcionrespuestasubpregunta = require('../models/opcionrespuestasubpregunta');
const opcionrespuestasubpreguntaservice = require('../../services/opcionrespuestasubpreguntaservice');

module.exports = {

    async getAll(req, res, next) {
        const { subpregunta } = req.params;
        const records = await opcionrespuestasubpreguntaservice.getAll(subpregunta);

        return res.status(200).send({ records });
    },

    async getById(req, res, next) {
        const { id } = req.params;

        const record = await opcionrespuestasubpreguntaservice.getById(id);

        return res.status(200).send({ record });
    },

    async getBySubPregunta(req, res, next) {
        const { id } = req.params;

        const record = await opcionrespuestasubpreguntaservice.getBySubPregunta(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await opcionrespuestasubpreguntaservice.getById(id);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Opcionrespuestasubpregunta();

        reqRecibido.respuesta = req.body.respuesta;
        reqRecibido.subpregunta = req.body.subpregunta;

        try {

            const reqAlmacenado = await opcionrespuestasubpreguntaservice.save(reqRecibido);
            return res.status(200).send({ reqAlmacenado });

        } catch (err) {

            return res.status(500).send({ err });
        }
    },

};