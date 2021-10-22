const express = require('express')
const router = express.Router()

const {userIsRegistered} = require('../controllers/user')
const { signup, signin, signout } = require('../controllers/auth')

router.post('/signup', userIsRegistered, signup, signin)
router.post('/signin', signin)

module.exports = router