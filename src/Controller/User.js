
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




	sqlQuery = `SELECT CAST(IFNULL(MAX(RIGHT(SchoolsCode,4)),'0000') AS UNSIGNED) AS totalRows 
	FROM Schools where country = '${country}' and state='${state}'`;
	let totalrows = 0;


	connection.getConnection(function (err, connectionval) {

		connectionval.query(sqlQuery, function (err, data) {
			if (err) {
				console.log("erro 00990", err);
				connectionval.release();
				return res.status(500).json({ status: false, message: "There is error in getting total count from Schools" });
			}

			console.log("sqlQuery", sqlQuery);


			totalrows = Array.from(data)[0].totalRows;
			console.log("totalrows", totalrows);
			let uniqueSchoolCode = Utill.schoolCodeGen(isLocal, stateCityCode, totalrows, countryCode);
			sqlQuery = `SELECT * FROM Schools WHERE schoolsCode='${schoolsCode}'`
			connectionval.query(sqlQuery, function (error, result) {
				if (error) {
					connectionval.release();
					res.status(500).json({ status: false, message: "Please try again!" });
				} else if (Array.from(result).length === 0) {
					let pass = Utill.generatePassword();
					sqlQuery = `INSERT INTO Schools (schoolsCode, principalname, schoolname, country, state, pincode, mobile, email, ismobileVerified, isEmailVerified,password,Mode) 
				VALUES ("${uniqueSchoolCode}", "${principalname}", "${schoolname}","${country}", "${state}", "${pincode}", "${mobile}", "${email}", ${ismobileVerified}, ${isEmailVerified},"${mobile}" , "ONLINE")`
					connectionval.query(sqlQuery, function (error, response) {
						console.log("error", error)
						if (error) {
							console.log("error", error);
							connectionval.release();
							return res.status(500).json({ status: false, message: "please click again on registration button again and try to save the information" });
						} else {
							connectionval.release();
							return res.status(200).json({ status: false, message: "User added to DB", data: uniqueSchoolCode });
							// sendEmail(principalname, email, { schoolCode: uniqueSchoolCode, pass: mobile }).then(data => {
							// 	return res.status(200).json({ status: false, message: "User added to DB", data: uniqueSchoolCode });
							// }).catch(error => {
							// 	console.log("error", error);
							// 	return res.status(200).json({ status: false, message: "User added to DB", data: uniqueSchoolCode });
							// });
							// return res.status(200).json({ status: false, message: "User added to DB", data: uniqueSchoolCode });
						}
					})
				} else {
					connectionval.release();
					return res.status(500).json({ status: false, message: "School is already registered" })
				}
			})
		});

	});

}


// const form = () => {
// 	form = {
// 		'key': config.key,
// 		'txnid': 'T31QQWUQ',
// 		'amount': '125.55',
// 		'email': 'harshy110@gmail.com',
// 		'phone': '0123456789',
// 		'firstname': 'Harsh',
// 		'udf1': data.udf1,
// 		'udf2': data.udf2,
// 		'udf3': data.udf3,
// 		'udf4': data.udf4,
// 		'udf5': data.udf5,
// 		'hash': hash_key,
// 		'productinfo': 'apple',
// 		'udf6': data.udf6,
// 		'udf7': data.udf7,
// 		'udf8': data.udf8,
// 		'udf9': data.udf9,
// 		'udf10': data.udf10,
// 		'furl': 'https://terigreenolympiad.com/paymentResponse', //'http://localhost:3000/response',
// 		'surl': 'https://terigreenolympiad.com/paymentResponse', //'http://localhost:3000/response'
// 	}
// 	if (data.unique_id != '') {
// 		form.unique_id = data.unique_id
// 	}


// 	if (data.split_payments != '') {
// 		form.split_payments = data.split_payments
// 	}

// 	if (data.sub_merchant_id != '') {
// 		form.sub_merchant_id = data.sub_merchant_id
// 	}

// 	if (data.customer_authentication_id != '') {
// 		form.customer_authentication_id = data.customer_authentication_id
// 	}

