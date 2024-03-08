const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  name: String,
  quizzes: [{ type: Schema.Types.ObjectId, ref: 'quiz' }]
});

module.exports = mongoose.model('Folder', folderSchema);
