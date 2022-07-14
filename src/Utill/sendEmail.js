const nodeMailer = require('nodemailer')
const emailHtml = require('./emailTemplate')
const path = require('path')


const sendEmail = async (name, email, school) => {

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: `testmail809809@gmail.com`,
            pass: `xjdrfizxzqzftqrw`
        }
    });
    let mailOptions = {
        from: ` TERI Team " <testmail809809@gmail.com>`, // sender address
        to: `${email}`, // list of receivers
        subject: "New School user ", // Subject line
        html: emailHtml(name, email, school) // html body
    };

    return new Promise(function (resolve, reject) {

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // return console.log(error);
                reject(error);
            }
            // console.log('Message %s sent: %s', info.messageId, info.response);
            resolve('successful')
            // res.render('index');
        });
    });



}






const sendEmailotp = async (otp, email) => {

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: `testmail809809@gmail.com`,
            pass: `xjdrfizxzqzftqrw`
        }
    });
    let mailOptions = {
        from: ` TERI Team " <testmail809809@gmail.com>`, // sender address
        to: `${email}`, // list of receivers
        subject: "New School user ", // Subject line
        html: emailHtml.emailOtpHtml(otp) // html body
    };

    return new Promise(function (resolve, reject) {

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // return console.log(error);
                reject(error);
            }
            // console.log('Message %s sent: %s', info.messageId, info.response);
            resolve('successful')
            // res.render('index');
        });
    });



}
module.exports = { sendEmail, sendEmailotp };