// 	return form;
// }


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




		// 'key': '2PBP7IABZ2',   // test
		'key': '63XJAXM4WO',   // production
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

		//  production
		var hashstring = 'AP6GFPDU0T' + "|" + response.status + "|" + response.udf10 + "|" + response.udf9 + "|" + response.udf8 + "|" + response.udf7 +
			"|" + response.udf6 + "|" + response.udf5 + "|" + response.udf4 + "|" + response.udf3 + "|" + response.udf2 + "|" + response.udf1 + "|" +
			response.email + "|" + response.firstname + "|" + response.productinfo + "|" + response.amount + "|" + response.txnid + "|" + response.key;
		hash_key = sha512.sha512(hashstring);


		//  test

		// var hashstring = 'DAH88E3UWQ' + "|" + response.status + "|" + response.udf10 + "|" + response.udf9 + "|" + response.udf8 + "|" + response.udf7 +
		// 	"|" + response.udf6 + "|" + response.udf5 + "|" + response.udf4 + "|" + response.udf3 + "|" + response.udf2 + "|" + response.udf1 + "|" +
		// 	response.email + "|" + response.firstname + "|" + response.productinfo + "|" + response.amount + "|" + response.txnid + "|" + response.key;
		// hash_key = sha512.sha512(hashstring);




		console.log("hash on clinet compae ", hash_key);
		if (hash_key == req.body.hash)
			return true;
		else
			return false;
	}
	if (checkReverseHash(req.body)) {

		console.log("successs>>>>>");
		if (req.body.status === 'success') {

			updatePayments(req, res);
		} else {
			var html = `<html><body>
		<div style="width:100%;height:40px;background: #f0f2f3;border-bottom: 1px solid #dee1e3;
		box-shadow: rgb(0 0 0 / 93%) 32px 24px 107px 0px;background-color: rgb(172, 235, 141);font-weight: 500;font-size: 16px;    display: flex;
		flex-direction: column;    border: 2px solid black;">
			<p style="font-family: sans-serif;font-weight: bold;text-align: center;margin-bottom: 0;">Payment Response Page</p>
			</div>
			<h3 style="text-align:center;font-weight:bold;">Dont click back button. Kindly close the window.Otherwise you may losse data...</h3>
			<h4 style="text-align:center;">TERI-TEAM</h4>
			<div style="width: 600px;margin: 55px auto 0;padding: 75px 100px 20px 100px;position: relative;
			border: 1px solid #e9e9e9;text-align: left;box-shadow: 2px 6px 0px 0px #ccc;border-radius: 5px;box-shadow: rgb(0 0 0 / 93%) 32px 24px 107px 0px;
			background-color: rgb(172, 235, 141);">
			<center>
				<div>
					<div style="display: flex;"><label><h2>Name:</h2></label></div>
					<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.firstname}</h3></div>
				</div>
			</center>

			<center>

				<div>
					<div style="display: flex;"><label><h2>Amount:</h2></label></div>
					<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.amount}</h3></div>
				</div>
				
			</center>

			<center>

			<div>
					<div style="display: flex;"><label><h2>Order ID:</h2></label></div>
					<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.txnid}</h3></div>
				</div>


			<div>
					<div style="display: flex;"><label><h2>Payment ID:</h2></label></div>
					<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.easepayid}</h3></div>
				</div>

			
			</center>

			<center>

			<div>
					<div style="display: flex;"><label><h2>Email:</h2></label></div>
					<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.email}</h3></div>
				</div>


			</center>

		
			
			<center><h1 style="color=green">Your payment is awaiting for approval.Please contact helpdesk</h1></center>
			<center><h4>Kindly close this window.</h4></center>
			<div>
		</div>
		
		</body></html>`;
		}

		// return res.send(req.body);
	} else {
		var html = `<html><body>
		<div style="width:100%;height:40px;background: #f0f2f3;border-bottom: 1px solid #dee1e3;
		box-shadow: rgb(0 0 0 / 93%) 32px 24px 107px 0px;background-color: rgb(172, 235, 141);font-weight: 500;font-size: 16px;    display: flex;
		flex-direction: column;    border: 2px solid black;">
			<p style="font-family: sans-serif;font-weight: bold;text-align: center;margin-bottom: 0;">Payment Response Page</p>
			</div>
			<h3 style="text-align:center;font-weight:bold;">Dont click back button. Kindly close the window.Otherwise you may losse data...</h3>
			<h4 style="text-align:center;">TERI-TEAM</h4>
			<div style="width: 600px;margin: 55px auto 0;padding: 75px 100px 20px 100px;position: relative;
			border: 1px solid #e9e9e9;text-align: left;box-shadow: 2px 6px 0px 0px #ccc;border-radius: 5px;box-shadow: rgb(0 0 0 / 93%) 32px 24px 107px 0px;
			background-color: rgb(172, 235, 141);">
			<center>
				<div>
					<div style="display: flex;"><label><h2>Name:</h2></label></div>
					<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.firstname}</h3></div>
				</div>
			</center>

			<center>

				<div>
					<div style="display: flex;"><label><h2>Amount:</h2></label></div>
					<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.amount}</h3></div>
				</div>
				
			</center>

			<center>

			<div>
					<div style="display: flex;"><label><h2>Order ID:</h2></label></div>
					<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.txnid}</h3></div>
				</div>


			<div>
					<div style="display: flex;"><label><h2>Payment ID:</h2></label></div>
					<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.easepayid}</h3></div>
				</div>

			
			</center>

			<center>

			<div>
					<div style="display: flex;"><label><h2>Email:</h2></label></div>
					<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.email}</h3></div>
				</div>


			</center>

		
			
			<center><h1 style="color=green">Your payment is awaiting for approval.Please contact helpdesk</h1></center>
			<center><h4>Kindly close this window.</h4></center>
			<div>
		</div>
		
		</body></html>`;
		res.writeHead(200, { 'Content-type': 'text/html' });
		res.write(html);
		res.end();
	}

};



