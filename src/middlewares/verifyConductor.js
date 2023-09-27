const conductor = require('../models/conductor');
const validator = require('validator');

const verifyconductor = async (req, res, next) => {
    try{
        const errors = {
            fecha_nacimiento: null,
            nombre:null,
            apellido:null,
            licencias:null
        }

        errors.fecha_nacimiento = validator.isDate(req.body.fecha_nacimiento, { format: 'YYYY-MM-DD' }) ? null : "La fecha de nacimiento debe ser de formato: aaaa-mm-dd";
        errors.nombre = validator.isAlpha(req.body.nombre) && validator.isLength(req.body.nombre, {min: 3, max: 45}) ? null : "El nombre solo puede contener letras y debe tener entre 3 y 45 caracteres";
        errors.apellido = validator.isAlpha(req.body.apellido) && validator.isLength(req.body.apellido, {min: 3, max: 45}) ? null : "El apellido solo puede contener letras y debe tener entre 3 y 45 caracteres";
        errors.licencias = validator.isAlpha(req.body.licencias) && validator.isLength(req.body.licencias, {min: 3, max: 45}) ? null : "Las licencias solo puede contener letras y debe tener entre 2 y 10 caracteres";

        if(Object.entries(errors).some((e) => e[1] != null)){
            res.status(400).json(errors);
        }
    }catch(err){
        res.status(500).json({message: 'Error creating conductor'});
    }
}

module.exports = verifyconductor;