const mongoose = require('mongoose');

const Datospersonales = require('../api/models/datospersonales');

module.exports = {
    async getAll() {
        const records = await Datospersonales.find();

        return records;
    },

    async getById(id) {
        const record = await Datospersonales.findById(id);

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};