const updatePayments = async (req, res) => {


	let paymentstatusupdatequery;
	sqlQuery = `update PaymentDetail set PaymentID = '${req.body.easepayid}',PaymentReceivedStatus = 'success' where OrderId = '${req.body.txnid}'`;
	// console.log("sqlQuery", sqlQuery);


	connection.getConnection(function (err, connectionval) {

		connectionval.query(sqlQuery, function (error, result) {

			// console.log("result", result);
			if (error) {
				console.log("error", error);
				connectionval.release();
				return res.status(500).json({ status: false, message: "update in payment table not happened!" });
			}

			console.log("req.body in update =payment", req.body);
			if (req.body.udf1 === 'INDV') {
				paymentstatusupdatequery = `update IndividualStudent set paymentStatus = 1   where RollNo = '${req.body.productinfo}' and paymentStatus = 0`;
			} else {
				paymentstatusupdatequery = `update InternationalStudants set paymentStatus = 1 , OrderId = '${req.body.txnid}'  where SchoolID = '${req.body.productinfo}' and paymentStatus = 0`;
			}


			console.log("paymentstatusupdatequery", paymentstatusupdatequery);
			connectionval.query(paymentstatusupdatequery, function (error, updatedresult) {
				// console.log("updatedresult", updatedresult);
				if (error) {
					console.log("error", error);
					connectionval.release();
					return res.status(500).json({ status: false, message: "update in student international table not happened!" });
				}

				var html = `<html><body>
			<div style="width:100%;height:40px;background: #f0f2f3;border-bottom: 1px solid #dee1e3;
			box-shadow: rgb(0 0 0 / 93%) 32px 24px 107px 0px;background-color: rgb(172, 235, 141);font-weight: 500;font-size: 16px;    display: flex;
			flex-direction: column;    border: 2px solid black;">
				<p style="font-family: sans-serif;font-weight: bold;text-align: center;margin-bottom: 0;">Payment Response Page</p>
				</div>
				<h3 style="text-align:center;font-weight:bold;">Dont click back button. Kindly close the window.Otherwise you may losse data...</h3>
				<h4 style="text-align:center;">TERI-TEAM</h4>
				<div style="width: 600px;margin: 55px auto 0;padding: 75px 100px 20px 100px;position: relative;
				border: 1px solid #e9e9e9;text-align: left;box-shadow: 2px 6px 0px 0px #ccc;border-radius: 5px;box-shadow: rgb(0 0 0 / 93%) 32px 24px 107px 0px;
				background-color: rgb(172, 235, 141);">
				<center>
					<div>
						<div style="display: flex;"><label><h2>Name:</h2></label></div>
						<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.firstname}</h3></div>
					</div>
				</center>
	
				<center>
	
					<div>
						<div style="display: flex;"><label><h2>Amount:</h2></label></div>
						<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.amount}</h3></div>
					</div>
					
				</center>
	
				<center>
	
				<div>
						<div style="display: flex;"><label><h2>Order ID:</h2></label></div>
						<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.txnid}</h3></div>
					</div>
	
	
				<div>
						<div style="display: flex;"><label><h2>Payment ID:</h2></label></div>
						<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.easepayid}</h3></div>
					</div>
	
				
				</center>
	
				<center>
	
				<div>
						<div style="display: flex;"><label><h2>Email:</h2></label></div>
						<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${req.body.email}</h3></div>
					</div>
	
	
				</center>
	
			
				
				<center><h1 style="color=green">Your payment is successful.</h1></center>
				<center><h4>Kindly close this window.</h4></center>
				<div>
			</div>
			
			</body></html>`;

				let obj = {
					firstname: req.body.firstname,
					amount: req.body.amount,
					txnId: req.body.txnid,
					easepayid: req.body.easepayid,
					email: req.body.email
				}
				sendPayMail(res, html, obj);



			});



		})


	});

}


