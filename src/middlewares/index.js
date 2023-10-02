import verifyTipoVehiculo from "./verifyTipoVehiculo";
import verifyVehiculo from "./verifyVehiculo";
import verifyConductor from "./verifyConductor";
import verifyCliente from "./verifyCliente";
import verifyService from "./verifyService";
import verifyProyecto from "./verifyProyecto";
import verifyReparacion from "./verifyReparacion";
import verifyTrabajo from "./verifyTrabajo";

const verifiers = {
    verifyTipoVehiculo,
    verifyVehiculo,
    verifyConductor,
    verifyCliente,
    verifyService,
    verifyProyecto,
    verifyReparacion,
    verifyTrabajo
}

module.exports = verifiers;
