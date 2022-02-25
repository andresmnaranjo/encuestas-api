User = require('../models/usuario');

var nodemailer = require('nodemailer');

// Actualizar contraseña solo para administradores
exports.updatePassword = (req, res) => {
    User.findOne({ correo: req.params.correo }).then(user => {
        user.contrasena = req.body.contrasena;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Save
        user.save(err => {
            if (err) return res.status(500).json({ message: err.message });

            res.status(200).json({ message: `Tu contraseña ha sido cambiada` });

        });
    });
};

// Update
exports.update = (req, res) => {
    const { id } = req.user._id;

    const update = {...req.body };

    Usuario.findByIdAndUpdate(id, { $set: update }, { new: true })
        .then(user => res.status(200).json({ user }))
        .catch(error => res.status(500).json({ message: error.message }));
};