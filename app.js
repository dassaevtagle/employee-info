const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()

const authRoutes = require('./routes/auth')

//DB config 
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('connected to DB'))

//middlewares
app.use(morgan('dev'))
app.use(express.json()) 
app.use(cookieParser())
app.use(cors())

//routes
app.use('/api', authRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`) 
})
