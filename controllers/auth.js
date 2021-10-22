const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt') //for express authorization 

const signup = async (req, res) => {
  const {username, password} = req.body
  try {
    const userExists = await User.findOne({username})
    if(userExists){
      throw new Error("Username already registered")
    }
    const user = new User({username, password})
    const newUser = await user.save()
    //Drop this fields not to show them to the client, 
    //They're already saved in DB
    newUser.hashed_password = undefined
    newUser.salt = undefined
    return res.json({
      user: newUser
    })
  } catch(err){
    //console.log(err)
    return res.status(400).json({
      error: err.message
    })
  }
}

const signin = async (req, res) => {
  const {username, password} = req.body
  try{
    const user = await User.findOne({username})
    if(!user){
      throw new Error("User doesn't exist")
    }
    //Authenticate user
    const isValidPassword = user.validatePassword(password);

    if(!isValidPassword){
      return res.status(401).json({
        error: "Email and password don't match"
      })
    }
    //Generate jwt
    const payload = {
      sub: user._id,
      iat: Date.now(),
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET)

    //Persist token as 't' in client cookie that expires in 1 week 
    res.cookie('t', token, {maxAge: 60 * 60 * 24 * 7 }) 

    const {_id, dbUsername } = user

    return res.json({
      token,
      user: {
        _id, 
        username: dbUsername,
      }
    })
    
  } catch(e) {
    return res.status(400).json({
      error: e.message
    })
  }
}

const signout = (req, res) => {
  res.clearCookie('t')
  res.json({
    message: "Signout success"
  })
}

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

module.exports = {
  signup,
  signin, 
  signout, 
  requireSignin,
}