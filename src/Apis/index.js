const express = require('express');
const router = express.Router();

const Static = require('../Controller/Static')
const StudantController = require('../Controller/StudantController')
const FileController = require('../Controller/FileController')

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
router.post('/user-list', User.getAllUser)
router.post('/login', User.login);
router.post('/new-user', User.register);
router.post('/update-info', User.upDateSchool);

// 
router.get('/', (req, res, next) => {
	res.send("tetsing country ")
})






module.exports = router;