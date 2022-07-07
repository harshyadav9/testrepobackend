var mysql = require('mysql');


var connection = mysql.createPool({
  connectionLimit: 100,
  host: "teridb.ctgy1xlcobou.ap-south-1.rds.amazonaws.com", // ip address of server running mysql
  user: "admin", // user name to your mysql database
  password: "Sathya12345", // corresponding password
  port: "3306",
  database: "shooolnyt"
});


// var connection = mysql.createConnection({
//   host     : '162.241.85.161',
//   user     : 'demoapit_teri_user',
//   password : 'Teri@321',
//   database : 'demoapit_teri'
// });
connection.getConnection(function (err) {
  // body...
  if (err) {
    connection.release();
    console.log(' Error getting mysql_pool connection: ' + err);
    throw err;
  }

  console.log("connected");
})

module.exports = connection;


