let nodemailer = require('nodemailer');

let msgBody;
if (process.env.NODE_ENV !== 'production')
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'ustpl96@gmail.com', // generated ethereal user
        pass: 'Swami@2030' // generated ethereal password
    }
});

msgBody = "<html><body><font face='verdana' size='2'>";
msgBody = (msgBody + "welcome!<br>" + "<br>");
msgBody = (msgBody + 'You have successfully registered with ABCON DELHI' + "<br>");
msgBody = (msgBody + "Registration Number:ABCON-" + "<br>" + "<br>");
msgBody = (msgBody + "Password :" + "<br>" + "<br>");
msgBody = (msgBody + "<p><font face='Monotype Corsiva' size='4'><b>Thanks</b>" + "<br>");
msgBody = (msgBody + "</font></p>");
msgBody = (msgBody + "=============================================" + "<br>" + "<br>");
msgBody = (msgBody + "<p><font face='Monotype Corsiva' size='4'><b>" + "ABCON DELHI" + "</b>" + "<br>");
msgBody = (msgBody + "</font></p></body></html> ");


let mailOptions = {
    from: 'harshy110@gmail.com', // sender address
    to: ['harshy110@gmail.com'], // list of receivers
    subject: 'Test',
    html: msgBody // html body
};

transporter.sendMail(mailOptions);

// console.log(emailRes);