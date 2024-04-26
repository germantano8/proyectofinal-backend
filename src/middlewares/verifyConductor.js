const conductor = require('../models/conductor');
const validator = require('validator');

const verifyConductor = async (req, res, next) => {
    try{
        const errors = {
            dni: null,
            fecha_nacimiento: null,
            nombre:null,
            apellido:null,
            licencias:null
        }

        if(req.method === 'PUT' || req.method === 'DELETE'){
            const conductorExists = await conductor.findByPk(req.params.dni);
            if(!conductorExists){
                return res.status(404).json({message: 'Conductor no encontrado'});
            }
            if(req.method === 'DELETE'){
                return next();
            }
        }

        errors.dni = validator.isNumeric(req.body.dni) && validator.isLength(req.body.dni, {min: 8, max: 8}) ? null : "El dni debe tener 8 caracteres";
        errors.fecha_nacimiento = validator.isISO8601(req.body.fecha_nacimiento)? null : "La fecha de nacimiento debe ser una fecha válida. Formato: aaaa-mm-dd";
        errors.nombre = validator.isAlpha(req.body.nombre) && validator.isLength(req.body.nombre, {min: 3, max: 45}) ? null : "El nombre solo puede contener letras y debe tener entre 3 y 45 caracteres";
        errors.apellido = validator.isAlpha(req.body.apellido) && validator.isLength(req.body.apellido, {min: 3, max: 45}) ? null : "El apellido solo puede contener letras y debe tener entre 3 y 45 caracteres";
        errors.licencias = typeof(req.body.licencias) === 'string' && validator.isLength(req.body.licencias, {min: 3, max: 45}) ? null : "La licencia de tener entre 2 y 10 caracteres";

        if(Object.entries(errors).some((e) => e[1] != null)){
            return res.status(400).json(errors);
        }

        return next();
    }catch(err){
        return res.status(500).json({message: 'Error al crear la entidad'});
    }
}

module.exports = verifyConductor;