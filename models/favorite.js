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
}, {timestamps: true})

module.exports =  mongoose.model('Favorite', favoriteSchema)