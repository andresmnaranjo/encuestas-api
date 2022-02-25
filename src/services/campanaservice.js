const mongoose = require('mongoose');

const Campana = require('../api/models/campana');

module.exports = {
    async getAll() {
        const records = await Campana.find()
            .populate({
                path: 'empresa',
                model: 'Empresa'
            });

        return records;
    },

    async getById(id) {
        const record = await Campana.findById(id)
            .populate({
                path: 'empresa',
                model: 'Empresa'
            });;

        return record;
    },

    async getByEmpresa(id) {
        const record = await Campana.find({ empresa: id })
            .populate({
                path: 'empresa',
                model: 'Empresa'
            });;

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};