const mongoose = require('mongoose');

const Opcionrespuesta = require('../api/models/opcionrespuesta');

module.exports = {
    async getAll(pregunta) {
        const records = await Opcionrespuesta.find({ pregunta: pregunta })
            .populate({
                path: 'pregunta',
                model: 'Pregunta'
            });

        return records;
    },

    async getById(id) {
        const record = await Opcionrespuesta.findById(id)
            .populate({
                path: 'pregunta',
                model: 'Pregunta',
                populate: {
                    path: 'tipopregunta',
                    model: 'Tipopregunta'
                }
            });

        return record;
    },

    async getByPregunta(id) {
        const record = await Opcionrespuesta.find({ pregunta: id })
            .populate({
                path: 'pregunta',
                model: 'Pregunta',
                populate: {
                    path: 'tipopregunta',
                    model: 'Tipopregunta'
                }
            });

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};