const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

module.exports = mongoose.model('QuizResults', quizResultsSchema)