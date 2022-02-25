require('dotenv').config();

const Usuario = require('../models/usuario');
const usuarioService = require('../../services/usuarioservice');

module.exports = {

    // Obtener todos los usuarios
    async getUsers(req, res, next) {
        const users = await usuarioService.getAllUsers();

        return res.status(200).send({ users });
    },

    // Obtener un usuario por su ID
    async getUser(req, res, next) {
        const { id } = req.params;

        const user = await usuarioService.getUserById(id);

        return res.status(200).send({ user });
    },

    // Borrar un usuario por su ID
    async deleteUser(req, res, next) {
        const { id } = req.params;

        // Obtener usuario a eliminar
        const user = await usuarioService.getUserById(id);

        // Eliminar usuario
        user.delete();

        return res.status(200).send({ user });
    },

    async signUp(req, res) {

        const user = new Usuario({
            correo: req.body.correo,
            contrasena: req.body.contrasena,
            login: req.body.login,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            permiso: req.body.permiso,
            tipousuario: req.body.tipousuario,
            telefono1: req.body.telefono1,
            telefono2: req.body.telefono2,
        });

        user.save(async(msg, err) => {
            console.log(JSON.stringify(msg));
            if (err) {
                if (err.code == 11000) {
                    return res.status(500).send({
                        message: `El usuario con el correo ` + req.body.email + ` ya existe.`,
                    });
                }
                return res.status(500).send({
                    message: `Error al crear el usuario: ${err}`,
                });
            }
            const tokenGenerado = await usuarioService.createToken(user);

            //console.log(res);

            return res.status(200).send({ token: tokenGenerado, message: "Gracias por registrarte." });
        });
    },

    //Metodo para iniciar sesión desde la aplicación
    async signIn(req, res) {

        let correo = req.body.correo;

        Usuario.findOne({ correo: req.body.correo }, (err, user) => {

            if (err)
                return res.status(500).send({
                    message: `Error al ingresar: ${err}.`,
                });
            if (!user)
                return res.status(404).send({
                    message: `El usuario con correo ${correo} no existe.`,
                });

            return user.comparePassword(req.body.contrasena, async(err, isMatch) => {
                if (err) return res.status(500).send({ message: `Error al ingresar: ${err}.` });
                if (!isMatch) return res.status(404).send({ message: `Contraseña incorrecta.` });

                req = user;
                const tokenGenerado = await usuarioService.createToken(user);

                //Actualizar hora de la última vez que se logueó el usuario
                const userActivate = await usuarioService.getUserByEmail(correo);

                //Actualizar fecha del ultimo login
                // Usuario.findByIdAndUpdate(
                //         userActivate._id, {
                //             lastLogin: Date.now(),
                //         }, { new: true }
                //     )
                //     .then(respuesta => {
                //         //console.log(respuesta);

                //     })
                //     .catch(err => {
                //         if (err.kind === 'ObjectId') {
                //             return "";
                //         }

                //         return "Error actualizando el usuario con correo: " + correo;
                //     });

                return res.status(200).send({
                    message: 'Ha iniciado sesión correctamente.',
                    user: user,
                    token: tokenGenerado,
                });
            });
        }).select('_id correo contrasena nombre apellido estado login telefono1 telefono2 permiso tipousuario');

    },


    async update(req, res, next) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: 'Los datos no pueden estar vacíos.',
            });
        }

        // Find and update product with the request body
        Usuario.findByIdAndUpdate(
                req.params.id, {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    estado: req.body.estado,
                    login: req.body.login,
                    permiso: req.body.permiso,
                    tipousuario: req.body.tipousuario,
                    telefono1: req.body.telefono1,
                    telefono2: req.body.telefono2,
                }, { new: true }
            )
            .then(respuesta => {
                if (!respuesta) {
                    return res.status(404).send({
                        message: `Usuario no encontrado con el ID: ${req.params.id}`,
                    });
                }
                res.send(respuesta);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: `Usuario no encontrado con el ID: ${req.params.id}`,
                    });
                }

                return res.status(500).send({
                    message: `Error actualizando el ID: ${req.params.id}`,
                });
            });
    },



    async updatestate(req, res, next) {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: 'Los datos no pueden estar vacíos.',
            });
        }

        // Find and update product with the request body
        Usuario.findByIdAndUpdate(
                req.params.id, {
                    estado: req.body.estado,
                }, { new: true }
            )
            .then(respuesta => {
                if (!respuesta) {
                    return res.status(404).send({
                        message: `Usuario no encontrado con el ID: ${req.params.id}`,
                    });
                }
                res.send(respuesta);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: `Usuario no encontrado con el ID: ${req.params.id}`,
                    });
                }

                return res.status(500).send({
                    message: `Error actualizando el ID: ${req.params.id}`,
                });
            });
    },




};