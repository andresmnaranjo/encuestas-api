const mongoose = require('mongoose');

const Permiso = require('../api/models/permiso');

module.exports = {
    async getAll() {
        const records = await Permiso.find();

        return records;
    },

    async getById(id) {
        const record = await Permiso.findById(id);

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};