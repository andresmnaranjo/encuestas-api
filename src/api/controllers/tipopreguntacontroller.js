require('dotenv').config();

const Tipopregunta = require('../models/tipopregunta');
const tipopreguntaservice = require('../../services/tipopreguntaservice');

module.exports = {

    async getAll(req, res, next) {
        const records = await tipopreguntaservice.getAll();

        return res.status(200).send({ records });
    },

    async getById(req, res, next) {
        const { id } = req.params;

        const record = await tipopreguntaservice.getById(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await tipopreguntaservice.getById(id);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Tipopregunta();

        reqRecibido.nombre = req.body.nombre;
        reqRecibido.descripcion = req.body.descripcion;

        try {

            const reqAlmacenado = await tipopreguntaservice.save(reqRecibido);
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
        Tipopregunta.findByIdAndUpdate(
                req.params.id, {
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
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