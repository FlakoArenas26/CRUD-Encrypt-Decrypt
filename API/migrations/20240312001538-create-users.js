"use strict";

/**
 * @type {import('sequelize-cli').Migration}
 * Este comentario indica que este archivo es una migración de Sequelize y proporciona información sobre las funciones disponibles para modificar la base de datos.
 */
module.exports = {
  // Función para aplicar los cambios en la base de datos (crear la tabla "users")
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      // Utiliza queryInterface para crear una nueva tabla llamada "users"
      id: {
        type: Sequelize.INTEGER, // Tipo de dato: Entero
        allowNull: false, // No se permite que sea nulo
        autoIncrement: true, // Se autoincrementa automáticamente
        primaryKey: true, // Es la clave primaria de la tabla
      },
      userName: {
        type: Sequelize.STRING, // Tipo de dato: Cadena de caracteres
        allowNull: false, // No se permite que sea nulo
      },
      password: {
        type: Sequelize.STRING, // Tipo de dato: Cadena de caracteres
        allowNull: false, // No se permite que sea nulo
      },
      createdAt: {
        allowNull: false, // No se permite que sea nulo
        type: Sequelize.DATE, // Tipo de dato: Fecha
      },
      updatedAt: {
        allowNull: false, // No se permite que sea nulo
        type: Sequelize.DATE, // Tipo de dato: Fecha
      },
    });
  },

  // Función para deshacer los cambios en la base de datos (eliminar la tabla "users")
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users"); // Utiliza queryInterface para eliminar la tabla "users"
  },
};
