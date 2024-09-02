const { getTodos, createToDo } = require('../controllers/todos.controller')

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

// router.get('/users', getUsers)
router.get('/todos', getTodos)

router.post('/todos', createToDo)

module.exports = router