const express = require('express')
const router = express.Router()

const {userIsRegistered} = require('../controllers/user')
const { signup, signin, requireSignin } = require('../controllers/auth')

router.post('/signup', userIsRegistered, signup, signin)
router.post('/signin', signin)
router.get('/is-auth',requireSignin, (req, res) => {
  return res.status(200).json({
    username: res.locals.user.username, 
    message: "OK"
  })
})

module.exports = router