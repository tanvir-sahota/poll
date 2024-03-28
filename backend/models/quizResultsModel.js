//import all required components
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Schema for Quiz Results 
//Contains a reference to the quiz the results are for and
//an array of references to all questions results contained in the quiz
const quizResultsSchema = new Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId, ref:"Quiz",
        required: true
    },
    quizResultsArray: {
        type: Array,
        of: {type: mongoose.Schema.Types.ObjectId, ref:"QuestionResults"},
        required: true
      }
}, {timestamps: true})

//exporting the quiz result schema as a model 
module.exports = mongoose.model('QuizResults', quizResultsSchema)