const Router = require('express-promise-router').default;
const express = require('express');
const { check } = require('express-validator');

const Password = require('../controllers/password');
const usuarioController = require('../controllers/usuariocontroller');

const auth = require('../middlewares/auth');

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'You are in the Auth Endpoint. Register or Login to test Authentication.' });
});

router.get('/getusers', usuarioController.getUsers); //Obtener todos los usuarios
router.get('/getuser/:id', usuarioController.getUser); //Obtener usuario por su ID
router.delete('/deleteuser/:id', auth.isAuth, usuarioController.deleteUser); //Obtener usuario por su ID
router.put('/updatePassword/:correo', auth.isAuth, Password.updatePassword); //Actualizar contraseña
router.post('/registrar', usuarioController.signUp); //*Registrar usuarios
router.post('/autenticar', usuarioController.signIn); //*Iniciar sesión desde la aplicación
router.put('/update/:id', usuarioController.update);
router.put('/updatestate/:id', usuarioController.updatestate);

module.exports = router;