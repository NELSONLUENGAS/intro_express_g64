const { db } = require('../db/config');
const format = require('pg-format');
const { handleGenerateHATEOAS } = require('../helpers/helpers');

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


module.exports = {
    Fetch
}