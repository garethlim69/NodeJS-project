const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')

const {register, login, logout} = require('../controllers/auth')
const {getProfile, updateProfile} = require('../controllers/profile')
const getCars = require('../controllers/cars')

router.post('/register', register)
router.post('/session/login', login)
router.post('/session/logout', authenticateUser, logout)

router.get('/getprofile', authenticateUser, getProfile)
router.patch('/updateprofile', authenticateUser, updateProfile)

router.get('/carlist', authenticateUser, getCars)

module.exports = router