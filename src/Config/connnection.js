var mysql = require('mysql');


var connection = mysql.createConnection({
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
connection.connect(function (err) {
  // body...
  if (err) {
    console.log('errr', err)
  }

  console.log("connected");
})

module.exports = connection;


