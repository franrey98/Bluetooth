const jwt = require("jwt-simple");
const moment = require("moment");

// Clave secreta
const secretPwd = "SECRET_PASSWORD_INDUSTRIA4_!231232";

// Crear funcion para generar tokens
const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, "days").unix(),
  };

  // Devolver el jwt token verificado
  return jwt.encode(payload, secretPwd);
};

module.exports = {
  secretPwd,
  createToken,
};
