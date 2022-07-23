
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


	var html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
	<!--[if gte mso 9]>
	<xml>
	  <o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
	  </o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
	  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <meta name="x-apple-disable-message-reformatting">
	  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
	  <title></title>
	  
		<style type="text/css">
		  @media only screen and (min-width: 620px) {
	  .u-row {
		width: 600px !important;
	  }
	  .u-row .u-col {
		vertical-align: top;
	  }
	
	  .u-row .u-col-100 {
		width: 600px !important;
	  }
	
	}
	
	@media (max-width: 620px) {
	  .u-row-container {
		max-width: 100% !important;
		padding-left: 0px !important;
		padding-right: 0px !important;
	  }
	  .u-row .u-col {
		min-width: 320px !important;
		max-width: 100% !important;
		display: block !important;
	  }
	  .u-row {
		width: calc(100% - 40px) !important;
	  }
	  .u-col {
		width: 100% !important;
	  }
	  .u-col > div {
		margin: 0 auto;
	  }
	}
	body {
	  margin: 0;
	  padding: 0;
	}
	
	table,
	tr,
	td {
	  vertical-align: top;
	  border-collapse: collapse;
	}
	
	p {
	  margin: 0;
	}
	
	.ie-container table,
	.mso-container table {
	  table-layout: fixed;
	}
	
	* {
	  line-height: inherit;
	}
	
	a[x-apple-data-detectors='true'] {
	  color: inherit !important;
	  text-decoration: none !important;
	}
	
	table, td { color: #000000; } @media (max-width: 480px) { #u_column_2 .v-col-padding { padding: 30px 0px !important; } #u_column_3 .v-col-padding { padding: 30px 0px !important; } #u_column_11 .v-col-padding { padding: 30px 0px !important; } }
		</style>
	  
	  
	
	<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
	
	</head>
	
	<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
	  <!--[if IE]><div class="ie-container"><![endif]-->
	  <!--[if mso]><div class="mso-container"><![endif]-->
	  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
	  <tbody>
	  <tr style="vertical-align: top">
		<td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
		<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
		
	
	<div class="u-row-container" style="padding: 0px;background-color: transparent">
	  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
		  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
		  
	<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #228b22;width: 600px;padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
	<div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
	  <div style="background-color: #228b22;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
	  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
	  
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	<table width="100%" cellpadding="0" cellspacing="0" border="0">
	  <tr>
		<td style="padding-right: 0px;padding-left: 0px;" align="center">
		  
		  <img align="center" border="0" src="https://assets.unlayer.com/projects/91671/1658553232120-terilogo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 580px;" width="580"/>
		  
		</td>
	  </tr>
	</table>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 5px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <h2 style="margin: 0px; color: #ecf0f1; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 20px;">
		Welcome to GREEN Olympiad
	  </h2>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
	  </div>
	</div>
	<!--[if (mso)|(IE)]></td><![endif]-->
		  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
		</div>
	  </div>
	</div>
	
	
	
	<div class="u-row-container" style="padding: 0px;background-color: transparent">
	  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
		  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
		  
	<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
	<div id="u_column_3" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
	  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
	  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
	  
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <h4 style="margin: 0px; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 16px;">
		Kindly save this email. You can refer to the following details for any communication related to the examination.
	  </h4>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
	  </div>
	</div>
	<!--[if (mso)|(IE)]></td><![endif]-->
		  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
		</div>
	  </div>
	</div>
	
	
	
	<div class="u-row-container" style="padding: 0px;background-color: transparent">
	  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
		  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
		  
	<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
	<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
	  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
	  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
	  
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
		<p style="font-size: 14px; line-height: 140%; text-align: center;">Name:  <strong>${emailObj.firstname}</strong></p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
		<p style="font-size: 14px; line-height: 140%; text-align: center;">Amount:  <strong>${emailObj.amount}</strong></p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
		<p style="font-size: 14px; line-height: 140%; text-align: center;">Order ID:  <strong>${emailObj.txnId}</strong></p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
		<p style="font-size: 14px; line-height: 140%; text-align: center;">Payment ID:  <strong>${emailObj.easepayid}</strong></p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
		<p style="font-size: 14px; line-height: 140%; text-align: center;">Email: <strong>${emailObj.email}</strong></p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
	  </div>
	</div>
	<!--[if (mso)|(IE)]></td><![endif]-->
		  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
		</div>
	  </div>
	</div>
	
	
	
	<div class="u-row-container" style="padding: 0px;background-color: transparent">
	  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
		  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
		  
	<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
	<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
	  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
	  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
	  
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
		<p style="font-size: 14px; line-height: 140%; text-align: center;"><strong>Your payment is successful.</strong></p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
	  </div>
	</div>
	<!--[if (mso)|(IE)]></td><![endif]-->
		  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
		</div>
	  </div>
	</div>
	
	
	
	<div class="u-row-container" style="padding: 0px;background-color: transparent">
	  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
		  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
		  
	<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
	<div id="u_column_11" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
	  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
	  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
	  
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <h4 style="margin: 0px; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 18px;">
		For assistance, call helpdesk between 10 am to 5 pm IST at 011-46571473 (Sunday Closed)
	  </h4>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
	  </div>
	</div>
	<!--[if (mso)|(IE)]></td><![endif]-->
		  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
		</div>
	  </div>
	</div>
	
	
	
	<div class="u-row-container" style="padding: 0px;background-color: transparent">
	  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
		<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
		  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
		  
	<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
	<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
	  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
	  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
	  
	<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
	  <tbody>
		<tr>
		  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
			
	  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
		<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">With regards,</span></p>
	<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">GREEN Olympiad Secretariat</span></p>
	  </div>
	
		  </td>
		</tr>
	  </tbody>
	</table>
	
	  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
	  </div>
	</div>
	<!--[if (mso)|(IE)]></td><![endif]-->
		  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
		</div>
	  </div>
	</div>
	
	
		<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		</td>
	  </tr>
	  </tbody>
	  </table>
	  <!--[if mso]></div><![endif]-->
	  <!--[if IE]></div><![endif]-->
	</body>
	
	</html>`;




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
	data['amount'] = `${amount}.0`;
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

					var html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
					<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
					<head>
					<!--[if gte mso 9]>
					<xml>
					  <o:OfficeDocumentSettings>
						<o:AllowPNG/>
						<o:PixelsPerInch>96</o:PixelsPerInch>
					  </o:OfficeDocumentSettings>
					</xml>
					<![endif]-->
					  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
					  <meta name="viewport" content="width=device-width, initial-scale=1.0">
					  <meta name="x-apple-disable-message-reformatting">
					  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
					  <title></title>
					  
						<style type="text/css">
						  @media only screen and (min-width: 620px) {
					  .u-row {
						width: 600px !important;
					  }
					  .u-row .u-col {
						vertical-align: top;
					  }
					
					  .u-row .u-col-100 {
						width: 600px !important;
					  }
					
					}
					
					@media (max-width: 620px) {
					  .u-row-container {
						max-width: 100% !important;
						padding-left: 0px !important;
						padding-right: 0px !important;
					  }
					  .u-row .u-col {
						min-width: 320px !important;
						max-width: 100% !important;
						display: block !important;
					  }
					  .u-row {
						width: calc(100% - 40px) !important;
					  }
					  .u-col {
						width: 100% !important;
					  }
					  .u-col > div {
						margin: 0 auto;
					  }
					}
					body {
					  margin: 0;
					  padding: 0;
					}
					
					table,
					tr,
					td {
					  vertical-align: top;
					  border-collapse: collapse;
					}
					
					p {
					  margin: 0;
					}
					
					.ie-container table,
					.mso-container table {
					  table-layout: fixed;
					}
					
					* {
					  line-height: inherit;
					}
					
					a[x-apple-data-detectors='true'] {
					  color: inherit !important;
					  text-decoration: none !important;
					}
					
					table, td { color: #000000; } @media (max-width: 480px) { #u_column_2 .v-col-padding { padding: 30px 0px !important; } #u_column_3 .v-col-padding { padding: 30px 0px !important; } #u_column_11 .v-col-padding { padding: 30px 0px !important; } }
						</style>
					  
					  
					
					<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
					
					</head>
					
					<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
					  <!--[if IE]><div class="ie-container"><![endif]-->
					  <!--[if mso]><div class="mso-container"><![endif]-->
					  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
					  <tbody>
					  <tr style="vertical-align: top">
						<td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
						<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
						
					
					<div class="u-row-container" style="padding: 0px;background-color: transparent">
					  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
						<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
						  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
						  
					<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #228b22;width: 600px;padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
					<div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
					  <div style="background-color: #228b22;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
					  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
					  
					<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
					  <tbody>
						<tr>
						  <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
							
					<table width="100%" cellpadding="0" cellspacing="0" border="0">
					  <tr>
						<td style="padding-right: 0px;padding-left: 0px;" align="center">
						  
						  <img align="center" border="0" src="https://assets.unlayer.com/projects/91671/1658553232120-terilogo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 580px;" width="580"/>
						  
						</td>
					  </tr>
					</table>
					
						  </td>
						</tr>
					  </tbody>
					</table>
					
					<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
					  <tbody>
						<tr>
						  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 5px;font-family:arial,helvetica,sans-serif;" align="left">
							
					  <h2 style="margin: 0px; color: #ecf0f1; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 20px;">
						Welcome to GREEN Olympiad
					  </h2>
					
						  </td>
						</tr>
					  </tbody>
					</table>
					
					  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
					  </div>
					</div>
					<!--[if (mso)|(IE)]></td><![endif]-->
						  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
						</div>
					  </div>
					</div>
					
					
					
					<div class="u-row-container" style="padding: 0px;background-color: transparent">
					  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
						<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
						  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
						  
					<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
					<div id="u_column_3" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
					  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
					  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
					  
					<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
					  <tbody>
						<tr>
						  <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
							
					  <h4 style="margin: 0px; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 16px;">
						Kindly save this email. You can refer to the following details for any communication related to the examination.
					  </h4>
					
						  </td>
						</tr>
					  </tbody>
					</table>
					
					  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
					  </div>
					</div>
					<!--[if (mso)|(IE)]></td><![endif]-->
						  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
						</div>
					  </div>
					</div>
					
					
					
					<div class="u-row-container" style="padding: 0px;background-color: transparent">
					  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
						<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
						  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
						  
					<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
					<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
					  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
					  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
					  
					<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
					  <tbody>
						<tr>
						  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
							
					  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
						<p style="font-size: 14px; line-height: 140%;">Based upon your request , your new password is : <strong>${emailCreds.password}. </strong>please use your loginid and new password for login.</p>
					  </div>
					
						  </td>
						</tr>
					  </tbody>
					</table>
					
					  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
					  </div>
					</div>
					<!--[if (mso)|(IE)]></td><![endif]-->
						  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
						</div>
					  </div>
					</div>
					
					
					
					<div class="u-row-container" style="padding: 0px;background-color: transparent">
					  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
						<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
						  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
						  
					<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
					<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
					  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
					  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
					  
					  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
					  </div>
					</div>
					<!--[if (mso)|(IE)]></td><![endif]-->
						  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
						</div>
					  </div>
					</div>
					
					
					
					<div class="u-row-container" style="padding: 0px;background-color: transparent">
					  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
						<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
						  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
						  
					<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
					<div id="u_column_11" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
					  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
					  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
					  
					<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
					  <tbody>
						<tr>
						  <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
							
					  <h4 style="margin: 0px; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 18px;">
						For assistance, call helpdesk between 10 am to 5 pm IST at 011-46571473 (Sunday Closed)
					  </h4>
					
						  </td>
						</tr>
					  </tbody>
					</table>
					
					  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
					  </div>
					</div>
					<!--[if (mso)|(IE)]></td><![endif]-->
						  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
						</div>
					  </div>
					</div>
					
					
					
					<div class="u-row-container" style="padding: 0px;background-color: transparent">
					  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
						<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
						  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
						  
					<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
					<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
					  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
					  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
					  
					<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
					  <tbody>
						<tr>
						  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
							
					  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
						<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">With regards,</span></p>
					<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">GREEN Olympiad Secretariat</span></p>
					  </div>
					
						  </td>
						</tr>
					  </tbody>
					</table>
					
					  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
					  </div>
					</div>
					<!--[if (mso)|(IE)]></td><![endif]-->
						  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
						</div>
					  </div>
					</div>
					
					
						<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
						</td>
					  </tr>
					  </tbody>
					  </table>
					  <!--[if mso]></div><![endif]-->
					  <!--[if IE]></div><![endif]-->
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