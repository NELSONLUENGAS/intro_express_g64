require('dotenv').config()
const { Pool } = require('pg')

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

const db = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true
})

const createTables = async () => {
    await db.query(
        `
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            titulo VARCHAR(256) UNIQUE,
            done BOOLEAN DEFAULT FALSE
        );
        `
    )
}

const insertData = async () => {
    await db.query(
        `
        INSERT INTO todos
        VALUES
            (DEFAULT, 'Todo 1', DEFAULT),
            (DEFAULT, 'Todo 2', DEFAULT),
            (DEFAULT, 'Todo 3', TRUE),
            (DEFAULT, 'Todo 4', DEFAULT)
        ON CONFLICT (titulo)
        DO NOTHING;
        `
    )
}

const initDB = async () => {
    console.log('Creando tablas si no existen')
    await createTables()
    console.log('Insertando datos si no existen')
    await insertData()
}

module.exports = {
    db,
    initDB
}
