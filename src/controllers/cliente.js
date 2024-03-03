const Cliente = require('../models/cliente');

const clienteController = {

    getAll: async (req, res) => {
        try{
            const cliente = await Cliente.findAll({
                order: [
                    ['razon_social', 'ASC']
                ]
            });
            if(!cliente) return res.status(400).json({error: 'No hay clientes'});

            return res.status(200).json(cliente);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    getOne: async(req, res) => {
        try{
            if(!req.params.cuit) return res.status(400).json({error: 'Falta CUIT'});
            const cliente = await Cliente.findByPk(req.params.cuit);

            if(!cliente) return res.status(404).json({error: 'Cliente no encontrado'});

            return res.status(200).json(cliente);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    create: async(req, res) => {
        try{
            const newCliente = await Cliente.create({
                cuit:req.body.cuit,
                razon_social: req.body.razon_social
            });

            return res.status(200).json(newCliente);
        }catch(err){
            return res.status(500).json({error: 'Error al crear la entidad'});
        }
    },
    update: async(req, res) => {
        try{
            if(!req.params.cuit) return res.status(400).json({error: 'Falta CUIT'});
            const cliente = await Cliente.findByPk(req.params.cuit);

            if(!cliente) return res.status(404).json({error: 'Cliente no encontrado'});

            await Cliente.update({
                razon_social: req.body.razon_social,
                cuit: req.body.cuit
            },{
                where: {
                    cuit: req.params.cuit
                }
            });

            return res.status(200).json({message: 'Cliente actualizado'});
        }catch(err){
            return res.status(500).json({error: 'Error al actualizar la entidad'});
        }
    },
    delete: async(req, res) => {
        try{
            if(!req.params.cuit) return res.status(400).json({error: 'Falta CUIT'});
            const cliente = await Cliente.findByPk(req.params.cuit);

            if(!cliente) return res.status(404).json({error: 'Cliente no encontrado'});

            await Cliente.destroy({
                where: {
                    cuit: req.params.cuit
                }
            });

            return res.status(200).json({message: 'Cliente eliminado'});
        }catch(err){
            return res.status(500).json({error: 'Error al eliminar la entidad'});
        }
    }
}

module.exports = clienteController;