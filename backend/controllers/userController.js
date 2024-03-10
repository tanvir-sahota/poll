const mongoose = require('mongoose')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

const getUserByToken = async (req, res) => {
  try {
    const token = req.body
    
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if (err) {
            console.error('Invalid token')
            res.status(401).json({ error: 'Invalid token' })
        } else {
            const userId = decoded._id

            try {
              const user = await User.findById(userId)
          
              if (!user) {
                return res.status(404).json({ message: 'User not found' });
              }
          
              res.status(200).json(user);
          
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    })

  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
}

const getUsers = async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
}

const createUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.signUp(username, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({username, token});
    } catch (err) {
        console.error(err.message);
        res.status(400).send( {error: err.message} );
    }

}

const loginUser = async (req, res) => {
  const {username, password} = req.body

  try {
    const user = await User.login(username, password)
    
    const token = createToken(user._id)

    res.status(200).json({username, token})
  } catch (err) {
    console.error(err.message);
    res.status(400).send( {error: err.message} );
  }
}

module.exports = {
    getUserByToken,
    getUsers,
    createUser,
    loginUser
}