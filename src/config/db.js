const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'controle_de_materiais_de_construcao',
    password: 'unochapeco'
});

module.exports = { query: (text,params) => pool.query(text, params)};