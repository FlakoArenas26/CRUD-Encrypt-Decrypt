// db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("crud_encript", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();

module.exports = sequelize;
