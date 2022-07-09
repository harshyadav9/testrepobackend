const connection = require('../Config/connnection')
const getSlots = (req, res, next) => {
    let sqlQuery = `SELECT * FROM Slot`;
    // connection.connect(function(err){})
    try {
        connection.query(sqlQuery, function (error, results, fields) {
            // connection.end();
            if (error) {
                res.status(500).json({ status: false, message: "please try again" })
            } else {
                res.json({ status: true, message: "all time slots  ", list: Array.from(results) })
            }
        })
    } catch (e) {
        // connection.end();
        res.status(500).json({ status: false, message: "please try again" })
    }
}
const AllotSlots = (req, res, next) => {
    let sqlQuery = '';
    try {


    } catch (e) {
        res.status(500).json({
            status: false,
            message: "please try again !"
        })
    }
}
const updateSlot = (req, res, next, { timing }) => {  //TotalSeat
    // connection.connect(function(err){})

    // console.log("timing====>",req.body.timing)
    let ids = ['p', 'q', 'r'];
    let mp = new Map();
    // let d_ = req.body.timing;
    let d_ = timing;
    d_.map(s => mp.set(s.slotID, s.seatCount))
    d_.map((s, i) => { ids[i] = s?.slotID });

    sqlQuery = `SELECT SlotID,TotalSeat FROM Slot`;
    connection.query(sqlQuery, function (er, result) {
        if (er) {
            console.log("tests", er)
        } else {
            let totalArray = Array.from(result);
            totalArray.map(to => {
                if (mp.has(to.SlotID)) {
                    mp.set(to.SlotID, to.TotalSeat - mp.get(to.SlotID))
                }
            })
            console.log("mp", mp);

            sqlQuery = `UPDATE Slot
					SET SeatAvailable = CASE WHEN SlotID = "${ids[0]}" THEN ${mp.get(ids[0])} 
      					WHEN SlotID = "${ids[1]}" THEN ${mp.get(ids[1])}
      					WHEN SlotID = "${ids[2]}" THEN ${mp.get(ids[2])}
      					ELSE SeatAvailable
 					END
			`;


            try {
                connection.query(sqlQuery, function (error, results, fields) {
                    // connection.end();
                    if (error) {
                        console.log("erro", error)
                        return res.status(500).json({ status: false, message: "please try again" })
                    } else {
                        return res.json({ status: true, message: "all time slots  ", list: Array.from(results) })
                    }
                })
            } catch (e) {
                // connection.end();
                console.log("erro", error)

                return res.status(500).json({ status: false, message: "please try again" })
            }

        }
    })


}
module.exports = {
    getSlots,
    updateSlot
}