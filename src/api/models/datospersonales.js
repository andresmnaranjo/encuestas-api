const mongoose = require('mongoose');

const { Schema } = mongoose;

// Administradores
const DatospersonalesSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    estado: { type: Boolean, default: false, required: true }, //Para determinar si el Datospersonales ya realizó el pago o no
}, { timestamps: true });

module.exports = mongoose.model('Datospersonales', DatospersonalesSchema);