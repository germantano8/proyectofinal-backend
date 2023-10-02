const service = require('../models/service');
const validator = require('validator');

const verifyService = async (req, res, next) => {
    try{
        const errors = {
            //fecha:null,
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
        }

        //el ID no hay que validarlo ya que se genera e incrementa automaticamente
        // errors.id = typeof(req.body.id) === 'number' ? null : "ID error";
 
        errors.patente = typeof(req.body.patente) === 'string' && validator.isLength(req.body.patente, {min: 6, max: 10}) ? null : "La patente debe tener hasta 10 caracteres";
        errors.kilometraje = typeof(req.body.kilometraje) === 'number' ? null :"Ingresar solo valores numericos para el kilometraje" ;
        errors.comentarios_ingreso =  validator.isLength(req.body.comentarios_ingreso, {min: 1, max: 100}) ? null : "Los comentarios de ingreso solo pueden contener hasta 100 caracteres";
        errors.comentarios_salida = typeof(req.body.comentarios_salida) === 'string' && validator.isLength(req.body.comentarios_salida, {min: 1, max: 100}) ? null : "Los comentarios de salida solo pueden contener hasta 100 caracteres";

        if(Object.entries(errors).some((e) => e[1] != null)){
            return res.status(400).json(errors);
        }

        return next();
    }catch(err){
        return res.status(500).json({message: 'Error al crear la entidad(verifyService.js)'});
    }
}

module.exports = verifyService;