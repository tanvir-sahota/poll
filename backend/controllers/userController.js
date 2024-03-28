//import all required components
const User = require('../models/userModel')
const authMiddleware = require('../middlewares/authMiddleware.js')
const jwt = require('jsonwebtoken')

//Create a token 
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET)
}

//Get a user based on its token
const getUserByToken = async (req, res) => {
    try {
      const userId = await authMiddleware.extractUserIdFromToken(req.params.token)
      
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
      
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error');
    }
}

//Get a user based on its ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

//Get a user by its username
const getUserByUsername = async (req, res) => {
  try {
    const user = await User.find({username:req.params.username})

    if (user.length == 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

//Get all users
const getUsers = async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
}

//Creates a user
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

//Login a user 
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

//exports all user functions/controllers
module.exports = {
    getUserByToken,
    getUserById,
    getUserByUsername,
    getUsers,
    createUser,
    loginUser
}