const sendPayMail = async (res, htmlRes, emailObj) => {


	var html = `<html><body>
	<div style="width:100%;height:40px;background: #f0f2f3;border-bottom: 1px solid #dee1e3;
	box-shadow: rgb(0 0 0 / 93%) 32px 24px 107px 0px;background-color: rgb(172, 235, 141);font-weight: 500;font-size: 16px;    display: flex;
	flex-direction: column;    border: 2px solid black;">
		</div>
		<h4 style="text-align:center;">TERI-TEAM</h4>
		<div style="width: 600px;margin: 55px auto 0;padding: 75px 100px 20px 100px;position: relative;
		border: 1px solid #e9e9e9;text-align: left;box-shadow: 2px 6px 0px 0px #ccc;border-radius: 5px;box-shadow: rgb(0 0 0 / 93%) 32px 24px 107px 0px;
		background-color: rgb(172, 235, 141);">
		<center>
			<div>
				<div style="display: flex;"><label><h2>Name:</h2></label></div>
				<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${emailObj.firstname}</h3></div>
			</div>
		</center>

		<center>

			<div>
				<div style="display: flex;"><label><h2>Amount:</h2></label></div>
				<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${emailObj.amount}</h3></div>
			</div>
			
		</center>

		<center>

		<div>
				<div style="display: flex;"><label><h2>Order ID:</h2></label></div>
				<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${emailObj.txnId}</h3></div>
			</div>


		<div>
				<div style="display: flex;"><label><h2>Payment ID:</h2></label></div>
				<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${emailObj.easepayid}</h3></div>
			</div>

		
		</center>

		<center>

		<div>
				<div style="display: flex;"><label><h2>Email:</h2></label></div>
				<div style="flex: 0.5;display: inline-block;width: 80%;font-size: 28px;margin-top: -48px;">${emailObj.email}</h3></div>
			</div>


		</center>

	
		
		<center><h1 style="color=green">Your payment is successful.</h1></center>
		<div>
	</div>
	
	</body></html>`;


	let resvalue = await sendEmail.sendPaymentEmail(html, emailObj.email);
	res.writeHead(200, { 'Content-type': 'text/html' });
	res.write(htmlRes);
	res.end();
}





const applicationStatus = async (req, res, next) => {

	let { school_code } = req.body;


	sqlQuery = `SELECT ins.Name,ins.StudentID,ins.DOB,ins.Class,ins.Section,ins.ExamTheme,ins.DemoExam,(IFNULL(f.Fee,0)+IFNULL(mc.Fee,0)) as Fee,ins.ExamSlotDateTime,ins.DemoSlotDateTime,ins.Rollno,ins.PaymentStatus
	FROM InternationalStudants ins
	JOIN FeeIN f on 
	f.ExamMode = ins.ExamTheme
     AND f.SubscriberType ='SCHL'
    LEFT JOIN FeeIN mc on 
	mc.SubscriberType = CASE WHEN ins.DemoExam = 'YES' THEN 'MOCK' ELSE '' END
	WHERE SchoolID='${school_code}'`;







	connection.getConnection(function (err, connectionval) {
		connectionval.query(sqlQuery, function (error, result) {
			if (error) {
				console.log("error", error);
				connectionval.release();
				return res.status(500).json({ status: false, message: "Please try again!" })
			}
			let appStatusRes = Array.from(result);
			connectionval.release();
			return res.status(200).json({ status: false, message: "application status data", data: appStatusRes });
		})

	});

}



