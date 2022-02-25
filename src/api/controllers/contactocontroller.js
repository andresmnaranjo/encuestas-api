require('dotenv').config();

const Contacto = require('../models/contacto');
const contactoservice = require('../../services/contactoservice');

module.exports = {

    async getAll(req, res, next) {
        const records = await contactoservice.getAll();

        return res.status(200).send({ records });
    },

    async getById(req, res, next) {
        const { id } = req.params;

        const record = await contactoservice.getById(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await contactoservice.getById(id);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Contacto();

        reqRecibido.nombre = req.body.nombre;
        reqRecibido.cargo = req.body.cargo;
        reqRecibido.correo = req.body.correo;
        reqRecibido.telefono = req.body.telefono;
        reqRecibido.empresa = req.body.empresa;

        try {

            const reqAlmacenado = await contactoservice.save(reqRecibido);
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
        Contacto.findByIdAndUpdate(
                req.params.id, {
                    nombre: req.body.nombre,
                    cargo: req.body.cargo,
                    correo: req.body.correo,
                    telefono: req.body.telefono,
                    empresa: req.body.empresa,
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