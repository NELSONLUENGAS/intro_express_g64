const { readFileSync } = require('fs')

const getUsers = (req, res) => {
    const results = readFileSync('users.json', 'utf8')

    res.json(JSON.parse(results))
}


module.exports = {
    getUsers
}