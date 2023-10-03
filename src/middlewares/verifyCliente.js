const cliente = require('../models/cliente');
const validator = require('validator');

const verifyCliente = async (req, res, next) => {
    try{
        const errors = {
            razon_social:null,
            cuit:null
        };

        if(req.method === 'PUT' || req.method === 'DELETE'){
            const clienteExists = await cliente.findByPk(req.params.cuit);
            if(!clienteExists){
                return res.status(404).json({message: 'Cliente no encontrado'});
            }
        }

        errors.razon_social = typeof(req.body.razon_social) === 'string' && validator.isLength(req.body.razon_social, {min: 3, max: 45}) ? null : "La descripcion solo puede contener letras y debe tener entre 3 y 45 caracteres";
        errors.cuit = validator.isNumeric(req.body.cuit) && validator.isLength(req.body.cuit, {min: 11, max: 11}) ? null : "El cuit debe tener 11 numeros";

        if(Object.entries(errors).some((e) => e[1] != null)){
            return res.status(400).json(errors);
        }

        return next();
    }catch(err){
        return res.status(500).json({message: 'Error al crear la entidad'});
    }
}

module.exports = verifyCliente;