const service = require('../models/service');
const validator = require('validator');

const verifyService = async (req, res, next) => {
    try{
        const errors = {
            //fecha:null,
            patente:null,
            kilometraje:null,
            comentario_ingreso:null,
            comentario_salida:null
        };

        if(req.method === 'PUT' || req.method === 'DELETE'){
            const serviceExists = await service.findByPk(req.params.id);
            if(!serviceExists){
                return res.status(404).json({message: 'Service no encontrado'});
            }
        }

        //el ID no hay que validarlo ya que se genera e incrementa automaticamente
        // errors.id = typeof(req.body.id) === 'number' ? null : "El año debe ser un número entre 1900 y 2025";
 
        //   errors.fecha = validator.isDate(req.body.fecha, { format: 'YYYY-MM-DD' }) ? null : "La fecha debe ser de formato: aaaa-mm-dd";
    
        //  errors.patente = validator.isLength(req.body.patente, {min: 6, max: 10}) && validator.isAlphanumeric(req.body.patente) ?  "La patente debe ser alfanumérica y debe tener entre 6 y 10 caracteres": "";
        //  errors.kilometraje = typeof(req.body.kilometraje) === 'number' ? "Ingresar solo valores numericos para el kilometraje" : "";
        // errors.comentario_ingreso = (validator.isAlpha(req.body.comentario_ingreso) && validator.isLength(req.body.comentario_ingreso, { max: 100 })) ? "" : "Los comentarios de salida solo pueden contener hasta 100 caracteres";
        // errors.comentario_salida = (validator.isAlpha(req.body.comentario_salida) && validator.isLength(req.body.comentario_salida, { max: 100 })) ? "" : "Los comentarios de salida solo pueden contener hasta 100 caracteres";

        if(Object.entries(errors).some((e) => e[1] != null)){
            return res.status(400).json(errors);
        }

        return next();
    }catch(err){
        return res.status(500).json({message: 'Error al crear la entidad(verifyService.js)'});
    }
}

module.exports = verifyService;