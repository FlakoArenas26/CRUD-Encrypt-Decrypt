const crypto = require("crypto-js"); // Importar la biblioteca de criptografía
const User = require("../models/userModel"); // Importar el modelo de usuario

// Función para crear un nuevo usuario
async function createUser(req, res) {
  try {
    const { userName, password } = req.body; // Obtener el nombre de usuario y la contraseña del cuerpo de la solicitud
    if (!userName || !password) {
      // Verificar si el nombre de usuario o la contraseña están ausentes
      return res
        .status(400)
        .send("El nombre de usuario y la contraseña son obligatorios"); // Responder con un código de estado 400 si falta alguno
    }

    // Encriptar el nombre de usuario y la contraseña usando las claves de encriptación proporcionadas en las variables de entorno
    const encryptedUser = crypto.AES.encrypt(
      userName,
      process.env.USER_ENCRYPTION_KEY
    ).toString();

    const encryptedPassword = crypto.AES.encrypt(
      password,
      process.env.PASSWORD_ENCRYPTION_KEY
    ).toString();

    // Crear un nuevo usuario en la base de datos utilizando el modelo de usuario
    await User.create({ userName: encryptedUser, password: encryptedPassword });

    // Responder con un código de estado 201 (creado) indicando que el usuario se ha creado correctamente
    res.json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al insertar usuario: " + error.stack); // Registrar cualquier error en la consola
    res.status(500).send("Error al insertar usuario"); // Responder con un código de estado 500 (error interno del servidor)
  }
}

// Función para obtener la lista de usuarios
async function getUsers(req, res) {
  try {
    const users = await User.findAll(); // Obtener todos los usuarios de la base de datos utilizando el método findAll del modelo de usuario
    res.status(200).json(users); // Responder con un código de estado 200 (éxito) y enviar la lista de usuarios en formato JSON
  } catch (error) {
    console.error("Error al obtener usuarios: " + error.stack); // Registrar cualquier error en la consola
    res.status(500).send("Error al obtener usuarios"); // Responder con un código de estado 500 (error interno del servidor)
  }
}

// Función para obtener un usuario por su ID
async function getUserById(req, res) {
  try {
    const { id } = req.params; // Obtener el ID del usuario de los parámetros de la solicitud
    const user = await User.findByPk(id); // Buscar un usuario por su ID en la base de datos utilizando el método findByPk del modelo de usuario
    if (!user) {
      // Verificar si el usuario no fue encontrado
      return res.status(404).send("Usuario no encontrado"); // Responder con un código de estado 404 (no encontrado)
    }

    // Desencriptar el nombre de usuario y la contraseña del usuario encontrado
    const userNameDecrypted = decrypt(
      user.userName,
      process.env.USER_ENCRYPTION_KEY
    );
    const passwordDecrypted = decrypt(
      user.password,
      process.env.PASSWORD_ENCRYPTION_KEY
    );

    // Crear un objeto con los datos del usuario desencriptados y otros detalles
    const userDecrypted = {
      id: user.id,
      userName: userNameDecrypted,
      password: passwordDecrypted,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Responder con un código de estado 200 (éxito) y enviar el usuario desencriptado en formato JSON
    res.status(200).json(userDecrypted);
  } catch (error) {
    console.error("Error al obtener usuario: " + error.stack); // Registrar cualquier error en la consola
    res.status(500).send("Error al obtener usuario"); // Responder con un código de estado 500 (error interno del servidor)
  }
}

// Función para desencriptar una cadena
function decrypt(stringEncrypted, key) {
  const bytes = crypto.AES.decrypt(stringEncrypted, key); // Utilizar el algoritmo AES para desencriptar la cadena
  return bytes.toString(crypto.enc.Utf8); // Convertir los bytes desencriptados en una cadena legible
}

// Función para editar un usuario por su ID
async function editUser(req, res) {
  try {
    const { id } = req.params; // Obtener el ID del usuario de los parámetros de la solicitud
    const { userName, password } = req.body; // Obtener el nuevo nombre de usuario y contraseña del cuerpo de la solicitud

    // Verificar si el nombre de usuario o la contraseña están ausentes
    if (!userName || !password) {
      return res
        .status(400)
        .send("El nombre de usuario y la contraseña son obligatorios");
    }

    // Encriptar el nuevo nombre de usuario y la contraseña
    const encryptedUser = crypto.AES.encrypt(
      userName,
      process.env.USER_ENCRYPTION_KEY
    ).toString();

    const encryptedPassword = crypto.AES.encrypt(
      password,
      process.env.PASSWORD_ENCRYPTION_KEY
    ).toString();

    // Actualizar el usuario en la base de datos utilizando el método update del modelo de usuario
    await User.update(
      { userName: encryptedUser, password: encryptedPassword },
      { where: { id: id } }
    );

    // Responder con un código de estado 200 (éxito)
    // res.status(200).send("Usuario actualizado correctamente");
    res.json({ msg: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al editar usuario: " + error.stack);
    res.status(500).send("Error al editar usuario");
  }
}

// Función para eliminar un usuario por su ID
async function deleteUser(req, res) {
  try {
    const { id } = req.params; // Obtener el ID del usuario de los parámetros de la solicitud

    // Eliminar el usuario de la base de datos utilizando el método destroy del modelo de usuario
    await User.destroy({ where: { id: id } });

    // Responder con un código de estado 200 (éxito)
    // res.status(200).send("Usuario eliminado correctamente");
    res.json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario: " + error.stack);
    res.status(500).send("Error al eliminar usuario");
  }
}

module.exports = { createUser, getUsers, getUserById, editUser, deleteUser }; // Exportar las funciones para su uso en otros archivos
