const mongoose = require('mongoose');

const Tipificacion = require('../api/models/tipificacion');

module.exports = {
    async getAll() {
        const records = await Tipificacion.find();

        return records;
    },

    async getById(id) {
        const record = await Tipificacion.findById(id);

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};