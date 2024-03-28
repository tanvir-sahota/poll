//import all required components
const jwt = require('jsonwebtoken');

//Verify userID from token 
const extractUserIdFromToken = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET, async (err, decoded) => {
          if (err) {
              console.error('Invalid token')
              reject(new Error('Invalid token'))
          } else {
              resolve(decoded._id)
          }
      })
    })
}

//Exports the middleware 
module.exports = {
    extractUserIdFromToken
  }
  