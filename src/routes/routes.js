const { handleFetchClients } = require('../controllers/clients.controller')
const { getTodos, createToDo, deleteToDo, updateToDo } = require('../controllers/todos.controller')
const { handleLog } = require('../middlewares/handleLog')
const { ClientValidator } = require('../validators/client.validator')

const router = require('express').Router()

router.use(handleLog)

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

router.delete('/todos/:id', deleteToDo)

router.patch('/todos/:id', updateToDo)

router.post('/client', ClientValidator, (req, res) => {

    console.log('Hola estoy en controller')
})

router.get('/client', handleFetchClients)

module.exports = router