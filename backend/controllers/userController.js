const mongoose = require('mongoose')
const User = require('../models/userModel')

const createUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        await user.save();
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
      }

}

module.exports = {
    createUser
}