
const bcrypt = require('bcryptjs');
const connection = require('../Config/connnection')
const Utill = require('../Utill');
const sendEmail = require('../Utill/sendEmail')
const jwt = require('jsonwebtoken');
var utilPayment = require('../Utill/utilPayment');
var randomize = require('randomatic');
var sha512 = require('js-sha512');

const getAllUser = (req, res, next) => {
	res.json({ status: true, message: "all user listed here ", list: [] })
}



const isFloat = (amt) => {
	var regexp = /^\d+\.\d{1,2}$/;
	return regexp.test(amt)
}


const register = async (req, res, next) => {
	let sqlQuery = ''
	const {
		schoolsCode = 'qab',
		principalname = '',
		schoolname = '',
		country = '',
		state = '',
		pincode = '',
		mobile = '',
		email = '',
		ismobileVerified = false,
		isEmailVerified = false,
		isLocal,
		stateCityCode,
		countryCode
	} = req.body;
	sqlQuery = `SELECT COUNT(*) AS totalRows FROM Schools where country = '${country}' and state='${state}'`;
	let totalrows = 0;
	connection.query(sqlQuery, function (err, data) {
		if (err) {
			console.log("erro 00990", err)
		}

		console.log("sqlQuery", sqlQuery);


		totalrows = Array.from(data)[0].totalRows;
		console.log("totalrows", totalrows);
		let uniqueSchoolCode = Utill.schoolCodeGen(isLocal, stateCityCode, totalrows, countryCode);
		sqlQuery = `SELECT * FROM Schools WHERE schoolsCode='${schoolsCode}'`
		connection.query(sqlQuery, function (error, result) {
			if (error) {

				res.status(500).json({ status: false, message: "Please try again!" })
			} else if (Array.from(result).length === 0) {
				let pass = Utill.generatePassword()
				sqlQuery = `INSERT INTO Schools (schoolsCode, principalname, schoolname, country, state, pincode, mobile, email, ismobileVerified, isEmailVerified,password) 
			VALUES ("${uniqueSchoolCode}", "${principalname}", "${schoolname}","${country}", "${state}", "${pincode}", "${mobile}", "${email}", ${ismobileVerified}, ${isEmailVerified},"${pass}")`
				connection.query(sqlQuery, function (error, response) {
					console.log("error", error)
					if (error) {
						return res.status(500).json({ status: false, message: "Please try again1" })
					} else {
						// sendEmail(principalname, email, { schoolCode: uniqueSchoolCode, pass: pass })
						return res.status(200).json({ status: false, message: "User added to DB", data: uniqueSchoolCode });
					}
				})
			} else {
				return res.status(200).json({ status: false, message: "School is already registered" })
			}
		})
	});
}


const form = () => {
	form = {
		'key': config.key,
		'txnid': 'T31QQWUQ',
		'amount': '125.55',
		'email': 'harshy110@gmail.com',
		'phone': '0123456789',
		'firstname': 'Harsh',
		'udf1': data.udf1,
		'udf2': data.udf2,
		'udf3': data.udf3,
		'udf4': data.udf4,
		'udf5': data.udf5,
		'hash': hash_key,
		'productinfo': 'apple',
		'udf6': data.udf6,
		'udf7': data.udf7,
		'udf8': data.udf8,
		'udf9': data.udf9,
		'udf10': data.udf10,
		'furl': 'https://terigreenolympiad.com/paymentResponse', //'http://localhost:3000/response',
		'surl': 'https://terigreenolympiad.com/paymentResponse', //'http://localhost:3000/response'
	}
	if (data.unique_id != '') {
		form.unique_id = data.unique_id
	}


	if (data.split_payments != '') {
		form.split_payments = data.split_payments
	}

	if (data.sub_merchant_id != '') {
		form.sub_merchant_id = data.sub_merchant_id
	}

	if (data.customer_authentication_id != '') {
		form.customer_authentication_id = data.customer_authentication_id
	}

	return form;
}


// const responsepage = (req, res, next) => {
// 	console.log("payment response is called");
// 	console.log("req.body", req.body);
// }


const checkArgumentValidation = (data, res) => {

	console.log("data", data);
	var obj = {
		status: "",
		data: ""
	}
	if (!data.name.trim()) {
		obj = {
			"status": 0,
			"data": "Mandatory Parameter name can not empty"
		}
		// res.json({
		// 	"status": 0,
		// 	"data": "Mandatory Parameter name can not empty"
		// });
	}
	if (!(data.amount.trim()) || !(isFloat(data.amount))) {

		obj = {
			"status": 0,
			"data": "Mandatory Parameter amount can not empty and must be in decimal "
		}
	}
	if (!(data.txnid.trim())) {

		obj = {
			"status": 0,
			"data": "Merchant Transaction validation failed. Please enter proper value for merchant txn"
		}
	}
	if (!(data.email.trim()) || !(utilPayment.validate_mail(data.email))) {


		obj = {
			"status": 0,
			"data": "Email validation failed. Please enter proper value for email"
		}
	}
	if (!(data.phone.trim()) || utilPayment.validate_phone(data.phone)) {


		obj = {
			"status": 0,
			"data": "Phone validation failed. Please enter proper value for phone"
		}
	}
	if (!(data.productinfo.trim())) {


		obj = {
			"status": 0,
			"data": "Mandatory Parameter Product info cannot be empty"
		}
	}
	if (!(data.surl.trim()) || !(data.furl.trim())) {


		obj = {
			"status": 0,
			"data": "Mandatory Parameter Surl/Furl cannot be empty"
		}

	}

	return obj;
};


