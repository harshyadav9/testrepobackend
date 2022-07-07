const connection = require('../Config/connnection')
const readXlsxFile = require('read-excel-file/node');
const xlsx = require('node-xlsx');
const dayjs = require('dayjs')
const Utill = require('../Utill');

function calculateFee(data = [], id, srollNumber, totalrows, res) {
	let themeCollection = new Map([
		['ESD', 0],
		['ESDGREEN', 0]
	]);
	let optMock = new Map([
		['ESD', 0],
		['ESDGREEN', 0]
	])
	let result = []
	data.map(row => {
		if (themeCollection.has(row[4])) {
			themeCollection.set(row[4], themeCollection.get(row[4]) + 1)
		}
		if (optMock.has(row[4]) && row[5].toLowerCase() === 'yes') {
			optMock.set(row[4], optMock.get(row[4]) + 1)
		}
		result = [{
			theme: 'ESD',
			totalCount: themeCollection.get('ESD'),
			optMock: optMock.get('ESD')
		},
		{
			theme: 'ESDGREEN',
			totalCount: themeCollection.get('ESDGREEN'),
			optMock: optMock.get('ESDGREEN')
		},

		]
	})
	let sql = '';
	let country = id.split('').slice(2).slice(0, 2).join('');
	if (country === 'IN') {
		sql = `SELECT * FROM FeeIN WHERE SubscriberType='SCHL' OR SubscriberType='MOCK';`

	} else {
		sql = `SELECT * FROM FeeINT `

	}
	connection.query(sql, (err, packet) => {
		if (err) {
			console.log('issue', err)
			return []
		} else {
			console.log('packet', Array.from(packet))
			let ESDFEE, ESDGREENFEE, MOCKFEE = 0
			Array.from(packet).map(fee => {
				if (fee.ExamMode === 'ESD') {
					ESDFEE = fee.Fee
				} else if (fee.ExamMode === 'ESDGREEN') {
					ESDGREENFEE = fee.Fee
				} else if (fee?.SubscriberType === 'MOCK' || fee?.ExamMode === 'MOCK') {
					MOCKFEE = fee.Fee

				}
			})
			let priceCalculation = result.map(resq => {
				if (resq.theme === 'ESD') {
					resq.themefee = ESDFEE,
						resq.mockfee = MOCKFEE
				} else {
					resq.themefee = ESDGREENFEE,
						resq.mockfee = MOCKFEE
				}
				return resq
			}
			)
			/// test

			sqlQuery = `SELECT * FROM Class`;
			connection.query(sqlQuery, function (err, packet) {
				// body...
				if (err) {

				}
				let classLevel = Array.from(packet);
				let classMap = new Map();
				classLevel.map(cls => classMap.set(cls.Classname, cls.Level))
				let studantID = id.split('').slice(6).slice(0, Infinity).join('');
				function n(n) {
					if (n <= 9) {
						return '000' + n
					} if (n > 9 && n <= 99) {
						return '00' + n
					} else if (n >= 100 && n <= 999) {
						return '0' + n
					}
					return n
				}


				let x = data.map((row, i) => {

					row.push(n(totalrows === 0 ? totalrows + 1 + i : totalrows + i));
					row.push(classMap.get(`${row[2]}`))
					// row[10] = classLevel[row[10]]
					return row;
				})
				// console.log(x);

				// res.json({
				// 	test: 'tets'
				// })
				// return;	
				const cb = Utill.generatePassword;
				let dbData = data.map((d, i) => [`${id}`, `${d[6]}`, `${srollNumber}${d[6]}`, `${cb()}`, ...d.slice(0, 6), ...d.slice(7), ...Array.apply(null, Array(7)).fill(null)]);
				if (dbData.length > 0) {
					sqlQuery = `INSERT INTO InternationalStudants (SchoolID, StudentID, Rollno, Password, Name, DOB, Class, Section, ExamTheme, DemoExam,ExamLevel, ExamSlotDateTime, DemoSlotDateTime, Createdby, Createdon, Modby, Modon, paymentStatus) 
					VALUES ?`;
					connection.query(sqlQuery, [dbData], function (err, result) {
						console.log("=====test", err)
						if (err) {
							res.status(400).json({
								message: 'Please try again!',
								status: false
							})
						} else {
							res.json({
								message: 'file uploaded successfully!',
								status: true,
								data: priceCalculation
							})
						}
					})
				}
			});

			//end test
			return result
			console.log(ESDFEE, ESDGREENFEE, MOCKFEE, 'Fee details', result)
		}
	})


	console.log("test data", result)
	// body...
}

const uploadStudantRecord = async (req, res, next) => {

	try {
		let { id } = req.params;
		let sqlQuery = ''
		// console.log('twte',schid);
		// res.json({
		// 	test:'false'
		// })
		// return;

		sqlQuery = `SELECT COUNT(*) AS totalRows FROM InternationalStudants`;
		let totalrows = 0;
		connection.query(sqlQuery, function (err, data) {
			if (err) {
				console.log("erro 00990", err);
				res.status(500).json({ message: 'please try again ', status: false })
			}

			totalrows = Array.from(data)[0].totalRows;

			let srollNumber = Utill.studantRollNumber(id, totalrows)
			// console.log("InternationalStudants",totalrows)

			let totalData = JSON.parse(req.body.fileData);
			let clientData = calculateFee(totalData, id, srollNumber, totalrows, res);

			// let idArray = id.split('');
			// let countryCode = idArray.slice(2).slice(0,2).join('');
			// let citycode = idArray.slice(4).slice(0,2).join('');


		})


	} catch (e) {
		console.log('error', e)
		res.status(500).json({ status: false, message: "Please try again!" })

	}
	// res.json({ test: 'erro'})
	// const filePath = process.env.PWD +'/uploads/'+req.file.filename;
	// const workSheetsFromFile = xlsx.parse(`${filePath}`);
	// let totalData = workSheetsFromFile[0].data.filter(row => row.length > 0);

	// totalData.shift();
	// let dbData = totalData.map(d => [null,null,null,null,...d,...Array.apply(null, Array(7)).fill(null)]);
	// let correctData = dbData.map((exData, i) => [...exData.slice(0,5),dayjs(Utill.ExcelDateToJSDate(exData[5])).format('YYYY-MM-DD'),...exData.slice(6,20)]);


}

const getStudantData = (req, res, next) => {
	let sqlQuery = '';
	let { SchoolID } = req.body;
	sqlQuery = `SELECT Name, DOB, Class, Section, ExamTheme, DemoExam FROM InternationalStudants WHERE SchoolID='${SchoolID}'`;
	connection.query(sqlQuery, function (err, result) {
		if (err) {
			console.log('Error', err);
			res.json({
				status: false,
				message: "please try again!"
			})
		} else {
			res.json({
				data: result,
				status: true,
				message: "data fetched successfully!"
			})
		}
	})
}

module.exports = {
	uploadStudantRecord,
	getStudantData
}