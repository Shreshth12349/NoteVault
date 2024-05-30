const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

//signup route
router.post('/signup', userController.signupUser)

//login route
router.post('/login', userController.loginUser)

module.exports = router