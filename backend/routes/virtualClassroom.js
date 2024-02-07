const express = require('express');
const router = express.Router();
const VirtualClassroomModel = require('../models/VirtualClassroomModel');

router.use(express.json());

router.post('/', async (req, res) => {
    try {
      const { teacher, title } = req.body;
      const virtualClassroom = new VirtualClassroomModel({ teacher, title });
      await virtualClassroom.save();
      res.json(virtualClassroom);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;