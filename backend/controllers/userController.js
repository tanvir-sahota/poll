const mongoose = require('mongoose')
const User = require('../models/userModel')

const getUsers = async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
}

const createUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.signUp(username, password)
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(400).send( {error: err.message} );
      }

}

module.exports = {
    getUsers,
    createUser
}