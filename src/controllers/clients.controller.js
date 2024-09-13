const Client = require('../models/Client')

const handleFetchClients = async (req, res) => {
    try {
        const { limit, order, offset } = req.query;

        const response = await Client.Fetch(limit, order, offset)
        res.json(response)

    } catch (error) {
        throw error
    }

}

module.exports = {
    handleFetchClients
}