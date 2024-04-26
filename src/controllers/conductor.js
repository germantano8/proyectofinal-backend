const Conductor = require('../models/conductor');

const conductorController = {

    getAll: async (req, res) => {
        try{
            const conductor = await Conductor.findAll();
            if(!conductor) return res.status(400).json({error: 'No hay conductores'});

            return res.status(200).json(conductor);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    getOne: async(req, res) => {
        try{
            if(!req.params.dni) return res.status(400).json({error: 'Falta dni'});
            const conductor = await Conductor.findByPk(req.params.dni);

            if(!conductor) return res.status(404).json({error: 'Conductor no encontrado'});

            return res.status(200).json(conductor);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    create: async(req, res) => {
        try{
            const newConductor = await Conductor.create({
                dni: req.body.dni,
                fecha_nacimiento: req.body.fecha_nacimiento, 
                nombre: req.body.nombre, 
                apellido: req.body.apellido, 
                licencias: req.body.licencias
            });

            return res.status(200).json(newConductor);
        }catch(err){
            return res.status(500).json({error: 'Error al crear la entidad'});
        }
    },
    update: async(req, res) => {
        try{
            if(!req.params.dni) return res.status(400).json({error: 'Falta dni'});
            const conductor = await Conductor.findByPk(req.params.dni);

            if(!conductor) return res.status(404).json({error: 'Conductor no encontrado'});

            await Conductor.update({
                dni: req.body.dni,
                fecha_nacimiento: req.body.fecha_nacimiento, 
                nombre: req.body.nombre, 
                apellido: req.body.apellido, 
                licencias: req.body.licencias
            },{
                where: {
                    dni: req.params.dni
                }
            });

            return res.status(200).json({message: 'Conductor actualizado'});
        }catch(err){
            return res.status(500).json({error: 'Error al actualizar la entidad'});
        }
    },
    delete: async(req, res) => {
        try{
            if(!req.params.dni) return res.status(400).json({error: 'Falta dni'});
            const conductor = await Conductor.findByPk(req.params.dni);

            if(!conductor) return res.status(404).json({error: 'Conductor no encontrado'});

            await Conductor.destroy({
                where: {
                    dni: req.params.dni
                }
            });

            return res.status(200).json({message: 'Conductor eliminado'});
        }catch(err){
            return res.status(500).json({error: 'Error al eliminar la entidad'});
        }
    }
}

module.exports = conductorController;