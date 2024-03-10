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

exports.getAllFolders = async (req, res) => {
  try {
      const folders = await FolderModel.find();
      res.json(folders);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};

exports.deleteFolder = async (req, res) => {
  console.log("Delete folder")
  try {
      console.log("ID: " + req.params.id)
      const folder = await FolderModel.findById(req.params.id);

      if (!folder) {
          return res.status(404).json({ msg: 'Folder not found' });
      }
      await folder.deleteOne();
      res.json({ msg: 'Folder removed' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};

exports.patchFolder = async (request, response) => {
  const {id} = request.params

  const is_id_sanitised = mongoose.Types.ObjectId.isValid(id)
  if (!is_id_sanitised) {
      return response.status(404).json({error: "Folder does not exist. ID not in correct format."})
  }

  const updated_folder = await Quiz.findOneAndUpdate({_id: id}, {...request.body})
  if (!updated_folder) {
      return response.status(404).json({error: "Folder does not exist."})
  }

  response.status(200).json(updated_folder)
};

