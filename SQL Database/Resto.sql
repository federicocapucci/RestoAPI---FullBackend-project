CREATE DATABASE IF NOT EXISTS `resto` /*!40100 COLLATE 'utf8mb4_general_ci' */;
USE `resto`;
CREATE TABLE IF NOT EXISTS usuarios (
	`usuario_ID` INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`Nombre` VARCHAR(50) NOT NULL,
	`Apellido` VARCHAR(50) NOT NULL,
	`Email` VARCHAR(50) NOT NULL UNIQUE,
	`Telefono` VARCHAR(20) NOT NULL,
	`Direccion` VARCHAR(500) NOT NULL,
	`Password` VARCHAR(100) NOT NULL,
	`isAdmin` VARCHAR (10) NOT NULL DEFAULT '0'
);
CREATE TABLE IF NOT EXISTS productos (
	`Producto_ID` INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`Nombre` VARCHAR(50) NOT NULL,
	`Precio` FLOAT (20) NOT NULL,
	`Foto` VARCHAR(500) NOT NULL
);
CREATE TABLE IF NOT EXISTS pedidos (
	`Pedido_ID` INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`usuario_ID` INT(6) NOT NULL,
	`TipoPago` VARCHAR(50) NOT NULL,
	`Estado` VARCHAR(50) NOT NULL,
	`Fecha` VARCHAR(50) NOT NULL,
	`Total` FLOAT (20) NOT NULL,
	FOREIGN KEY (usuario_ID) REFERENCES Usuarios(usuario_ID)
);
CREATE TABLE IF NOT EXISTS detalles_pedido (
	`Pedido_ID` INT(6) NOT NULL,
	`Producto_ID` INT(6) NOT NULL,
	`Cantidad` INT(3) NOT NULL,
	FOREIGN KEY (Producto_ID) REFERENCES Productos(Producto_ID),
	FOREIGN KEY (Pedido_ID) REFERENCES Pedidos(Pedido_ID)
);

/*Agregando usuarios por default*/
INSERT INTO usuarios VALUES(null,"admin","admin","admin@root.com","800-867-7183","123 Fake Street","root",true);
INSERT INTO usuarios VALUES(null,"usuario","usuario","usuario@root.com","801-867-7184","345 Fake Street","root",false);

/*Agregando productos por default*/
INSERT INTO productos VALUES(null,"Pizza Mozzarella","350","https://imagenpng.com/wp-content/uploads/2016/07/pizza1.jpg");
INSERT INTO productos VALUES(null,"Hamburguesa","250","https://e7.pngegg.com/pngimages/405/862/png-clipart-steers-hamburger-cheeseburger-french-fries-kfc-hamburger-menu.png");
INSERT INTO productos VALUES(null,"Hot Dog","150","https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/8/25/0/KC1806_Spicy-Pineapple-Relish_s4x3.jpg.rend.hgtvcom.826.620.suffix/1535214434384.jpeg");
INSERT INTO productos VALUES(null,"Ensalada","200","https://www.hola.com/imagenes/cocina/recetas/2013070865966/ensalada-de-pollo/0-241-780/ensalada_pollo_-m.jpg");
INSERT INTO productos VALUES(null,"Docena Empanadas","500","https://img-global.cpcdn.com/recipes/93eb395044826742/400x400cq70/photo.jpg");


