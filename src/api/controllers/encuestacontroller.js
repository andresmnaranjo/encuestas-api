require('dotenv').config();

const Encuesta = require('../models/encuesta');
const encuestaservice = require('../../services/encuestaservice');
const { getByEncuestador } = require('../../services/encuestaservice');

module.exports = {

    async getAll(req, res, next) {
        const { id } = req.params;
        const records = await encuestaservice.getAll(id);

        return res.status(200).send({ records });
    },

    async getByEncuestadores(req, res, next) {
        const { id } = req.params;
        const records = await encuestaservice.getByEncuestador();

        const objTemp = records.filter(obj => obj.encuestadores.includes(id));

        return res.status(200).send({ objTemp });
    },

    async getById(req, res, next) {
        const { id } = req.params;
        const { usuario } = req.params;

        const record = await encuestaservice.getById(id, usuario);

        return res.status(200).send({ record });
    },

    async getByCampana(req, res, next) {
        const { id } = req.params;

        const record = await encuestaservice.getByCampana(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await encuestaservice.getById(id);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Encuesta();

        reqRecibido.campana = req.body.campana;
        reqRecibido.usuario = req.body.usuario;
        reqRecibido.descripcion = req.body.descripcion;
        reqRecibido.encuestadores = req.body.encuestadores;

        try {

            const reqAlmacenado = await encuestaservice.save(reqRecibido);
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
        Encuesta.findByIdAndUpdate(
                req.params.id, {
                    campana: req.body.campana,
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

    async updateState(req, res, next) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: 'La solicitud no puede estar vacía.',
            });
        }

        // Find and update product with the request body
        Encuesta.findByIdAndUpdate(
                req.params.id, {
                    state: req.body.state,
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

    async updateEncuestadores(req, res, next) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: 'La solicitud no puede estar vacía.',
            });
        }

        let list = JSON.parse(req.body.encuestadores);

        // Find and update product with the request body
        Encuesta.findByIdAndUpdate(
                req.params.id, {
                    encuestadores: list.list,
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