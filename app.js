const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()

//DB config 
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('connected to DB'))

//middlewares
app.use(morgan('dev'))
app.use(express.json()) 
app.use(cookieParser())


const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`) 
})
