const proyecto = require('../models/proyecto');
const validator = require('validator');

const verifyProyecto = async (req, res, next) => {
    try{
        const errors = {
            ubicacion: null, 
            nombre:null, 
            fecha_inicio:null, 
            fecha_fin_estimada:null, 
            fecha_fin_real:null,
            observaciones:null,
        };

        if(req.method === 'PUT' || req.method === 'DELETE'){
            const proyectoExists = await proyecto.findByPk(req.params.id);
            if(!proyectoExists){
                return res.status(404).json({message: 'Proyecto no encontrado'});
            }
        }

        errors.ubicacion = typeof(req.body.ubicacion) === 'string' && validator.isLength(req.body.ubicacion, {min: 3, max: 45}) ? null : "La ubicacion solo puede contener letras y debe tener entre 3 y 45 caracteres";
        errors.nombre =  typeof(req.body.nombre) === 'string' && validator.isLength(req.body.nombre, {min: 1, max: 30}) ? null : "El nombre solo puede contener letras y debe tener entre 1 y 30 caracteres";
        //errors.fecha_inicio = validator.isDate(Date.parse(req.body.fecha_inicio)) || typeof(req.body.fecha_inicio) === 'DATEONLY'? null : "La fecha de inicio debe ser una fecha válida.. ";
        //errors.fecha_fin_estimada = validator.isDate(Date.parse(req.body.fecha_fin_estimada), { format: 'YYYY-MM-DD' }) && validator.isAfter(req.body.fecha_inicio)? null : "La fecha de fin estimada debe ser una fecha válida y posterior a la fecha de inicio. Formato: aaaa-mm-dd";
        errors.observaciones = !req.body.observaciones ||validator.isLength(req.body.observaciones, {min: 1, max: 45}) ? null : "Las observaciones solo pueden contener letras y debe tener entre 1 y 45 caracteres";
        errors.fecha_fin_real = !req.body.fecha_fin_real || validator.isDate(req.body.fecha_fin_real, { format: 'YYYY-MM-DD' }) && validator.isAfter(req.body.fecha_inicio)? null : "La fecha de fin real debe ser una fecha válida y posterior a la fecha de inicio. Formato: aaaa-mm-dd";

        if(Object.entries(errors).some((e) => e[1] != null)){
           return res.status(400).json(errors);
        }

        return next();
    }catch(err){
      return  res.status(500).json({message: 'Error al crear la entidad'});
    }
}

module.exports = verifyProyecto;