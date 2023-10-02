const Reparacion = require('../models/reparacion');

const reparacionController = {

    getAll: async (req, res) => {
        try{
            const reparacion = await Reparacion.findAll();
            if(!reparacion) return res.status(400).json({error: 'No hay reparaciones'});

            return res.status(200).json(await Reparacion.findAll());
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    getOne: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const reparacion = await Reparacion.findByPk(req.params.id);

            if(!reparacion) return res.status(404).json({error: 'Reparacion no encontrada'});

            return res.status(200).json(reparacion);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    create: async(req, res) => {
        try{
            const newReparacion = await Reparacion.create({
                comentarios: req.body.comentarios, 
                fecha_desde: req.body.fecha_desde,
                fecha_hasta: req.body.fecha_hasta,
                patente: req.body.patente
            });

            return res.status(200).json(newReparacion);
        }catch(err){
            return res.status(500).json({error: 'Error al crear la entidad'});
        }
    },
    update: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const reparacion = await Reparacion.findByPk(req.params.id);

            if(!reparacion) return res.status(404).json({error: 'Reparacion no encontrada'});

            await Reparacion.update({
                comentarios: req.body.comentarios, 
                fecha_desde: req.body.fecha_desde,
                fecha_hasta: req.body.fecha_hasta,
                patente: req.body.patente
            },{
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).json({message: 'Reparacion actualizada'});
        }catch(err){
            return res.status(500).json({error: 'Error al actualizar la entidad'});
        }
    },
    delete: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const reparacion = await Reparacion.findByPk(req.params.id);

            if(!reparacion) return res.status(404).json({error: 'Reparacion no encontrada'});

            await Reparacion.destroy({
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).json({message: 'Reparacion eliminada'});
        }catch(err){
            return res.status(500).json({error: 'Error al eliminar la entidad'});
        }
    }
}

module.exports = reparacionController;