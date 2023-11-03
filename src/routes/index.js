const router = require('express').Router();
const auth = require('../middlewares/auth');

// Usuario está separado porque sí debe ser accesible sin autenticación
const usuario = require('./usuario');
router.use('/usuario', usuario);

// Todas las rutas a partir de acá deben pasar por el middleware de autenticación
const rutas = {
    tipoVehiculo: require('./tipoVehiculo'),
    conductor: require('./conductor'),
    vehiculo: require('./vehiculo'),
    cliente: require('./cliente'),
    service: require('./service'),
    proyecto: require('./proyecto'),
    reparacion: require('./reparacion'),
    trabajo: require('./trabajo'),
}

for (let r in rutas){
    router.use(`/${r}`, auth, rutas[r]);
}

module.exports = router;