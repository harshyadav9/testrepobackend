var request = require('request');
var randomize = require('randomatic');
const { sendEmailotp } = require('../Utill/sendEmail');
const sendSmsToCandidate = async (otp, mobile) => {
    console.log("candidate", otp, mobile);
    // return new Promise((resolve, reject) => {
    // let msg = "Welcome ! Your ABCON Registration No:ABCON-" + candidate.registrationNumber + " and password:" + candidate.password;
    let msg = `Dear sir/madam OTP for mobile number verification is ${otp} Thanks TERI DELHI
UNICGO`;

    let obj = {
        "uname": "20210409", "pass": "sathya@9999", "send": "UNICAD", "dest": mobile,
        "msg": msg
    };
    // console.log("obj" , obj);
    let options = {
        url: `http://164.52.195.161/API/SendMsg.aspx`,
        method: 'GET',
        qs: obj
    };
    return new Promise(function (resolve, reject) {
        request(options, (error, resonse, body) => {
            // console.log(resonse);
            if (error) {
                console.log("error in sending message", error);
                reject(error);
            } else {
                console.log("body", body);
                resolve(body);
            }
        });

    });

};


const sendEmailToCandidate = async (req, res, next) => {
    let { email } = req.query;
    let randomvalue = randomize("0", 4);
    sendEmailotp(randomvalue, email).then(data => {
        return res.json({
            status: true,
            otp: randomvalue
        });
    }).catch(error => {
        console.log("error", error)
        return res.json({
            status: false,
            otp: randomvalue
        });
    });
};




const generateOtp = async (req, res, next) => {
    let { mobile } = req.body;
    let randomvalue = randomize("0", 4);
    sendSmsToCandidate(randomvalue, mobile).then(() => {

        return res.json({
            status: true,
            otp: randomvalue
        });
    }).catch(error => {

        return res.json({
            status: false,
            otp: randomvalue
        });
    });

}




module.exports = {
    sendSmsToCandidate,
    generateOtp,
    sendEmailToCandidate
}