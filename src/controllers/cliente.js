const Cliente = require('../models/cliente');

const clienteController = {

    getAll: async (req, res) => {
        try{
            const cliente = await Cliente.findAll();
            if(!cliente) return res.status(400).json({error: 'No hay clientes'});

            return res.status(200).json(await Cliente.findAll());
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    getOne: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta CUIT'});
            const cliente = await Cliente.findByPk(req.params.id);

            if(!cliente) return res.status(404).json({error: 'Cliente no encontrado'});

            return res.status(200).json(cliente);
        }catch(err){
            return res.status(500).json({error: 'Error al recuperar los datos'});
        }
        
    },
    create: async(req, res) => {
        try{
            const newCliente = await Cliente.create({
                descripcion: req.body.descripcion, 
                tipo_licencia: req.body.tipo_licencia
            });

            return res.status(200).json(newCliente);
        }catch(err){
            return res.status(500).json({error: 'Error al crear la entidad'});
        }
    },
    update: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta CUIT'});
            const cliente = await Cliente.findByPk(req.params.id);

            if(!cliente) return res.status(404).json({error: 'Cliente no encontrado'});

            await Cliente.update({
                descripcion: req.body.descripcion, 
                tipo_licencia: req.body.tipo_licencia
            },{
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).json({message: 'Cliente actualizado'});
        }catch(err){
            return res.status(500).json({error: 'Error al actualizar la entidad'});
        }
    },
    delete: async(req, res) => {
        try{
            if(!req.params.id) return res.status(400).json({error: 'Falta CUIT'});
            const cliente = await Cliente.findByPk(req.params.id);

            if(!cliente) return res.status(404).json({error: 'Cliente no encontrado'});

            await Cliente.destroy({
                where: {
                    id: req.params.id
                }
            });

            return res.status(200).json({message: 'Cliente eliminado'});
        }catch(err){
            return res.status(500).json({error: 'Error al eliminar la entidad'});
        }
    }
}

module.exports = clienteController;