const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'atul',
    password: 'Atul9690@m3',
    database: 'cms_db'
});

// Export the connection object
module.exports = connection;
