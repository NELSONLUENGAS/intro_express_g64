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

    await db.query(
        `
        CREATE TABLE IF NOT EXISTS clientes (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(256) ,
            email VARCHAR(256) UNIQUE
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

    await db.query(
        `
        INSERT INTO clientes (nombre, email) VALUES
            ('Juan Pérez', 'juan.perez@example.com'),
            ('María Gómez', 'maria.gomez@example.com'),
            ('Carlos Rodríguez', 'carlos.rodriguez@example.com'),
            ('Ana Fernández', 'ana.fernandez@example.com'),
            ('Luis Martínez', 'luis.martinez@example.com'),
            ('Laura García', 'laura.garcia@example.com'),
            ('Pedro Sánchez', 'pedro.sanchez@example.com'),
            ('Marta López', 'marta.lopez@example.com'),
            ('Jorge Díaz', 'jorge.diaz@example.com'),
            ('Lucía Ramírez', 'lucia.ramirez@example.com'),
            ('Ricardo Torres', 'ricardo.torres@example.com'),
            ('Sofía Vargas', 'sofia.vargas@example.com'),
            ('Andrés Castillo', 'andres.castillo@example.com'),
            ('Elena Morales', 'elena.morales@example.com'),
            ('Miguel Reyes', 'miguel.reyes@example.com'),
            ('Gabriela Cruz', 'gabriela.cruz@example.com'),
            ('Fernando Herrera', 'fernando.herrera@example.com'),
            ('Patricia Ruiz', 'patricia.ruiz@example.com'),
            ('Diego Mendoza', 'diego.mendoza@example.com'),
            ('Rosa Jiménez', 'rosa.jimenez@example.com')
        ON CONFLICT (email)
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
