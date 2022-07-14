const express = require('express');
const router = express.Router();

const Static = require('../Controller/Static')
const StudantController = require('../Controller/StudantController')
const FileController = require('../Controller/FileController')
const SlotController = require('../Controller/SlotController')
const SmsController = require('../Controller/smsController')
const User = require('../Controller/User')


router.get('/country', Static.getCountry);
router.get('/indian-state', Static.getIndianState);
router.post('/search-indian-school', Static.searchSchool);
router.get('/international-cities', Static.getINternationalCity);
router.post('/search-international-school', Static.searchInterNationSchool);
router.post('/school-detail', Static.schoolDetail);
// router.post('/upload', FileController.uploadDB, StudantController.uploadStudantRecord);

router.post('/upload/:id', StudantController.uploadStudantRecord);
router.post('/get-studant', StudantController.getStudantData);

// 
router.post('/user-list', User.getAllUser);
router.post('/login', User.login);
router.post('/studentLogin', User.StudentLogin);
router.post('/new-user', User.register);
router.post('/update-info', User.upDateSchool);

router.post('/payment', User.payment);
// router.post('/response', User.response);


router.post('/getpaymentdetails', StudantController.getpaymentdetails);
router.post('/update-payment', StudantController.updatePaymentStatus);
router.post('/update-studant-slot', StudantController.upadateStudantTableSlots);
router.post('/get-slot', SlotController.getSlots);
router.post('/update-slot', SlotController.updateSlot);
router.post('/responsepage', User.responsepage);

// router.post('/response', User.response);

router.post('/isSlottingAllowed', StudantController.isSlottingAllowed);


// router.post('/response', User.response);

router.post('/applicationStatus', User.applicationStatus);

router.post('/ispaymentallowed', StudantController.ispaymentallowed);



// router.get('/sms', SmsController.sendSmsToCandidate);

router.post('/generateOtp', SmsController.generateOtp);
router.post('/generateOtpEmail', SmsController.generateOtpEmail);


// 
router.get('/', (req, res, next) => {
	res.send("tetsing country ")
})






module.exports = router;