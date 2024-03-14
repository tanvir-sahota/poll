const express = require('express');
const folderController = require('../controllers/folderController');
const router = express.Router();

router.use(express.json());

router.get('/', folderController.getAllFolders);
router.post('/', folderController.createFolder);
router.get('/:id', folderController.getFolderById);
router.delete('/:id', folderController.deleteFolder);
router.patch('/:id', folderController.patchFolder)
router.get('/:id/quizzes', folderController.getQuizzesByFolder)

module.exports = router;
