const jwt = require('jsonwebtoken')
const secret = require('./config')


const tokenVerifier = (req, res, next) => {

    const token = req.header('Authorization').split(' ')[1]
    console.log(token)

    const tokeninfo = jwt.verify(token, secret, (err, data) => {

        if (err) return res.status(403).send('Invalid token')

        req.token = data

        if (data.data[1] != 0) req.isAdmin = true
        next()
    })
}

module.exports = tokenVerifier