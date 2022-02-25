const moment = require('moment');

const Usuario = require('../api/models/usuario');

const jwt = require('../utils/jwt');
const { JWT } = require('../config');

// const { accessTokenExpiryTime } = JWT;

module.exports = {

    async createToken(usuario) {
        const payload = {
            sub: usuario._id,
            iat: moment().unix(),
            // exp:  moment().add(accessTokenExpiryTime/60/60/24,'days').unix()
        };

        return await jwt.generateToken(payload, payload);
    },

    async decodeToken(token) {
        const decoded = new Promise((resolve, reject) => {
            try {
                const payload = jwt.getDecodedToken(token);

                if (payload.exp <= moment().unix()) {
                    reject({
                        status: 401,
                        message: 'El token ha expirado',
                    });
                }
                resolve(payload.sub);
            } catch (err) {
                reject({
                    status: 500,
                    message: 'Token no válido',
                });
            }
        });

        return decoded;
    },

    async getAllUsers() {
        const users = await Usuario.find()
            .populate("permiso tipousuario");;

        return users;
    },

    async getUserById(id) {
        const user = await Usuario.findById(id)
            .populate("permiso tipousuario");

        return user;
    },

    async getUserByEmail(mail) {

        let userReturn = null;
        const user = await Usuario.findOne({ correo: mail }, function(err, myUser) {
            userReturn = myUser;
        });
        // //console.log(userReturn); 

        return userReturn;
    }
};