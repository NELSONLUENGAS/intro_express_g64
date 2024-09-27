const { handleHashPassword, handleSignToken } = require('../helpers/helpers');
const Client = require('../models/Client')

require('dotenv').config()
const { decode } = require('jsonwebtoken');

const handleFetchClients = async (req, res) => {
    try {
        const { limit, order, offset } = req.query;

        const response = await Client.Fetch(limit, order, offset)
        res.json(response)

    } catch (error) {
        throw error
    }

}

const handleRegister = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({ msg: 'Email y password requeridos' })
        } else {
            const passwordHashed = handleHashPassword(password);
            const verifyIfUser = await Client.VerifyIfExist(email)

            if (verifyIfUser.exist) {
                res.status(400).json({ msg: 'Already exist' })
            } else {

                const response = await Client.Create(email, passwordHashed)
                res.status(200).json(response)
            }
        }
    } catch (error) {
        throw error
    }
}


const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({ msg: 'Email y password requeridos' })
        } else {

            const passwordMatch = await Client.VerifyPassword(email, password)

            if (passwordMatch.match) {
                res.status(200).json({
                    token: handleSignToken({ email, roles: ['admin', 'customer'] })
                })
            } else {
                res.status(401).json({ msg: 'Credenciales incorrectas' })
            }
        }

    } catch (error) {
        throw error
    }
}

const handleDeleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const token = req.token

        let response = await Client.Delete(id)
        const { email } = decode(token)

        response['msg'] = `El usuario ${email} acaba de eliminar a ${response.data.email}`

        res.status(200).json(response)

    } catch (error) {
        throw error
    }
}

module.exports = {
    handleFetchClients,
    handleRegister,
    handleLogin,
    handleDeleteUser
}