const Proyecto = require('../models/proyecto');

const proyectoController = {

    getAll: async (req, res) => {
        try{
            const proyecto = await Proyecto.findAll();
            if(!proyecto) return res.status(400).json({error: 'No hay proyectos'});

            return res.status(200).json(await Proyecto.findAll());
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    getOne: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const proyecto = await Proyecto.findByPk(req.params.id);

            if(!proyecto) return res.status(404).json({error: 'Proyecto no encontrado'});

            return res.status(200).json(proyecto);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    create: async(req, res) => {
        try{
            const newProyecto = await Proyecto.create({
                ubicacion: req.body.ubicacion, 
                nombre: req.body.nombre,
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin_estimada: req.body.fecha_fin_estimada,
                fecha_fin_real: req.body.fecha_fin_real,
                observaciones: req.body.observaciones
            });

            return res.status(200).json(newProyecto);
        }catch(err){
            return res.status(500).json({error: 'Error al crear la entidad'});
        }
    },
    update: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const proyecto = await Proyecto.findByPk(req.params.id);

            if(!proyecto) return res.status(404).json({error: 'Proyecto no encontrado'});

            await Proyecto.update({
                ubicacion: req.body.ubicacion, 
                nombre: req.body.nombre,
                fecha_inicio: req.body.fecha_inicio,
                fecha_fin_estimada: req.body.fecha_fin_estimada,
                fecha_fin_real: req.body.fecha_fin_real,
                observaciones: req.body.observaciones
            },{
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).json({message: 'Proyecto actualizado'});
        }catch(err){
            return res.status(500).json({error: 'Error al actualizar la entidad'});
        }
    },
    delete: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta id'});
            const proyecto = await Proyecto.findByPk(req.params.id);

            if(!proyecto) return res.status(404).json({error: 'Proyecto no encontrado'});

            await Proyecto.destroy({
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).json({message: 'Proyecto eliminado'});
        }catch(err){
            return res.status(500).json({error: 'Error al eliminar la entidad'});
        }
    }
}

module.exports = proyectoController;