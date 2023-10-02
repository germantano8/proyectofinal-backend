const conductor = require('../models/conductor');
const validator = require('validator');

const verifyconductor = async (req, res, next) => {
    try{
        const errors = {
            dni: null,
            fecha_nacimiento: null,
            nombre:null,
            apellido:null,
            licencias:null
        }

        if(req.method === 'PUT' || req.method === 'DELETE'){
            const proyectoExists = await proyecto.findByPk(req.params.id);
            if(!proyectoExists){
                return res.status(404).json({message: 'Proyecto no encontrado'});
            }
            return next();
        }

        // Con el dni no estoy seguro porque es type string el campo pero deberían ser números (pero no integer el campo)
        errors.dni = typeof(req.body.dni) === 'string' && validator.isLength(req.body.dni, {min: 8, max: 8}) ? null : "El dni debe tener 8 caracteres";
        
        errors.fecha_nacimiento = validator.isDate(req.body.fecha_nacimiento, { format: 'YYYY-MM-DD' }) ? null : "La fecha de nacimiento debe ser de formato: aaaa-mm-dd";
        errors.nombre = validator.isAlpha(req.body.nombre) && validator.isLength(req.body.nombre, {min: 3, max: 45}) ? null : "El nombre solo puede contener letras y debe tener entre 3 y 45 caracteres";
        errors.apellido = validator.isAlpha(req.body.apellido) && validator.isLength(req.body.apellido, {min: 3, max: 45}) ? null : "El apellido solo puede contener letras y debe tener entre 3 y 45 caracteres";
        errors.licencias = validator.isAlpha(req.body.licencias) && validator.isLength(req.body.licencias, {min: 3, max: 45}) ? null : "Las licencias solo puede contener letras y debe tener entre 2 y 10 caracteres";

        if(Object.entries(errors).some((e) => e[1] != null)){
            return res.status(400).json(errors);
        }

        return next();
    }catch(err){
        return res.status(500).json({message: 'Error al crear la entidad'});
    }
}

module.exports = verifyconductor;