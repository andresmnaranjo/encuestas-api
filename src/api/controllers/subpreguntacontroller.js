require('dotenv').config();

const Subpregunta = require('../models/subpregunta');
const subpreguntaservice = require('../../services/subpreguntaservice');

module.exports = {

    async getAll(req, res, next) {
        const { opcionrespuesta } = req.params;

        console.log(opcionrespuesta);

        const records = await subpreguntaservice.getAll(opcionrespuesta);

        return res.status(200).send({ records });
    },

    async getById(req, res, next) {
        const { id } = req.params;

        const record = await subpreguntaservice.getById(id);

        return res.status(200).send({ record });
    },

    async getByOpcionRespuesta(req, res, next) {
        const { id } = req.params;

        const record = await subpreguntaservice.getByOpcionRespuesta(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await subpreguntaservice.getById(id);

        console.log(record);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Subpregunta();

        reqRecibido.pregunta = req.body.pregunta;
        reqRecibido.opcionRespuesta = req.body.opcionRespuesta;
        reqRecibido.tipopregunta = req.body.tipopregunta;

        try {

            const reqAlmacenado = await subpreguntaservice.save(reqRecibido);
            return res.status(200).send({ reqAlmacenado });

        } catch (err) {

            return res.status(500).send({ err });
        }
    },

};