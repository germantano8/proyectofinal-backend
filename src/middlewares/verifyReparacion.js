const reparacion = require('../models/reparacion');
const validator = require('validator');
const vehiculo = require('../models/vehiculo');

const verifyReparacion = async (req, res, next) => {
    try{
        const errors = {
            comentarios: null, 
            fecha_desde:null, 
            fecha_hasta:null,
            patente: null
        };

        if(req.method === 'PUT' || req.method === 'DELETE'){
            const reparacionExists = await reparacion.findByPk(req.params.id);
            if(!reparacionExists){
                return res.status(404).json({message: 'Reparacion no encontrada'});
            }
            return next();
        }

        errors.comentarios = typeof(req.body.ubicacion) === 'string' && validator.isLength(req.body.ubicacion, {min: 3, max: 45}) ? null : "Los comentarios deben tener entre 3 y 45 caracteres";
        errors.fecha_desde = validator.isISO8601(req.body.fecha_desde) ? null : "La fecha de inicio debe ser una fecha válida";
        errors.fecha_hasta = validator.isISO8601(req.body.fecha_hasta) && req.body.fecha_hasta > req.body.fecha_desde ? null : "La fecha de fin  debe ser una fecha válida y posterior a la fecha de inicio.";

        if(typeof(req.body.patente === 'string')){
            const patenteExists = await vehiculo.findByPk(req.body.patente);
            errors.patente = patenteExists ? null : "La patente no existe";
        }else{
            errors.patente = "Patente inválida";
        }

        if(Object.entries(errors).some((e) => e[1] != null)){
           return res.status(400).json(errors);
        }

        return next();
    }catch(err){
       return res.status(500).json({message: 'Error al crear la entidad'});
    }
}

module.exports = verifyReparacion;