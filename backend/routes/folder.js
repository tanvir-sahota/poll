const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController.js');

router.post('/', folderController.createFolder);
router.get('/:folderId', folderController.getFolderById);

module.exports = router;
