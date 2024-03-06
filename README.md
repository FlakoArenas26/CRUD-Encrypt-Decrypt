# CRUD-Encrypt-Decrypt

## Descripción:

Una aplicación CRUD que permite almacenar y encriptar nombres de usuario y contraseñas, listar los datos encriptados y ver cada dato filtrado por ID de forma desencriptada o para editarlo.

### Características principales:

- **Almacenamiento seguro**: Utiliza encriptación para almacenar nombres de usuario y contraseñas de forma segura en la base de datos.
- **Listado de datos encriptados**: Permite visualizar todos los datos encriptados almacenados en la base de datos.
- **Filtrado por ID**: Permite desencriptar y visualizar los datos correspondientes a un ID específico de forma segura.

### Tecnologías utilizadas:

- **Node.js**: Plataforma de desarrollo para construir aplicaciones de servidor.
- **Express**: Marco de aplicación web de Node.js para simplificar el desarrollo de aplicaciones web.
- **Sequelize**: ORM de Node.js para la interacción con la base de datos.
- **Crypto-js**: Biblioteca de cifrado para cifrar y descifrar datos de forma segura.
- **MySQL**: Sistema de gestión de bases de datos relacional para almacenar datos.

## Instalación:

- Clona este repositorio en tu máquina local:
  ```bash
  git clone https://github.com/FlakoArenas26/CRUD-Encrypt-Decrypt.git
  ```

### Para la API

- Navega hasta el directorio de tu proyecto:
  ```bash
  cd CRUD-Encrypt-Decrypt/API
  ```
- Instala las dependencias utilizando npm:
  ```bash
  npm install
  ```

#### Uso:

- Para iniciar el servidor, ejecuta el siguiente comando:

  ```bash
  npm start
  ```
- Esto iniciará el servidor y tu API estará disponible en la dirección y puerto especificados.
- Crea la base de datos en MySQL o XAMPP (PHPMyAdmin):

  ```bash
  crud_encript
  ```
- Corre la migración de la tabla Users a la BD con el siguiente comando:

  ```bash
  npm run migrate
  ```
- Con esto ya tienes configurada la BD para usar la aplicación.

### Para el FRONT

- Navega hasta el directorio de tu proyecto:
  ```bash
  cd CRUD-Encrypt-Decrypt/UI
  ```
- Instala las dependencias utilizando npm:
  ```bash
  npm install
  ```

#### Uso:

- Para iniciar el servidor, ejecuta el siguiente comando:
  ```bash
  ng serve
  ```
- Esto iniciará el servidor y tu FRONT estará disponible en la dirección y puerto especificados.

## Licencia:

- Este proyecto está bajo la Licencia ISC.
