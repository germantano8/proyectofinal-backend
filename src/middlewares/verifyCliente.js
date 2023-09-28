const cliente = require('../models/cliente');
const validator = require('validator');

const verifyCliente = async (req, res, next) => {
    try{
        const errors = {
            cuit: null,
            razon_social:null,
        };

        if(req.method === 'PUT' || req.method === 'DELETE'){
            const clienteExists = await cliente.findByPk(req.params.id);
            if(!clienteExists){
                return res.status(404).json({message: 'Cliente no encontrado'});
            }
        }

        errors.cuit = validator.isLength(req.body.cuit, {min: 8, max: 15}) && validator.isAlphanumeric(req.body.cuit) ? null : "El cuit debe ser alfanumérico y debe tener entre 8 y 15 caracteres";
        errors.razon_social = validator.isLength(req.body.razon_social, {min: 1, max: 45}) && validator.isAlphanumeric(req.body.razon_social) ? null : "La razon social debe ser alfanumérico y debe tener entre 1 y 45 caracteres";

        if(Object.entries(errors).some((e) => e[1] != null)){
            return res.status(400).json(errors);
        }

        return next();
    }catch(err){
        return res.status(500).json({message: 'Error al crear la entidad'});
    }
}

module.exports = verifyCliente;