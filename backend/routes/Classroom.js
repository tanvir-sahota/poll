const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

router.use(express.json());

router.get('/', classroomController.getAllClassrooms);
router.get('/:token', classroomController.getAllClassroomsByToken);
router.get('/:ownerid', classroomController.getAllClassroomsOfOwner);
router.get('/:id', classroomController.getClassroomById);
router.post('/', classroomController.createClassroom);
router.delete('/:id', classroomController.deleteClassroom);

module.exports = router;