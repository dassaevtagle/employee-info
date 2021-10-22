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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});
app.use(morgan('dev'))
app.use(express.json()) 
app.use(cookieParser())

//routes
app.use('/api', authRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`) 
})
