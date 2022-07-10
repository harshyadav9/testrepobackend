
const bcrypt = require('bcryptjs');
const connection = require('../Config/connnection')
const Utill = require('../Utill');
const sendEmail = require('../Utill/sendEmail')
const jwt = require('jsonwebtoken');
var utilPayment = require('../Utill/utilPayment');
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
						res.status(500).json({ status: false, message: "Please try again1" })
					} else {
						sendEmail(principalname, email, { schoolCode: uniqueSchoolCode, pass: pass })
						res.status(200).json({ status: false, message: "User added to DB" })
					}
				})
			} else {
				res.status(200).json({ status: false, message: "School is already registered" })
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


const paymentResponse = (req, res, next) => {
	console.log("payment response is called");
	console.log("req.body", req.body);

}


const checkArgumentValidation = (data) => {

	console.log("data", data);
	if (!data.name.trim()) {
		res.json({
			"status": 0,
			"data": "Mandatory Parameter name can not empty"
		});
	}
	if (!(data.amount.trim()) || !(isFloat(data.amount))) {
		res.json({
			"status": 0,
			"data": "Mandatory Parameter amount can not empty and must be in decimal "
		});
	}
	if (!(data.txnid.trim())) {
		res.json({
			"status": 0,
			"data": "Merchant Transaction validation failed. Please enter proper value for merchant txn"
		});
	}
	if (!(data.email.trim()) || !(utilPayment.validate_mail(data.email))) {
		res.json({
			"status": 0,
			"data": "Email validation failed. Please enter proper value for email"
		});
	}
	if (!(data.phone.trim()) || utilPayment.validate_phone(data.phone)) {
		res.json({
			"status": 0,
			"data": "Phone validation failed. Please enter proper value for phone"
		});
	}
	if (!(data.productinfo.trim())) {
		res.json({
			"status": 0,
			"data": "Mandatory Parameter Product info cannot be empty"
		});
	}
	if (!(data.surl.trim()) || !(data.furl.trim())) {
		res.json({
			"status": 0,
			"data": "Mandatory Parameter Surl/Furl cannot be empty"
		});
	}
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


const response = (req, res, next) => {
	console.log("req.body>>>>>>>>", req.body);
}

const payment = async (req, res, next) => {
	let data = {};
	data['txnid'] = 'T31QQWUQ';
	data['amount'] = '150.0';
	data['email'] = 'harshy110@gmail.com';
	data['phone'] = '0123456789';
	data['name'] = 'harsh';
	data['productinfo'] = 'apple';
	data['furl'] = 'http://localhost:4000/response';
	data['surl'] = 'http://localhost:4000/response';
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




	checkArgumentValidation(data);
	var hash_key = generateHash(data);
	data['hash_key'] = hash_key;
	payment_url = 'https://testpay.easebuzz.in/';
	call_url = payment_url + 'payment/initiateLink';
	utilPayment.call(call_url, formvalue(data)).then(function (response) {
		console.log("response", response);
		pay(response.data, payment_url, res);
	});
}

const pay = (access_key, url_main, res) => {

	// if (config.enable_iframe == 0) {
	var url = url_main + 'pay/' + access_key;
	console.log("url", url)
	// return res.redirect(url);
	return res.json({
		"status": 0,
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
	response,
	paymentResponse
}