const formvalue = (data) => {
	let form = {
		'key': '2PBP7IABZ2',
		'txnid': data.txnid,
		'amount': data.amount,
		'email': data.email,
		'phone': data.phone,
		'firstname': data.name,
		'udf1': data.udf1,
		'udf2': data.udf2,
		'udf3': data.udf3,
		'udf4': data.udf4,
		'udf5': data.udf5,
		'hash': data.hash_key,
		'productinfo': data.productinfo,
		'udf6': data.udf6,
		'udf7': data.udf7,
		'udf8': data.udf8,
		'udf9': data.udf9,
		'udf10': data.udf10,
		'furl': data.furl, //'http://localhost:3000/response',
		'surl': data.surl, //'http://localhost:3000/response'
	}
	if (data.unique_id != '') {
		form.unique_id = data.unique_id
	}


	if (data.split_payments != '') {
		form.split_payments = data.split_payments
	}

	if (data.sub_merchant_id != '') {
		form.sub_merchant_id = data.sub_merchant_id
	}

	if (data.customer_authentication_id != '') {
		form.customer_authentication_id = data.customer_authentication_id
	}

	return form;
}





// const responsepage = (req, res, next) => {
// 	console.log("payment response", req.body);
// 	var html = `<html><body>
// 	<div style="width:100%;height:40px;background: #f0f2f3;border-bottom: 1px solid #dee1e3;">
// 	<p style="font-family: sans-serif;font-weight: bold;text-align: center;margin-bottom: 0;">Payment Response Page</p>
// 	</div>
// 	<h3 style="text-align:center;font-weight:bold;">Dont click back button. Kindly close the window.Otherwise you may losse data...</h3>
// 	<h4 style="text-align:center;">ABCON-TEAM</h4>
// 	<div style="width: 600px;margin: 55px auto 0;padding: 75px 100px 20px 100px;position: relative;
// 	border: 1px solid #e9e9e9;text-align: left;box-shadow: 2px 6px 0px 0px #ccc;border-radius: 5px;"><center><h1>Hello</h1></center></div></body></html>`
// 	// console.log("html" , html);
// 	res.writeHead(200, { 'Content-type': 'text/html' });
// 	res.write(html);
// 	res.end();

// };





const responsepage = async (req, res, next) => {


	console.log("req", req.body);
	// console.log("req", req);
	function checkReverseHash(response) {
		console.log("response", response)
		var hashstring = 'DAH88E3UWQ' + "|" + response.status + "|" + response.udf10 + "|" + response.udf9 + "|" + response.udf8 + "|" + response.udf7 +
			"|" + response.udf6 + "|" + response.udf5 + "|" + response.udf4 + "|" + response.udf3 + "|" + response.udf2 + "|" + response.udf1 + "|" +
			response.email + "|" + response.firstname + "|" + response.productinfo + "|" + response.amount + "|" + response.txnid + "|" + '2PBP7IABZ2';
		hash_key = sha512.sha512(hashstring);
		if (hash_key == req.body.hash)
			return true;
		else
			return false;
	}
	if (checkReverseHash(req.body)) {
		return res.send(req.body);
	}
	return res.send('false, check the hash value ');
};






const applicationStatus = async (req, res, next) => {

	let { school_code } = req.body;
	sqlQuery = `SELECT ins.Name,ins.DOB,ins.Class,ins.Section,ins.ExamTheme,ins.DemoExam,f.Fee,ins.ExamSlotDateTime,ins.Rollno,ins.PaymentStatus
	FROM InternationalStudants ins
	JOIN FeeIN f on 
	f.ExamMode = ins.ExamTheme
	WHERE SchoolID='${school_code}' AND SubscriberType ='SCHL'`;
	connection.query(sqlQuery, function (error, result) {
		if (error) {
			console.log("error", error)
			return res.status(500).json({ status: false, message: "Please try again!" })
		}
		let appStatusRes = Array.from(result);
		return res.status(200).json({ status: false, message: "application status data", data: appStatusRes });
	})
}




