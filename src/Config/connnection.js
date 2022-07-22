var mysql = require('mysql');


var connection = mysql.createPool({
  connectionLimit: 99,
  host: "teridb.ctgy1xlcobou.ap-south-1.rds.amazonaws.com", // ip address of server running mysql
  user: "admin", // user name to your mysql database
  password: "Sathya098765", // corresponding password
  port: "3306",
  database: "shooolnyt"
});


// var connection = mysql.createPool({
//   connectionLimit: 99,
//   host: "teridb-uat.ctgy1xlcobou.ap-south-1.rds.amazonaws.com", // ip address of server running mysql
//   user: "admin", // user name to your mysql database
//   password: "Teri0lympiad2022", // corresponding password
//   port: "3306",
//   database: "greenolympiaddb"
// });


connection.getConnection(function (err) {
  // body...
  if (err) {
    // connection.release();
    console.log(' Error getting mysql_pool connection: ' + err);
    throw err;
  }

  console.log("connected");
})

module.exports = connection;


