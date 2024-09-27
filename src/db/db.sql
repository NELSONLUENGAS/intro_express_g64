CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(256) UNIQUE,
    done BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS books (
    id SERIAL,
    title VARCHAR(50) NOT NULL UNIQUE,
    book_description VARCHAR(250) NOT NULL,
    author VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL
);

INSERT INTO
    books (
        title,
        book_description,
        author
    )
values (
        'Libro1',
        'Descripción libro 1',
        'Autor libro 1'
    ),
    (
        'Libro2',
        'Descripción libro 2',
        'Autor libro 2'
    ),
    (
        'Libro3',
        'Descripción libro 3',
        'Autor libro 3'
    )