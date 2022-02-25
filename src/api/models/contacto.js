const mongoose = require('mongoose');

const { Schema } = mongoose;
const Empresa = require('./empresa');

const ContactoSchema = new Schema({
    nombre: { type: String, required: true },
    cargo: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    empresa: { type: Schema.Types.ObjectId, ref: Empresa, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Contacto', ContactoSchema);