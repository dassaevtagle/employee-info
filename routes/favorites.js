const express = require('express')
const router = express.Router()

const { requireSignin } = require('../controllers/auth')
const { addFavorite } = require('../controllers/favorite')

//requireSignin attaches user to res.locals.user
//{user, _id}
router.post('/favorites', requireSignin, addFavorite)

module.exports = router