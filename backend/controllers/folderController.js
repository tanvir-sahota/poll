const Folder = require('../models/folderModel');

exports.createFolder = async (req, res) => {
  try {
    const folder = await Folder.create(req.body);
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getFolderById = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.folderId).populate('quizzes');
    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }
    res.status(200).json(folder);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
