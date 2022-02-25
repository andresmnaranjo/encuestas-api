const mongoose = require('mongoose');

const { Schema } = mongoose;

const TipificacionSchema = new Schema({
    nombre: { type: String, required: true },
    estado: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Tipificacion', TipificacionSchema);