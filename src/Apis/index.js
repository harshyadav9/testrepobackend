const express = require('express');
const router = express.Router();

const Static = require('../Controller/Static')
const StudantController = require('../Controller/StudantController')
const FileController = require('../Controller/FileController')


router.get('/country',Static.getCountry);
router.get('/indian-state',Static.getIndianState);
router.post('/search-indian-school',Static.searchSchool);
router.get('/international-cities',Static.getINternationalCity);
router.get('/international-cities',Static.getINternationalCity);
router.post('/search-international-school',Static.searchInterNationSchool);
router.post('/school-detail',Static.schoolDetail);
router.post('/upload',FileController.uploadDB,StudantController.uploadStudantRecord);

router.get('/',(req,res,next) =>{
	res.send("tetsing ")
})
router.get('/',(req,res,next) =>{
	res.send("tetsing ")
})






module.exports = router;