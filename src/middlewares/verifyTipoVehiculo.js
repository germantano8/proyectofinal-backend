const tipoVehiculo = require('../models/tipoVehiculo');
const validator = require('validator');

const verifyTipoVehiculo = async (req, res, next) => {
    try{
        const errors = {
            descripcion: null,
            tipo_licencia:null,
        };

        if(req.method === 'PUT' || req.method === 'DELETE'){
            const tipoVehiculoExists = await tipoVehiculo.findByPk(req.params.id);
            if(!tipoVehiculoExists){
                return res.status(404).json({message: 'Tipo de vehiculo no encontrado'});
            }
            if(req.method === 'DELETE'){
                return next();
            }
        }

        errors.descripcion = validator.isAlpha(req.body.descripcion) && validator.isLength(req.body.descripcion, {min: 3, max: 45}) ? null : "La descripcion solo puede contener letras y debe tener entre 3 y 45 caracteres";
        errors.tipo_licencia = validator.isLength(req.body.tipo_licencia, {min: 1, max: 10}) && validator.isAlphanumeric(req.body.tipo_licencia) ? null : "El tipo de licencia debe ser alfanumérico y debe tener entre 1 y 10 caracteres";

        if(Object.entries(errors).some((e) => e[1] != null)){
            return res.status(400).json(errors);
        }

        return next();
    }catch(err){
        return res.status(500).json({message: 'Error al crear la entidad'});
    }
}

module.exports = verifyTipoVehiculo;