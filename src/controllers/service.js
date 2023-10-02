const Service = require('../models/service');

const serviceController = {

    getAll: async (req, res) => {
        try{
            const service = await Service.findAll();
            if(!service) return res.status(400).json({error: 'No hay Service'});

            return res.status(200).json(await Service.findAll());
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    getOne: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const service = await Service.findByPk(req.params.id);

            if(!service) return res.status(404).json({error: 'Service no encontrado'});

            return res.status(200).json(service);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    create: async(req, res) => {
        try{
            const newService = await Service.create({
                patente: req.body.patente, 
                kilometraje: req.body.kilometraje,
                comentarios_ingreso: req.body.comentarios_ingreso, 
                comentarios_salida: req.body.comentarios_salida 
            });

            return res.status(200).json(newService);
        }catch(err){
            return res.status(500).json({error: 'Error al crear la entidad'});
        }
    },
    update: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const service = await Service.findByPk(req.params.id);

            if(!service) return res.status(404).json({error: 'Service no encontrado'});

            await Service.update({
                patente: req.body.patente, 
                kilometraje: req.body.kilometraje,
                comentarios_ingreso: req.body.comentarios_ingreso, 
                comentarios_salida: req.body.comentarios_salida 
            },{
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).json({message: 'Service actualizado'});
        }catch(err){
            return res.status(500).json({error: 'Error al actualizar la entidad'});
        }
    },
    delete: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const service = await Service.findByPk(req.params.id);

            if(!service) return res.status(404).json({error: 'Service no encontrado'});

            await Service.destroy({
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).json({message: 'Service eliminado'});
        }catch(err){
            return res.status(500).json({error: 'Error al eliminar la entidad'});
        }
    }
}

module.exports = serviceController;