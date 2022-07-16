var request = require('request');
var randomize = require('randomatic');
const { sendEmailotp } = require('../Utill/sendEmail');
const sendSmsToCandidate = async (otp, mobile, msg) => {
    console.log("msg", msg);
    // return new Promise((resolve, reject) => {
    // let msg = "Welcome ! Your ABCON Registration No:ABCON-" + candidate.registrationNumber + " and password:" + candidate.password;
    //     let msg = `Dear sir/madam OTP for mobile number verification is ${otp} Thanks TERI DELHI
    // UNICGO`;

    let obj = {
        "uname": "20210409", "pass": "20210409", "send": "UNICGO", "dest": mobile,
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
                console.log("error in sending message", error, resonse);
                reject(error);
            } else {
                console.log("options", body);
                resolve(body);
            }
        });

    });

};


const sendEmailToCandidate = async (req, res, next) => {
    let { email, email_header } = req.query;
    let randomvalue = randomize("0", 4);
    sendEmailotp(randomvalue, email, email_header).then(data => {
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





const sendStudentMsg = async (req, res, next) => {
    // let { mobile } = req.body;
    let randomvalue = randomize("0", 4);
    let msg = `Welcome! You have successfully registered with TERI DELHI.Login Id :13 Password: 13 
Thanks TERI DELHI
UNICGO`;
    sendSmsToCandidate(randomvalue, 8920911853, msg).then(() => {

        return res.json({
            status: true,
            otp: randomvalue
        });
    }).catch(error => {
        console.log(error);
        return res.json({
            status: false,
            otp: randomvalue
        });
    });

}




const generateOtp = async (req, res, next) => {
    let { mobile } = req.body;
    let randomvalue = randomize("0", 4);
    let msg = `Dear sir/madam OTP for mobile number verification is ${randomvalue} Thanks TERI DELHI
UNICGO`;
    sendSmsToCandidate(randomvalue, mobile, msg).then(() => {

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
    sendEmailToCandidate,
    sendStudentMsg
}