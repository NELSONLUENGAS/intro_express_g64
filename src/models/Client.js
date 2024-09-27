const { db } = require('../db/config');
const format = require('pg-format');
const { handleGenerateHATEOAS, handleVerifyPassword } = require('../helpers/helpers');

const Fetch = async (limit = 5, orderBy = 'id_DESC', offset = 0, page = 1) => {
    try {
        const [field, order] = orderBy.split('_')

        const SQLrequest = "SELECT * FROM clientes order by %s %s LIMIT %s OFFSET %s"
        const formattedQuery = format(SQLrequest, field, order, limit, offset)

        const { rows } = await db.query(formattedQuery)
        const { rowCount: count } = await db.query("SELECT * FROM clientes")


        const data = {
            rows,
            count,
            type: 'client',
            limit,
            pages: Math.floor(count / limit),
            offset: page * limit
        }

        return handleGenerateHATEOAS(data)

    } catch (error) {
        throw error
    }
}

const Create = async (email, hashedPassword) => {
    try {

        const SQLrequest = "INSERT INTO users VALUES (DEFAULT, $1, $2) RETURNING *"
        const SQLValues = [email, hashedPassword]

        const { rows: [newUser] } = await db.query(SQLrequest, SQLValues)

        return {
            msg: 'Register success',
            data: newUser
        }

    } catch (error) {
        throw error
    }
}

const VerifyPassword = async (email, password) => {
    try {

        const userExist = await VerifyIfExist(email)
        if (userExist) {
            const hashedPassword = userExist.data.password

            const match = handleVerifyPassword(password, hashedPassword)

            if (match) {
                return {
                    msg: 'Password verified',
                    match,
                }
            } else {
                return {
                    msg: 'Password doesnt match',
                    match
                }
            }

        } else {
            return {
                msg: 'User doesnt exist',
                match: false

            }
        }



    } catch (error) {
        throw error
    }
}


const VerifyIfExist = async (email) => {
    try {

        const SQLrequest = "SELECT * FROM users WHERE email = $1"
        const SQLValues = [email]

        const { rows: [user] } = await db.query(SQLrequest, SQLValues)

        return user ? { exist: true, data: user } : { exist: false, data: {} }

    } catch (error) {
        throw error
    }
}

const Delete = async (id) => {
    try {

        const SQLrequest = "DELETE FROM users WHERE id = $1 RETURNING *"
        const SQLValues = [id]

        const { rows: [user] } = await db.query(SQLrequest, SQLValues)

        return {
            deleted: true,
            data: user
        }

    } catch (error) {
        throw error
    }
}




module.exports = {
    Fetch,
    Create,
    VerifyIfExist,
    VerifyPassword,
    Delete
}