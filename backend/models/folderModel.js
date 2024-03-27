//import all required components
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema for Folders
//Contains a title and references to the classroom it belongs to
//and an array of quizzes it stores
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

//exporting the folder schema as a model 
module.exports = mongoose.model('Folder', folderSchema);
