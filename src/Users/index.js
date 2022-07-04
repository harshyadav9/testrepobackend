const express = require('express');
const router = express.Router();
const User = require('../Controller/User')
router.post('/user-list',User.getAllUser)
router.post('/login',User.login);
router.post('/new-user',User.register);
router.post('/update-info',User.upDateSchool)


module.exports = router;