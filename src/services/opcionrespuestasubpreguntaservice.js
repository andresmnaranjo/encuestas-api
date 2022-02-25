const mongoose = require('mongoose');

const Opcionrespuestasubpregunta = require('../api/models/opcionrespuestasubpregunta');

module.exports = {
    async getAll(subpregunta) {
        const records = await Opcionrespuestasubpregunta.find({ subpregunta: subpregunta })
            .populate({
                path: 'subpregunta',
                model: 'Subpregunta',
                populate: {
                    path: 'tipopregunta',
                    model: 'Tipopregunta'
                }
            });

        return records;
    },

    async getById(id) {
        const record = await Opcionrespuestasubpregunta.findById(id).populate({
            path: 'subpregunta',
            model: 'Subpregunta',
            populate: {
                path: 'tipopregunta',
                model: 'Tipopregunta'
            }
        });

        return record;
    },

    async getBySubPregunta(id) {
        const record = await Opcionrespuestasubpregunta.find({ subpregunta: id }).populate({
            path: 'subpregunta',
            model: 'Subpregunta',
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