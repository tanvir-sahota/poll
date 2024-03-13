const jwt = require('jsonwebtoken');

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

module.exports = {
    extractUserIdFromToken
  }
  