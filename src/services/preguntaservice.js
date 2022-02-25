const mongoose = require('mongoose');

const Pregunta = require('../api/models/pregunta');

module.exports = {
    async getAll(id_encuesta) {
        const records = await Pregunta.find({ encuesta: id_encuesta })
            .populate({
                path: 'encuesta',
                model: 'Encuesta'
            })
            .populate({
                path: 'tipopregunta',
                model: 'Tipopregunta'
            });

        return records;
    },

    async getById(id) {
        const record = await Pregunta.findById(id)
            .populate({
                path: 'encuesta',
                model: 'Encuesta'
            })
            .populate({
                path: 'tipopregunta',
                model: 'Tipopregunta'
            });

        return record;
    },

    async getByEncuesta(id) {
        const record = await Pregunta.find({ encuesta: id }).populate({
                path: 'encuesta',
                model: 'Encuesta'
            })
            .populate({
                path: 'tipopregunta',
                model: 'Tipopregunta'
            });

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};