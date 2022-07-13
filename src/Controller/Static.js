const connection = require('../Config/connnection')
const getCountry = (req, res, next) => {
	let sqlQuery = `SELECT * FROM country`;
	// connection.connect(function(err){})

	connection.getConnection(function (err, connectionval) {
		if (err) {
			console.log('query connec error!', err);
			connectionval.release();
			return res.json({
				status: false,
				message: "There is issue in connection in mysql"
			});
		};

		try {

			connectionval.query(sqlQuery, function (error, results, fields) {
				// connection.end();
				if (error) {
					connectionval.release();
					res.status(500).json({ status: false, message: "please try again" })
				} else {
					connectionval.release();
					res.json({ status: true, message: "all country  ", list: Array.from(results) })
				}
			})


		} catch (e) {
			// connection.end();
			connectionval.release();
			res.status(500).json({ status: false, message: "please try again" })
		}


	});

}
const getIndianState = (req, res, next) => {
	let sqlQuery = `SELECT * FROM indian_state`;

	connection.getConnection(function (err, connectionval) {
		if (err) {
			console.log('query connec error!', err);
			connectionval.release();
			return res.json({
				status: false,
				message: "There is issue in connection in mysql"
			});
		};

		try {

			connectionval.query(sqlQuery, function (error, results, fields) {
				if (error) {
					connectionval.release();
					res.status(500).json({ status: false, message: "please try again" })
				} else {
					connectionval.release();
					res.json({ status: true, message: "all states  ", list: Array.from(results) })
				}
			})
			// });

		} catch (e) {
			connectionval.release();
			res.status(500).json({ status: false, message: "please try again" })
		}

	});

}
const getINternationalCity = (req, res, next) => {
	const { countrycode = '' } = req.query;

	connection.getConnection(function (err, connectionval) {
		if (err) {
			console.log('query connec error!', err);
			connectionval.release();
			return res.json({
				status: false,
				message: "There is issue in connection in mysql"
			});
		};

		if (countrycode !== "") {
			let sqlQuery = `SELECT * FROM city WHERE countrycode=${countrycode}`;


			try {

				connectionval.query(sqlQuery, function (error, results, fields) {
					if (error) {
						connectionval.release();
						res.status(500).json({ status: false, message: "please try again" })
					} else {
						connectionval.release();
						res.json({ status: true, message: "all states  ", list: Array.from(results) })
					}
				})

				// });

			} catch (e) {
				connectionval.release();
				res.status(500).json({ status: false, message: "please try again" })
			}
		} else {
			res.status(500).json({ status: false, message: "please try again" })
		}

	});


}
const searchSchool = (req, res, next) => {
	const { state = '', pincode = '' } = req.body;
	let sqlQuery = ''

	connection.getConnection(function (err, connectionval) {
		if (err) {
			console.log('query connec error!', err);
			connectionval.release();
			return res.json({
				status: false,
				message: "There is issue in connection in mysql"
			});
		};

		if (typeof state !== 'undefined' && typeof pincode !== 'undefined' && state !== "" && pincode !== "") {
			sqlQuery = `SELECT * FROM oldindianschool WHERE pincode = '${pincode}' AND state='${state}'`;
		} else if (state !== "") {
			sqlQuery = `SELECT * FROM oldindianschool WHERE state='${state}'`;

		} else if (pincode !== "") {
			sqlQuery = `SELECT * FROM oldindianschool WHERE pincode = '${pincode}'`;
		}
		console.log("sqlQuery", sqlQuery);


		try {
			if (sqlQuery !== "") {
				connectionval.query(sqlQuery, function (error, results, fields) {
					console.log("results", results)
					if (error) {
						console.log('Error ', error);
						connectionval.release();
						return res.status(500).json({ status: false, message: "please try again12" })
					} else {
						connectionval.release();
						return res.json({ status: true, message: "all states  ", list: Array.from(results) })
					}
				})
			} else {
				connectionval.release();
				return res.status(200).json({ status: false, list: [] })
			}

		} catch (e) {
			console.log(`Error r`, e);
			connectionval.release();
			return res.status(500).json({ status: false, message: "please try again13" })
		}

	});


}


const searchInterNationSchool = (req, res, next) => {
	const { city = '', pincode = '' } = req.body;
	let sqlQuery = ''

	connection.getConnection(function (err, connectionval) {
		if (err) {
			console.log('query connec error!', err);
			connectionval.release();
			return res.json({
				status: false,
				message: "There is issue in connection in mysql"
			});
		};

		if (typeof city !== 'undefined' && typeof pincode !== 'undefined' && city !== "" && pincode !== "") {
			sqlQuery = `SELECT * FROM oldInternationalschool WHERE pincode='${pincode}'`;
			sqlQuery = `SELECT * FROM oldInternationalschool WHERE pincode = '${pincode}' AND city='${city}'`;
		} else if (city !== "") {
			sqlQuery = `SELECT * FROM oldInternationalschool WHERE city='${city}'`;

		} else if (pincode !== "") {
			sqlQuery = `SELECT * FROM oldInternationalschool WHERE pincode = '${pincode}'`;
		}
		try {
			if (sqlQuery !== "") {
				connectionval.query(sqlQuery, function (error, results, fields) {
					if (error) {
						console.log('Error ', error);
						connectionval.release();
						return res.status(500).json({ status: false, message: "please try again" })
					} else {
						connectionval.release();
						return res.json({ status: true, message: "all states  ", list: Array.from(results) })
					}
				})
			} else {
				connectionval.release();
				return res.status(200).json({ status: false, list: [] })
			}

		} catch (e) {
			console.log(`Error r`, e);
			connectionval.release();
			return res.status(500).json({ status: false, message: "please try again" })
		}


	});

}

const schoolDetail = (req, res, next) => {
	const { schoolscode = '', isLocal = true } = req.body;
	let sqlQuery = ''

	connection.getConnection(function (err, connectionval) {
		if (err) {
			console.log('query connec error!', err);
			connectionval.release();
			return res.json({
				status: false,
				message: "There is issue in connection in mysql"
			});
		};

		if (typeof schoolscode !== 'undefined' && schoolscode !== "") {
			if (isLocal) {
				sqlQuery = `SELECT * FROM oldindianschool WHERE schoolcode = '${schoolscode}'`;

			} else {
				sqlQuery = `SELECT * FROM oldInternationalschool WHERE schoolcode = '${schoolscode}'`;

			}
		}

		try {
			if (sqlQuery !== "") {
				connectionval.query(sqlQuery, function (error, results, fields) {
					if (error) {
						connectionval.release();
						return res.status(500).json({ status: false, message: "please try again" })
					} else {
						if (Array.from(results).length > 0) {
							connectionval.release();
							return res.json({ status: true, message: "Schools detail found successully!  ", schoolDetail: Array.from(results)[0] })

						} else {
							connectionval.release();
							return res.json({ status: true, message: "No such school found " })
						}
					}
				})
			} else {
				connectionval.release();
				return res.status(200).json({ status: false, list: [] })
			}

		} catch (e) {
			console.log(`Error r`, e);
			connectionval.release();
			return res.status(500).json({ status: false, message: "please try again" })
		}


	});

}
const uploadStudantRecord = (req, res, next) => {

}
module.exports = {
	getCountry,
	getIndianState,
	searchSchool,
	getINternationalCity,
	searchInterNationSchool,
	schoolDetail,
	uploadStudantRecord
}