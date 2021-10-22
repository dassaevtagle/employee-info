const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const path = require('path');



const app = express()
require('dotenv').config()

const authRoutes = require('./routes/auth')
const favoritesRoutes = require('./routes/favorites')

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
app.use('/api', favoritesRoutes)

//If production mode, serve react build app
if(['production'].includes(process.env.NODE_ENV)){
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`) 
})
