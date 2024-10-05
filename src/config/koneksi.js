const mysql = require('mysql2');

const dbConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_pegawai_bps'
});

module.exports = dbConnection.promise();