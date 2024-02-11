const mongoose = require('mongoose')
const bcrypt = require ('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

}, { timestamps: true })

// Hash password before saving to database, via bcrypt
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err.message)
      next(err)
    }
  this.password = hashedPassword
  next()
  })
})

module.exports = mongoose.model('User', userSchema)