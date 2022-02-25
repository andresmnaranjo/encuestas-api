const mongoose = require('mongoose');

const Resultado = require('../api/models/resultado');

module.exports = {
    async getAll() {
        const records = await Resultado.find()
            .populate({
                path: 'encuesta',
                model: 'Encuesta'
            });

        return records;
    },

    async getByEncuesta(id) {
        const record = await Resultado.find({ encuesta: id })
            .populate({
                path: 'encuesta',
                model: 'Encuesta'
            });

        return record;
    },

    async getByBase(id) {
        const record = await Resultado.find({ base: id })
            .populate({
                path: 'encuesta',
                model: 'Encuesta'
            });

        return record;
    },

    async getById(id) {
        const record = await Resultado.findById(id);

        return record;
    },

    async saveMany(object) {

        let objTemp = [];
        let date = Date.now();
        for (let i = 0; i < object.object.length; i++) {
            let respuestaTemp = "";
            if (object.object[i].respuesta.respuesta) {
                respuestaTemp = object.object[i].respuesta.respuesta;
            } else {
                respuestaTemp = object.object[i].respuesta;
            }


            let respuestaSelectedFromOpcionesRespuesta;
            let respuestaSelectedFromOpcionesRespuesta_id;

            if (object.object[i] && object.object[i].opcionesrespuesta && object.object[i].opcionesrespuesta.length > 0) {
                respuestaSelectedFromOpcionesRespuesta = object.object[i].opcionesrespuesta.find(obj => obj.respuesta.respuesta === respuestaTemp);
                respuestaSelectedFromOpcionesRespuesta_id = respuestaSelectedFromOpcionesRespuesta.respuesta._id;
            }

            objTemp.push({
                encuesta: object.encuesta,
                base: object.base,
                pregunta: object.object[i].pregunta,
                respuesta: object.object[i].respuesta || object.object[i].respuesta.respuesta || "",
                respuesta_id: respuestaSelectedFromOpcionesRespuesta_id || "",
                nombre: date.toString()
            });
        }


        const record = await Resultado.insertMany(objTemp);

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

};