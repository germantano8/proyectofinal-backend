const Trabajo = require('../models/trabajo');
const {proyecto, cliente, conductor, vehiculo} = require('../models/');
const {vehiculoController} = require('./index');
const {Op} = require('sequelize');
const sequelize = require('../database/connection');

const trabajoController = {

    getAll: async (req, res) => {
        try{
            const trabajo = await Trabajo.findAll({
                order: [
                    ['id_trabajo', 'ASC']
                ],
                include: [{
                    model: proyecto,
                    required:true,
                    attributes: ['nombre']
                },
                {
                    model: cliente,
                    required:true,
                    attributes: ['razon_social']
                }]
            });
            if(!trabajo) return res.status(400).json({error: 'No hay trabajos'});

            return res.status(200).json(trabajo);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    getOne: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const trabajo = await Trabajo.findByPk(req.params.id);

            if(!trabajo) return res.status(404).json({error: 'Trabajo no encontrado'});

            return res.status(200).json(trabajo);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
    },
    getPorFechas: async(req, res) => {
        try{
            if(!req.query.tipo_vehiculo || !req.query.fecha_desde || !req.query.fecha_hasta){
                return res.status(400).json({error: 'Faltan parámetros'});
            }

            const fechaDesde = new Date(req.query.fecha_desde);
            const fechaHasta = new Date(req.query.fecha_hasta);

            const patentesQuery = await sequelize.query(`
            SELECT v.patente
            FROM vehiculo v
            WHERE v.patente NOT IN (
            SELECT patente
            FROM trabajo t
            WHERE
            (fecha_desde <= '${req.query.fecha_hasta}' AND fecha_hasta >= '${req.query.fecha_desde}')
            OR (fecha_desde BETWEEN '${req.query.fecha_desde}' AND '${req.query.fecha_hasta}')
            OR (fecha_hasta BETWEEN '${req.query.fecha_desde}' AND '${req.query.fecha_hasta}')
            )
            AND v.id_tipo_vehiculo = ${req.query.tipo_vehiculo};
            `);

            const conductoresQuery = await sequelize.query(`
            SELECT c.dni
            FROM conductor c
            WHERE c.dni NOT IN (
            SELECT dni_conductor
            FROM trabajo t
            WHERE
            (fecha_desde <= '${req.query.fecha_hasta}' AND fecha_hasta >= '${req.query.fecha_desde}')
            OR (fecha_desde BETWEEN '${req.query.fecha_desde}' AND '${req.query.fecha_hasta}')
            OR (fecha_hasta BETWEEN '${req.query.fecha_desde}' AND '${req.query.fecha_hasta}')
            );
            `);

            const patentes = Array.from(new Set(patentesQuery.flatMap(patenteArray => patenteArray.map(patenteObject => patenteObject.patente))));
            const conductores = Array.from(new Set(conductoresQuery.flatMap(dniArray => dniArray.map(dniObject => dniObject.dni))));
            
            return res.json({patentes, conductores});
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos', message: err.message});
        }
    },
    create: async(req, res) => {
        try{
            const newTrabajo = await Trabajo.create({
                fecha_desde: req.body.fecha_desde,
                fecha_hasta: req.body.fecha_hasta,
                kilometraje: req.body.kilometraje,
                patente: req.body.patente,
                id_proyecto: req.body.id_proyecto,
                dni_conductor: req.body.dni_conductor,
                cuit_cliente: req.body.cuit_cliente
            });

            return res.status(200).json(newTrabajo);
        }catch(err){
            return res.status(500).json({error: 'Error al crear la entidad'});
        }
    },
    update: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const trabajo = await Trabajo.findByPk(req.params.id);

            if(!trabajo) return res.status(404).json({error: 'Trabajo no encontrado'});

            await Trabajo.update({
                fecha_desde: req.body.fecha_desde,
                fecha_hasta: req.body.fecha_hasta,
                kilometraje: req.body.kilometraje,
                patente: req.body.patente,
                id_proyecto: req.body.id_proyecto,
                dni_conductor: req.body.dni_conductor,
                cuit_cliente: req.body.cuit_cliente
            },{
                where: {
                    id_trabajo: req.params.id
                }
            });

            return res.status(200).json({message: 'Trabajo actualizado'});
        }catch(err){
            return res.status(500).json({error: 'Error al actualizar la entidad'});
        }
    },
    delete: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const trabajo = await Trabajo.findByPk(req.params.id);

            if(!trabajo) return res.status(404).json({error: 'Trabajo no encontrado'});

            await Trabajo.destroy({
                where: {
                    id_trabajo: req.params.id
                }
            });

            return res.status(200).json({message: 'Trabajo eliminado'});
        }catch(err){
            return res.status(500).json({error: 'Error al eliminar la entidad'});
        }
    }
}

module.exports = trabajoController;