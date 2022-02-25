const mongoose = require('mongoose');

const { Schema } = mongoose;

const TipousuarioSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Tipousuario', TipousuarioSchema);