
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



// simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
// });

// console.log("__dirname", path.join(__dirname, 'public/index.html'))





app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 70000 }));

app.get('/', (req, res, next) => {
    return res.status(200).json({ data: "Hello World" });

});

if (process.env.NODE_ENV == 'production') {
    app.use(function (req, res, next) {
        res.setHeader("Content-Type", "application/json");
        next();
    });
}




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.listen(port, () => {
    console.log(`Our server is running on dbPort ${port}`);
});

