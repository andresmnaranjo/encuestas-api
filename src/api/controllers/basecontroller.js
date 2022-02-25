require('dotenv').config();

const Base = require('../models/base');
const baseservice = require('../../services/baseservice');

module.exports = {

    async getAll(req, res, next) {
        const records = await baseservice.getAll();

        return res.status(200).send({ records });
    },

    async getByEncuesta(req, res, next) {
        const { id } = req.params;

        const records = await baseservice.getByEncuesta(id);

        return res.status(200).send({ records });
    },

    async getById(req, res, next) {
        const { id } = req.params;

        const record = await baseservice.getById(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await baseservice.getById(id);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Base();

        reqRecibido.nombre = req.body.nombre;
        reqRecibido.apellido = req.body.apellido;
        reqRecibido.documento = req.body.documento;
        reqRecibido.direccion = req.body.direccion;
        reqRecibido.tel1 = req.body.tel1;
        reqRecibido.tel2 = req.body.tel2;
        reqRecibido.tel3 = req.body.tel3;
        reqRecibido.contador = req.body.contador;
        reqRecibido.encuesta = req.body.encuesta;
        reqRecibido.tipificacion = req.body.tipificacion;

        try {

            const reqAlmacenado = await baseservice.save(reqRecibido);
            return res.status(200).send({ reqAlmacenado });

        } catch (err) {

            return res.status(500).send({ err });
        }
    },

    async saveMany(req, res) {
        let objTemp = {
            object: [],
            encuesta: ""
        };

        objTemp.object = req.body.object;
        objTemp.encuesta = req.body.encuesta;

        try {
            const reqAlmacenado = await baseservice.saveMany(objTemp);
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
        Base.findByIdAndUpdate(
                req.params.id, {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    documento: req.body.documento,
                    direccion: req.body.direccion,
                    tel1: req.body.tel1,
                    tel2: req.body.tel2,
                    tel3: req.body.tel3,
                    contador: req.body.contador,
                    estado: req.body.estado,
                    encuesta: req.body.encuesta,
                    tipificacion: req.body.tipificacion,
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

    async updateTipification(req, res, next) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: 'La solicitud no puede estar vacía.',
            });
        }

        // Find and update product with the request body
        Base.findByIdAndUpdate(
                req.params.id, {
                    tipificacion: req.body.tipificacion,
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
        Base.findByIdAndUpdate(
                req.params.id, {
                    estado: req.body.estado,
                }, { new: true }
            )
            .then(respuesta => {
                if (!respuesta) {
                    return res.status(404).send({
                        message: `Base no encontrada con el ID: ${req.params.id}`,
                    });
                }
                res.send(respuesta);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: `Base no encontrada con el ID: ${req.params.id}`,
                    });
                }

                return res.status(500).send({
                    message: `Error actualizando el ID: ${req.params.id}`,
                });
            });
    },

    async updateCont(req, res, next) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: 'Los datos no pueden estar vacíos.',
            });
        }

        // Find and update product with the request body
        Base.findByIdAndUpdate(
                req.params.id, { $inc: { 'contador': 1 } }, { new: true }
            )
            .then(respuesta => {
                if (!respuesta) {
                    return res.status(404).send({
                        message: `Base no encontrada con el ID: ${req.params.id}`,
                    });
                }
                res.send(respuesta);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: `Base no encontrada con el ID: ${req.params.id}`,
                    });
                }

                return res.status(500).send({
                    message: `Error actualizando el ID: ${req.params.id}`,
                });
            });
    },


};