const { DataTypes } = require("sequelize"); // Importar el objeto DataTypes de Sequelize
const sequelize = require("../db"); // Importar la instancia de Sequelize inicializada en otro archivo

// Definir el modelo de usuario
const User = sequelize.define("user", {
  userName: {
    type: DataTypes.STRING, // Tipo de dato: Cadena de caracteres
    allowNull: false, // No se permite que sea nulo
  },
  password: {
    type: DataTypes.STRING, // Tipo de dato: Cadena de caracteres
    allowNull: false, // No se permite que sea nulo
  },
});

module.exports = User; // Exportar el modelo de usuario para su uso en otras partes de la aplicación
