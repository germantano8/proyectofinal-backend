const {compare, hash} = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const usuarioController = {

    getAll: async (req, res) => {
        try{
            const usuario = await Usuario.findAll();
            if(!usuario) return res.status(400).json({error: 'No hay usuarios'});

            return res.status(200).json(await Usuario.findAll());
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
    },
    getOne: async(req, res) => {
        try{
            if(!req.params.nombre) return res.status(400).json({error: 'Falta nombre'});
            const usuario = await Usuario.findOne({where: {nombre: req.body.nombre}});

            if(!usuario) return res.status(404).json({error: 'Usuario no encontrado'});

            return res.status(200).json(usuario);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
    },
    createUsuario: async(req, res) => {
        const password = req.body.password;
        const passwordHash = await hash(password, 10);

        try{
            const newUsuario = await Usuario.create({
                nombre: req.body.nombre,
                password: passwordHash
            });

            return res.status(200).json(newUsuario);
        }catch(err){
            return res.status(500).json({error: 'Error al crear la entidad'});
        }
    },
    login: async(req, res) => {
        try{
            const usuario = await Usuario.findOne({where: {nombre: req.body.nombre}});

            if(!usuario) return res.status(404).json({error: 'Usuario no encontrado'});

            const isValid = await compare(req.body.password, usuario.password);

            if(!isValid) return res.status(401).json({error: 'Contraseña incorrecta'});

            payload = {
                nombre: usuario.nombre,
                password: usuario.password
            }

            const key = process.env.SECRET_KEY;
            const token = jwt.sign(payload, key, {expiresIn: '2h'})

            res.cookie('token', token, {httpOnly: false, maxAge: 1000 * 60 * 60 * 2});

            return res.status(200).send({token});
        }catch(err){
            return res.status(500).json({error: 'Error al iniciar sesión'});
        }
    },
    logout: async(req, res) => {
        try{
            res.clearCookie('token');
            return res.status(200).json({message: 'Sesión cerrada'});
        }catch(err){
            return res.status(500).json({error: 'Error al cerrar sesión'});
        }
    },
    update: async(req, res) => {
        try{
            if(!req.params.nombre) return res.status(400).json({error: 'Falta nombre'});
            const usuario = await Usuario.findByPk(req.params.nombre);

            if(!usuario) return res.status(404).json({error: 'Usuario no encontrado'});

            await Usuario.update({
                nombre: req.body.nombre,
                password: req.body.password
            },{
                where: {
                    nombre: req.params.nombre
                }
            });

            return res.status(200).json({message: 'Usuario actualizado'});
        }catch(err){
            return res.status(500).json({error: 'Error al actualizar la entidad'});
        }
    },
    delete: async(req, res) => {
        try{
            if(!req.params.nombre) return res.status(400).json({error: 'Falta nombre'});
            const usuario = await Usuario.findByPk(req.params.nombre);

            if(!usuario) return res.status(404).json({error: 'Usuario no encontrado'});

            await Usuario.destroy({
                where: {
                    nombre: req.params.nombre
                }
            });

            return res.status(200).json({message: 'Usuario eliminado'});
        }catch(err){
            return res.status(500).json({error: 'Error al eliminar la entidad'});
        }
    }
}

module.exports = usuarioController;