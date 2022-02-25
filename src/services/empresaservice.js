const mongoose = require('mongoose');

const Empresa = require('../api/models/empresa');

module.exports = {
    async getAll() {
        const records = await Empresa.find();

        return records;
    },

    async getById(id) {
        const record = await Empresa.findById(id);

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};