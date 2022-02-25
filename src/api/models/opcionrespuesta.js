const mongoose = require('mongoose');

const { Schema } = mongoose;
const Pregunta = require('./pregunta');

const OpcionrespuestaSchema = new Schema({
    respuesta: { type: String, required: true },
    pregunta: { type: Schema.Types.ObjectId, ref: Pregunta, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Opcionrespuesta', OpcionrespuestaSchema);