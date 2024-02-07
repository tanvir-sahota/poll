const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

router.use(express.json());

router.get('/', classroomController.getAllClassrooms);
router.get('/:id', classroomController.getClassroomById);
router.post('/', classroomController.createClassroom);
router.delete('/:id', classroomController.deleteClassroom);
  
module.exports = router;