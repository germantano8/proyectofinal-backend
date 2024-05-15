const { tipoVehiculo } = require('../models');
const Vehiculo = require('../models/vehiculo');

const vehiculoController = {

    getAll: async (req, res) => {
        try{
            const vehiculo = await Vehiculo.findAll({
                include: {
                    model: tipoVehiculo,
                    required:true,
                    attributes: ['descripcion']
                }
            });

            if(!vehiculo) return res.status(400).json({error: 'No hay vehiculos'});

            return res.status(200).json(vehiculo);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
    },
    getOne: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta patente'});
            const vehiculo = await Vehiculo.findByPk(req.params.id, {
                include: {
                    model: tipoVehiculo,
                    required:true,
                    attributes: ['descripcion']
                }
            });

            if(!vehiculo) return res.status(404).json({error: 'Vehiculo no encontrado'});

            return res.status(200).json(vehiculo);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
    },
    create: async(req, res) => {
        try{
            const newvehiculo = await Vehiculo.create({
                patente:req.body.patente,
                estado:req.body.estado,
                anio:req.body.anio,
                kilometraje:req.body.kilometraje,
                id_tipo_vehiculo:req.body.id_tipo_vehiculo
            });

            return res.status(200).json(newvehiculo);
        }catch(err){
            return res.status(500).json({error: 'Error al crear la entidad'});
        }
    },
    update: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta patente'});
            const vehiculo = await Vehiculo.findByPk(req.params.id);

            if(!vehiculo) return res.status(404).json({error: 'Vehiculo no encontrado'});

            await Vehiculo.update({
                patente:req.body.patente,
                estado:req.body.estado,
                anio:req.body.anio,
                kilometraje:req.body.kilometraje,
                id_tipo_vehiculo:req.body.id_tipo_vehiculo
            },{
                where: {
                    patente: req.params.id
                }
            });

            return res.status(200).json({message: 'Vehiculo actualizado'});
        }catch(err){
            return res.status(500).json({error: 'Error al actualizar la entidad'});
        }
    },
    updateKm: async(req, res)=>{
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta patente'});
            const vehiculo = await Vehiculo.findByPk(req.params.id);

            await vehiculo.increment('kilometraje', {by: req.body.kilometraje});
            return res.status(200).json({message: 'Kilometraje actualizado'});
        }catch(err){
            return res.status(500).json({error: 'Error al actualizar la entidad'});
        }
    },
    delete: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta patente'});
            const vehiculo = await Vehiculo.findByPk(req.params.id);

            if(!vehiculo) return res.status(404).json({error: 'Vehiculo no encontrado'});

            await Vehiculo.destroy({
                where: {
                    patente: req.params.id
                }
            });

            return res.status(200).json({message: 'Vehiculo eliminado'});
        }catch(err){
            return res.status(500).json({error: 'Error al eliminar la entidad'});
        }
    }
}

module.exports = vehiculoController;