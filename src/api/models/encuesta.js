const mongoose = require('mongoose');

const { Schema } = mongoose;
const Campana = require('./campana');
const Usuario = require('./usuario');

const EncuestaSchema = new Schema({
    campana: { type: Schema.Types.ObjectId, ref: Campana, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: Usuario, required: true },
    descripcion: { type: String, required: true },
    state: { type: Boolean, required: true, default: true },
    encuestadores: [{ type: String, required: true }],
}, { timestamps: true });

module.exports = mongoose.model('Encuesta', EncuestaSchema);