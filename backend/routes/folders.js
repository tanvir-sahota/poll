const express = require('express');
const folderController = require('../controllers/folderController.js');
const router = express.Router();

router.use(express.json());

router.get('/', folderController.getAllFolders);
router.post('/', folderController.createFolder);
router.get('/:id', folderController.getFolderById);
router.delete('/:id', folderController.deleteFolder);
router.patch('/:id', folderController.patchFolder)

module.exports = router;
