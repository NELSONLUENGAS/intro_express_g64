const { db } = require('../db/config');

// Función para obtener los todos
const getTodos = async (req, res) => {
    try {
        const SQLrequest = "SELECT * FROM todos"
        const { rows: todos } = await db.query(SQLrequest)
        res.json(todos)
    } catch (error) {
        throw error
    }
};

const createToDo = async (req, res) => {
    try {
        const { title } = req.body
        const SQLrequest = "INSERT INTO todos VALUES (DEFAULT, $1, DEFAULT) RETURNING *"
        const SQLvalues = [title]

        const { rows: [todo] } = await db.query(SQLrequest, SQLvalues)

        res.json(todo)
    } catch (error) {
        throw error
    }
}

module.exports = {
    getTodos,
    createToDo
}