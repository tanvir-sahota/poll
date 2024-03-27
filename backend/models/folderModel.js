const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  title: {type: String,required: true},

  quizzes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'quiz' }],
  },

  classroom: {
    type: String,

    required: false,
}
},{timestamps: true});

module.exports = mongoose.model('Folder', folderSchema);
