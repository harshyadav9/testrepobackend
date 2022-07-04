const connection = require('../Config/connnection')
const readXlsxFile = require('read-excel-file/node');
const xlsx =  require('node-xlsx');
const uploadStudantRecord = (req,res,next) => {
	const filePath = process.env.PWD +'/uploads/'+req.file.filename;
	const workSheetsFromFile = xlsx.parse(`${filePath}`);
	let totalData = workSheetsFromFile[0].data.filter(row => row.length > 0);
	
	totalData.shift()
	let sqlQuery = '';
	if(totalData.length > 0) {
		sqlQuery = `INSERT INTO InternationalStudants (SchoolID, StudentID, Rollno, Password, Name, DOB, Class, Section, ExamLevel, ExamTheme, DemoExam, ExamSlotDateTime, DemoSlotDateTime, Createdby, Createdon, Modby, Modon) 
		VALUES ?`;
		connection.query(sqlQuery,[totalData] ,function(err,result) {
			if(err) {
				res.status(400).json({
					message: 'Please try again!',
					status: false
				})
			} else {
				res.json({
					message: 'file uploaded successfully!',
					status: true
				})
			}
		})
	}
	
	// console.log('workSheetsFromFile',totalData)
	// console.log('res',process.env.PWD +'/uploads/'+req.file.filename);
	
	// res.status(500).json({
	// 	message: "please try again",
	// 	status: false
	// })
}

module.exports = {
	uploadStudantRecord
}