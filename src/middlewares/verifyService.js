const service = require('../models/service');
const validator = require('validator');
const vehiculo = require('../models/vehiculo');

const verifyService = async (req, res, next) => {
    try{
        const errors = {
            fecha:null,
            patente:null,
            kilometraje:null,
            comentarios_ingreso:null,
            comentarios_salida:null
        };

        if(req.method === 'PUT' || req.method === 'DELETE'){
            const serviceExists = await service.findByPk(req.params.id);
            if(!serviceExists){
                return res.status(404).json({message: 'Service no encontrado'});
            }
            if(req.method === 'DELETE'){
                return next();
            }
        }

        errors.fecha = validator.isISO8601(req.body.fecha)? null : "La fecha del Service debe ser una fecha válida. Formato: aaaa-mm-dd";
        errors.kilometraje = typeof(req.body.kilometraje) === 'number' ? null :"Ingresar solo valores numericos para el kilometraje" ;
        errors.comentarios_ingreso = (req.body.comentarios_ingreso === null || validator.isLength(req.body.comentarios_ingreso, {min: 1, max: 100})) ? null : "Los comentarios de ingreso solo pueden contener hasta 100 caracteres";
        errors.comentarios_salida = (req.body.comentarios_salida === null || (typeof req.body.comentarios_salida === 'string' && validator.isLength(req.body.comentarios_salida, {min: 1, max: 100}))) ? null : "Los comentarios de salida solo pueden contener hasta 100 caracteres";

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

module.exports = verifyService;