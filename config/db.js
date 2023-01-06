const mysql = require('mysql2');
require ('dotenv/config');

const pool = mysql.createPool({
   connectionLimit: 20,
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_DATABASE,

});

module.exports = pool;
