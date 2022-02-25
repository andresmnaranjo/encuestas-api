require('dotenv').config();

const Permiso = require('../models/permiso');
const permisoservice = require('../../services/permisoservice');

module.exports = {

    async getAll(req, res, next) {
        const records = await permisoservice.getAll();

        return res.status(200).send({ records });
    },

    async getById(req, res, next) {
        const { id } = req.params;

        const record = await permisoservice.getById(id);

        return res.status(200).send({ record });
    },

    async delete(req, res, next) {
        const { id } = req.params;

        const record = await permisoservice.getById(id);

        record.delete();

        return res.status(200).send({ record });
    },

    async save(req, res) {
        const reqRecibido = new Permiso();

        reqRecibido.descripcion = req.body.descripcion;
        reqRecibido.tipopermiso = req.body.tipopermiso;

        try {

            const reqAlmacenado = await permisoservice.save(reqRecibido);
            return res.status(200).send({ reqAlmacenado });

        } catch (err) {

            return res.status(500).send({ err });
        }
    },

    async update(req, res, next) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: 'La solicitud no puede estar vacía.',
            });
        }

        // Find and update product with the request body
        Permiso.findByIdAndUpdate(
                req.params.id, {
                    descripcion: req.body.descripcion,
                    tipopermiso: req.body.tipopermiso,
                }, { new: true }
            )
            .then(respuesta => {
                if (!respuesta) {
                    return res.status(404).send({
                        message: `Registro no encontrado con el ID: ${req.params.id}`,
                    });
                }
                res.send(respuesta);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: `Registro no encontrado con el ID: ${req.params.id}`,
                    });
                }

                return res.status(500).send({
                    message: `Error actualizando el ID: ${req.params.id}`,
                });
            });
    },

};