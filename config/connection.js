// Require the MySQL Module
const mysql = require('mysql');

// Establish Connection Parameters
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'sushi_db'
});

// Make Connection to MySQL Database
connection.connect(function (err) {
    if (err) {
        console.error(`Error Connecting: ${err.stack}`);
        return
    }
    console.log(`Connected as ID ${connection.threadId}`)
});

// Export Connection for our ORM to use (orm.js)
module.exports = connection;