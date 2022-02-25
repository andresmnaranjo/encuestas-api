const mongoose = require('mongoose');

const Tipopregunta = require('../api/models/tipopregunta');

module.exports = {
    async getAll() {
        const records = await Tipopregunta.find();

        return records;
    },

    async getById(id) {
        const record = await Tipopregunta.findById(id);

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};