const Conductor = require('../models/Conductor');

const conductorController = {

    getAll: async (req, res) => {
        try{
            const conductor = await Conductor.findAll();
            if(!conductor) return res.status(400).json({error: 'No hay conductores'});

            return res.status(200).json(await Conductor.findAll());
        }catch(err){
            return res.status(500).json({error: 'Cannot retrieve data'});
        }
        
    },
    getOne: async(req, res) => {
        try{
            if(!req.params.dni) return res.status(400).json({error: 'Falta dni'});
            const conductor = await Conductor.findByPk(req.params.dni);

            if(!conductor) return res.status(404).json({error: 'Conductor no encontrado'});

            return res.status(200).json(conductor);
        }catch(err){
            return res.status(500).json({error: 'Cannot retrieve data'});
        }
        
    },
    create: async(req, res) => {
        try{
            const newConductor = await Conductor.create({
                fecha_nacimiento: req.body.fecha_nacimiento, 
                nombre: req.body.nombre, 
                apellido: req.body.apellido, 
                licencias: req.body.licencias
            });

            return res.status(200).json(newConductor);
        }catch(err){
            return res.status(500).json({error: 'Error creating entity'});
        }
    },
    update: async(req, res) => {
        try{
            if(!req.params.dni) return res.status(400).json({error: 'Falta dni'});
            const conductor = await Conductor.findByPk(req.params.dni);

            if(!conductor) return res.status(404).json({error: 'Conductor no encontrado'});

            await Conductor.update({
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
            return res.status(500).json({error: 'Error updating entity'});
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
            return res.status(500).json({error: 'Error deleting entity'});
        }
    }
}

module.exports = conductorController;