const applicationIndividualStatus = async (req, res, next) => {

	let { roll_no } = req.body;
	sqlQuery = `SELECT ins.Name,ins.DOB,ins.Class,ins.Section,ins.ExamTheme,ins.DemoExam,(IFNULL(f.Fee,0)+IFNULL(mc.Fee,0)) as Fee,ins.ExamSlotDateTime,ins.DemoSlotDateTime,ins.Rollno,ins.PaymentStatus
	FROM IndividualStudent ins
	JOIN FeeIN f on 
	f.ExamMode = ins.ExamTheme
     AND f.SubscriberType ='INDV'
    LEFT JOIN FeeIN mc on 
	mc.SubscriberType = CASE WHEN ins.DemoExam = 'YES' THEN 'MOCK' ELSE '' END
	WHERE RollNo='${roll_no}'`;
	console.log("sqlQuery", sqlQuery);






	connection.getConnection(function (err, connectionval) {
		connectionval.query(sqlQuery, function (error, result) {
			if (error) {
				console.log("error", error);
				connectionval.release();
				return res.status(500).json({ status: false, message: "Please try again!" })
			}
			let appStatusRes = Array.from(result);
			connectionval.release();
			return res.status(200).json({ status: false, message: "application status data", data: appStatusRes });
		})

	});

}







const payment = async (req, res, next) => {

	let data = {};

	const { amount, email, phone, name, productinfo, type } = req.body;
	let randomval = randomize("0", 5);

	// data['key'] = '2PBP7IABZ2';  // test
	data['key'] = '63XJAXM4WO';  // production

	data['txnid'] = `GOTERI2022_${randomval}`
	// data['amount'] = `${amount}.0`;
	data['amount'] = `1.0`;
	data['email'] = `${email}`;
	data['phone'] = `${phone}`;
	data['name'] = `${name}`;
	data['productinfo'] = `${productinfo}`;
	// data['furl'] = 'http://localhost:4000/api/responsepage';
	// data['surl'] = 'http://localhost:4000/api/responsepage';
	data['furl'] = 'https://terigreenolympiad.com/api/responsepage';
	data['surl'] = 'https://terigreenolympiad.com/api/responsepage';
	data['udf1'] = type;
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
		hash_key = generateHash(data);
		data['hash_key'] = hash_key;
		console.log("data in form", data);
		// payment_url = 'https://testpay.easebuzz.in/';  // TESTING
		payment_url = 'https://pay.easebuzz.in/';    // PRODUCTION
		call_url = payment_url + 'payment/initiateLink';
		utilPayment.call(call_url, formvalue(data)).then(function (response) {
			console.log("response", response);
			pay(response.data, payment_url, res, data, 'success');
		}).catch(error => {
			console.log("error", error);
		});
	}


}

const pay = (access_key, url_main, res, request_payment_data) => {

	// if (config.enable_iframe == 0) {
	var url = url_main + 'pay/' + access_key;
	console.log("url", url)
	// return res.redirect(url);
	return res.json({
		"status": 200,
		url: url,
		data: { orderId: request_payment_data.txnid, amount: request_payment_data.amount }
	});
	// } else {

	//   res.render("enable_iframe.html", {
	//     'key': config.key,
	//     'access_key': access_key
	//   });

	// }
}


const generateHash = (data) => {

	// for production 
	var hashstring = '63XJAXM4WO' + "|" + data.txnid + "|" + data.amount + "|" + data.productinfo + "|" + data.name + "|" + data.email +
		"|" + data.udf1 + "|" + data.udf2 + "|" + data.udf3 + "|" + data.udf4 + "|" + data.udf5 + "|" + data.udf6 + "|" + data.udf7 + "|" + data.udf8 + "|" + data.udf9 + "|" + data.udf10;
	hashstring += "|" + 'AP6GFPDU0T';



	//  test 
	// var hashstring = '2PBP7IABZ2' + "|" + data.txnid + "|" + data.amount + "|" + data.productinfo + "|" + data.name + "|" + data.email +
	// 	"|" + data.udf1 + "|" + data.udf2 + "|" + data.udf3 + "|" + data.udf4 + "|" + data.udf5 + "|" + data.udf6 + "|" + data.udf7 + "|" + data.udf8 + "|" + data.udf9 + "|" + data.udf10;
	// hashstring += "|" + 'DAH88E3UWQ';

	console.log("hashstring", hashstring);
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
		code,
		email_coordinator,
		mobile_coordinator
	} = req.body;
	if (!(code)) {
		res.status(400).json({ message: "Bad credentails", status: false })
	} else {
		sqlQuery = `
		UPDATE Schools
		SET coordinating_teacher = '${coordinatingteacher}', PostalAddress= '${postaladdress}', district='${district}',PhoneStd='${phoneStd}',
		email_coordinator = '${email_coordinator}',mobile_coordinator = '${mobile_coordinator}'
		WHERE schoolsCode = '${code}';`
		connection.getConnection(function (err, connectionval) {
			if (err) {
				console.log('query connec error!', err);
				connectionval.release();
				return res.json({
					status: false,
					message: "There is issue in connection in mysql"
				});
			}

			connectionval.query(sqlQuery, function (error, response) {
				if (error) {
					console.log("error", error);
					connectionval.release();
					return res.status(500).json({ status: false, message: "Please try again1" })
				} else {
					connectionval.release();
					return res.status(200).json({ status: true, message: "User information updated!" })
				}
			})
		});

	}


}



