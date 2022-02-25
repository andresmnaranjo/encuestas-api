const mongoose = require('mongoose');

const Subpregunta = require('../api/models/subpregunta');


module.exports = {
    async getAll(id_opcionRespuesta) {
        const records = await Subpregunta.find({ opcionRespuesta: id_opcionRespuesta })
            .populate({
                path: 'opcionRespuesta',
                model: 'Opcionrespuesta'
            })
            .populate({
                path: 'tipopregunta',
                model: 'Tipopregunta'
            });

        return records;
    },

    async getById(id) {
        const record = await Subpregunta.findById(id).populate({
                path: 'opcionRespuesta',
                model: 'Opcionrespuesta'
            })
            .populate({
                path: 'tipopregunta',
                model: 'Tipopregunta'
            });

        return record;
    },

    async getByOpcionRespuesta(id) {
        const record = await Subpregunta.find({ opcionRespuesta: id }).populate({
                path: 'opcionRespuesta',
                model: 'Opcionrespuesta'
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