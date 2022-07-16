const connection = require('../Config/connnection');
const axios = require("axios");
const Utill = require('../Utill');

const getCategory = (req, res, next) => {
    let sqlQuery = `SELECT * FROM HelpCategory`;
    // connection.connect(function(err){})
    try {
        connection.query(sqlQuery, function (error, results, fields) {
            // connection.end();
            if (error) {
                res.status(500).json({ status: false, message: "please try again" })
            } else {
                res.json({ status: true, message: "all HelpCategory listed  ", list: Array.from(results).filter(n => n.Name !== "") })
            }
        })
    } catch (e) {
        // connection.end();
        res.status(500).json({ status: false, message: "please try again" })
    }
}
const createTicket = async (req, res, next) => {
    console.log('file', req.file)
    let sqlQuery = `SELECT * FROM HelpCategory`;
    let { category, message, subject, registrationNumber = null, ticket_date } = req.body;
    try {
        const data = await axios.post(`${Utill.APP_BASE_URL}/get-row-count`, { tableName: 'HelpDeskTickets' });

        if (data && data?.data?.status) {
            connection.query(sqlQuery, function async(error, results, fields) {

                if (error) {

                    res.status(500).json({ status: false, message: "please try again" })
                } else {
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
                    let helpDeskID = "HELPDESK" + n(data.data.totalRows + 1);
                    sqlQuery = `INSERT INTO HelpDeskTickets (helpdeskTicketId, category, message, status, subject, registrationNumber, ticket_date,replyDate) 
				VALUES ('${helpDeskID}', '${category}', '${message}', 'open', '${subject}', '${registrationNumber}', '${ticket_date}','${new Date().toDateString()}')`
                    connection.query(sqlQuery, function (err, reslut) {
                        if (err) {
                            console.log("Error", err);
                            res.json({
                                status: false,
                                message: "please try again"
                            })
                        }
                        res.json({
                            status: true,
                            message: "ticket is created",
                        })
                    })
                }
            })
        } else {
            res.status(500).json({ status: false, message: "please try again" })
        }

    } catch (e) {
        console.log("====test", e)
        res.status(500).json({ status: false, message: "please try again" })
    }

}
const getTicketsById = (req, res, next) => {
    let sqlQuery = '';

    try {
        let { id = '' } = req.body
        if (id === '' || !id) {
            const Er = Error('Bad request !');
            next(Er);
            return
        }

        sqlQuery = `SELECT * FROM HelpDeskTickets WHERE registrationNumber='${id}';`
        connection.query(sqlQuery, function (err, result) {
            if (err) {
                res.status(400).json({ status: false, message: "please try again" })
            }
            if (Array.from(result).length > 0) {
                res.status(200).json({
                    status: true,
                    list: Array.from(result)
                })
            } else {
                res.status(200).json({
                    status: false,
                    message: " no ticket found for this id"
                })
            }
        })


    } catch (e) {
        res.status(500).json({
            status: false,
            message: "pelase try again!"
        })
    }
}

module.exports = {
    getCategory,
    createTicket,
    getTicketsById
}
