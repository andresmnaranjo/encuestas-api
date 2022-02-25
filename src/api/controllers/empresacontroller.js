require('dotenv').config();

const Empresa = require('../models/empresa');
const empresaservice = require('../../services/empresaservice');

module.exports = {

    async getAll(req, res, next) {
        const records = await empresaservice.getAll();

        return res.status(200).send({ records });
    },

    async getById(req, res, next) {
        const { id } = req.params;

        const record = await empresaservice.getById(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await empresaservice.getById(id);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Empresa();

        reqRecibido.razon_social = req.body.razon_social;
        reqRecibido.nit = req.body.nit;
        reqRecibido.direccion = req.body.direccion;
        reqRecibido.telefono = req.body.telefono;
        reqRecibido.contacto = req.body.contacto;
        reqRecibido.logo = req.body.logo;

        try {

            const reqAlmacenado = await empresaservice.save(reqRecibido);
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
        Empresa.findByIdAndUpdate(
                req.params.id, {
                    razon_social: req.body.razon_social,
                    nit: req.body.nit,
                    direccion: req.body.direccion,
                    telefono: req.body.telefono,
                    contacto: req.body.contacto,
                    logo: req.body.logo,
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
        Empresa.findByIdAndUpdate(
                req.params.id, {
                    estado: req.body.estado,
                }, { new: true }
            )
            .then(respuesta => {
                if (!respuesta) {
                    return res.status(404).send({
                        message: `Empresa no encontrada con el ID: ${req.params.id}`,
                    });
                }
                res.send(respuesta);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: `Empresa no encontrada con el ID: ${req.params.id}`,
                    });
                }

                return res.status(500).send({
                    message: `Error actualizando el ID: ${req.params.id}`,
                });
            });
    },


};