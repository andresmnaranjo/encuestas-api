const mongoose = require('mongoose');

const Encuesta = require('../api/models/encuesta');

module.exports = {
    async getAll(usuario) {
        const records = await Encuesta.find({ usuario: usuario })
            .populate({
                path: 'campana',
                model: 'Campana'
            });

        return records;
    },

    async getById(id, usuario) {
        const record = await Encuesta.find({ _id: id, usuario: usuario })
            .populate({
                path: 'campana',
                model: 'Campana'
            });

        return record;
    },

    async getByCampana(id) {
        const record = await Encuesta.find({ campana: id })
            .populate({
                path: 'campana',
                model: 'Campana'
            });

        return record;
    },

    async getByEncuestador(id) {
        const record = await Encuesta.find()
            .populate({
                path: 'campana',
                model: 'Campana'
            });

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};