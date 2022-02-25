const mongoose = require('mongoose');

const { Schema } = mongoose;
const Encuesta = require('./encuesta');
const Tipopregunta = require('./tipopregunta');

const PreguntaSchema = new Schema({
    pregunta: { type: String, required: true },
    encuesta: { type: Schema.Types.ObjectId, ref: Encuesta, required: true },
    tipopregunta: { type: Schema.Types.ObjectId, ref: Tipopregunta, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Pregunta', PreguntaSchema);