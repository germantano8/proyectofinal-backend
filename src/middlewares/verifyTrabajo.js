const trabajo = require('../models/trabajo');
const validator = require('validator');
const vehiculo = require('../models/vehiculo');
const proyecto = require('../models/proyecto');
const conductor = require('../models/conductor');
const cliente = require('../models/cliente');

const verifyTrabajo = async (req, res, next) => {
    try{
        const errors = { 
            fecha_desde:null, 
            fecha_hasta:null,
            kilometraje: null,
            patente: null,
            id_proyecto: null,
            dni_conductor: null,
            cuit_cliente: null
        };

        if(req.method === 'PUT' || req.method === 'DELETE'){
            const trabajoExists = await trabajo.findByPk(req.params.id);
            if(!trabajoExists){
                return res.status(404).json({message: 'Trabajo no encontrado'});
            }
        }

        errors.kilometraje = typeof(req.body.kilometraje) === 'number' && req.body.kilometraje > 0 ? null : "El kilometraje debe ser un número mayor que 0";
        errors.fecha_desde = validator.isISO8601(req.body.fecha_desde)? null : "La fecha de inicio del trabajo debe ser una fecha válida.. ";
        errors.fecha_hasta = validator.isISO8601(req.body.fecha_hasta) && req.body.fecha_hasta > req.body.fecha_desde? null : "La fecha de fin del trabajo debe ser una fecha válida y posterior a la fecha de inicio.";

        if(typeof(req.body.patente === 'string')){
            const patenteExists = await vehiculo.findByPk(req.body.patente);
            errors.patente = patenteExists ? null : "La patente no existe";
        }else{
            errors.patente = "Patente inválida";
        }

        if (req.body.id_proyecto === null || typeof req.body.id_proyecto === 'number') {
            if (req.body.id_proyecto !== null) {
                const id_proyectoExists = await proyecto.findByPk(req.body.id_proyecto);
                errors.id_proyecto = id_proyectoExists ? null : "El proyecto no existe";
            } else {
                errors.id_proyecto = null; 
            }
        } else {
            errors.id_proyecto = "ID de proyecto inválido";
        }
        
        if (req.body.cuit_cliente === null || (typeof req.body.cuit_cliente === 'string' && validator.isLength(req.body.cuit_cliente, {min: 8, max: 15}))) {
            if (req.body.cuit_cliente !== null) {
                const cuit_clienteExists = await cliente.findByPk(req.body.cuit_cliente);
                errors.cuit_cliente = cuit_clienteExists ? null : "El cliente no existe";
            } else {
                errors.cuit_cliente = null; 
            }
        } else {
            errors.cuit_cliente = "CUIT de cliente inválido";
        }
        
        if(typeof(req.body.dni_conductor === 'string' && validator.isLength(req.body.dni_conductor, {min: 8, max: 8}))){
            const dni_conductorExists = await conductor.findByPk(req.body.dni_conductor);
            errors.dni_conductor = dni_conductorExists ? null : "El conductor no existe";
        }else{
            errors.dni_conductor = "Dni de conductor inválido";
        }
    

        if(Object.entries(errors).some((e) => e[1] != null)){
           return res.status(400).json(errors);
        }

        return next();
    }catch(err){
       return res.status(500).json({message: 'Error al crear la entidad'});
    }
}

module.exports = verifyTrabajo;