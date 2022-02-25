const mongoose = require('mongoose');

const Base = require('../api/models/base');

module.exports = {
    async getAll() {
        const records = await Base.find()
            .populate({
                path: 'tipificacion',
                model: 'Tipificacion'
            })
            .populate({
                path: 'encuesta',
                model: 'Encuesta',
                populate: {
                    path: 'campana',
                    model: 'Campana',
                    populate: {
                        path: 'empresa',
                        model: 'Empresa'
                    }
                }
            });

        return records;
    },

    async getByEncuesta(id_encuesta) {
        const records = await Base.find({ encuesta: id_encuesta })
            .populate({
                path: 'tipificacion',
                model: 'Tipificacion'
            })
            .populate({
                path: 'encuesta',
                model: 'Encuesta',
                populate: {
                    path: 'campana',
                    model: 'Campana',
                    populate: {
                        path: 'empresa',
                        model: 'Empresa'
                    }
                }
            });

        return records;
    },

    async getById(id) {
        const record = await Base.findById(id)
            .populate({
                path: 'tipificacion',
                model: 'Tipificacion'
            })
            .populate({
                path: 'encuesta',
                model: 'Encuesta',
                populate: {
                    path: 'campana',
                    model: 'Campana',
                    populate: {
                        path: 'empresa',
                        model: 'Empresa'
                    }
                }
            });

        return record;
    },

    async save(req) {
        const reqAlmacenado = await req.save();

        return reqAlmacenado;
    },

    async saveMany(req) {

        let objTemp = [];
        for (let i = 0; i < req.object.length; i++) {
            for (let j = 1; j < req.object[i].length; j++) {
                objTemp.push({
                    nombre: req.object[i][j][0],
                    apellido: req.object[i][j][1],
                    documento: req.object[i][j][2],
                    direccion: req.object[i][j][3],
                    tel1: req.object[i][j][4],
                    tel2: req.object[i][j][5],
                    tel3: req.object[i][j][6],
                    encuesta: req.encuesta,
                    tipificacion: "61edab01558de2147fb0108a"
                });
            }
        }
        const record = await Base.insertMany(objTemp);

        return record;
    },

};