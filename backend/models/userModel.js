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

userSchema.statics.signUp = async function(username, password) {

  if (!(username && password)) {
    throw Error("Need username and password details.");
  }
  
  const existingUsername = await this.exists({ username })
  if(existingUsername) {
    throw Error("This username is already in use.");
  }

  const user = await this.create({ username, password });
  return user
}

// static login method
userSchema.statics.login = async function(username, password) {
  if (!(username && password)) {
    throw Error("Need username and password details.");
  }

  const user =  await this.findOne({ username })

  if (!user) {
    throw Error("Incorrect username")
  }

  const match = await bcrypt.compare(password, user.password)
}

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