const StudentLogin = async (req, res, next) => {
	let { username, password, login_type } = req.body;
	connection.getConnection(function (err, connectionval) {

		if (typeof username !== 'undefined' && typeof password !== 'undefined' && username !== "" && password !== "") {
			let sqlQuery = '';
			sqlQuery = `SELECT RollNo,IndiGO FROM IndividualStudent WHERE RollNo = "${username}" AND password = "${password}" LIMIT 0, 1;`

			connectionval.query(sqlQuery, function (err, result) {
				if (err) {
					console.log('error', err);
					connectionval.release();
					return res.json({
						status: false,
						message: "Please try again!"
					});
				} else {

					let resultval = Array.from(result)[0];
					console.log("resultval", resultval)
					if (resultval.length === 0) {
						connectionval.release();
						return res.json({
							status: false,
							message: "Either your login id or password is incorrect"
						});
					} else {
						console.log("DFDSFSFSJKFWAKFJHWQ;OFJQWJFQ", resultval);
						// if(resultval === 'go4youth')
						if (resultval.IndiGO !== login_type) {
							connectionval.release();
							return res.json({
								status: false,
								message: `You are not authorized to login through this page.Please login through ${resultval.IndiGO} page`
							});
						}

						connectionval.release();
						return res.json({
							status: true,
							message: `Login success`
						});



						// sqlQuery1 = `SELECT RollNo, Name, DOB, Mobile, Email, Gender, Country, Add1, State, City, Pin, School, Class, Section,PGName, PGEmail, PGMobile, ExamTheme, DemoExam, ExamLevel,PaymentStatus
						//  FROM IndividualStudent WHERE RollNo = "${username}" LIMIT 0, 1;`
						// connectionval.query(sqlQuery1, function (err, studentdetails) {
						// 	if (err) {
						// 		console.log('error', err);
						// 		connectionval.release();
						// 		return res.json({
						// 			status: false,
						// 			message: "Please try again!"
						// 		});
						// 	} else {
						// 		let studentdetailsval = Array.from(studentdetails)[0];
						// 		connectionval.release();
						// 		return res.json({
						// 			status: true,
						// 			data: studentdetailsval,
						// 			message: ""
						// 		});
						// 	}
						// })
					}

				}


			});
		} else {
			// connection.end();
			connectionval.release();
			return res.status(400).json({
				message: "Bad request!",
				status: true
			})
		}

	});
}

