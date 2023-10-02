const Trabajo = require('../models/trabajo');

const trabajoController = {

    getAll: async (req, res) => {
        try{
            const trabajo = await Trabajo.findAll();
            if(!trabajo) return res.status(400).json({error: 'No hay trabajos'});

            return res.status(200).json(await Trabajo.findAll());
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