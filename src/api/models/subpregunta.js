const mongoose = require('mongoose');

const { Schema } = mongoose;
const Opcionrespuesta = require('./opcionrespuesta');
const Tipopregunta = require('./tipopregunta');

const SubpreguntaSchema = new Schema({
    pregunta: { type: String, required: true },
    opcionRespuesta: { type: Schema.Types.ObjectId, ref: Opcionrespuesta, required: true },
    tipopregunta: { type: Schema.Types.ObjectId, ref: Tipopregunta, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Subpregunta', SubpreguntaSchema);