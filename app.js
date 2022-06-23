
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
var cors = require('cors')
// parse requests of content-type: application/json
app.use(cors())
app.use(bodyParser.json());
let port = process.env.PORT || 4000;
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
var mysql = require('mysql');



// create a connection variable with the required details
// var con = mysql.createConnection({
//     host: "localhost", // ip address of server running mysql
//     user: "root", // user name to your mysql database
//     password: "sathya@9999", // corresponding password
//     database: "sys" // use the specified database
// });

// con.connect(function (err) {
//     if (err) throw err;
//     // if connection is successful
//     console.log('connection successful');
//     var showtable = "SHOW TABLES LIKE 'customers'";
//     var createTable = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//     var insertTable = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//     con.query(showtable, function (err, result) {
//         if (err) throw err;
//         if (result.length === 0) {
//             con.query(createTable, function (err1, result1) {
//                 if (err1) throw err1;
//                 console.log(result1);
//                 console.log("Table created");
//             });
//         } else {
//             con.query(insertTable, function (err2, result2) {
//                 if (err2) throw err2;
//                 console.log(result2);
//                 console.log("Record created");
//             });
//         }

//     });
// });
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 70000 }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/api', (req, res, next) => {
    console.log("called");
    return res.status(200).json({ data: "Hello World" });
});




// if (process.env.NODE_ENV == 'production') {
//     app.use(function (req, res, next) {
//         res.setHeader("Content-Type", "application/json");
//         next();
//     });
// }








app.listen(port, () => {
    console.log(`Our server is running on dbPort ${port}`);
});

