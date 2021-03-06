const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true, 
    required: true,
    unique: true,
    maxlength: 32,
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: {
   type: String,
   required: true 
  },
  picture: String,
  name: String,
  professionalHeadline: String,
  location: {
    shortName: String,
    latitude: Number,
    longitude: Number,
  },
  summaryOfBio: String,
  publicId: String,
  subjectId: Number,
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Favorite',
    subjectId: Number
  }]
}, {timestamps: true})

//virtual 

userSchema
  .virtual('password')
  .set(function(password){
    this._password = password
    this.salt = crypto.randomUUID()
    this.hashed_password = this.hashPassword(password)
  })
  .get(function() {
    return this._password
  })

userSchema.methods = {
  hashPassword: function(password) {
    if(!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt)
                   .update(password)
                   .digest('hex')
    } catch {
      return ''
    }
  },
  validatePassword: function(givenPassword) {
    return this.hashPassword(givenPassword) === this.hashed_password   
  }
}

module.exports =  mongoose.model('User', userSchema)