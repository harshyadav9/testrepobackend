
const bcrypt = require('bcryptjs');
const connection = require('../Config/connnection')
const Utill = require('../Utill');
const sendEmail  =  require('../Utill/sendEmail')
const jwt = require('jsonwebtoken');
const getAllUser = (req,res,next) => {
	res.json({ status: true,message:"all user listed here ", list:[]})
}
const register = async (req, res, next) => {
	let sqlQuery  = ''
	const { 
		schoolsCode='qab',
		principalname='',
		schoolname='',
		country='',
		state='',
		pincode='',
		mobile='',
		email='',
		ismobileVerified=false,
		isEmailVerified=false,
		isLocal,
      	stateCityCode,
      	countryCode
	} = req.body;
	 sqlQuery = `SELECT COUNT(*) AS totalRows FROM Schools` 
	 let totalrows = 0;
	 connection.query(sqlQuery,function(err,data){
	 	if(err) {
	 		console.log("erro 00990",err)
	 	}
	 	totalrows = Array.from(data)[0].totalRows;
	 	let uniqueSchoolCode = Utill.schoolCodeGen(isLocal,stateCityCode,totalrows,countryCode);
	 	sqlQuery = `SELECT * FROM Schools WHERE schoolsCode='${schoolsCode}'`
		connection.query(sqlQuery,function(error,result){
		if(error){

			res.status(500).json({ status: false, message:"Please try again!"})
		} else if(Array.from(result).length === 0) {
			let pass = Utill.generatePassword()
			sqlQuery = `INSERT INTO Schools (schoolsCode, principalname, schoolname, country, state, pincode, mobile, email, ismobileVerified, isEmailVerified,password) 
			VALUES ("${uniqueSchoolCode}", "${principalname}", "${schoolname}","${country}", "${state}", "${pincode}", "${mobile}", "${email}", ${ismobileVerified}, ${isEmailVerified},"${pass}")`
			connection.query(sqlQuery,function(error,response) {
				console.log("error",error)
				if(error){
					res.status(500).json({ status: false, message:"Please try again1"})
				} else {
					sendEmail(principalname,email,{ schoolCode: uniqueSchoolCode,pass: pass })
					res.status(200).json({ status: false, message:"User added to DB"})
				}
			})
		} else {
			res.status(200).json({ status: false, message:"School is already registered"})
		}
		})
	 });
}

const upDateSchool = async (req, res, next) => {
	let sqlQuery  = ''
	const { 
		postaladdress,
      	district,
      	coordinatingteacher,
      	phoneStd,
      	code
	} = req.body;
	if(!(code)) {
		res.status(400).json({ message: "Bad credentails", status: false})
	} else {
		sqlQuery = `
		UPDATE Schools
		SET coordinating_teacher = '${coordinatingteacher}', PostalAddress= '${postaladdress}', district='${district}',PhoneStd='${phoneStd}'
		WHERE schoolsCode = '${code}';`
		connection.query(sqlQuery,function(error,response) {
		if(error){
			console.log("error",error)
			res.status(500).json({ status: false, message:"Please try again1"})
		} else {
			res.status(200).json({ status: true, message:"User information updated!"})
		}
	})
	}
	
	
}

const login = (req,res,next) =>  {
	console.log("login ....")
	const { username, password } = req.body;
	connection.on('error',function(err) {
		console.log("[mysql error]",err);
	})
	if(typeof username !== 'undefined' && typeof password !== 'undefined' && username !== "" && password !== "") {
		let sqlQuery = '';
		sqlQuery = `SELECT COUNT(schoolname) AS count FROM Schools WHERE schoolsCode = "${username}" AND password = "${password}" LIMIT 0, 1;`	
		connection.query(sqlQuery, function(err,result) {
			if(err){
				console.log('error',err);
				res.json({
					status: false,
					message: "Please try again!"
				})
			} else {
				if(Array.from(result).length > 0 && Array.from(result)[0].count === 1) {
						sqlQuery = `SELECT * FROM Schools WHERE schoolsCode = "${username}" AND password = "${password}"`	
						connection.query(sqlQuery, function(err,result) {
						if(err) {

						} else {
							console.log("====result",result)
							const  user =  Array.from(result)[0];
							delete user.password;
							const token = jwt.sign({ 
								...user
							 },'ALPHA90009', { expiresIn: "2h" });
							
							res.json({
								data: user,
								status: true,
								token: token,
								message: "Login successfully!"
							})
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
	upDateSchool

}