const Vehiculo = require('../models/vehiculo');
const TipoVehiculo = require('../models/tipoVehiculo');
const validator = require('validator');

const verifyVehiculo = async (req, res, next) => {
    try{
        const errors = {
            patente: null,
            estado: null,
            anio: null,
            kilometraje: null,
            id_tipo_vehiculo: null,
        }

        if(req.method === 'PUT' || req.method === 'DELETE'){
            const vehiculoExists = await Vehiculo.findByPk(req.params.id);
            if(!vehiculoExists){
                return res.status(404).json({message: 'Vehiculo no encontrado'});
            }
            return next();
        }

        errors.patente = validator.isLength(req.body.patente, {min: 6, max: 10}) && validator.isAlphanumeric(req.body.patente) ? null : "La patente debe ser alfanumérica y debe tener entre 6 y 10 caracteres (no incluir espacios).";
        errors.estado = validator.isIn(req.body.estado, ['disponible', 'en-obra', 'alquilada', 'mantenimiento'])? null : "El estado debe ser uno de los siguientes: disponible, en-obra, alquilada, mantenimiento";
        errors.anio = typeof(req.body.anio) === 'number' && req.body.anio > 1900 && req.body.anio < 2025 ? null : "El año debe ser un número entre 1900 y 2025";
        errors.kilometraje = typeof(req.body.kilometraje) === 'number' && req.body.kilometraje > 0 ? null : "El kilometraje debe ser un número mayor que 0";
        
        if(typeof(req.body.id_tipo_vehiculo === 'number')){
            const tipoVehiculoExists = await TipoVehiculo.findByPk(req.body.id_tipo_vehiculo);
            errors.id_tipo_vehiculo = tipoVehiculoExists ? null : "El tipo de vehiculo no existe";
        }else{
            errors.id_tipo_vehiculo = "El tipo de vehiculo debe ser un número";
        }
        
        if(Object.entries(errors).some((e) => e[1] != null)){
            return res.status(400).json(errors);
        }
        
        return next();
    }catch(err){
        return res.status(500).json({message: 'Error al crear la entidad'});
    }
}

module.exports = verifyVehiculo;