const mongoose = require('mongoose');

const { Schema } = mongoose;
const Tipopermiso = require('./tipopermiso');

const PermisoSchema = new Schema({
    descripcion: { type: String, required: true },
    tipopermiso: { type: Schema.Types.ObjectId, ref: Tipopermiso, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Permiso', PermisoSchema);