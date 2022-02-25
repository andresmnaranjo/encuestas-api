const mongoose = require('mongoose');

const Tipopermiso = require('../api/models/tipopermiso');

module.exports = {
    async getAll() {
        const records = await Tipopermiso.find();

        return records;
    },

    async getById(id) {
        const record = await Tipopermiso.findById(id);

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};