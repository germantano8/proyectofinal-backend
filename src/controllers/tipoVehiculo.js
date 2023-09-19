const sequelize = require('../database/connection');
const TipoVehiculo = require('../models/tipoVehiculo');

const tipoVehiculoController = {

    findAll: async (req, res) => {
        return res.json(await TipoVehiculo.findAll());
    }
}

module.exports = tipoVehiculoController;