const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmpresaSchema = new Schema({
    razon_social: { type: String, required: true },
    nit: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    contacto: { type: String, required: true },
    logo: { type: String, required: false },
    estado: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Empresa', EmpresaSchema);