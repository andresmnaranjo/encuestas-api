require('dotenv').config();

const Tipificacion = require('../models/tipificacion');
const tipificacionservice = require('../../services/tipificacionservice');

module.exports = {

    async getAll(req, res, next) {
        const records = await tipificacionservice.getAll();

        return res.status(200).send({ records });
    },

    async getById(req, res, next) {
        const { id } = req.params;

        const record = await tipificacionservice.getById(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await tipificacionservice.getById(id);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Tipificacion();

        reqRecibido.nombre = req.body.nombre;

        try {

            const reqAlmacenado = await tipificacionservice.save(reqRecibido);
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
        Tipificacion.findByIdAndUpdate(
                req.params.id, {
                    nombre: req.body.nombre,
                    estado: req.body.estado,
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

    async updatestate(req, res, next) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: 'Los datos no pueden estar vacíos.',
            });
        }

        // Find and update product with the request body
        Tipificacion.findByIdAndUpdate(
                req.params.id, {
                    estado: req.body.estado,
                }, { new: true }
            )
            .then(respuesta => {
                if (!respuesta) {
                    return res.status(404).send({
                        message: `Tipificacion no encontrada con el ID: ${req.params.id}`,
                    });
                }
                res.send(respuesta);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: `Tipificacion no encontrada con el ID: ${req.params.id}`,
                    });
                }

                return res.status(500).send({
                    message: `Error actualizando el ID: ${req.params.id}`,
                });
            });
    },


};