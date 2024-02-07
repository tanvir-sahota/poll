const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.use(express.json());

router.post('/', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = new userModel({ username, password });
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  module.exports = router;