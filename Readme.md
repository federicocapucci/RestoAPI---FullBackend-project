<h2 style="background-color: gray; color:white">Proyecto Acamica #3 - Delilah Resto (API Rest)</h2>

## 📝 Tabla de contenidos

- [Sobre este proyecto](#sobre)
- [Instrucciones de uso](#Instrucciones)
- [Usage](#usage)
- [Documentation](#documentation)
- [Testing the Api](#testing)
- [Built Using](#built_using)
- [Authors](#authors)

##  Sobre este proyecto <a name = "sobre"></a>

Este es el tercer y ultimo proyecto del curso de Desarrollo Full-Stack de Acamica. La idea era crear una API utilizando las herramientas de Backend y base de datos aprendidas durante el curso. La API consiste en una lista de Endpoints de un restaurante, donde se pueden registrar nuevos usuarios, hacer pedidos de platos, crear/editar y borrar usuarios, platos y pedidos, basado en permisos.

## Instrucciones de uso <a name = "Instrucciones"></a>

Sigue las instrucciones a continuacion para poder instalar el proyecto en tu maquina.

### Prerequisitos

Necesitas tener:
- [Visual Code](https://code.visualstudio.com/) instalado.
- [NodeJS](https://nodejs.org/) instalado.
- [XAMPP](https://www.apachefriends.org/es/index.html) instalado.
- [HeidiSQL](https://www.heidisql.com/download.php) instalado, o algun otro programa SQL para poder hostear y manejar los pedidos a la base de datos.

### Instalacion del proyecto

Sigue los pasos a continuacion para poder instalar el proyecto desde Github

1- Elije una carpeta en el sistema, y lanza una ventana de Command Prompt (Tecla Windows + R, escribe 'CMD' y dale OK, o shift + right click > 'Abrir ventana de Powershell') y clona el repositorio con el siguiente comando.

```
git clone https://github.com/shift-developer/DelilahRestoApi-localSQL.git
```

Then install the following dependencies

```
npm i express body-parser bcryptjs jsonwebtoken moment mysql2 sequelize

```

Now, you have to start sql server on XAMPP and create a new session on HeidiSQL called "delilah_resto_localdb". Run on them the sql file for database creation: `./db/database.sql`.


## 🎈 Usage <a name="usage"></a>

To run the api, simply run this on the terminal
```
node index.js
```

## 📄 Documentation <a name="documentation"></a>

Documentation can be found here
https://app.swaggerhub.com/apis-docs/shift-developer/DelilahRestoApi/1.0.0

## 🚀 Testing the API <a name = "testing"></a>

In order to test all the requests available of the app, there's a **Postman** Collection that you can find [here](https://documenter.getpostman.com/view/11768770/TVCZbBWD#81449741-6f9b-4b97-9e35-e844afd174ed).

🔐 If you need to have admin permissions (like Products administration) use this sample data:
```
username: admin
password: adminpass
```
User for tests:
```
username: ayuwoki_michael
password: moonwalk185
```

## ⛏️ Built Using <a name = "built_using"></a>

- [MySQL](https://www.mysql.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@shift-developer](https://github.com/shift-developer)

