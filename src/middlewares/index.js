import verifyTipoVehiculo from "./verifyTipoVehiculo";
import verifyVehiculo from "./verifyVehiculo";
import verifyConductor from "./verifyConductor";
import verifyService from "./verifyService";
import verifyProyecto from "./verifyProyecto";
import verifyReparacion from "./verifyReparacion";
import verifyTrabajo from "./verifyTrabajo";

const verifiers = {
    verifyTipoVehiculo,
    verifyVehiculo,
    verifyConductor,
    verifyService,
    verifyProyecto,
    verifyReparacion,
    verifyTrabajo
}

module.exports = verifiers;
