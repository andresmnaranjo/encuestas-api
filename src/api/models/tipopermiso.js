const mongoose = require('mongoose');

const { Schema } = mongoose;

const TipopermisoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Tipopermiso', TipopermisoSchema);