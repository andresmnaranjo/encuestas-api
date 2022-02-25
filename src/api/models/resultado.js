const mongoose = require('mongoose');

const { Schema } = mongoose;
const Encuesta = require('./encuesta');

const ResultadoSchema = new Schema({
    encuesta: { type: Schema.Types.ObjectId, ref: Encuesta, required: true },
    pregunta: { type: String, required: true },
    respuesta: { type: String, required: true },
    respuesta_id: { type: String, required: false },
    nombre: { type: String, required: true },
    base: { type: String, required: false }

}, { timestamps: true });

module.exports = mongoose.model('Resultado', ResultadoSchema);