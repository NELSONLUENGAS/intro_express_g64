const { getUsers } = require('../controllers/user.controller')

const router = require('express').Router()

router.get('/', function (req, res) {

    res.sendFile(__dirname + '/index.html')
})

router.get('/services', function (req, res) {
    res.send('Services')
})

router.get('/contact', function (req, res) {
    res.send('Contact')
})

router.get('/staff', function (req, res) {
    res.send('Staff')
})

router.get('/users', getUsers)

module.exports = router