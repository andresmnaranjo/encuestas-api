const mongoose = require('mongoose');

const Contacto = require('../api/models/contacto');

module.exports = {
    async getAll() {
        const records = await Contacto.find();

        return records;
    },

    async getById(id) {
        const record = await Contacto.findById(id);

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};