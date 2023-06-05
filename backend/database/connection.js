const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Industria4");

    console.log("Conectado correctamente a BD: Industria4");
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar a la DB");
  }
};

module.exports = {
  connection,
};
