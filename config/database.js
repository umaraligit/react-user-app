var mysql = require('mysql');
var credentials = {
    host        : 'localhost',
    port        : '3306',
    user        : 'root',
    password    : 'root',
    database    : 'user'
}

var connection = mysql.createConnection(credentials);

connection.connect(function(err) {
    if(!err) {
        console.log('Database is Connected!');
    } else {
        console.log('Error while connecting Database. [err]:', err);
    }
});

module.exports = connection;
