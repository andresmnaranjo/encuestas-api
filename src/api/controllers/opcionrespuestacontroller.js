require('dotenv').config();

const Opcionrespuesta = require('../models/opcionrespuesta');
const opcionrespuestaservice = require('../../services/opcionrespuestaservice');

module.exports = {

    async getAll(req, res, next) {
        const { pregunta } = req.params;
        const records = await opcionrespuestaservice.getAll(pregunta);

        return res.status(200).send({ records });
    },

    async getById(req, res, next) {
        const { id } = req.params;

        const record = await opcionrespuestaservice.getById(id);

        return res.status(200).send({ record });
    },

    async getByPregunta(req, res, next) {
        const { id } = req.params;

        const record = await opcionrespuestaservice.getByPregunta(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await opcionrespuestaservice.getById(id);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Opcionrespuesta();

        reqRecibido.respuesta = req.body.respuesta;
        reqRecibido.pregunta = req.body.pregunta;

        try {

            const reqAlmacenado = await opcionrespuestaservice.save(reqRecibido);
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
        Opcionrespuesta.findByIdAndUpdate(
                req.params.id, {
                    pregunta: req.body.pregunta,
                    respuesta: req.body.respuesta
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