const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../services/jwt");

// Registro de usuarios
const register = async (req, res) => {
  try {
    // Recoger datos de la petición
    let params = req.body;

    // Comprobar que me llegan los datos
    if (!params.name || !params.email || !params.password) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    // Control de usuarios duplicados
    const users = await User.find({
      email: params.email.toLowerCase(),
    }).exec();

    if (users && users.length >= 1) {
      return res.status(200).send({
        status: "success",
        message: "El usuario ya existe",
      });
    }

    // Cifrar password
    let pwd = await bcrypt.hash(params.password, 10);
    params.password = pwd;

    // Crear objeto usuario
    let userToSave = new User(params);

    // Guardar usuario en base de datos
    const userStored = await userToSave.save();

    if (!userStored) {
      return res.status(500).send({
        status: "error",
        message: "Error al guardar el usuario",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Registro de usuario exitoso",
      user: userStored,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error en el registro de usuario",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // Recuperar informacion
    let params = req.body;

    if (!params.email || !params.password) {
      return res.status(404).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }
    // Buscar si el usuario existe
    let findUser = await User.findOne({ email: params.email }).exec();
    // .select({
    //   password: 0,
    // });

    if (!findUser) {
      return res.status(404).send({
        status: "error",
        message: "No existe el usuario",
      });
    }
    // Verificar si la pwd es correcta
    let pwd = bcrypt.compareSync(params.password, findUser.password);

    if (!pwd) {
      return res.status(400).send({
        status: "error",
        message: "No te has identificado correctamente",
      });
    }
    // Conseguir token
    const token = jwt.createToken(findUser);

    // Devolver respuesta
    return res.status(200).send({
      status: "success",
      message: "Inicio de sesion correcto",
      user: {
        id: findUser._id,
        name: findUser.name,
        lastName: findUser.lastName,
        email: findUser.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
};