const payment = async (req, res, next) => {

	let data = {};

	const { amount, email, phone, name, productinfo } = req.body;
	let randomval = randomize("0", 5);
	data['txnid'] = `ab${randomval}`
	data['amount'] = `${amount}.0`;
	data['email'] = `${email}`;
	data['phone'] = `${phone}`;
	data['name'] = `${name}`;
	data['productinfo'] = `${productinfo}`;
	data['furl'] = 'http://localhost:4000/api/responsepage';
	data['surl'] = 'http://localhost:4000/api/responsepage';
	data['udf1'] = '';
	data['udf2'] = '';
	data['udf3'] = '';
	data['udf4'] = '';
	data['udf5'] = '';
	data['udf6'] = '';
	data['udf7'] = '';
	data['udf8'] = '';
	data['udf9'] = '';
	data['udf10'] = '';





	let validationres = checkArgumentValidation(data, res);
	if (validationres.status !== "") {
		return res.json({
			"status": 500,
			data: validationres
		})
	} else {
		var hash_key = generateHash(data);
		data['hash_key'] = hash_key;
		console.log("data in form", data);
		payment_url = 'https://testpay.easebuzz.in/';
		call_url = payment_url + 'payment/initiateLink';
		utilPayment.call(call_url, formvalue(data)).then(function (response) {
			console.log("response", response);
			pay(response.data, payment_url, res);
		});
	}


}

const pay = (access_key, url_main, res) => {

	// if (config.enable_iframe == 0) {
	var url = url_main + 'pay/' + access_key;
	console.log("url", url)
	// return res.redirect(url);
	return res.json({
		"status": 200,
		url: url
	});
	// } else {

	//   res.render("enable_iframe.html", {
	//     'key': config.key,
	//     'access_key': access_key
	//   });

	// }
}


const generateHash = (data) => {

	var hashstring = '2PBP7IABZ2' + "|" + data.txnid + "|" + data.amount + "|" + data.productinfo + "|" + data.name + "|" + data.email +
		"|" + data.udf1 + "|" + data.udf2 + "|" + data.udf3 + "|" + data.udf4 + "|" + data.udf5 + "|" + data.udf6 + "|" + data.udf7 + "|" + data.udf8 + "|" + data.udf9 + "|" + data.udf10;
	hashstring += "|" + 'DAH88E3UWQ';
	data.hash = sha512.sha512(hashstring);
	return (data.hash);
}

const upDateSchool = async (req, res, next) => {
	let sqlQuery = ''
	const {
		postaladdress,
		district,
		coordinatingteacher,
		phoneStd,
		code
	} = req.body;
	if (!(code)) {
		res.status(400).json({ message: "Bad credentails", status: false })
	} else {
		sqlQuery = `
		UPDATE Schools
		SET coordinating_teacher = '${coordinatingteacher}', PostalAddress= '${postaladdress}', district='${district}',PhoneStd='${phoneStd}'
		WHERE schoolsCode = '${code}';`
		connection.query(sqlQuery, function (error, response) {
			if (error) {
				console.log("error", error)
				res.status(500).json({ status: false, message: "Please try again1" })
			} else {
				res.status(200).json({ status: true, message: "User information updated!" })
			}
		})
	}


}

const login = (req, res, next) => {
	console.log("login ....")
	const { username, password } = req.body;
	connection.on('error', function (err) {
		console.log("[mysql error]", err);
	})
	if (typeof username !== 'undefined' && typeof password !== 'undefined' && username !== "" && password !== "") {
		let sqlQuery = '';
		sqlQuery = `SELECT COUNT(schoolname) AS count FROM Schools WHERE schoolsCode = "${username}" AND password = "${password}" LIMIT 0, 1;`
		connection.query(sqlQuery, function (err, result) {
			if (err) {
				console.log('error', err);
				res.json({
					status: false,
					message: "Please try again!"
				})
			} else {
				if (Array.from(result).length > 0 && Array.from(result)[0].count === 1) {
					sqlQuery = `SELECT * FROM Schools WHERE schoolsCode = "${username}" AND password = "${password}"`
					connection.query(sqlQuery, function (err, result) {
						if (err) {

						} else {

							let finalresult = Array.from(result)[0];
							console.log("finalresult", finalresult);
							delete finalresult['password'];
							// finalresult.splice(finalresult.indexof('password'), 1);
							return res.json({
								data: finalresult,
								status: true,
								message: "data fetched successfully!"
							})
							// console.log("====result", result)
							// const user = Array.from(result)[0];
							// delete user.password;
							// const token = jwt.sign({
							// 	...user
							// }, 'ALPHA90009', { expiresIn: "2h" });

							// res.json({
							// 	data: user,
							// 	status: true,
							// 	token: token,
							// 	message: "Login successfully!"
							// })
						}
					})

				} else {
					res.json({
						message: "Bad credentails!"
					})
				}
			}
		})
	} else {
		res.status(400).json({
			message: "Bad request!",
			status: true
		})
	}
	// res.status(500).json({
	// 				message: "test"
	// })



}
module.exports = {
	getAllUser,
	login,
	register,
	upDateSchool,
	payment,
	responsepage,
	applicationStatus
}