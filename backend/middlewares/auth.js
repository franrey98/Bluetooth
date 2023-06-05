// Importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");
// Importar clave secreta
const libjwt = require("../services/jwt");
const secret = libjwt.secretPwd;
// MIDDELWARE - Funcion de auth
exports.auth = (req, res, next) => {
  // Comprobar si llega la cabecera de auth
  if (!req.headers.authorization) {
    return res.status(403).send({
      status: "error",
      message: "La peticion no tiene la cabecera de autenticacion",
    });
  }
  // Decodificar token
  let token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    let payload = jwt.decode(token, secret);
    // Comprobar expiracion del token
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        status: "error",
        message: "Token expirado",
      });
    }
    // Agregar datos de usuario a request
    req.user = payload;
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: "Token invalido",
      error,
    });
  }
  // Pasara a ejecutar la accion
  next();
};