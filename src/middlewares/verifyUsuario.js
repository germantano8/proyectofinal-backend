const usuario = require('../models/usuario');
const validator = require('validator');

const verifyUsuario = async(req, res, next) => {
    try{
        // Code
        return next();
    }catch(err){
        return res.status(500).json({message: 'Error al crear la entidad'});
    }
}

module.exports = verifyUsuario;