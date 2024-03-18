const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quizResultsSchema = new Schema({
    quizResultsArray: {
        type: Array,
        of: {type: mongoose.Schema.Types.ObjectId, ref:"QuestionResults"},
        required: false
      }
}, {timestamps: true})

module.exports = mongoose.model("QuizResults", quizResultsSchema)