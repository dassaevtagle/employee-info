const User = require('../models/user')
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {
  const {username, password} = req.body
  try {
    const userExists = await User.findOne({username})
    if(userExists){
      throw new Error("Username already registered")
    }
    const user = new User({username, password})
    const newUser = await user.save()
    
    next()
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
      username: user.username
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET)

    //Persist token as 't' in client cookie that expires in 1 week 
    res.cookie('t', token, {
      maxAge: 60 * 60 * 24 * 7, 
      httpOnly : false
    }) 

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

const requireSignin =  (req, res, next) => {
  const token = req.cookies['t'];
  if(!token) {
    return res.status(401).json({
      err: 'No autorizado'
    });
  } else {
    try {
      // In case of invalid token it throws an error; 
      var jwtDecoded = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.user = {
        username: jwtDecoded.username,
        _id: jwtDecoded.sub,
      }
      next();
    } catch(err) {
      return res.status(401).json({
        err
      });
    }
  }
};

module.exports = {
  signup,
  signin, 
  requireSignin,
}