//import all required components
const Folder = require('../models/folderModel');
const mongoose = require('mongoose')
const Quiz = require('../models/quiz_model');

//Create a folder
exports.createFolder = async (req, res) => {
  const {title, quizzes,classroom} = req.body

  let emptyFields = []

  if (!title) {
      emptyFields.push('title')
  }

  if (emptyFields.length > 0) {
      return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  }

  try {
      const folder = await Folder.create({title, quizzes, classroom})
      res.status(201).json(folder)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
};

//Get a folder based on ID
exports.getFolderById = async (req, res) => {
  const {id} = req.params

  const is_id_sanitised = mongoose.Types.ObjectId.isValid(id)
  if (!is_id_sanitised) {
      return res.status(404).json({error: "Folder does not exist. ID not in correct format."})
  }

  const folder = await Folder.findById(id)
  if (!folder) {
      return res.status(404).json({error: "Folder does not exist."})
  }

  res.status(200).json(folder)
};

//Get all folders
exports.getAllFolders = async (req, res) => {
  try {
      const folders = await Folder.find({});
      res.json(folders);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};

//Delete folder based on its ID
exports.deleteFolder = async (req, res) => {
  const {id} = req.params

  const is_id_sanitised = mongoose.Types.ObjectId.isValid(id)
  if (!is_id_sanitised) {
      return res.status(404).json({error: "Folder does not exist. ID not in correct format."})
  }

  const deleted_folder = await Folder.findOneAndDelete({_id: id})
  if (!deleted_folder) {
      return res.status(404).json({error: "Folder does not exist."})
  }

  res.status(200).json(deleted_folder)
};

//Update quizzes belonging to a folder
exports.patchFolder = async (request, response) => {
  const {id} = request.params

  const is_id_sanitised = mongoose.Types.ObjectId.isValid(id)
  if (!is_id_sanitised) {
      return response.status(404).json({error: "Folder does not exist. ID not in correct format."})
  }

  const updated_folder = await Folder.findOneAndUpdate({_id: id}, {...request.body})
  if (!updated_folder) {
      return response.status(404).json({error: "Folder does not exist."})
  }

  response.status(200).json(updated_folder)
};

//Get all quizzes belonging to a folder
exports.getQuizzesByFolder = async (req, res) => {
  try {
      const folderId = req.params.id;
      const quizzes = await Quiz.find({folder: folderId});
      res.json(quizzes);
  } catch (error) {
      res.status(500).send({ message: "Error fetching quizzes" });
  }
};

