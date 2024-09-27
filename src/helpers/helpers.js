require('dotenv').config()
const { hashSync, compareSync } = require('bcrypt'); //npm i bcrypt
const { sign, verify } = require('jsonwebtoken');

const { JWT_SECRET } = process.env

const handleGenerateHATEOAS = (data) => {
    return {

        count: data.rowCount,
        results: data.rows,
        pages: data.pages,
        next: `http://localhost:5000/${data.type}?limit=${data.limit}&offset=${data.offset}`

    }

}

// funcion para encriptar contraseñas
const handleHashPassword = (password) => {
    return hashSync(password, 10)
}

// funcion para verificar contraseñas sin son iguales (la del cliente y la de la base de datos)
const handleVerifyPassword = (password, hashedPassword) => {
    return compareSync(password, hashedPassword)
}

const handleSignToken = (data) => {
    return sign(data, String(JWT_SECRET), { expiresIn: 60 * 60 })
}

module.exports = {
    handleGenerateHATEOAS,
    handleHashPassword,
    handleVerifyPassword,
    handleSignToken
}