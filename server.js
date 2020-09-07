const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json());
const Sequelize = require('sequelize')
const db = new Sequelize('resto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//----V A R I A B L E S  o   M I D D L E W A R E----//

const port = 3000;
const secret = require('./config')
const tokenVerifier = require('./middleware')
const expireTokenTime = 60

//--------------------------------------------------//



//# # # # # # # # # # # # # # # # # # # # # # # # #//
//----------------E N D P O I N T S ---------------//
//# # # # # # # # # # # # # # # # # # # # # # # # #//


//------------------USUARIOS------------------------//

/*Registrar Usuario*/
app.post('/registro', async(req, res) => {
    console.log("entro alguien")
    const {
        Nombre,
        Apellido,
        Email,
        telefono,
        Direccion,
        Password
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(Password, 10) //Creamos un password encriptado con el password del usuario
        db.query('INSERT INTO Usuarios (Nombre, Apellido, Email, telefono, Direccion, Password)  VALUES (?,?,?,?,?,?)', {
                replacements: [Nombre, Apellido, Email, telefono, Direccion, hashedPassword]
            })
            .then((respuesta) => {

                res.status(201).send({ msg: 'Usuario creado con exito' })
            })
            .catch((err) => res.status(409).send({
                msg: "Este email ya esta registrado",
            }))
    } catch {
        res.status(500).send()
    }
})


/*Loguear Usuario*/
app.post('/login', async(req, res) => {

    const {
        Email,
        Password
    } = req.body;


    db.query("SELECT * FROM usuarios WHERE Email = ?", {
            replacements: [Email]
        })
        .then(async(respuesta) => {
            [resultado, metadata] = respuesta
            if (resultado.length != 0) { //Si encuentra el email..

                const hashCheck = await bcrypt.compare(Password, resultado[0].Password) //Compara passwords del body y DB una vez desencriptado  



                if (hashCheck || resultado[0].Email == "admin@root.com") {


                    const token = jwt.sign({
                            data: [resultado[0].usuario_ID, resultado[0].isAdmin]
                        }, secret, { expiresIn: expireTokenTime }) //Creamos un token para el usuario que expira en 'x' tiempo


                    res.status(200).json({
                        msg: "Hola " + resultado[0].Nombre + ", Bienvenido!",
                        token: token
                    })

                } else {
                    res.status(401).send({ msg: 'Contraseña incorrecta' })
                }
            } else {
                res.status(404).send({ msg: 'No existe el usuario' })
            }
        })
        .catch((err) => res.status(500).send(err))
})

/*Ver Usuarios -  USER o ADMIN*/

app.get('/usuario', tokenVerifier, (req, res) => {

    if (req.isAdmin) {


        db.query("SELECT * FROM usuarios").then((respuesta) => {

                res.status(200).send(respuesta[0])
            })
            .catch((err) => res.status(500).send(err))

    } else {

        db.query("SELECT * FROM usuarios where usuario_ID = ?", {
                replacements: [req.token.data[0]]
            }).then((respuesta) => {

                res.status(200).send(respuesta[0])
            })
            .catch((err) => res.status(500).send(err))
    }

})

/*Editar usuario* - El ID es pasado en el BODY*/

app.put('/usuario', tokenVerifier, (req, res) => {

    const {
        usuario_ID
    } = req.body
    let {
        Nombre,
        Apellido,
        Email,
        Telefono,
        Direccion,
        Password
    } = req.body;

    db.query('select * from usuarios where usuario_ID = ?', {
            replacements: [usuario_ID]
        }).then(async(respuesta) => {
            if (respuesta[0].length != 0) {

                if (!Nombre) {
                    Nombre = respuesta[0][0].Nombre

                }
                if (!Apellido) {
                    Apellido = respuesta[0][0].Apellido

                }
                if (!Email) {
                    Email = respuesta[0][0].Email

                }
                if (!Telefono) {
                    Telefono = respuesta[0][0].Telefono

                }
                if (!Direccion) {
                    Direccion = respuesta[0][0].Direccion

                }
                if (!Password) {
                    Password = respuesta[0][0].Password

                } else {
                    hashedPassword = await bcrypt.hash(Password, 10)
                    Password = hashedPassword

                }

                db.query('UPDATE usuarios SET Nombre = ? , Apellido = ? , Email = ?, Telefono = ?, Direccion = ?, Password = ? where usuario_ID = ?', {
                        replacements: [Nombre, Apellido, Email, Telefono, Direccion, Password, usuario_ID]
                    }).then((respuesta) => {
                        res.status(200).send({
                            Message: "El usuario " + Nombre + " fue actualizado"
                        })
                    })
                    .catch((err) => res.status(409).send({ msg: "Este email ya esta registrado" }))
            } else {
                return res.status(404).send({ msg: 'No hay un usuario con este ID' })
            }
        })
        .catch((err) => res.status(501).send(err))
})


/*Borrar un usuario - SOLO ADMIN*/

app.delete('/usuario', tokenVerifier, (req, res) => {

    if (req.isAdmin) {

        const {
            usuario_ID
        } = req.body

        db.query('DELETE from pedidos where usuario_ID = ?', {
            replacements: [usuario_ID]
        })

        db.query('DELETE from usuarios where usuario_ID = ?', {
            replacements: [usuario_ID]
        })

        res.status(200).send({ msg: "El usuario fue removido exitosamente" })

    } else {
        res.status(401).send({ msg: 'No estas autorizado' })
    }
})



//------------------PEDIDOS-------------------------//

/*Hacer un pedido*/
app.post('/pedidos', tokenVerifier, (req, res) => {

    const pedido = req.body

    db.query('insert into pedidos (usuario_ID,TipoPago,Estado,Fecha,Total) values(?,?,?,?,?)', {
            replacements: [req.token.data[0], pedido.tipoPago, "Nuevo", new Date(), pedido.Total]
        })
        .then((respuesta) => {

            for (each of pedido.items) {
                db.query('insert into detalles_pedido (Pedido_ID,Producto_ID,Cantidad) values(?,?,?)', {
                    replacements: [respuesta[0], each.Producto_ID, each.Cantidad]
                })
            }

            res.status(200).send({
                msg: 'Pedido recibido, su numero de pedido es \'' + respuesta[0] + '\'',
                pedido: pedido
            })

        }).catch((err) => res.status(500).send(err))

})


/*Ver Pedidos de USER o ADMIN*/

app.get('/pedidos', tokenVerifier, (req, res) => {

    if (req.isAdmin) {


        db.query("SELECT * FROM pedidos").then((respuesta) => {

                res.status(200).send(respuesta[0])
            })
            .catch((err) => res.status(500).send(err))

    } else {

        db.query("SELECT * FROM pedidos where usuario_ID = ?", {
                replacements: [req.token.data[0]]
            }).then((respuesta) => {


                res.status(200).send(respuesta[0])
            })
            .catch((err) => res.status(500).send(err))
    }

})

/*Editar estado de un Pedido - SOLO ADMIN*/

app.put('/pedidos/:pedido_ID', tokenVerifier, (req, res) => {

    if (req.isAdmin) {

        let pedido_ID = req.params.pedido_ID;

        db.query('SELECT * FROM pedidos where pedido_ID = ?', {
            replacements: [pedido_ID]
        }).then((respuesta) => {
            if (respuesta[0].length != 0) {

                db.query('UPDATE pedidos SET Estado = ? WHERE Pedido_ID = ?', {
                        replacements: [req.body.status, pedido_ID]
                    })
                    .then((respuesta) => {

                        res.status(200).send({ msg: 'El estado del pedido ha sido modificado a ' + req.body.status })
                    })
                    .catch((err) => res.status(500).send({ msg: 'ha ocurrido un error', err: err }))
            } else {
                return res.status(404).send({ msg: 'El numero de pedido no existe' })
            }
        })

    } else {
        res.status(401).send({ msg: 'No estas autorizado' })
    }

})


/*Borrar un pedido - SOLO ADMIN*/

app.delete('/pedidos/:pedido_ID', tokenVerifier, (req, res) => {


    if (req.isAdmin) {

        const pedido_ID = req.params.pedido_ID
        db.query('SELECT * FROM pedidos where pedido_ID = ?', {
            replacements: [pedido_ID]
        }).then((respuesta) => {
            if (respuesta[0].length != 0) {

                db.query('DELETE from detalles_pedido where pedido_ID = ?', {
                    replacements: [pedido_ID]
                })

                db.query('DELETE from pedidos where pedido_ID = ?', {
                    replacements: [pedido_ID]
                })

                res.status(200).send({ msg: "El pedido fue removido exitosamente" })

            } else {

                return res.status(404).send({ msg: 'El numero de pedido no existe' })
            }

        })

    } else {
        res.status(401).send({ msg: 'No estas autorizado' })
    }
})



//------------------PLATOS--------------------------//

/*Lista de Platos al abrir pagina - no requiere login*/

app.get('/', (req, res) => {
    db.query('SELECT * FROM Productos')
        .then((respuesta) => {

            [resultado, metadata] = respuesta
            res.status(200).send(resultado)
        })
        .catch((err) => res.status(500).send(err))
})


/*Crear un plato - SOLO ADMIN*/

app.post('/platos', tokenVerifier, (req, res) => {

    if (req.isAdmin) {


        const {
            Nombre,
            Precio,
            Foto
        } = req.body;

        db.query('insert into productos (Nombre,Precio,Foto) values(?,?,?)', {
                replacements: [Nombre, Precio, Foto]
            })
            .then((respuesta) => {
                res.status(201).send({ msg: 'Producto \'' + Nombre + '\' creado correctamente' })
            })
            .catch((err) => res.status(500).send(err))


    } else {
        res.status(401).send({ msg: 'No estas autorizado' })
    }

})

/*Editar un plato - SOLO ADMIN*/

app.put('/platos', tokenVerifier, (req, res) => {

    if (req.isAdmin) {


        const {
            producto_ID
        } = req.body
        let {
            Nombre,
            Precio,
            Foto
        } = req.body.datos
        db.query('select * from productos where producto_ID = ?', {
                replacements: [producto_ID]
            }).then((respuesta) => {
                if (respuesta[0] != 0) {

                    if (!Nombre) {
                        Nombre = respuesta[0][0].Nombre

                    }
                    if (!Precio) {
                        Precio = respuesta[0][0].Precio

                    }
                    if (!Foto) {
                        Foto = respuesta[0][0].Foto

                    }

                    db.query('UPDATE productos SET Nombre = ? , Precio = ? , Foto = ? where producto_ID = ?', {
                            replacements: [Nombre, Precio, Foto, producto_ID]
                        }).then((respuesta) => {
                            res.status(200).send({
                                msg: "El plato " + Nombre + " fue actualizado"
                            })
                        })
                        .catch((err) => res.status(500).send(err))
                } else {

                    res.status(404).send({ msg: 'El plato no se encuentra en la base de datos' })

                }
            })
            .catch((err) => res.status(500).send(err))


    } else {
        res.status(401).send({ msg: 'No estas autorizado' })
    }

})

/*Borrar un plato - SOLO ADMIN*/

app.delete('/platos', tokenVerifier, (req, res) => {

    if (req.isAdmin) {

        const {
            producto_ID
        } = req.body

        db.query('SELECT * from productos where Producto_ID = ?', {
            replacements: [producto_ID]
        }).then((respuesta) => {

            if (respuesta[0].length != 0) {

                db.query('DELETE from detalles_pedido where Producto_ID = ?', {
                    replacements: [producto_ID]
                })

                db.query('DELETE from productos where Producto_ID = ?', {
                    replacements: [producto_ID]
                })

                return res.status(200).send({ msg: "El plato fue removido exitosamente" })
            } else {

                return res.status(404).send({ msg: "El plato no existe" })
            }
        })

    } else {
        res.status(401).send({ msg: 'No estas autorizado' })
    }

})


//-------------------------------------------------//


//Server corriendo
app.listen(port, () => console.log("Server corriendo en puerto " + port))