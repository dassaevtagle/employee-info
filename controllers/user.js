const axios = require('axios')

const userIsRegistered = async (req, res, next) => {
  try{
    let response = await axios.get(`https://mighty-brook-86503.herokuapp.com/http://bio.torre.co/api/bios/${req.body.username}`,{
      headers:{
        "X-Requested-With": "XMLHttpRequest"
      }
    })
    res.locals.personInfo = response.data
    next()
  } catch(e) {
    console.log(e)
    return res.status(401).json({
      message: "User is not registered at Torre.co. If not the case, try again."
    })
  }
}

module.exports = {userIsRegistered}