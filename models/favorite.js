const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
  subjectId: Number,
  username: {
    type: String,
    trim: true, 
    unique: true,
  },
  picture: String,
  name: String,
  professionalHeadline: String,
  weight: Number,
  remoter: Boolean,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {timestamps: true})

module.exports =  mongoose.model('Favorite', favoriteSchema)