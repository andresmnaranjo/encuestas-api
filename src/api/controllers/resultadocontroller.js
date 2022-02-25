require('dotenv').config();

const Resultado = require('../models/resultado');
const Encuesta = require('../models/encuesta');
const Pregunta = require('../models/pregunta');
const resultadoservice = require('../../services/resultadoservice');

module.exports = {

    async getAll(req, res, next) {
        const records = await resultadoservice.getAll();

        return res.status(200).send({ records });
    },

    async getById(req, res, next) {
        const { id } = req.params;

        const record = await resultadoservice.getById(id);

        return res.status(200).send({ record });
    },

    async getByEncuesta(req, res, next) {
        const { id } = req.params;

        const record = await resultadoservice.getByEncuesta(id);

        return res.status(200).send({ record });
    },

    async getByBase(req, res, next) {
        const { id } = req.params;

        const record = await resultadoservice.getByBase(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await resultadoservice.getById(id);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Resultado();

        reqRecibido.object = req.body.object;
        reqRecibido.encuesta = req.body.encuesta;
        reqRecibido.base = req.body.base;

        try {

            const reqAlmacenado = await resultadoservice.saveMany(reqRecibido);
            return res.status(200).send({ reqAlmacenado });

        } catch (err) {

            return res.status(500).send({ err });
        }
    },

    async saveByEncuesta(req, res) {
        //Guardar todos las preguntas en el arreglo de preguntas del resultado
        const reqRecibido = new Resultado();

        reqRecibido.usuario = req.body.usuario;
        reqRecibido.encuesta = req.body.encuesta;
        reqRecibido.base = req.body.base;

        const encuesta = await Encuesta.findById(req.body.encuesta)
            .populate({
                path: 'campana',
                model: 'Campana',
                populate: {
                    path: 'empresa',
                    model: 'Empresa'
                }
            })
            .populate({
                path: 'usuario',
                model: 'Usuario'
            });

        const preguntas = await Pregunta.find({ encuesta: encuesta._id })
            .populate({
                path: 'tipopregunta',
                model: 'Tipopregunta'
            });
        console.log(preguntas);

        try {

            // const reqAlmacenado = await resultadoservice.save(reqRecibido);
            return res.status(200).send({ "asd": "asd" });

        } catch (err) {

            return res.status(500).send({ err });
        }
    },

    async update(req, res) {
        const { id } = req.params;

        try {
            const data = Object.assign(user);
            return Resultado.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            console.error(`There was a problem ${error}`);
            return {};
        }
    },

    async updateBase(req, res, next) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: 'La solicitud no puede estar vacía.',
            });
        }

        // Find and update product with the request body
        Resultado.findByIdAndUpdate(
                req.params.id, {
                    base: req.body.base,
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