const express = require('express')
const router = express.Router()

const { requireSignin } = require('../controllers/auth')
const { addFavorite } = require('../controllers/favorite')

router.post('/favorites',requireSignin, addFavorite)

module.exports = router