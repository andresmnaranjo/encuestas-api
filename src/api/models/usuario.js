const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const Permiso = require('./permiso');
const Tipousuario = require('./tipousuario');

// Administradores
const UsuarioSchema = new Schema({
    correo: { type: String, unique: true, lowercase: true, required: true },
    contrasena: { type: String, required: true },
    login: { type: String, required: true },
    permiso: { type: Schema.Types.ObjectId, ref: Permiso, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono1: { type: String, required: true },
    telefono2: { type: String, default: "" },
    estado: { type: Boolean, default: true, required: true }, //Para determinar si el usuario está activo o no
    tipousuario: { type: Schema.Types.ObjectId, ref: Tipousuario, required: true },
}, { timestamps: true });

UsuarioSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.contrasena, salt, null, (err, hash) => {
            if (err) return next(err);
            this.contrasena = hash;
            next();
        });
    });
});

UsuarioSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.contrasena, (err, isMatch) => {
        cb(err, isMatch);
    });
};

UsuarioSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);

    expirationDate.setDate(today.getDate() + 60);

    const payload = {
        id: this._id,
        correo: this.correo,
        nombre: this.nombre,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
    });
};

UsuarioSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; // expires in an hour
};

UsuarioSchema.methods.generateVerificationToken = function() {
    const payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex'),
    };

    return new Token(payload);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);