const mongoose = require('mongoose');

const { Schema } = mongoose;
const Subpregunta = require('./subpregunta');

const OpcionrespuestasubpreguntaSchema = new Schema({
    respuesta: { type: String, required: true },
    subpregunta: { type: Schema.Types.ObjectId, ref: Subpregunta, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Opcionrespuestasubpregunta', OpcionrespuestasubpreguntaSchema);