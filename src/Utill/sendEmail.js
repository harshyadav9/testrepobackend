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
        // auth: {
        //     user: `go@teri.res.in`,
        //     pass: `0gT!#1156M`
        // }
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



const forgetEmail = async (html, email) => {

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: `testmail809809@gmail.com`,
            pass: `xjdrfizxzqzftqrw`
        }
        // auth: {
        //     user: `go@teri.res.in`,
        //     pass: `0gT!#1156M`
        // }
    });
    let mailOptions = {
        from: ` TERI Team " <testmail809809@gmail.com>`, // sender address
        to: `${email}`, // list of receivers
        subject: "Forget password", // Subject line
        html: html // html body
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



const sendPaymentEmail = async (emailheader, emailId) => {

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: `testmail809809@gmail.com`,
            pass: `xjdrfizxzqzftqrw`
        }
        // auth: {
        //     user: `go@teri.res.in`,
        //     pass: `0gT!#1156M`
        // }    
    });
    let mailOptions = {
        from: ` TERI Team " <testmail809809@gmail.com>`, // sender address
        to: `${emailId}`, // list of receivers
        subject: "Payment receipt", // Subject line
        html: emailheader // html body
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




const sendEmailFull = async (textheader, email, roll_no, pass) => {

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: `testmail809809@gmail.com`,
            pass: `xjdrfizxzqzftqrw`
        }
        // auth: {
        //     user: `go@teri.res.in`,
        //     pass: `0gT!#1156M`
        // }
    });
    let mailOptions = {
        from: ` TERI Team " <go@teri.res.in>`, // sender address
        to: `${email}`, // list of receivers
        subject: `New User`, // Subject line
        html: emailHtml.emailHtml(textheader, roll_no, pass) // html body
    };

    return new Promise(function (resolve, reject) {

        transporter.sendMail(mailOptions, (error, info) => {
            console.log("info", info)
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




const sendEmailotp = async (otp, email, email_header) => {

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: `testmail809809@gmail.com`,
            pass: `xjdrfizxzqzftqrw`
        }
        // auth: {
        //     user: `go@teri.res.in`,
        //     pass: `0gT!#1156M`
        // }
    });
    let mailOptions = {
        from: ` TERI Team " <testmail809809@gmail.com>`, // sender address
        to: `${email}`, // list of receivers
        subject: `${email_header}`, // Subject line
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
module.exports = { sendEmail, sendEmailotp, sendEmailFull, sendPaymentEmail, forgetEmail };