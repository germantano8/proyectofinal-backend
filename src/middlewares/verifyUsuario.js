const usuario = require('../models/usuario');
const validator = require('validator');

const verifyUsuario = async(req, res, next) => {
    try{
        const errors = {
            nombre:null,
            password:null
        }
        
        if(req.method === 'PUT' || req.method === 'DELETE'){
            const usuarioExists = await usuario.findByPk(req.params.nombre);
            if(!usuarioExists){
                return res.status(404).json({message: 'Usuario no encontrado'});
            }
            if(req.method === 'DELETE'){
                return next();
            }
        }

        errors.nombre = validator.isLength(req.body.nombre, {min: 3, max: 10}) ? null : "El nombre debe tener entre 3 y 10 caracteres";
        errors.password = validator.isLength(req.body.password, {min: 8, max: 20}) ? null : "La contraseña debe tener entre 8 y 20 caracteres";

        if(Object.entries(errors).some((e) => e[1] != null)){
            return res.status(400).json(errors);
        }
        
        return next();
    }catch(err){
        return res.status(500).json({message: 'Error al crear la entidad'});
    }
}

module.exports = verifyUsuario;