var mysql = require('mysql');
var config = require('./database')
var connection = mysql.createConnection(config);
connection.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!!!")
  });
module.exports = connection;