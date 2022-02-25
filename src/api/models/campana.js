const mongoose = require('mongoose');

const { Schema } = mongoose;
const Empresa = require('./empresa');

const CampanaSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    empresa: { type: Schema.Types.ObjectId, ref: Empresa, required: true },
    estado: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Campana', CampanaSchema);