const login = async (req, res, next) => {
	console.log("login ....");
	// let conn = await connection.getConnection();

	const { username, password } = req.body;
	// connection.on('error', function (err) {
	// 	console.log("[mysql error]", err);
	// })
	if (typeof username !== 'undefined' && typeof password !== 'undefined' && username !== "" && password !== "") {
		let sqlQuery = '';
		sqlQuery = `SELECT COUNT(schoolname) AS count FROM Schools WHERE schoolsCode = "${username}" AND password = "${password}" LIMIT 0, 1;`

		console.log("sqlQuery", sqlQuery)
		connection.getConnection(function (err, connectionval) {
			if (err) {
				console.log('query connec error!', err);
				connectionval.release();
				return res.json({
					status: false,
					message: "There is issue in connection in mysql"
				});
			}

			connectionval.query(sqlQuery, function (err, result) {
				if (err) {
					console.log('error', err);
					connectionval.release();
					return res.json({
						status: false,
						message: "Please try again!"
					})
				} else {
					if (Array.from(result).length > 0 && Array.from(result)[0].count === 1) {
						sqlQuery = `SELECT * FROM Schools WHERE schoolsCode = "${username}" AND password = "${password}"`
						connectionval.query(sqlQuery, function (err, result) {
							if (err) {
								connectionval.release();
								return res.status(400).json({
									message: "Bad request!",
									status: true
								});

							} else {


								let finalresult = Array.from(result)[0];
								console.log("finalresult", finalresult);
								delete finalresult['password'];
								// finalresult.splice(finalresult.indexof('password'), 1);
								connectionval.release();
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
						connectionval.release();
						return res.json({
							message: "Bad credentails!"
						})
					}
				}
			})
		})

	} else {
		// connection.end();
		return res.status(400).json({
			message: "Bad request!",
			status: true
		})
	}
	// res.status(500).json({
	// 				message: "test"
	// })



}

const checkRollNo = (req, res, next) => {

	let { school_code } = req.body;


	connection.getConnection(function (err, connectionval) {
		if (err) {
			console.log('query connec error!', err);
			connectionval.release();
			return res.json({
				status: false,
				message: "There is issue in connection in mysql"
			});
		}
		sqlQuery = `select count(*) as count from InternationalStudants where SchoolID = '${school_code}' and paymentStatus = 1 and  ifnull(Rollno,'') = '' ;`;

		connectionval.query(sqlQuery, function (err, result) {
			if (err) {
				console.log('error', err);
				connectionval.release();
				return res.json({
					status: false,
					message: "Please try again!"
				})
			}
			let rollNoCount = Array.from(result)[0];
			connectionval.release();
			return res.json({
				data: rollNoCount,
				status: true,
				message: "roll no count"
			})
		});

	});

}




const getHelpDeskCategories = (req, res, next) => {
	connection.getConnection(function (err, connectionval) {
		if (err) {
			console.log('query connec error!', err);
			connectionval.release();
			return res.json({
				status: false,
				message: "There is issue in connection in mysql"
			});
		}

		sqlQuery = `SELECT * FROM shooolnyt.HelpdeskCategory`;
		connectionval.query(sqlQuery, function (err, result) {
			if (err) {
				console.log('error', err);
				connectionval.release();
				return res.json({
					status: false,
					message: "Please try again!"
				})
			} else {
				let categories = Array.from(result);
				console.log("categories", categories);
				connectionval.release();
				return res.json({
					data: categories,
					status: true,
					message: "categories received"
				})
			}
		})


	});

}





const forgetPassword = async (req, res, next) => {
	let { school_code, roll_no } = req.body;
	let errMsg = '';
	connection.getConnection(function (err, connectionval) {
		if (err) {
			console.log('query connec error!', err);
			connectionval.release();
			return res.json({
				status: false,
				message: "There is issue in connection in mysql"
			});
		}
		if (school_code) {
			sqlQuery = `SELECT  password , email  FROM Schools WHERE schoolsCode = "${school_code}"`;
			errMsg = 'The school code entered is not correct.Please try again';

		} else {
			sqlQuery = `SELECT  password , Email as email FROM IndividualStudent WHERE RollNo = "${roll_no}"`;
			errMsg = 'The roll number entered is not correct.Please try again';
		}

		console.log("sqlQuery", sqlQuery);

		connectionval.query(sqlQuery, function (err, result) {
			if (err) {
				console.log('error', err);
				connectionval.release();
				return res.json({
					status: false,
					message: "Please try again!"
				})
			} else {
				let emailCreds = Array.from(result)[0];
				console.log("emailCreds", emailCreds);

				if (emailCreds !== undefined) {
					// connectionval.release();
					console.log("emailCreds", emailCreds);
					var html = `<!DOCTYPE html>
					<html>
					<head>
					<title></title>
					<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1">
					<meta http-equiv="X-UA-Compatible" content="IE=edge" />
					<style type="text/css">    
						/* CLIENT-SPECIFIC STYLES */
						body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
						table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
						img { -ms-interpolation-mode: bicubic; }
					
						/* RESET STYLES */
						img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
						table { border-collapse: collapse !important; }
						body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
					
						/* iOS BLUE LINKS */
						a[x-apple-data-detectors] {
							color: inherit !important;
							text-decoration: none !important;
							font-size: inherit !important;
							font-family: inherit !important;
							font-weight: inherit !important;
							line-height: inherit !important;
						}
						
						/* MOBILE STYLES */
						@media screen and (max-width:600px){
							h1 {
								font-size: 32px !important;
								line-height: 32px !important;
							}
						}
					
						/* ANDROID CENTER FIX */
						div[style*="margin: 16px 0;"] { margin: 0 !important; }
					</style>
					
					<style type="text/css">
					
					</style>
					</head>
					<body style="background-color: #5d11e9; margin: 0 !important; padding: 0 !important;">
					
					<!-- HIDDEN PREHEADER TEXT -->
					
					
					<table border="0" cellpadding="0" cellspacing="0" width="100%">
						<!-- LOGO -->
						<tr>
							<td bgcolor="#f4f4f4" align="center">
								<!--[if (gte mso 9)|(IE)]>
								<table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
								<tr>
								<td align="center" valign="top" width="600">
								<![endif]-->
								<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
									<tr>
										<td align="center" valign="top" style="padding: -15px 10px 40px 10px;">
											<a href="#" target="_blank">
												<img alt="Logo" src="cid:809Ruby90O" width="250" height="250" style="display: block; width: 169px; max-width: 169px; min-width: 169px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
											</a>
										</td>
									</tr>
								</table>
								<!--[if (gte mso 9)|(IE)]>
								</td>
								</tr>
								</table>
								<![endif]-->
							</td>
						</tr>
						<!-- HERO -->
						<tr>
							<td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
								<!--[if (gte mso 9)|(IE)]>
								<table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
								<tr>
								<td align="center" valign="top" width="600">
								<![endif]-->
								<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
									<tr>
										<td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
										  <h1 style="font-size: 28px; font-weight: 400; margin: 0; letter-spacing: 0px;">Welcome to Green Olympiad </h1>
										</td>
									</tr>
								</table>
								<!--[if (gte mso 9)|(IE)]>
								</td>
								</tr>
								</table>
								<![endif]-->
							</td>
						</tr>
						<!-- COPY BLOCK -->
						<tr>
							<td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
								<!--[if (gte mso 9)|(IE)]>
								<table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
								<tr>
								<td align="center" valign="top" width="600">
								<![endif]-->
								<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
								  <!-- COPY -->
								  
								  <!-- BULLETPROOF BUTTON -->
								  <tr>
									<td bgcolor="#ffffff" align="left">
									  <table width="100%" border="0" cellspacing="0" cellpadding="0">
										<tr>
										  <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
											<table border="0" cellspacing="0" cellpadding="0">
											  <tr>
												  <td align="center" style="border-radius: 36px;font-size:20px" >Based upon your request , your new password is ${emailCreds.password}. please use your loginid and new password for login.</td>
												  
											  </tr>
											  
											</table>
										  </td>
										</tr>
									  </table>
									</td>
								  </tr>
								  <!-- COPY -->
								 
								  <!-- COPY -->
									<tr>
									  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
										<p style="margin: 0;"></p>
									  </td>
									</tr>
								  <!-- COPY -->
								 
								  <!-- COPY -->
								  <tr>
									<td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
									  <p style="margin: 0;">Cheers,<br>The Teri Team</p>
									</td>
								  </tr>
								</table>
								<!--[if (gte mso 9)|(IE)]>
								</td>
								</tr>
								</table>
								<![endif]-->
							</td>
						</tr>
						<!-- FOOTER -->
						
					</table>
						
					</body>
					</html>`;


					forgetMail(connectionval, html, emailCreds.email, res);

				} else {
					connectionval.release();
					return res.json({
						data: [],
						status: false,
						message: errMsg
					});
				}

			}
		});

	});
}


const forgetMail = async (connectionval, html, email, res) => {
	let resvalue = await sendEmail.forgetEmail(html, email);
	console.log("resvalue", resvalue);
	connectionval.release();
	if (resvalue === 'successful') {

		return res.json({
			data: [],
			status: true,
			message: "Your password has been sent to your registered emailid successfully"
		});
	} else {
		return res.json({
			data: [],
			status: false,
			message: "There is some issue sending email at registered email id"
		});
	}

}


const checkStudentStatus = (req, res, next) => {
	let { school_code } = req.body;
	connection.getConnection(function (err, connectionval) {
		if (err) {
			console.log('query connec error!', err);
			connectionval.release();
			return res.json({
				status: false,
				message: "There is issue in connection in mysql"
			});
		}
		sqlQuery = `SELECT COUNT(*) AS count FROM InternationalStudants WHERE SchoolID = "${school_code}"`;

		connectionval.query(sqlQuery, function (err, result) {
			if (err) {
				console.log('error', err);
				connectionval.release();
				return res.json({
					status: false,
					message: "Please try again!"
				})
			} else {
				let countstudent = Array.from(result)[0];
				console.log("let finalresult = Array.from(result)[0];", countstudent);
				connectionval.release();
				return res.json({
					data: countstudent,
					status: true,
					message: "count of student uploaded"
				})
			}
		})

	});
}
module.exports = {
	getAllUser,
	login,
	register,
	upDateSchool,
	payment,
	responsepage,
	applicationStatus,
	applicationIndividualStatus,
	StudentLogin,
	checkStudentStatus,
	checkRollNo,
	getHelpDeskCategories,
	forgetPassword
}