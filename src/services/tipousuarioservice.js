const mongoose = require('mongoose');

const Tipousuario = require('../api/models/tipousuario');

module.exports = {
    async getAll() {
        const records = await Tipousuario.find();

        return records;
    },

    async getById(id) {
        const record = await Tipousuario.findById(id);

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};