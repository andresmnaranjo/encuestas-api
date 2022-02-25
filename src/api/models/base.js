const mongoose = require('mongoose');

const { Schema } = mongoose;

const Encuesta = require('./encuesta');
const Tipificacion = require('./tipificacion');

// Administradores
const BaseSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    documento: { type: String, required: true },
    direccion: { type: String, required: true },
    tel1: { type: String, required: true },
    tel2: { type: String, required: true },
    tel3: { type: String, required: true },
    contador: { type: Number, default: 0 }, //Para determinar cuantas veces se ha intentado realizar0
    estado: { type: Boolean, default: false },
    encuesta: { type: Schema.Types.ObjectId, ref: Encuesta, required: true },
    tipificacion: { type: Schema.Types.ObjectId, ref: Tipificacion, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Base', BaseSchema);