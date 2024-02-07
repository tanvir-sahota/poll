const express = require('express');
const router = express.Router();
const ClassroomModel = require('../models/ClassroomModel');

router.use(express.json());

router.post('/', async (req, res) => {
    try {
      const { owner, title } = req.body;
      const Classroom = new ClassroomModel({ owner, title });
      await Classroom.save();
      res.json(Classroom);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
module.exports = router;