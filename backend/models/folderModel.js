const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  name: {type: String,required: true},
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'quiz' }]
},{timestamps: true});

module.exports = mongoose.model('Folder', folderSchema);
