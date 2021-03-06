const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apis = require('./Apis')
const UserRoute = require('./Users');
var cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next()
})

app.use(function (req, res, next) {
	res.setHeader("Content-Type", "application/json");
	next();
});





app.use('/api', apis);
// app.use('/users', UserRoute)
app.get('/', (req, res) => {
	res.json({ status: 'Test api on ' })
})



app.listen(4000, () => console.log('listening on 4000'))