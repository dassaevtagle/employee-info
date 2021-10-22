const User = require('../models/user')
const Favorite = require('../models/favorite')

const addFavorite = async (req, res) => {
  try {
    const favorite = new Favorite({...req.body.favorite, owner: res.locals.user._id})
    let result = await favorite.save()
    let dbUser = await User.findById(res.locals.user._id)
    dbUser.favorites.push(result)
    await dbUser.save()
  } catch(e){
    return res.status(400).json({
      message: e.message
    })
  }
}

module.exports = { addFavorite }