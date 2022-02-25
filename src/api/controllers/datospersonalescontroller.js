require('dotenv').config();

const Datospersonales = require('../models/datospersonales');
const datospersonalesservice = require('../../services/datospersonalesservice');

module.exports = {

    async getAll(req, res, next) {
        const records = await datospersonalesservice.getAll();

        return res.status(200).send({ records });
    },

    async getById(req, res, next) {
        const { id } = req.params;

        const record = await datospersonalesservice.getById(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await datospersonalesservice.getById(id);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Datospersonales();

        reqRecibido.nombre = req.body.nombre;
        reqRecibido.apellido = req.body.apellido;
        reqRecibido.estado = req.body.estado;

        try {

            const reqAlmacenado = await datospersonalesservice.save(reqRecibido);
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
        Datospersonales.findByIdAndUpdate(
                req.params.id, {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
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

};