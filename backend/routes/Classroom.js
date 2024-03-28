//import all required components
const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

router.use(express.json());

//defines all api request urls to access controllers 
router.get('/', classroomController.getAllClassrooms);
//router.get('/:token', classroomController.getAllClassroomsByToken);
//router.get('/:ownerid', classroomController.getAllClassroomsOfOwner);
router.get('/:id', classroomController.getClassroomById);
router.post('/', classroomController.createClassroom);
router.delete('/:id', classroomController.deleteClassroom);

//Export classroom router module
module.exports = router;