const express = require("express"); // Importar Express
const router = express.Router(); // Crear un enrutador de Express
const userController = require("../controller/userController"); // Importar el controlador de usuario

// Ruta para crear un nuevo usuario
router.post("/users", userController.createUser);

// Ruta para obtener la lista de usuarios
router.get("/users", userController.getUsers);

// Ruta para obtener un usuario por su ID
router.get("/users/:id", userController.getUserById);

// Ruta para editar un usuario por su ID (solicitud PATCH)
router.patch("/users/:id", userController.editUser);

// Ruta para eliminar un usuario por su ID (solicitud DELETE)
router.delete("/users/:id", userController.deleteUser);

// Exportar el enrutador para su uso en otras partes de la aplicación
module.exports = router;
