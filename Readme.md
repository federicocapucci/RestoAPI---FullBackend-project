<h1>Proyecto Acamica #3 - Delilah Resto (API Rest)</h1>

## Tabla de contenidos

- [Sobre este proyecto](#sobre)
- [Instrucciones de uso](#Instrucciones)
- [Documentacion](#Documentacion)
- [Autor](#Autor)
<br><br>


##  Sobre este proyecto <a name = "sobre"></a>

Este es el tercer y ultimo proyecto del curso de Desarrollo Full-Stack de Acamica. La idea era crear una API utilizando las herramientas de Backend y base de datos aprendidas durante el curso. La API consiste en una lista de Endpoints de un restaurante, donde se pueden registrar nuevos usuarios, hacer pedidos de platos, crear/editar y borrar usuarios, platos y pedidos, basado en permisos.
<br><br>

## Instrucciones de uso <a name = "Instrucciones"></a>

Sigue las instrucciones a continuacion para poder instalar el proyecto en tu maquina.
<br><br>

## Prerequisitos

Necesitas tener:
- [Visual Code](https://code.visualstudio.com/) instalado.
- [REST Client (Extension de Visual Code para probar Endpoints)](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) instalado.
- [NodeJS](https://nodejs.org/) instalado.
- [XAMPP](https://www.apachefriends.org/es/index.html) instalado.
- [HeidiSQL](https://www.heidisql.com/download.php) instalado, o algun otro programa SQL para poder hostear y manejar los pedidos a la base de datos.
<br><br>

### Instalacion del proyecto

Sigue los pasos a continuacion para poder instalar el proyecto desde Github

1- Elije una carpeta en el sistema, y lanza una ventana de Command Prompt (Tecla Windows + R, escribe 'CMD' y dale OK, o shift + right click > 'Abrir ventana de Powershell') y clona el repositorio con el siguiente comando.

```
git clone https://github.com/federicocapucci/RestoAPI.git
```

2- Luego, es necesario abrir Visual code en la carpeta descargada (Node debe de estar instalado) . Y corre el siguiente codigo en una terminal, para instalar los modulos necesarios.

```
npm install express bcrypt jsonwebtoken sequelize mysql2 

```

3- El siguiente paso es correr el programa 'Xampp' y activar (start) la opcion 'MySQL' en el puerto default (3306).
<br><br>
<img src="https://i.ibb.co/3FTvgRt/Xampp.png" alt="Xamp Config">
<br><br><br><br>

4- Abre el programa 'HeidiSQL' y crea una sesion, puedes llamarla 'RestoAPI' por ejemplo, con las opciones en default, luego abrela.
<br><br>
<img src="https://i.ibb.co/zQpNYGt/Heidi-Session.png" alt="Heidi Session setup">
<br><br><br><br>

5- Carga y corre el archivo .SQL 'resto.sql' proveido en el repositorio, en la carpeta 'SQL Database' con las instrucciones para la creacion y populacion de la base de datos y tablas
<br><br>
<img src="https://i.ibb.co/JBYGsZs/Heidi-Load-SQLFile.png" alt="Heidi Load SQL">
<br><br><br><br>
6- Con esto, ya esta lista la base de datos con sus tablas correspondientes para poder empezar a hacer llamadas. 
<br><br>
<img src="https://i.ibb.co/4RNpjs8/Heidi-Ready.png" alt="Heidi ready">
<br><br>
Las tablas vienen con datos, para poder comenzar las pruebas inmediatamente, sin embargo, el usuario puede crear entradas adicionales al momento de probar los distintos Endpoints.

7- Para arrancar el servidor, y empezar a probar los endpoints, corre el siguiente codigo en la terminal de Visual code

```
node server.js
```
8- Para poder testear los distintos tipos de pedidos a la API, se agrega un archivo llamado 'queries.rest' (Requiere la extension REST Client). Solo necesitas dar click a las distintas 'SEND REQUEST' para probar los requests con los datos por defecto, o puedes editar los datos dentro del mismo archivo. 
<br><br>
<img src="https://i.ibb.co/RggPG30/query-Example.png" alt="Query Example">
<br><br>

## Documentacion <a name="Documentacion"></a>

La documentacion ala API se puede encontrar aqui:
<br>
https://app.swaggerhub.com/apis-docs/federicocapucci/RestoAPI/0.0.1
<br><br>


## Autor <a name = "Autor"></a>

- [federicocapucci](https://github.com/federicocapucci)