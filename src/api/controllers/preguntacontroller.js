require('dotenv').config();

const Pregunta = require('../models/pregunta');
const preguntaservice = require('../../services/preguntaservice');

module.exports = {

    async getAll(req, res, next) {
        const { encuesta } = req.params;

        console.log(encuesta);

        const records = await preguntaservice.getAll(encuesta);

        return res.status(200).send({ records });
    },

    async getById(req, res, next) {
        const { id } = req.params;

        const record = await preguntaservice.getById(id);

        return res.status(200).send({ record });
    },

    async getByEncuesta(req, res, next) {
        const { id } = req.params;

        const record = await preguntaservice.getByEncuesta(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await preguntaservice.getById(id);

        console.log(record);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Pregunta();

        reqRecibido.pregunta = req.body.pregunta;
        reqRecibido.encuesta = req.body.encuesta;
        reqRecibido.tipopregunta = req.body.tipopregunta;

        try {

            const reqAlmacenado = await preguntaservice.save(reqRecibido);
            return res.status(200).send({ reqAlmacenado });

        } catch (err) {

            return res.status(500).send({ err });
        }
    },

    async update(req, res, next) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: 'La solicitud no puede estar vacía.',
            });
        }

        // Find and update product with the request body
        Pregunta.findByIdAndUpdate(
                req.params.id, {
                    pregunta: req.body.pregunta,
                    encuesta: req.body.encuesta,
                    tipopregunta: req.body.tipopregunta,
                }, { new: true }
            )
            .then(respuesta => {
                if (!respuesta) {
                    return res.status(404).send({
                        message: `Registro no encontrado con el ID: ${req.params.id}`,
                    });
                }
                res.send(respuesta);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: `Registro no encontrado con el ID: ${req.params.id}`,
                    });
                }

                return res.status(500).send({
                    message: `Error actualizando el ID: ${req.params.id}`,
                });
            });
    },

};