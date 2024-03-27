//import all required components
const express = require('express');
const folderController = require('../controllers/folderController');
const router = express.Router();

router.use(express.json());

//defines all api request urls to access controllers 
router.get('/', folderController.getAllFolders);
router.post('/', folderController.createFolder);
router.get('/:id', folderController.getFolderById);
router.delete('/:id', folderController.deleteFolder);
router.patch('/:id', folderController.patchFolder)
router.get('/:id/quizzes', folderController.getQuizzesByFolder)

//Export folder router module
module.exports = router;